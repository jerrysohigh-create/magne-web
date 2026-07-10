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
    try:
        token = login_and_get_token(private_key, wallet_address)
        print(f"OK SIWE 登入 token={len(token)}")
    except Exception as e:
        print(f"ERROR 登入: {e}", file=sys.stderr)
        sys.exit(1)
    expired = False
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
            print(f"OK {ep}")
        except Exception as e:
            print(f"ERROR {ep}: {e}", file=sys.stderr)
            expired = True
    sys.exit(2 if expired else 0)

if __name__ == "__main__":
    main()
