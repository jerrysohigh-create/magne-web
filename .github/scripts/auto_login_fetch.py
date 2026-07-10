#!/usr/bin/env python3
"""
Lottery2 Auto-Login Fetch (WEB-20260710-011)
- 每次執行都自動 SIWE 登入 → 拿新 token → 抓 3 個 API
- 完全無 token 過期問題（因為每次都重新拿）
- 需要 GitHub Secrets:
    * LOTTERY2_PRIVATE_KEY  (錢包私鑰，用於 SIWE 簽章)
    * LOTTERY2_WALLET_ADDRESS (對應的錢包地址)
"""
import os
import sys
import json
import datetime
from pathlib import Path
import urllib.request
import urllib.error

DEFAULT_HEADERS = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
}

# === BSC Chain Constants (WEB-20260710-012) ===
BSC_RPC_URLS = [
    "https://bsc-dataseed.bnbchain.org/",
    "https://bsc-dataseed1.bnbchain.org/",
    "https://bsc-dataseed2.bnbchain.org/",
    "https://bsc-rpc.publicnode.com",
    "https://1rpc.io/bnb",
]
MS2_TOKEN_ADDRESS = "0xc46a54bbd2716c436aaaed6ed2f555a9b054ebd1"
STAKING_PROXY_ADDRESS = "0xb6ed72808fb34a3ac118d397f49332abbaa484d8"

# Function selectors (4 bytes)
SEL_TOTAL_SUPPLY = "0x18160ddd"        # ERC20.totalSupply()
SEL_BALANCE_OF = "0x70a08231"          # ERC20.balanceOf(address)
SEL_DECIMALS = "0x313ce567"            # ERC20.decimals()
SEL_NAME = "0x06fdde03"                # ERC20.name()
SEL_SYMBOL = "0x95d89b41"              # ERC20.symbol()
SEL_STAKING_TOTAL_STAKED = "0x817b1cd2"  # Staking.totalStaked()
SEL_STAKING_BASE_RATE = "0xc8fc9729"     # Staking.baseRate()

try:
    from eth_account import Account
    from eth_account.messages import encode_defunct
except ImportError:
    print("ERROR: eth_account 未安裝", file=sys.stderr)
    sys.exit(1)

BASE = "https://payment.magne.ai/api/v1"
ENDPOINTS = ["dashboard", "list", "leaderboard"]
FIELDS = {
    "dashboard": "lottery2-dashboard.json",
    "list": "lottery2-list.json",
    "leaderboard": "lottery2-leaderboard.json",
}

def mask_addr(a):
    if not a or len(a) < 10: return None
    return a[:6] + "..." + a[-4:]

def post_json(url, payload):
    data = json.dumps(payload).encode()
    h = dict(DEFAULT_HEADERS)
    h["content-type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=h)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode())

# === BSC Chain eth_call (WEB-20260710-012) ===
def eth_call(to, data_hex, rpc_url=None):
    """Call BSC RPC eth_call. Tries multiple RPC endpoints."""
    payload = {
        "jsonrpc": "2.0", "id": 0,
        "method": "eth_call",
        "params": [{"to": to, "data": data_hex}, "latest"]
    }
    urls = [rpc_url] if rpc_url else BSC_RPC_URLS
    last_err = None
    for url in urls:
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode(),
                headers={"content-type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=10) as r:
                resp = json.loads(r.read().decode())
            if "error" in resp:
                last_err = resp["error"]
                continue
            return int(resp["result"], 16)
        except Exception as e:
            last_err = str(e)
            continue
    raise RuntimeError(f"All BSC RPCs failed: {last_err}")

def pad_address(addr):
    return "0x" + addr[2:].lower().rjust(64, "0")

def encode_erc20_balance_of(addr):
    return SEL_BALANCE_OF + pad_address(addr)

def get_json(url, headers=None):
    h = dict(DEFAULT_HEADERS)
    if headers: h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode())

def login_and_get_token(private_key, wallet_address):
    challenge_url = f"{BASE}/auth/challenge?address={wallet_address}&chainId=56"
    ch = get_json(challenge_url)
    if ch.get("code") != 200:
        raise RuntimeError(f"Challenge 失敗：{ch}")
    data = ch["data"]
    message = data["message"]
    uuid = data["uuid"]
    acct = Account.from_key(private_key)
    signable = encode_defunct(text=message)
    signed = acct.sign_message(signable)
    signature = signed.signature.hex()
    if not signature.startswith("0x"):
        signature = "0x" + signature
    login_resp = post_json(f"{BASE}/auth/login", {
        "address": wallet_address, "uuid": uuid,
        "message": message, "signature": signature,
    })
    if login_resp.get("code") != 200:
        raise RuntimeError(f"Login 失敗：{login_resp}")
    return login_resp["data"]["token"]

def fetch_with_token(token, ep):
    return get_json(f"{BASE}/lottery2/{ep}", headers={"token": token})

# === On-chain data (WEB-20260710-012) ===
def fetch_onchain_data():
    """Read MS2 totalSupply and Staking totalStaked from BSC chain."""
    result = {"ms2Issued": None, "liquidityPrepared": None, "baseRate": None}
    try:
        # 1. MS2.totalSupply()
        ts = eth_call(MS2_TOKEN_ADDRESS, SEL_TOTAL_SUPPLY)
        decimals = eth_call(MS2_TOKEN_ADDRESS, SEL_DECIMALS)
        result["ms2Issued"] = ts / (10 ** decimals)
        print(f"  ✅ MS2.totalSupply: {result['ms2Issued']:,.2f}")
    except Exception as e:
        print(f"  ❌ MS2.totalSupply failed: {e}", file=sys.stderr)
    try:
        # 2. Staking.totalStaked()
        staked = eth_call(STAKING_PROXY_ADDRESS, SEL_STAKING_TOTAL_STAKED)
        decimals = eth_call(MS2_TOKEN_ADDRESS, SEL_DECIMALS)
        result["liquidityPrepared"] = staked / (10 ** decimals)
        print(f"  ✅ Staking.totalStaked: {result['liquidityPrepared']:,.2f}")
    except Exception as e:
        print(f"  ❌ Staking.totalStaked failed: {e}", file=sys.stderr)
    try:
        # 3. Staking.baseRate()
        rate = eth_call(STAKING_PROXY_ADDRESS, SEL_STAKING_BASE_RATE)
        result["baseRate"] = rate / 10000  # basis points → percent
        print(f"  ✅ Staking.baseRate: {result['baseRate']:.2%}")
    except Exception as e:
        print(f"  ❌ Staking.baseRate failed: {e}", file=sys.stderr)
    return result

def sanitize(ep, raw):
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    code, msg, data = raw.get("code"), raw.get("msg"), raw.get("data")
    if ep == "dashboard":
        return {
            "_meta": {"endpoint": f"{BASE}/{ep}", "fetchedAt": now},
            "code": code, "msg": msg,
            "data": {
                "totalParticipants": data.get("totalParticipants"),
                "totalEntries": data.get("totalDraws"),
                "totalMobile": data.get("totalMobile"),
                "currRound": data.get("currRound"),
                "nextDrawNeed": data.get("nextDrawNeed"),
            },
            "fieldMapping": {"totalEntries": "後端 totalDraws 重新命名"},
            "fieldsRequestedButNotInResponse": ["ms2Issued", "liquidityPrepared"],
            "safeForPublicDashboard": True,
        }
    else:
        rows = data if isinstance(data, list) else []
        masked = []
        for r in rows:
            if not isinstance(r, dict): continue
            nr = dict(r)
            for k in ("winnerAddress", "address", "addr", "inviter", "inviterAddress"):
                if k in nr and isinstance(nr[k], str):
                    nr[k] = mask_addr(nr[k])
            masked.append(nr)
        return {
            "_meta": {"endpoint": f"{BASE}/{ep}", "fetchedAt": now},
            "code": code, "msg": msg,
            "data": masked, "rowCount": len(masked),
            "safeForPublicDashboard": True,
        }

def main():
    private_key = os.environ.get("LOTTERY2_PRIVATE_KEY")
    wallet_address = os.environ.get("LOTTERY2_WALLET_ADDRESS")
    out_dir = Path(os.environ.get("RECON_OUT_DIR", "assets/data"))
    if not private_key or not wallet_address:
        print("ERROR: 缺少 secrets", file=sys.stderr)
        sys.exit(1)
    out_dir.mkdir(parents=True, exist_ok=True)

    # === Step 1: SIWE 自動登入 ===
    try:
        token = login_and_get_token(private_key, wallet_address)
        print(f"OK SIWE 登入 token={len(token)}")
    except Exception as e:
        print(f"ERROR 登入: {e}", file=sys.stderr)
        sys.exit(1)

    # === Step 2: 抓 3 個 API（dashboard / list / leaderboard）===
    expired = False
    api_data = {}
    for ep in ENDPOINTS:
        try:
            raw = fetch_with_token(token, ep)
            if raw.get("code") in (401, 900401):
                expired = True
                continue
            clean = sanitize(ep, raw)
            if clean is None:
                expired = True
                continue
            (out_dir / FIELDS[ep]).write_text(json.dumps(clean, indent=2, ensure_ascii=False))
            api_data[ep] = clean
            print(f"OK {ep}")
        except Exception as e:
            print(f"ERROR {ep}: {e}", file=sys.stderr)
            expired = True

    # === Step 3: 抓鏈上資料（ms2Issued + liquidityPrepared + baseRate）===
    print("\nFetching on-chain data...")
    onchain = fetch_onchain_data()

    # === Step 4: 合併鏈上資料到 dashboard.json ===
    if "dashboard" in api_data:
        d = api_data["dashboard"]
        d["data"]["ms2Issued"] = onchain.get("ms2Issued")
        d["data"]["liquidityPrepared"] = onchain.get("liquidityPrepared")
        d["data"]["baseRate"] = onchain.get("baseRate")
        d["_meta"]["onchainFetchedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        d["_meta"]["onchainSource"] = "BSC chain via public RPC eth_call"
        (out_dir / FIELDS["dashboard"]).write_text(json.dumps(d, indent=2, ensure_ascii=False))
        print(f"OK dashboard (含鏈上 ms2Issued + liquidityPrepared + baseRate)")

    sys.exit(2 if expired else 0)

if __name__ == "__main__":
    main()
