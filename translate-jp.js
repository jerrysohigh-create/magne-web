const fs = require('fs');

let html = fs.readFileSync('magne-landing.html', 'utf8');

// Translation map - comprehensive English to Japanese
const translations = [
  // Hero section
  ['A Web3-Native AI Smartphone', 'Web3ネイティブAIスマートフォン'],
  ['Built for secure crypto asset management, private AI experiences, and next-generation mobile connectivity. This is not a concept — it\'s a real product with real certifications.', '安全な暗号資産管理、プライベートAI体験、次世代モバイル接続のために設計された製品です。コンセプトではなく、実際の製品であり、実際の認証を取得しています。'],
  ['View Full Specifications', '仕様詳細を見る'],
  ['Preorder Now', '予約注文する'],
  
  // Features section
  ['Six Pillars of Innovation', 'イノベーションの6つの柱'],
  ['Every feature engineered for the Web3 era.', 'Web3時代に合わせたすべての機能が設計されています。'],
  ['On-device AI + Google Gemini', 'デバイス内AI + Google Gemini'],
  ['AX3596 NPU (8 TOPS) powers private local AI. Google Gemini cloud experience with zero data leakage.', 'AX3596 NPU（8 TOPS）がプライベートなローカルAIを実現。データ漏えいゼロのGoogle Geminiクラウド体験。'],
  ['HyperSeed N60 Secure Element', 'HyperSeed N60セキュアエレメント'],
  ['Encrypted NFC Backup', '暗号化されたNFCバックアップ'],
  ['Offline encrypted backup card. Restore your wallet anytime, anywhere with NFC.', 'オフライン暗号化管理バックアップカード。NFCでいつでもどこでもウォレットを復元。'],
  ['Private Dual-System Space', 'プライベートデュアルシステム空間'],
  ['Separate and hidden Web3 environment. Complete isolation from daily apps and data.', '分離され非表示のWeb3環境。日々のアプリやデータから完全に隔離。'],
  ['Web3 Native Access', 'Web3ネイティブアクセス'],
  ['Built-in wallet, dApps, MHash Layer2, and ecosystem services. Swap, Stake, Bridge in one tap.', '組み込みウォレット、dApps、MHash Layer2、エコシステムサービス。タップひとつでSwap、Stake、Bridge。'],
  ['Global Compliance', 'グローバルコンプライアンス'],
  ['GMS, Google Widevine L1, GSMA TAC, FCC, CP65, CB, UN38.3 — ready for worldwide deployment.', 'GMS、Google Widevine L1、GSMA TAC、FCC、CP65、CB、UN38.3を取得。世界中の展開に対応。'],
  
  // Security section
  ['Three-Layer Security Architecture', '3層セキュリティアーキテクチャ'],
  ['The most secure hardware wallet architecture in any smartphone. View details →', 'スマートフォンで最も安全なハードウェアウォレットアーキテクチャ。詳細を見る →'],
  ['Trusted execution environment for sensitive operation isolation and hardware-level process separation.', '機密操作の隔離とハードウェアレベルのプロセス分離のためのTrusted Execution Environment。'],
  ['CC EAL2+ Certified', 'CC EAL2+認証取得'],
  ['CC EAL6+ Certified', 'CC EAL6+認証取得'],
  ['Encrypted offline backup and recovery card. Physically restore your wallet anytime, anywhere.', '暗号化されたオフラインバックアップ＆リカバリーカード。物理的にいつでもどこでもウォレットを復元。'],
  ['A three-layer hardware wallet architecture combining trusted execution, secure key isolation, and encrypted NFC backup. This is what makes MAGNE.AI different from any phone — and any hardware wallet.', 'Trusted Execution、セキュアな鍵隔離、暗号化されたNFCバックアップを組み合わせた3層ハードウェアウォレットアーキテクチャ。これがMAGNE.AIを他のスマホ、そして他のハードウェアウォレットと差別化する理由です。'],
  
  // Specs section
  ['Technical Specifications', '技術仕様'],
  ['Real hardware. Real product. Ready to ship.', '実際のハードウェア。実際の製品。出荷準備完了。'],
  ['SoC', 'SoC'],
  ['CPU / GPU', 'CPU / GPU'],
  ['AI NPU', 'AI NPU'],
  ['AI', 'AI'],
  ['On-device AI + Google Gemini cloud AI experience', 'デバイス内AI + Google GeminiクラウドAI体験'],
  ['Memory', 'メモリ'],
  ['Storage', 'ストレージ'],
  ['Security', 'セキュリティ'],
  ['Hardware Wallet', 'ハードウェアウォレット'],
  ['Built-in hardware wallet with secure key isolation and encrypted NFC backup', 'セキュアな鍵隔離と暗号化されたNFCバックアップを備えた組み込みハードウェアウォレット'],
  ['Private Space', 'プライベート空間'],
  ['Dual-system private space separating Web2 and Web3 environments', 'Web2とWeb3環境を分離するデュアルシステムプライベート空間'],
  ['Display', 'ディスプレイ'],
  ['Battery / Charging', 'バッテリー / 充電'],
  ['Camera', 'カメラ'],
  ['OS', 'OS'],
  ['Media DRM', 'メディアDRM'],
  ['Google Widevine L1 · HD streaming supported', 'Google Widevine L1 · HDストリーミング対応'],
  ['Durability', '耐久性'],
  ['IP52 water and dust resistance', 'IP52防塵防水'],
  ['Connectivity', '接続性'],
  ['FCC ID', 'FCC ID'],
  ['GSMA TAC', 'GSMA TAC'],
  ['TAC 01681300 · Marketing Name: MAG1', 'TAC 01681300 · マーケティング名：MAG1'],
  
  // Bands section
  ['Network Bands', 'ネットワークバンド'],
  ['Marketing Name: MAG1', 'マーケティング名：MAG1'],
  ['The device supports all global frequency bands required for LTE and 5G NR, ensuring compatibility in regions worldwide including North America, Europe, and Asia.', '本端末はLTEおよび5G NRに必要なすべてのグローバル周波数帯をサポートし、北米、欧州、アジアを含む世界中の地域での互換性を確保しています。'],
  
  // Certifications
  ['Certifications & Compliance', '認証・コンプライアンス'],
  ['Built for worldwide deployment and carrier partnerships.', '世界中の展開とキャリアパートナーシップのために設計。'],
  ['Google GMS', 'Google GMS'],
  ['Google Mobile Services', 'Google モバイルサービス'],
  ['Approved', '承認済'],
  ['Google Widevine L1', 'Google Widevine L1'],
  ['HD Content Protection', 'HDコンテンツ保護'],
  ['Supported', '対応済'],
  ['GSMA TAC', 'GSMA TAC'],
  ['TAC 01681300 · MA1/MAG1', 'TAC 01681300 · MA1/MAG1'],
  ['Obtained', '取得済'],
  ['FCC', 'FCC'],
  ['FCC ID: 2BVCPGC603606', 'FCC ID: 2BVCPGC603606'],
  ['Public', '公開'],
  ['Battery CB', 'バッテリーCB'],
  ['IEC 62133 Compliance', 'IEC 62133準拠'],
  ['Completed', '完了'],
  ['Battery UN38.3', 'バッテリーUN38.3'],
  ['Transport Safety', '輸送安全'],
  ['PASS', '合格'],
  ['California Prop 65', 'カリフォルニア州プロポジション65'],
  ['TÜV Rheinland Report No. 27220370a 001', 'TÜV Rheinlandレポート No. 27220370a 001'],
  ['CC EAL2+ / EAL6+', 'CC EAL2+ / EAL6+'],
  ['Common Criteria Security', 'コモンCriteriaセキュリティ'],
  ['Certified', '認証取得'],
  ['CE', 'CE'],
  ['European Conformity', '欧州適合性'],
  ['In Progress', '進行中'],
  
  // Packaging
  ['Product Packaging', '製品パッケージ'],
  ['White Box', 'ホワイトボックス'],
  ['Black Box', 'ブラックボックス'],
  ['Exploded View', '分解図'],
  
  // Network section
  ['MAGNE Web3 Network', 'MAGNE Web3ネットワーク'],
  ['Native L1 + L2 blockchain integration for wallet operations, dApp access, and decentralized infrastructure.', 'ウォレット操作、dAppアクセス、分散型インフラのためのネイティブL1 + L2ブロックチェーン統合。'],
  ['MAGNE L1 Testnet ↗', 'MAGNE L1テストネット ↗'],
  ['Native Layer 1 blockchain for secure asset management and wallet operations.', '安全な資産管理和ウォレット操作のためのネイティブLayer 1ブロックチェーン。'],
  ['MHash L2 Testnet ↗', 'MHash L2テストネット ↗'],
  ['OP Stack-based Layer 2 designed for scalable Web3 applications and near-zero gas fees.', 'スケーラブルなWeb3アプリケーションとほぼゼロのガス代のために設計されたOP StackベースのLayer 2。'],
  ['Built-in dApp Ecosystem', '組み込みdAppエコシステム'],
  ['Swap, Stake, Bridge, NFT, and Identity — all accessible from your MAGNE device.', 'MAGNEデバイスからすべてにアクセス可能。Swap、Stake、Bridge、NFT、Identity。'],
  ['Open Source ↗', 'オープンソース ↗'],
  ['L1 & L2 source code publicly available on GitHub.', 'L1 & L2のソースコードがGitHubで公開されています。'],
  ['Clash of the Titans ↗', 'Clash of the Titans ↗'],
  ['Closed Beta', 'クローズドベータ'],
  ['Web3 game built on MAGNE blockchain. Play and earn.', 'MAGNEブロックチェーン上に構築されたWeb3ゲーム。プレイして稼ぐ。'],
  ['Clash of the Titans Whitepaper ↗', 'Clash of the Titansホワイトペーパー ↗'],
  ['Clash of the Titans full whitepaper — English version.', 'Clash of the Titans 完全ホワイトペーパー — 英語版。'],
  
  // Milestones
  ['Project Milestones', 'プロジェクトマイルストーン'],
  ['From security certification to mass production — every step documented.', 'セキュリティ認証から量産まで — すべてのステップを記録。'],
  ['Phone Gen1 — Security & Certifications', 'Phone Gen1 — セキュリティ＆認証'],
  ['UTEE Security Evaluation — EAL2+', 'UTEEセキュリティ評価 — EAL2+'],
  ['Mapp']
];

console.log('Translation map has', translations.length, 'entries');
console.log('File size:', html.length, 'chars');

// Apply translations
let result = html;
for (const [en, jp] of translations) {
  if (en.includes('|')) {
    // Skip pipe-delimited entries for now
    continue;
  }
  result = result.split(en).join(jp);
}

// Write output
fs.writeFileSync('magne-landing-jp.html', result);
console.log('Written magne-landing-jp.html');
console.log('Original size:', html.length);
console.log('Output size:', result.length);
