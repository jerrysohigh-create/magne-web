import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const languages = ["en"];

const copy = {
  en: {
    lang: "en",
    locale: "en_US",
    label: "EN",
    homeLabel: "MAGNE.AI English home",
    navLabel: "Primary navigation",
    menuLabel: "Open navigation",
    preorder: "Pre-order MAG1 ↗",
    nav: { phone: "PHONE", ai: "AI", network: "NETWORK", security: "SECURITY", compliance: "COMPLIANCE", progress: "PROGRESS", partners: "PARTNERS", media: "MEDIA KIT", contact: "CONTACT" },
    footer: { product: "Product", verify: "Verification", connect: "Connect", resources: "Resources", follow: "Follow", preorder: "Pre-order", contact: "Contact", privacy: "Privacy Policy", w3: "W3 Web3 Portal ↗", whitepaper: "Whitepaper ↗" },
    phone: {
      title: "MAG1 Intelligent Terminal | MAGNE.AI",
      description: "Explore MAG1: on-device AI, dedicated secure hardware, NFC recovery, Android 15, AgentPay and evidence-backed engineering.",
      dossier: "PRODUCT DOSSIER · 01",
      eyebrow: "MAG1 · 3D INTELLIGENT TERMINAL",
      h1a: "Not another smartphone.",
      h1b: "A terminal for AI agents.",
      deck: "Identity, payment and AI agents meet in your hand. MAG1 brings on-device AI, AgentPay, hardware-backed signing and offline recovery into one device layer you can control.",
      bodyColors: "WHITE / BLACK BODY",
      trust: "HARDWARE TRUST LAYER",
      stageLabel: "BUILD 51 / WHITE + BLACK",
      modelAria: "Rotatable MAGNE.AI MAG1 3D phone model",
      loading: "Loading secure terminal model",
      hint: "Drag to rotate · Pinch to zoom",
      autorotate: "Auto rotate",
      effects: "Screen effects",
      color: "Body color",
      white: "White model",
      black: "Black model",
      boundaryA: "Hardware defines the boundary.",
      boundaryB: "Software can only promise within it.",
      architectureEyebrow: "STRUCTURE · ENGINEERING VIEW",
      architectureTitle: "From the enclosure,\nall the way to the root of trust.",
      architectureDeck: "Open MAG1 layer by layer to inspect imaging, power, the mainboard, secure hardware and offline recovery. Every claim maps to physical hardware.",
      architectureAction: "Enter the complete engineering view",
      architectureAlt: "Exploded engineering view of the MAG1 phone",
      stackTitle: "Not five isolated specifications.\nOne system working together.",
      stackDeck: "Gemini, local AI and Android services connect to heterogeneous compute, the N60 secure element and physical hardware. Every layer has a distinct responsibility and evidence boundary.",
      layers: [
        ["User experience", "Google Gemini · Translation · Imaging · Wallet"],
        ["Applications and services", "Android 15 + GMS · FIH AI Services · OMAPI"],
        ["Core platform", "UNISOC T9100 · IMG AX3596 · UniAI / NN HAL"],
        ["Trust and connectivity", "HyperSeed N60 · 5G · Wi-Fi · Bluetooth · NFC"],
        ["Hardware subsystems", "6.78 in · 120Hz · 50MP · 5000mAh · up to 12GB + 512GB"],
      ],
      fullArchitecture: "View the full system architecture and 3D engineering model",
      anatomyEyebrow: "ANATOMY",
      anatomyTitle: "Three cores.\nOne job each.",
      anatomy: [
        ["COMPUTE", "UNISOC T9100 + IMG AX3596", "5G application compute and 10 TOPS INT8 on-device AI each do their own work. Intelligence starts on the device before the cloud is considered.", "10 TOPS"],
        ["TRUST", "TEE + HyperSeed N60", "A trusted execution environment isolates sensitive processing. A dedicated secure element stores keys and performs signing.", "EAL6+"],
        ["RECOVERY", "HyperSeed 72B NFC", "Recovery material lives on an offline physical card. The device can change without taking ownership with it.", "OFFLINE"],
      ],
      specsEyebrow: "SPECIFICATION",
      specsTitle: "Not a specification race.\nEvery component has a job.",
      specsIntro: "A terminal specification should be more than numbers. The processor handles daily work, the NPU handles local models, memory sustains inference, and secure hardware keeps the work that cannot be outsourced.",
      specsQuote: "Not a smartphone budget.\nA terminal budget.",
      specsAction: "View complete specifications, WW / EEA firmware and bands",
      evtEyebrow: "ENGINEERING EVIDENCE · EVT HARDWARE",
      evtTitle: "Not an illustration.\nA real EVT sample mainboard.",
      evtDeck: "Component and shield sides taken from a teardown preserve the real board outline, connectors, shields and soldering detail. This is EVT evidence, not a PVT sample.",
      componentSide: "Component side",
      shieldSide: "Shield side",
      evtAction: "Flip between both real surfaces",
      imagingEyebrow: "AI IMAGING",
      imagingTitle: "Capture the world clearly.\nThen hand it to on-device compute.",
      imagingLead: "Make every moment clear and vivid.",
      imagingDeck: "A 50MP Samsung ISOCELL JN1 captures detail. The UNISOC T9100 ISP and on-device processing path handle color, HDR, low light and stabilization as one imaging pipeline.",
      imagingNote: "Only capabilities verified by engineering material or real-device testing are listed. Visual search, continuous scene understanding and agent vision are not presented as current delivery features.",
      cameraAction: "Open camera and video specifications",
      arrivalEyebrow: "THE ARRIVAL",
      arrivalTitle: "More than a phone in the box.\nAn offline way back.",
      arrivalDeck: "The device, charger and guide start the product. The secure element and NFC recovery card preserve an ownership path that does not depend on the phone being online.",
      arrivalQuote: "A device can be lost.\nWhat it carries does not have to be.",
      arrivalNote: "Engineering packaging shown. Final contents, labeling and accessories vary by shipping version and region.",
      spacesEyebrow: "TWO SPACES",
      spacesTitle: "Everyday stays open to the world.\nVault stays quiet.",
      everyday: "Android 15 + GMS supports communications, imaging, apps and optional cloud AI for daily use.",
      vault: "Wallet, signing and sensitive asset flows remain behind separate biometric and secure hardware controls.",
      intelligenceTitle: "A complete Android phone\noutside the secure space.",
      intelligenceDeck: "Google Gemini cloud AI is accessible through the system assistant path. Availability depends on region, Google Account, software version and applicable service terms. Google and related marks belong to their respective owners; this page does not imply endorsement, commercial partnership or joint development.",
      aiAction: "See how on-device AI works on MAG1",
      footerLine: "An intelligent terminal, not only a smartphone.",
    },
    specs: {
      title: "MAG1 Complete Technical Specifications | MAGNE.AI",
      description: "Complete MAG1 specifications covering display, compute, camera, battery, connectivity, security and WW / EEA mobile network builds.",
      dossier: "PRODUCT DOSSIER · 01-B",
      eyebrow: "MAG1 · COMPLETE TECH SPECS",
      h1: "MAG1,\ncomplete technical specifications.",
      deck: "Start with the model, hardware and mobile network, then follow the evidence chain through engineering material, compliance files and real-device verification.",
      cta: "View specifications",
      passport: "Open device passport →",
      sections: { overview: "Overview", display: "Display and performance", camera: "Camera", power: "Power and connectivity", regional: "Regional builds", security: "Security and compliance" },
      overviewTitle: "The numbers that shape the experience.",
      displayTitle: "Clear to see. Built to run. Ready to compute.",
      groups: { display: "Display", compute: "Processing and storage", body: "Body", rear: "Rear camera", front: "Front camera", video: "Video and stabilization", battery: "Battery and charging", wireless: "Wireless and positioning", ports: "Ports and sensors", hardwareSecurity: "Hardware security", identity: "Device identity and compliance" },
      labels: {
        panel: "Size and panel", resolution: "Resolution", refresh: "Device refresh rate", brightness: "Panel brightness", contrast: "Panel contrast", gamut: "Color gamut", touch: "Touch sampling", vendor: "Panel vendor", part: "Panel part number", enhancement: "Image enhancement", soc: "SoC", config: "Configuration", storage: "Storage", product: "Product name", model: "Model", brand: "Brand / trademark", color: "Colors", weight: "Weight", ingress: "Protection", cover: "Display cover", back: "Back glass",
        main: "Main", aperture: "Aperture and focus", sensor: "Sensor", macro: "Macro", depth: "Depth", selfie: "Selfie camera", movie: "Video", rearVideo: "Rear video", hdrVideo: "HDR video", eis: "Electronic stabilization", ois: "Optical stabilization", slow: "Slow motion",
        battery: "Battery", wired: "Wired charging", wireless: "Wireless charging", reverse: "Reverse power", wifiRadio: "Wi-Fi radio", location: "Positioning", headphone: "Headphone", sim: "SIM", motion: "Motion sensing", otherSensors: "Other sensors",
        productCode: "Product code", gms: "GMS approved baseline", engineering: "Engineering verification build", ceSoftware: "CE assessment software", os: "Operating system", services: "Service framework",
        tee: "Trusted execution environment", se: "Secure element", androidIntegration: "Android integration", keys: "Key services", provisioning: "Attestation and provisioning", ce: "CE certificate",
      },
      cameraTitle: "Make every moment\nclear and vivid.",
      cameraDeck: "A 50MP Samsung ISOCELL JN1 captures high-resolution data. The UNISOC T9100 ISP and on-device compute path handle HDR, low light, color and electronic stabilization.",
      cameraBoundary: "Camera HAL capability values do not automatically equal final camera UI features. Only modes verified in the real interface and captured output are published here.",
      powerTitle: "Power, connectivity and sensing.",
      regionalTitle: "WW and EEA are\nnot the same firmware label.",
      regionalDeck: "The product name is shared, but Google approval baselines, intended markets and compliance test builds have different roles. OTA builds may also vary by region, batch and carrier.",
      mimoTitle: "Up to 4 × 4\ndownlink MIMO",
      mimoDeck: "This is multi-antenna cellular downlink reception, not a Wi-Fi specification.",
      mimoStatement: "Cellular supports up to 4 × 4 downlink MIMO on LTE B2 / B25 / B38 / B41 / B42 / B66 and 5G NR n38 / n41 / n66 / n77 / n78 / n79. Availability depends on region, carrier network configuration and software version.",
      evidence: "Confirmed by FIH engineering specifications. FCC / CE files provide compliance evidence for the relevant bands; they do not certify 4 × 4 MIMO itself.",
      northAmerica: "North American publicly assessed bands",
      europe: "European type-examination bands",
      networkNote: "Band, 5G mode, roaming and service availability depend on region, carrier, SIM, software and local regulation. MAG1 does not support mmWave.",
      securityTitle: "The final line of the specification\nis verifiability.",
      evidenceLinks: ["Security architecture", "Three trust boundaries →", "Device passport", "Certificates and reports →", "Engineering view", "Interactive teardown →", "EVT mainboard", "Component and shield sides →"],
      sourceNote: "Compiled from product engineering files, Google GMS material, public FCC test reports, CE type-examination documents and real-device verification. Specifications may vary by region, batch and shipping software.",
      footerLine: "Complete specifications should be cross-verifiable.",
    },
  },
  ja: {
    lang: "ja", locale: "ja_JP", label: "日本語", homeLabel: "MAGNE.AI 日本語ホーム", navLabel: "メインナビゲーション", menuLabel: "ナビゲーションを開く", preorder: "MAG1を予約 ↗",
    nav: { phone: "PHONE", ai: "AI", network: "NETWORK", security: "SECURITY", compliance: "COMPLIANCE", progress: "PROGRESS", partners: "PARTNERS", media: "MEDIA KIT", contact: "CONTACT" },
    footer: { product: "製品", verify: "検証", connect: "リンク", resources: "資料", follow: "公式アカウント", preorder: "予約", contact: "お問い合わせ", privacy: "プライバシーポリシー", w3: "W3 Web3 ポータル ↗", whitepaper: "ホワイトペーパー ↗" },
    phone: {
      title: "MAG1 インテリジェント端末｜MAGNE.AI", description: "MAG1の端末内AI、独立セキュアハードウェア、NFC復元、Android 15、AgentPayと検証可能な設計を紹介します。", dossier: "製品資料 · 01", eyebrow: "MAG1 · 3D インテリジェント端末", h1a: "もう一台のスマートフォンではない。", h1b: "AIエージェントのための取引端末。", deck: "アイデンティティ、決済、AIエージェントを手のひらに。MAG1は端末内AI、AgentPay、ハードウェア署名、オフライン復元を一つの制御可能なデバイス層に統合します。", bodyColors: "ホワイト / ブラック", trust: "ハードウェア信頼層", stageLabel: "BUILD 51 / WHITE + BLACK", modelAria: "回転操作できるMAGNE.AI MAG1 3Dモデル", loading: "セキュア端末モデルを読み込み中", hint: "ドラッグで回転 · ピンチで拡大", autorotate: "自動回転", effects: "画面エフェクト", color: "本体カラー", white: "ホワイト", black: "ブラック", boundaryA: "境界を決めるのはハードウェア。", boundaryB: "ソフトウェアの約束は、その内側にある。", architectureEyebrow: "構造解析 · ENGINEERING VIEW", architectureTitle: "外装から、\n信頼の起点まで。", architectureDeck: "MAG1を層ごとに開き、カメラ、電源、メインボード、セキュアハードウェア、オフライン復元を確認できます。すべての主張を具体的な部品へ結び付けます。", architectureAction: "完全なエンジニアリングビューへ", architectureAlt: "MAG1の分解エンジニアリングビュー", stackTitle: "五つの孤立した仕様ではない。\n一つの協調するシステム。", stackDeck: "Gemini、端末内AI、Androidサービスから、異種演算、N60セキュアエレメント、実ハードウェアまで接続します。各層には固有の責任と証拠境界があります。", layers: [["ユーザー体験", "Google Gemini · 翻訳 · 画像 · ウォレット"],["アプリとサービス", "Android 15 + GMS · FIH AI Services · OMAPI"],["コアプラットフォーム", "UNISOC T9100 · IMG AX3596 · UniAI / NN HAL"],["信頼と接続", "HyperSeed N60 · 5G · Wi-Fi · Bluetooth · NFC"],["ハードウェア", "6.78インチ · 120Hz · 50MP · 5000mAh · 最大12GB + 512GB"]], fullArchitecture: "完全なシステム構成と3Dモデルを見る", anatomyEyebrow: "構造 · ANATOMY", anatomyTitle: "三つの中核。\nそれぞれに一つの役割。", anatomy: [["COMPUTE", "UNISOC T9100 + IMG AX3596", "5Gアプリ演算と10 TOPS INT8の端末内AIが、それぞれの役割を担います。まず端末で処理し、必要な場合だけクラウドへ。", "10 TOPS"],["TRUST", "TEE + HyperSeed N60", "信頼実行環境が機密処理を隔離し、独立セキュアエレメントが鍵を保管して署名を実行します。", "EAL6+"],["RECOVERY", "HyperSeed 72B NFC", "復元情報はオフライン保存できる物理カードに保持。端末を交換しても、所有権まで失う必要はありません。", "OFFLINE"]], specsEyebrow: "仕様 · SPECIFICATION", specsTitle: "仕様競争ではない。\nすべての部品に仕事がある。", specsIntro: "端末の仕様表は数字だけではありません。プロセッサは日常処理、NPUはローカルモデル、メモリは継続推論、セキュアハードウェアは外部委託できない処理を担います。", specsQuote: "スマートフォンの予算ではない。\n端末のための予算。", specsAction: "全仕様、WW / EEAファームウェア、対応バンドを見る", evtEyebrow: "設計証拠 · EVT HARDWARE", evtTitle: "イメージではない。\n実在するEVT試作基板。", evtDeck: "分解したPCBAの部品面とシールド面には、実際の基板形状、コネクタ、シールド、はんだ付けが残っています。これはPVTではなくEVT段階の証拠です。", componentSide: "部品面", shieldSide: "シールド面", evtAction: "実基板の両面を見る", imagingEyebrow: "画像 · AI IMAGING", imagingTitle: "世界を鮮明に捉え、\n端末内演算へ。", imagingLead: "一瞬一瞬を、鮮明に。", imagingDeck: "50MP Samsung ISOCELL JN1が高精細データを取得し、UNISOC T9100のISPと端末内処理が色、HDR、低照度、手ぶれ補正を一つのパイプラインで処理します。", imagingNote: "設計資料または実機試験で確認した機能のみを掲載します。ビジュアル検索、常時環境理解、エージェント視覚は現行提供機能として扱いません。", cameraAction: "カメラと動画仕様を見る", arrivalEyebrow: "到着 · THE ARRIVAL", arrivalTitle: "箱の中は端末だけではない。\nオフラインの復元経路も。", arrivalDeck: "端末、充電器、ガイドで使用を開始。セキュアエレメントとNFC復元カードは、端末のオンライン状態に依存しない所有権の経路を残します。", arrivalQuote: "端末を失っても、\n中の所有権まで失う必要はない。", arrivalNote: "画像は設計段階の包装案です。最終内容、表示、付属品は出荷版と地域により異なります。", spacesEyebrow: "二つの空間 · TWO SPACES", spacesTitle: "日常領域は世界へ開く。\nVaultは静かに閉じる。", everyday: "Android 15 + GMSが通信、画像、アプリ、選択式クラウドAIの日常体験を支えます。", vault: "ウォレット、署名、機密資産フローは別の生体認証とセキュアハードウェアで保護されます。", intelligenceTitle: "セキュア領域の外でも、\n完全なAndroidスマートフォン。", intelligenceDeck: "Google GeminiのクラウドAI体験はシステムアシスタント経路から利用できます。提供状況は地域、Googleアカウント、ソフトウェア、適用規約により異なります。Googleおよび関連標章は各権利者に帰属し、本ページは推薦、商業提携、共同開発を示すものではありません。", aiAction: "MAG1の端末内AIを見る", footerLine: "スマートフォンだけではない、インテリジェント端末。",
    },
    specs: {
      title: "MAG1 完全技術仕様｜MAGNE.AI", description: "ディスプレイ、演算、カメラ、電池、接続、セキュリティ、WW / EEAモバイルネットワークを含むMAG1の完全仕様。", dossier: "製品資料 · 01-B", eyebrow: "MAG1 · COMPLETE TECH SPECS", h1: "MAG1、\n完全技術仕様。", deck: "型番、ハードウェア、モバイルネットワークから確認し、設計資料、適合文書、実機検証まで証拠をたどれます。", cta: "仕様を見る", passport: "デバイスパスポート →", sections: { overview: "概要", display: "表示と性能", camera: "カメラ", power: "電源と接続", regional: "地域別ビルド", security: "セキュリティと適合" }, overviewTitle: "体験を決める主要数値。", displayTitle: "見やすく、長く動き、確実に演算する。", groups: { display: "ディスプレイ", compute: "処理とストレージ", body: "本体", rear: "リアカメラ", front: "フロントカメラ", video: "動画と手ぶれ補正", battery: "バッテリーと充電", wireless: "無線と測位", ports: "ポートとセンサー", hardwareSecurity: "ハードウェアセキュリティ", identity: "デバイスIDと適合" }, labels: { panel: "サイズとパネル", resolution: "解像度", refresh: "本体リフレッシュレート", brightness: "パネル輝度", contrast: "コントラスト", gamut: "色域", touch: "タッチサンプリング", vendor: "パネルメーカー", part: "パネル型番", enhancement: "映像強調", soc: "SoC", config: "構成", storage: "ストレージ", product: "製品名", model: "型番", brand: "ブランド / 商標", color: "カラー", weight: "重量", ingress: "保護等級", cover: "画面カバー", back: "背面ガラス", main: "メイン", aperture: "絞りとフォーカス", sensor: "センサー", macro: "マクロ", depth: "深度", selfie: "セルフィーカメラ", movie: "動画", rearVideo: "リア動画", hdrVideo: "HDR動画", eis: "電子式手ぶれ補正", ois: "光学式手ぶれ補正", slow: "スローモーション", battery: "バッテリー", wired: "有線充電", wireless: "ワイヤレス充電", reverse: "リバース給電", wifiRadio: "Wi-Fi無線", location: "測位", headphone: "ヘッドホン", sim: "SIM", motion: "モーションセンサー", otherSensors: "その他のセンサー", productCode: "製品コード", gms: "GMS承認ベースライン", engineering: "実機設計検証ビルド", ceSoftware: "CE評価ソフトウェア", os: "OS", services: "サービス基盤", tee: "信頼実行環境", se: "セキュアエレメント", androidIntegration: "Android統合", keys: "鍵サービス", provisioning: "証明とプロビジョニング", ce: "CE証明書" }, cameraTitle: "一瞬一瞬を、\n鮮明に。", cameraDeck: "50MP Samsung ISOCELL JN1が高解像度データを取得し、UNISOC T9100のISPと端末内演算がHDR、低照度、色、電子式手ぶれ補正を処理します。", cameraBoundary: "Camera HALの能力値は最終カメラUIの機能と同義ではありません。実機UIと撮影結果で確認したモードのみ公開します。", powerTitle: "電源、接続、センシング。", regionalTitle: "WWとEEAは、\n同じファームウェアラベルではない。", regionalDeck: "製品名は共通でも、Google承認ベースライン、対象市場、適合試験ビルドには別の役割があります。OTAも地域、ロット、通信事業者で異なる場合があります。", mimoTitle: "最大4 × 4\nダウンリンクMIMO", mimoDeck: "セルラー通信のマルチアンテナ下り受信であり、Wi-Fi仕様ではありません。", mimoStatement: "セルラー通信はLTE B2 / B25 / B38 / B41 / B42 / B66、および5G NR n38 / n41 / n66 / n77 / n78 / n79で最大4 × 4ダウンリンクMIMOをサポートします。利用可否は地域、通信事業者、ソフトウェアに依存します。", evidence: "FIH設計仕様で確認。FCC / CE文書は対象バンドの適合性を補足しますが、4 × 4 MIMOそのものを認証するものではありません。", northAmerica: "北米で公開評価されたバンド", europe: "欧州型式試験バンド", networkNote: "バンド、5Gモード、ローミング、サービスの提供状況は地域、通信事業者、SIM、ソフトウェア、法規に依存します。mmWaveには対応しません。", securityTitle: "仕様表の最後の項目は、\n検証可能性。", evidenceLinks: ["セキュリティ構成", "三層の信頼境界 →", "デバイスパスポート", "証明書と報告書 →", "エンジニアリングビュー", "インタラクティブ分解 →", "EVTメインボード", "部品面とシールド面 →"], sourceNote: "製品設計資料、Google GMS資料、FCC公開試験報告、CE型式試験文書、実機検証から整理。仕様は地域、ロット、出荷ソフトウェアにより変わる場合があります。", footerLine: "完全仕様は相互検証できなければならない。",
    },
  },
  ko: {
    lang: "ko", locale: "ko_KR", label: "한국어", homeLabel: "MAGNE.AI 한국어 홈", navLabel: "주요 탐색", menuLabel: "탐색 열기", preorder: "MAG1 사전 주문 ↗",
    nav: { phone: "PHONE", ai: "AI", network: "NETWORK", security: "SECURITY", compliance: "COMPLIANCE", progress: "PROGRESS", partners: "PARTNERS", media: "MEDIA KIT", contact: "CONTACT" },
    footer: { product: "제품", verify: "검증", connect: "연결", resources: "자료", follow: "공식 채널", preorder: "사전 주문", contact: "문의", privacy: "개인정보 처리방침", w3: "W3 Web3 포털 ↗", whitepaper: "백서 ↗" },
    phone: {
      title: "MAG1 지능형 단말｜MAGNE.AI", description: "MAG1의 온디바이스 AI, 독립 보안 하드웨어, NFC 복구, Android 15, AgentPay와 검증 가능한 엔지니어링을 확인하세요.", dossier: "제품 자료 · 01", eyebrow: "MAG1 · 3D 지능형 단말", h1a: "또 하나의 스마트폰이 아닙니다.", h1b: "AI 에이전트를 위한 거래 단말입니다.", deck: "신원, 결제, AI 에이전트가 손안에서 만납니다. MAG1은 온디바이스 AI, AgentPay, 하드웨어 서명, 오프라인 복구를 하나의 통제 가능한 장치 계층에 담았습니다.", bodyColors: "화이트 / 블랙", trust: "하드웨어 신뢰 계층", stageLabel: "BUILD 51 / WHITE + BLACK", modelAria: "회전 가능한 MAGNE.AI MAG1 3D 모델", loading: "보안 단말 모델 로딩 중", hint: "드래그 회전 · 핀치 확대", autorotate: "자동 회전", effects: "화면 효과", color: "본체 색상", white: "화이트", black: "블랙", boundaryA: "경계는 하드웨어가 정합니다.", boundaryB: "소프트웨어의 약속은 그 안에서만 유효합니다.", architectureEyebrow: "구조 해부 · ENGINEERING VIEW", architectureTitle: "외장부터,\n신뢰의 뿌리까지.", architectureDeck: "MAG1을 층별로 열어 카메라, 전원, 메인보드, 보안 하드웨어, 오프라인 복구를 확인합니다. 모든 주장을 구체적인 하드웨어에 연결합니다.", architectureAction: "전체 엔지니어링 뷰 열기", architectureAlt: "MAG1 완전 분해 엔지니어링 뷰", stackTitle: "다섯 개의 고립된 사양이 아닙니다.\n함께 작동하는 하나의 시스템입니다.", stackDeck: "Gemini, 로컬 AI, Android 서비스부터 이기종 연산, N60 보안 요소, 실제 하드웨어까지 연결합니다. 각 계층에는 고유한 책임과 증거 경계가 있습니다.", layers: [["사용자 경험", "Google Gemini · 번역 · 이미지 · 지갑"],["애플리케이션과 서비스", "Android 15 + GMS · FIH AI Services · OMAPI"],["핵심 플랫폼", "UNISOC T9100 · IMG AX3596 · UniAI / NN HAL"],["신뢰와 연결", "HyperSeed N60 · 5G · Wi-Fi · Bluetooth · NFC"],["하드웨어 하위 시스템", "6.78인치 · 120Hz · 50MP · 5000mAh · 최대 12GB + 512GB"]], fullArchitecture: "전체 시스템 구조와 3D 엔지니어링 모델 보기", anatomyEyebrow: "해부 · ANATOMY", anatomyTitle: "세 개의 핵심.\n각자 하나의 역할.", anatomy: [["COMPUTE", "UNISOC T9100 + IMG AX3596", "5G 애플리케이션 연산과 10 TOPS INT8 온디바이스 AI가 각자의 역할을 수행합니다. 우선 장치에서 처리하고 필요할 때 클라우드를 선택합니다.", "10 TOPS"],["TRUST", "TEE + HyperSeed N60", "신뢰 실행 환경이 민감한 연산을 격리하고, 독립 보안 요소가 키를 보관하며 서명을 수행합니다.", "EAL6+"],["RECOVERY", "HyperSeed 72B NFC", "복구 정보는 오프라인 물리 카드에 보관됩니다. 장치를 교체해도 소유권까지 잃을 필요는 없습니다.", "OFFLINE"]], specsEyebrow: "사양 · SPECIFICATION", specsTitle: "사양 경쟁이 아닙니다.\n모든 부품에는 일이 있습니다.", specsIntro: "단말 사양표는 숫자만의 목록이 아닙니다. 프로세서는 일상 작업, NPU는 로컬 모델, 메모리는 지속 추론, 보안 하드웨어는 외부에 맡길 수 없는 작업을 담당합니다.", specsQuote: "스마트폰 예산이 아닙니다.\n단말을 위한 예산입니다.", specsAction: "전체 사양, WW / EEA 펌웨어와 주파수 대역 보기", evtEyebrow: "엔지니어링 증거 · EVT HARDWARE", evtTitle: "개념 이미지가 아닙니다.\n실제 EVT 샘플 메인보드입니다.", evtDeck: "분해한 PCBA의 부품면과 실드면은 실제 기판 형상, 커넥터, 실드, 납땜 세부를 그대로 보여 줍니다. PVT가 아닌 EVT 단계의 증거입니다.", componentSide: "부품면", shieldSide: "실드면", evtAction: "실제 양면 전환 보기", imagingEyebrow: "이미징 · AI IMAGING", imagingTitle: "세상을 선명하게 포착한 뒤,\n온디바이스 연산으로.", imagingLead: "모든 순간을 선명하게.", imagingDeck: "50MP Samsung ISOCELL JN1이 고해상도 데이터를 포착하고, UNISOC T9100 ISP와 온디바이스 처리 경로가 색상, HDR, 저조도, 안정화를 하나의 파이프라인에서 처리합니다.", imagingNote: "엔지니어링 자료 또는 실제 기기 시험으로 확인된 기능만 표기합니다. 비주얼 검색, 지속적 환경 이해, 에이전트 비전은 현재 제공 기능으로 제시하지 않습니다.", cameraAction: "카메라와 영상 사양 보기", arrivalEyebrow: "도착 · THE ARRIVAL", arrivalTitle: "상자 안에는 휴대폰만 있지 않습니다.\n오프라인 복구 경로도 있습니다.", arrivalDeck: "장치, 충전기, 안내서가 제품을 시작하게 합니다. 보안 요소와 NFC 복구 카드는 휴대폰의 온라인 상태에 의존하지 않는 소유권 경로를 남깁니다.", arrivalQuote: "장치는 잃을 수 있어도,\n그 안의 소유권까지 잃을 필요는 없습니다.", arrivalNote: "엔지니어링 패키지 예시입니다. 최종 구성, 표기, 액세서리는 출하 버전과 지역에 따라 다릅니다.", spacesEyebrow: "두 공간 · TWO SPACES", spacesTitle: "일상 공간은 세상에 열리고,\nVault는 조용히 닫힙니다.", everyday: "Android 15 + GMS가 통신, 이미징, 앱, 선택형 클라우드 AI의 일상 경험을 제공합니다.", vault: "지갑, 서명, 민감한 자산 흐름은 별도의 생체 인증과 보안 하드웨어로 보호됩니다.", intelligenceTitle: "보안 공간 밖에서도,\n완전한 Android 스마트폰.", intelligenceDeck: "Google Gemini 클라우드 AI 경험은 시스템 어시스턴트 경로를 통해 접근할 수 있습니다. 기능 제공 여부는 지역, Google 계정, 소프트웨어 버전 및 적용 약관에 따라 달라집니다. Google 및 관련 표시는 각 권리자의 상표이며, 이 페이지는 보증, 상업적 제휴 또는 공동 개발을 의미하지 않습니다.", aiAction: "MAG1의 온디바이스 AI 작동 방식 보기", footerLine: "스마트폰을 넘어선 지능형 단말.",
    },
    specs: {
      title: "MAG1 전체 기술 사양｜MAGNE.AI", description: "디스플레이, 연산, 카메라, 배터리, 연결, 보안, WW / EEA 이동통신 빌드를 포함한 MAG1 전체 사양입니다.", dossier: "제품 자료 · 01-B", eyebrow: "MAG1 · COMPLETE TECH SPECS", h1: "MAG1,\n전체 기술 사양.", deck: "모델, 하드웨어, 이동통신부터 확인하고 엔지니어링 자료, 규정 문서, 실제 기기 검증까지 증거를 따라갈 수 있습니다.", cta: "사양 바로 보기", passport: "장치 패스포트 →", sections: { overview: "개요", display: "디스플레이와 성능", camera: "카메라", power: "전원과 연결", regional: "지역별 빌드", security: "보안과 규정" }, overviewTitle: "경험을 결정하는 핵심 수치.", displayTitle: "선명하게 보고, 오래 작동하고, 확실하게 연산합니다.", groups: { display: "디스플레이", compute: "처리와 저장공간", body: "본체", rear: "후면 카메라", front: "전면 카메라", video: "영상과 안정화", battery: "배터리와 충전", wireless: "무선과 위치", ports: "포트와 센서", hardwareSecurity: "하드웨어 보안", identity: "장치 신원과 규정" }, labels: { panel: "크기와 패널", resolution: "해상도", refresh: "기기 주사율", brightness: "패널 밝기", contrast: "패널 명암비", gamut: "색 영역", touch: "터치 샘플링", vendor: "패널 제조사", part: "패널 부품 번호", enhancement: "이미지 향상", soc: "SoC", config: "구성", storage: "저장공간", product: "제품명", model: "모델", brand: "브랜드 / 상표", color: "색상", weight: "무게", ingress: "보호 등급", cover: "화면 커버", back: "후면 유리", main: "메인", aperture: "조리개와 초점", sensor: "센서", macro: "매크로", depth: "심도", selfie: "셀피 카메라", movie: "영상", rearVideo: "후면 영상", hdrVideo: "HDR 영상", eis: "전자식 손떨림 보정", ois: "광학식 손떨림 보정", slow: "슬로 모션", battery: "배터리", wired: "유선 충전", wireless: "무선 충전", reverse: "역방향 전원", wifiRadio: "Wi-Fi 무선", location: "위치", headphone: "헤드폰", sim: "SIM", motion: "동작 센서", otherSensors: "기타 센서", productCode: "제품 코드", gms: "GMS 승인 기준", engineering: "실기 엔지니어링 검증 빌드", ceSoftware: "CE 평가 소프트웨어", os: "운영체제", services: "서비스 프레임워크", tee: "신뢰 실행 환경", se: "보안 요소", androidIntegration: "Android 통합", keys: "키 서비스", provisioning: "증명과 프로비저닝", ce: "CE 인증서" }, cameraTitle: "모든 순간을,\n선명하게.", cameraDeck: "50MP Samsung ISOCELL JN1이 고해상도 데이터를 포착하고, UNISOC T9100 ISP와 온디바이스 연산 경로가 HDR, 저조도, 색상, 전자식 안정화를 처리합니다.", cameraBoundary: "Camera HAL 기능 값이 최종 카메라 UI 기능과 동일한 것은 아닙니다. 실제 UI와 촬영 결과로 확인된 모드만 공개합니다.", powerTitle: "전원, 연결, 센싱.", regionalTitle: "WW와 EEA는\n같은 펌웨어 라벨이 아닙니다.", regionalDeck: "제품명은 같지만 Google 승인 기준, 대상 시장, 규정 시험 빌드는 서로 다른 역할을 가집니다. OTA 빌드도 지역, 배치, 통신사에 따라 달라질 수 있습니다.", mimoTitle: "최대 4 × 4\n다운링크 MIMO", mimoDeck: "셀룰러 다중 안테나 하향 수신 능력이며 Wi-Fi 사양이 아닙니다.", mimoStatement: "셀룰러는 LTE B2 / B25 / B38 / B41 / B42 / B66 및 5G NR n38 / n41 / n66 / n77 / n78 / n79에서 최대 4 × 4 다운링크 MIMO를 지원합니다. 실제 사용 가능 여부는 지역, 통신사 네트워크 구성, 소프트웨어 버전에 따라 달라집니다.", evidence: "FIH 엔지니어링 사양으로 확인했습니다. FCC / CE 문서는 관련 대역의 규정 준수 근거이며 4 × 4 MIMO 자체를 인증하는 것은 아닙니다.", northAmerica: "북미 공개 평가 주파수 대역", europe: "유럽 형식 시험 주파수 대역", networkNote: "대역, 5G 모드, 로밍, 서비스 제공 여부는 지역, 통신사, SIM, 소프트웨어, 현지 규정에 따라 달라집니다. mmWave는 지원하지 않습니다.", securityTitle: "사양표의 마지막 항목은\n검증 가능성입니다.", evidenceLinks: ["보안 아키텍처", "3계층 신뢰 경계 →", "장치 패스포트", "인증서와 보고서 →", "엔지니어링 뷰", "인터랙티브 분해 →", "EVT 메인보드", "부품면과 실드면 →"], sourceNote: "제품 엔지니어링 파일, Google GMS 자료, 공개 FCC 시험 보고서, CE 형식 시험 문서, 실제 기기 검증을 바탕으로 정리했습니다. 사양은 지역, 배치, 출하 소프트웨어에 따라 달라질 수 있습니다.", footerLine: "전체 사양은 교차 검증할 수 있어야 합니다.",
    },
  },
};

function lines(value) {
  return value.split("\n").join("<br>");
}

function pageHref(c, page) {
  return c.lang === "en" ? page : `../${page}`;
}

function head(c, page, title, description) {
  const canonical = `https://www.magne.ai/${c.lang}/${page}`;
  const tc = `https://www.magne.ai/${page}`;
  return `<!doctype html>
<html lang="${c.lang}" data-asset-base="../">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f2eee4">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="zh-Hant" href="${page === "index.html" ? "https://www.magne.ai/index.html" : tc}">
  <link rel="alternate" hreflang="en" href="https://www.magne.ai/en/${page}">
  <link rel="alternate" hreflang="x-default" href="https://www.magne.ai/en/${page}">
  <meta property="og:locale" content="${c.locale}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MAGNE.AI">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://www.magne.ai/assets/images/cover-hold-the-future.webp">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+JP:wght@400;500;600&family=IBM+Plex+Sans+KR:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+JP:wght@400;500;600;700;900&family=Noto+Serif+KR:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/site.css?v=lang-core-1">
  <script src="../assets/site.js?v=lang-core-1" defer></script>
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../site.webmanifest">
</head>`;
}

function nav(c, current, dossier) {
  const item = (href, label, key) => `<a href="${href}"${current === key ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<a class="skip-link" href="#main">Skip to main content</a>
  <div class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="masthead"><div class="masthead__edition"><span>MAGNE.AI</span><span>${dossier}</span></div><a class="wordmark" href="./" aria-label="${c.homeLabel}"><span class="wordmark__mark" aria-hidden="true">///</span><span class="wordmark__logo"><img src="../assets/images/magne-logo-black-wide.png" width="1181" height="116" alt="MAGNE.AI"></span></a><div class="masthead__meta"><span>MAG1 · GEN 1</span><span>PRODUCT FILE</span></div></header>
  <nav class="site-nav" aria-label="${c.navLabel}"><a class="site-nav__brand" href="./" aria-label="${c.homeLabel}">MAGNE.AI</a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu"><span class="sr-only">${c.menuLabel}</span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="site-nav__menu" id="site-menu"><a href="./">INDEX</a>${item("phone.html", c.nav.phone, "phone")}${item(pageHref(c, "ai.html"), c.nav.ai, "ai")}${item(pageHref(c, "network.html"), c.nav.network, "network")}${item(pageHref(c, "security.html"), c.nav.security, "security")}${item(pageHref(c, "compliance.html"), c.nav.compliance, "compliance")}${item(pageHref(c, "progress.html"), c.nav.progress, "progress")}${item(pageHref(c, "partners.html"), c.nav.partners, "partners")}${item(pageHref(c, "media-kit.html"), c.nav.media, "media")}${item(pageHref(c, "contact.html"), c.nav.contact, "contact")}</div><div class="site-nav__actions"><div class="language-menu"><span>${c.label}</span></div><a class="nav-cta" href="https://payment.magne.ai/buy">${c.preorder}</a></div></nav>`;
}

function footer(c, line, dossier) {
  return `<footer class="footer"><div class="footer__brand"><span class="wordmark__mark" aria-hidden="true">///</span><strong>MAGNE.AI</strong><p>${line}</p></div><div class="footer__column"><strong>${c.footer.product}</strong><a href="phone.html">MAG1</a><a href="phone-specs.html">TECH SPECS</a><a href="${pageHref(c, "ai.html")}">AI</a></div><div class="footer__column"><strong>${c.footer.verify}</strong><a href="${pageHref(c, "compliance.html")}">DEVICE PASSPORT</a><a href="${pageHref(c, "fcc-lookup.html")}">FCC</a><a href="${pageHref(c, "ce-lookup.html")}">CE</a></div><div class="footer__column"><strong>${c.footer.connect}</strong><a href="https://payment.magne.ai/buy">${c.footer.preorder}</a><a href="${pageHref(c, "contact.html")}">${c.footer.contact}</a></div><div class="footer__external"><div class="footer__external-group"><strong>${c.footer.resources}</strong><a href="${pageHref(c, "media-kit.html")}">Media Kit</a><a href="https://w3.magne.ai" target="_blank" rel="noopener">${c.footer.w3}</a><a href="https://web3.magne.ai" target="_blank" rel="noopener">${c.footer.whitepaper}</a></div><div class="footer__external-group"><strong>${c.footer.follow}</strong><a href="https://github.com/magne-ai" target="_blank" rel="noopener">GitHub</a><a href="https://x.com/Magne_Ai" target="_blank" rel="noopener">X</a><a href="https://t.me/MagneAI" target="_blank" rel="noopener">Telegram</a><a href="https://www.youtube.com/@MagneAI" target="_blank" rel="noopener">YouTube</a><a href="https://discord.gg/tX2xRAkd" target="_blank" rel="noopener">Discord</a></div></div><div class="footer__legal"><span>© 2026 MAGNE.AI</span><span>${dossier}</span><a href="${pageHref(c, "privacy-policy.html")}">${c.footer.privacy}</a></div></footer>`;
}

function renderPhone(c) {
  const p = c.phone;
  const layerClasses = ["experience", "services", "compute", "trust", "hardware"];
  const layers = p.layers.map(([title, detail], index) => `<article class="system-stack__layer system-stack__layer--${layerClasses[index]}"><header><span>0${index + 1}</span><div><strong>${title}</strong><small>${["USER EXPERIENCE", "APPLICATION & SERVICES", "HETEROGENEOUS COMPUTE", "TRUST & CONNECTIVITY", "PHYSICAL DEVICE"][index]}</small></div></header><div class="system-stack__items"><span><b>${detail}</b><small>${["PRODUCT EXPERIENCE", "SYSTEM SERVICES", "RUNTIME ROUTING", "DEVICE TRUST", "ENGINEERING SPEC"][index]}</small></span></div></article>`).join("");
  const anatomy = p.anatomy.map(([tag, title, detail, metric], index) => `<article class="anatomy-row reveal"><span class="anatomy-row__number">0${index + 1}</span><div><p class="eyebrow">${tag}</p><h3>${title}</h3></div><p>${detail}</p><strong>${metric}</strong></article>`).join("");
  return `${head(c, "phone.html", p.title, p.description)}
<body class="page-phone">${nav(c, "phone", p.dossier)}
<main id="main">
  <section class="folio-hero folio-hero--phone"><div class="folio-hero__copy"><p class="eyebrow reveal">${p.eyebrow}</p><h1><span class="reveal">${p.h1a}</span><span class="reveal accent-line">${p.h1b}</span></h1><p class="folio-hero__deck reveal">${p.deck}</p><div class="folio-meta reveal"><span>BUILD 51</span><span>${p.bodyColors}</span><span>AGENTPAY</span><span>${p.trust}</span></div></div>
  <figure class="folio-hero__visual phone-stage reveal"><span class="plate-label">${p.stageLabel}</span><div class="phone-stage__shell" aria-label="${p.modelAria}"><canvas id="product-stage" aria-label="${p.modelAria}"></canvas><div class="loading" id="loading" role="status"><span class="loading-label">${p.loading}</span><span class="loading-line"><i id="loading-bar"></i></span><span class="loading-value" id="loading-value">0%</span></div><div class="hint" id="hint"><span></span>${p.hint}</div><button class="rotation-toggle is-active" id="rotation-toggle" type="button" aria-pressed="true"><span></span>${p.autorotate}</button></div><div class="phone-stage__controls"><div class="phone-control-group phone-control-group--screen"><span class="phone-control-label">${p.effects}</span><div class="screen-picker" id="screen-picker"><button class="screen-swatch" type="button" data-screen="gold" aria-label="Gold"></button><button class="screen-swatch" type="button" data-screen="openclaw" aria-label="OPENCLAW"></button><button class="screen-swatch is-active" type="button" data-screen="agentpay" aria-label="AgentPay"></button></div></div><div class="phone-control-group phone-control-group--color"><span class="phone-control-label">${p.color}</span><div class="color-picker" id="color-picker"><button class="color-swatch is-active" type="button" data-color="white" aria-label="${p.white}"><span class="color-dot color-dot-white"></span><span>${p.white}</span></button><button class="color-swatch" type="button" data-color="black" aria-label="${p.black}"><span class="color-dot color-dot-black"></span><span>${p.black}</span></button></div></div></div><figcaption><span>MAG1 · GEN 1</span><span>AI AGENT TERMINAL</span><span>${p.trust}</span></figcaption></figure></section>
  <section class="statement-band"><span class="reveal">${p.boundaryA}</span><strong class="reveal">${p.boundaryB}</strong></section>
  <section class="architecture-teaser"><div class="architecture-teaser__copy"><div class="architecture-teaser__meta"><span>FILE 01-A</span><span>52 COMPONENTS</span><span>V51 HYBRID</span></div><p class="eyebrow reveal">${p.architectureEyebrow}</p><h2 class="reveal">${lines(p.architectureTitle)}</h2><p class="architecture-teaser__deck reveal">${p.architectureDeck}</p><a class="architecture-teaser__action reveal" href="${pageHref(c, "phone-architecture.html")}"><span>${p.architectureAction}</span><strong>↗</strong></a></div><a class="architecture-teaser__visual reveal" href="${pageHref(c, "phone-architecture.html")}"><img src="../assets/images/phone-architecture-preview.png?v=2" width="1448" height="1086" alt="${p.architectureAlt}" loading="lazy"><span class="architecture-teaser__label">LIVE STRUCTURE / INTERACTIVE</span><span class="architecture-teaser__enter">OPEN VIEWER ↗</span></a></section>
  <section class="section section--dark phone-system-map"><header class="phone-system-map__header"><div><p class="eyebrow">MAG1 SYSTEM STACK</p><h2>${lines(p.stackTitle)}</h2></div><div><p>${p.stackDeck}</p><div class="system-stack__legend"><span>PRODUCT CONFIRMED</span><span>ADB VERIFIED</span><span>IN DEVELOPMENT</span></div></div></header><div class="system-stack system-stack--summary reveal">${layers}</div><a class="phone-system-map__cta reveal" href="${pageHref(c, "phone-architecture.html")}#system-stack"><span>${p.fullArchitecture}</span><strong>FULL ARCHITECTURE →</strong></a></section>
  <section class="section product-anatomy"><header class="section-heading"><span class="chapter-index">I</span><div><p class="eyebrow">${p.anatomyEyebrow}</p><h2>${lines(p.anatomyTitle)}</h2></div></header><div class="anatomy-rows">${anatomy}</div></section>
  <section class="section section--dark product-specs"><header class="section-heading"><span class="chapter-index">II</span><div><p class="eyebrow">${p.specsEyebrow}</p><h2>${lines(p.specsTitle)}</h2></div></header><div class="spec-ledger"><div class="spec-ledger__intro reveal"><p>${p.specsIntro}</p><blockquote>${lines(p.specsQuote)}</blockquote></div><dl class="spec-ledger__list reveal"><div><dt>SoC</dt><dd>UNISOC T9100 5G</dd></div><div><dt>NPU</dt><dd>IMG AX3596 · 1.2GHz · 10 TOPS INT8</dd></div><div><dt>Memory</dt><dd>8GB / 12GB + 12GB Virtual</dd></div><div><dt>Storage</dt><dd>up to 512GB · UFS 3.1</dd></div><div><dt>Display</dt><dd>6.78 in · 1080 × 2388 · up to 120Hz</dd></div><div><dt>Camera</dt><dd>50MP ISOCELL JN1 · 4K30 HDR + EIS</dd></div><div><dt>Battery</dt><dd>5000mAh · 33W PD · 15W Wireless</dd></div><div><dt>System</dt><dd>Android 15 + GMS</dd></div><div><dt>Security</dt><dd>TEE EAL2+ · SE / NFC EAL6+</dd></div></dl></div><a class="spec-ledger__cta reveal" href="phone-specs.html"><span>${p.specsAction}</span><strong>TECH SPECS →</strong></a></section>
  <section class="section evt-evidence"><header class="evt-evidence__header"><div><p class="eyebrow">${p.evtEyebrow}</p><h2>${lines(p.evtTitle)}</h2></div><div><span>EVT SAMPLE</span><p>${p.evtDeck}</p></div></header><div class="evt-evidence__plates reveal"><figure><img src="../assets/mainboard-3d/images/mainboard-component-side.webp?v=3" width="1254" height="1254" alt="MAG1 EVT PCBA component side" loading="lazy"><figcaption><span>PCBA / COMPONENT SIDE</span><strong>${p.componentSide}</strong></figcaption></figure><figure><img src="../assets/mainboard-3d/images/mainboard-shield-side.webp?v=3" width="1254" height="1254" alt="MAG1 EVT PCBA shield side" loading="lazy"><figcaption><span>PCBA / SHIELD SIDE</span><strong>${p.shieldSide}</strong></figcaption></figure></div><a class="evt-evidence__action reveal" href="${pageHref(c, "mainboard-3d.html")}"><span>${p.evtAction}</span><strong>OPEN EVT BOARD VIEW →</strong></a></section>
  <section class="section vision-story"><header class="section-heading"><span class="chapter-index">III</span><div><p class="eyebrow">${p.imagingEyebrow}</p><h2>${lines(p.imagingTitle)}</h2></div></header><div class="vision-story__layout"><figure class="vision-story__plate reveal"><img src="../assets/media-kit/phone-white.png" width="2000" height="2000" alt="MAG1 white model front rear and side views" loading="lazy"><figcaption><span>PLATE 04</span><span>50MP ISOCELL JN1</span><span>MAG1 / MA1</span></figcaption></figure><div class="vision-story__copy reveal"><p class="vision-story__lead">${p.imagingLead}</p><p>${p.imagingDeck}</p><div class="vision-story__metrics"><div><strong>50MP</strong><span>JN1 · ƒ/1.8 · AF</span></div><div><strong>4K30</strong><span>HDR + EIS</span></div><div><strong>16MP</strong><span>FRONT CAMERA</span></div><div><strong>2 + 2MP</strong><span>MACRO + DEPTH</span></div></div><ol class="vision-story__pipeline" aria-label="Imaging pipeline"><li><span>01</span><strong>Capture</strong><small>Sensor input</small></li><li><span>02</span><strong>Process</strong><small>Real-time ISP</small></li><li><span>03</span><strong>Compute</strong><small>On-device NPU</small></li><li><span>04</span><strong>Render</strong><small>Photo and video output</small></li></ol><p class="vision-story__note">${p.imagingNote}</p><a class="vision-story__action" href="phone-specs.html#camera"><span>${p.cameraAction}</span><strong>CAMERA SPECS →</strong></a></div></div></section>
  <section class="section package-story"><header class="section-heading"><span class="chapter-index">IV</span><div><p class="eyebrow">${p.arrivalEyebrow}</p><h2>${lines(p.arrivalTitle)}</h2></div></header><div class="package-spread"><div class="package-spread__detail"><div class="package-copy reveal"><span>OFFLINE RECOVERY / 01</span><p>${p.arrivalDeck}</p><strong>${lines(p.arrivalQuote)}</strong><small>${p.arrivalNote}</small></div><figure class="package-spread__exploded reveal"><img src="../assets/media-kit/package-exploded.png" width="2022" height="3240" alt="MAG1 engineering package exploded view" loading="lazy"><figcaption><span>PLATE 02</span><span>EXPLODED VIEW</span><span>PACKAGE SYSTEM</span></figcaption></figure></div></div></section>
  <section class="section product-spaces section--dark"><header class="section-heading"><span class="chapter-index">V</span><div><p class="eyebrow">${p.spacesEyebrow}</p><h2>${lines(p.spacesTitle)}</h2></div></header><div class="space-pair"><article class="reveal"><span>01 / EVERYDAY</span><h3>Android 15 + GMS</h3><p>${p.everyday}</p><ul><li>Google Mobile Services</li><li>Optional Gemini experiences</li><li>Apps + personal data</li></ul></article><article class="reveal"><span>02 / VAULT</span><h3>Web3 Secure Space</h3><p>${p.vault}</p><ul><li>Hardware-backed signing</li><li>Non-exportable private keys</li><li>NFC offline recovery</li></ul></article></div></section>
  <section class="section section--dark everyday-intelligence"><header class="section-heading"><span class="chapter-index">VI</span><div><p class="eyebrow">EVERYDAY INTELLIGENCE</p><h2>${lines(p.intelligenceTitle)}</h2></div></header><p class="everyday-intelligence__lead reveal">${p.intelligenceDeck}</p><div class="service-ledger"><section class="service-group reveal"><header><span>01 / SYSTEM</span><h3>System foundation</h3><p>A complete Android application environment with official app access.</p></header><div class="service-grid"><article><span class="service-icon"><img src="../assets/google-services/android-icon.png" alt="" loading="lazy"></span><strong>Android 15</strong><small>Mobile operating system</small></article><article><span class="service-icon"><img src="../assets/google-services/play-icon.png" alt="" loading="lazy"></span><strong>Google Play</strong><small>Apps and content</small></article></div></section><section class="service-group reveal"><header><span>02 / AI + PRODUCTIVITY</span><h3>AI and productivity</h3><p>Search, mail, cloud files and video collaboration.</p></header><div class="service-grid"><article><span class="service-icon"><img src="../assets/google-services/gemini-icon.png" alt="" loading="lazy"></span><strong>Gemini</strong><small>Optional AI experience</small></article><article><span class="service-icon"><img src="../assets/google-services/gmail-icon.png" alt="" loading="lazy"></span><strong>Gmail</strong><small>Email</small></article><article><span class="service-icon"><img src="../assets/google-services/drive-icon.png" alt="" loading="lazy"></span><strong>Google Drive</strong><small>Cloud storage</small></article><article><span class="service-icon"><img src="../assets/google-services/meet-icon.png" alt="" loading="lazy"></span><strong>Google Meet</strong><small>Video meetings</small></article></div></section><section class="service-group reveal"><header><span>03 / DAILY EXPERIENCE</span><h3>Daily experience</h3><p>Navigation, browsing, video and entertainment services.</p></header><div class="service-grid"><article><span class="service-icon"><img src="../assets/google-services/maps-icon.png" alt="" loading="lazy"></span><strong>Google Maps</strong><small>Navigation and location</small></article><article><span class="service-icon"><img src="../assets/google-services/chrome-icon.png" alt="" loading="lazy"></span><strong>Chrome</strong><small>Web browsing</small></article><article><span class="service-icon"><img src="../assets/google-services/youtube-icon.jpg" alt="" loading="lazy"></span><strong>YouTube</strong><small>Video streaming</small></article><article><span class="service-icon"><img src="../assets/google-services/youtube-music-icon.png" alt="" loading="lazy"></span><strong>YouTube Music</strong><small>Music streaming</small></article><article><span class="service-icon"><img src="../assets/google-services/tv-icon.png" alt="" loading="lazy"></span><strong>Google TV</strong><small>Entertainment</small></article></div></section></div><p class="service-disclaimer reveal">Google Gemini cloud AI is accessible through the system assistant path. Availability depends on region, Google Account, software version and applicable service terms. Google, Android, Google Play, Gemini and related marks belong to their respective owners; this page does not imply endorsement, commercial partnership or joint development.</p><div class="page-next reveal"><span>NEXT FILE</span><a href="${pageHref(c, "ai.html")}">${p.aiAction} <strong>AI →</strong></a></div></section>
</main>
${footer(c, p.footerLine, p.dossier)}
<script type="module" src="../assets/phone-3d/phone-3d.js?v=57"></script>
</body></html>`;
}

const specRows = (c) => {
  const l = c.specs.labels;
  return {
    display: [[l.panel, "6.78 in IPS TFT LCD"],[l.resolution, "1080 × 2388 · ~387 PPI"],[l.refresh, "60 / 90 / 120Hz"],[l.brightness, "800 nits typ · 670 nits min"],[l.contrast, "1500:1 typ · 1000:1 min"],[l.gamut, "NTSC 83% typ · 78% min"],[l.touch, "180Hz"],[l.vendor, "BOE"],[l.part, "BS068MYQ-L10-DQ00/01/02/03/6Q00/01/02/03"],[l.enhancement, "SDR to HDR enhancement · Low / Medium / High"]],
    compute: [[l.soc, "UNISOC T9100 5G · Octa-core · up to 2.704GHz"],[l.config, "8GB / 12GB RAM + 12GB Virtual"],[l.storage, "256GB / 512GB · UFS 3.1"]],
    body: [[l.product, "MAGNE.AI Phone Gen1"],[l.model, "MAG1 / MA1"],[l.brand, "MaQ / MAGNE.AI"],[l.color, "White / Black"],[l.weight, "Approx. 200g"],[l.ingress, "IP52"],[l.cover, "Corning Gorilla Glass 5 · 0.7mm"],[l.back, "Corning Gorilla Glass 3"]],
    rear: [[l.main, "50MP Samsung ISOCELL JN1 / S5KJN1SQ03"],[l.aperture, "ƒ/1.8 · Autofocus"],[l.sensor, "1/2.76 in · 0.64µm · Tetra-cell"],[l.macro, "2MP GalaxyCore GC02M1-C24YC"],[l.depth, "2MP GalaxyCore GC02M1-C24YC"]],
    front: [[l.selfie, "16MP GalaxyCore GC16B3C"],[l.aperture, "ƒ/1.8 · Fixed focus"],[l.sensor, "1/3.1 in · 1.0µm · BSI"],[l.movie, "Up to FHD 1080p · 30fps"]],
    video: [[l.rearVideo, "Up to UHD 4K · 30fps"],[l.hdrVideo, "Supported · Verified on device"],[l.eis, "EIS · Available with 4K30 HDR"],[l.ois, "OIS not supported"],[l.slow, "Not exposed in the current camera interface"]],
    battery: [[l.battery, "5000mAh"],[l.wired, "Up to 33W · USB Power Delivery"],[l.wireless, "Up to 15W"],[l.reverse, "USB-C wired reverse charging"]],
    wireless: [["Wi-Fi", "Wi-Fi 5 · 802.11 a/b/g/n/ac · 2.4 / 5GHz"],[l.wifiRadio, "80MHz · 256QAM · 1 × 1 SISO"],["Bluetooth", "Bluetooth 5.0 · BR / EDR / BLE"],["NFC", "13.56MHz · NFC / WPT shared antenna"],[l.location, "GPS · BeiDou · Galileo"]],
    ports: [["USB", "USB-C · USB 2.0"],[l.headphone, "3.5mm"],[l.sim, "Dual Nano-SIM · DSDS · no eSIM"],[l.motion, "ICM42607 accelerometer + gyroscope"],[l.otherSensors, "Magnetometer · light / proximity · barometer · fingerprint"]],
    security: [[l.tee, "UTEE · Common Criteria EAL2+"],[l.se, "Embedded SE · Common Criteria EAL6+"],[l.androidIntegration, "OMAPI eSE1 · ARA-M access control"],[l.keys, "Hardware-backed KeyMint / Keystore"],[l.provisioning, "App Attestation Key · Remote Key Provisioning"]],
    identity: [["FCC ID", "2BVCPGC603606"],["GSMA TAC", "01681300"],[l.ce, "SN26C0174 · Revision A"],["Notified Body", "Sporton International (USA) Inc. · 2907"],["Google", "GMS Final Approval · Widevine L1"]],
  };
};

function dl(rows) { return `<dl>${rows.map(([a,b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>`; }
function group(title, rows) { return `<article class="tech-spec-group reveal"><h3>${title}</h3>${dl(rows)}</article>`; }

function renderSpecs(c) {
  const s = c.specs;
  const r = specRows(c);
  const cams = [["samsung-jn1-main-camera-corrected.png", "01 / MAIN", "Samsung ISOCELL JN1", "50MP · REAR AUTOFOCUS"],["gc16b3c-front-camera-corrected.png", "02 / FRONT", "GalaxyCore GC16B3C", "16MP · FIXED FOCUS"],["gc02m1-macro-camera-corrected.png", "03 / MACRO", "GalaxyCore GC02M1", "2MP · CLOSE FOCUS"],["gc02m1-depth-camera-corrected.png", "04 / DEPTH", "GalaxyCore GC02M1", "2MP · DEPTH SUPPORT"]].map(x => `<figure class="camera-module reveal"><img src="../assets/camera-modules/${x[0]}" width="1254" height="1254" alt="${x[2]} camera module" loading="lazy"><figcaption><span>${x[1]}</span><strong>${x[2]}</strong><small>${x[3]}</small></figcaption></figure>`).join("");
  return `${head(c, "phone-specs.html", s.title, s.description)}
<body class="page-phone-specs">${nav(c, "phone", s.dossier)}
<main id="main">
  <section class="spec-sheet-hero">
    <div class="spec-sheet-hero__copy">
      <p class="eyebrow reveal">${s.eyebrow}</p>
      <h1 class="reveal">${lines(s.h1)}</h1>
      <p class="spec-sheet-hero__deck reveal">${s.deck}</p>
      <div class="spec-sheet-hero__meta reveal"><span>MODEL MA1</span><span>ANDROID 15</span><span>5G SA / NSA</span><span>GMS APPROVED</span></div>
      <dl class="spec-sheet-hero__facts reveal"><div><dt>DISPLAY</dt><dd>6.78 in · 120Hz</dd></div><div><dt>COMPUTE</dt><dd>T9100 · 10 TOPS INT8</dd></div><div><dt>MEMORY</dt><dd>Up to 12GB + 512GB</dd></div><div><dt>NETWORK</dt><dd>WW / EEA · 5G SA / NSA</dd></div></dl>
      <div class="spec-sheet-hero__actions reveal"><a href="#overview">${s.cta}</a><a href="${pageHref(c, "compliance.html")}">${s.passport}</a></div>
    </div>
    <figure class="spec-sheet-hero__visual reveal"><img src="../assets/images/phone-black.webp" width="1090" height="800" alt="MAG1 black model front, rear and side reference views"><figcaption><span>REFERENCE VIEW</span><span>BLACK MODEL</span><span>BUILD 51</span></figcaption></figure>
  </section>
  <nav class="spec-jump" aria-label="Technical specification sections"><a href="#overview">${s.sections.overview}</a><a href="#display">${s.sections.display}</a><a href="#camera">${s.sections.camera}</a><a href="#power">${s.sections.power}</a><a href="#regional">${s.sections.regional}</a><a href="#security">${s.sections.security}</a></nav>
  <section class="spec-sheet-section" id="overview"><header class="spec-sheet-heading"><span>01</span><div><p class="eyebrow">AT A GLANCE</p><h2>${s.overviewTitle}</h2></div></header><div class="spec-facts"><article class="reveal"><strong>6.78 in</strong><span>1080 × 2388 IPS LCD</span><small>60 / 90 / 120Hz</small></article><article class="reveal"><strong>10 TOPS</strong><span>IMG AX3596 NPU</span><small>INT8 · 1.2GHz</small></article><article class="reveal"><strong>50MP</strong><span>Samsung ISOCELL JN1</span><small>ƒ/1.8 · AF</small></article><article class="reveal"><strong>5000mAh</strong><span>33W wired charging</span><small>15W wireless charging</small></article><article class="reveal"><strong>512GB</strong><span>Maximum storage</span><small>UFS 3.1</small></article><article class="reveal"><strong>Android 15</strong><span>Google Mobile Services</span><small>Widevine L1</small></article></div></section>
  <section class="spec-sheet-section spec-sheet-section--dark" id="display"><header class="spec-sheet-heading"><span>02</span><div><p class="eyebrow">DISPLAY · PERFORMANCE · BODY</p><h2>${s.displayTitle}</h2></div></header><div class="tech-spec-groups">${group(s.groups.display,r.display)}${group(s.groups.compute,r.compute)}${group(s.groups.body,r.body)}</div></section>
  <section class="spec-sheet-section camera-specs" id="camera"><header class="spec-sheet-heading"><span>03</span><div><p class="eyebrow">AI IMAGING SYSTEM</p><h2>${lines(s.cameraTitle)}</h2></div></header><div class="camera-specs__intro reveal"><p>${s.cameraDeck}</p><blockquote>Capture.<br>Process.<br>Compute.</blockquote></div><div class="camera-module-gallery">${cams}</div><div class="tech-spec-groups tech-spec-groups--camera">${group(s.groups.rear,r.rear)}${group(s.groups.front,r.front)}${group(s.groups.video,r.video)}</div><p class="spec-verification-note reveal"><span>VERIFIED BOUNDARY</span>${s.cameraBoundary}</p></section>
  <section class="spec-sheet-section spec-sheet-section--dark" id="power"><header class="spec-sheet-heading"><span>04</span><div><p class="eyebrow">POWER · CONNECTIVITY</p><h2>${s.powerTitle}</h2></div></header><div class="tech-spec-groups">${group(s.groups.battery,r.battery)}${group(s.groups.wireless,r.wireless)}${group(s.groups.ports,r.ports)}</div></section>
  <section class="spec-sheet-section regional-specs" id="regional"><header class="spec-sheet-heading"><span>05</span><div><p class="eyebrow">REGIONAL BUILDS · MOBILE NETWORK</p><h2>${lines(s.regionalTitle)}</h2></div></header><p class="regional-specs__lead reveal">${s.regionalDeck}</p><div class="regional-builds"><article class="regional-build reveal"><span>WORLDWIDE</span><h3>WW</h3>${dl([[s.labels.productCode,"MAG1"],[s.labels.gms,"MAG1WW34F"],[s.labels.engineering,"MAG1WW53"],[s.labels.ceSoftware,"MAG1WW58-2"]])}</article><article class="regional-build reveal"><span>EUROPEAN ECONOMIC AREA</span><h3>EEA</h3>${dl([[s.labels.productCode,"MAG1_EEA"],[s.labels.gms,"MAG1EEA08"],[s.labels.os,"Android 15"],[s.labels.services,"Google Mobile Services"]])}</article></div><article class="cellular-mimo reveal"><header><span>CELLULAR DOWNLINK · FIH ENGINEERING SPEC</span><h3>${lines(s.mimoTitle)}</h3><p>${s.mimoDeck}</p></header><div class="cellular-mimo__bands"><div><span>LTE</span><strong>B2 / B25 / B38 / B41 / B42 / B66</strong></div><div><span>5G NR</span><strong>n38 / n41 / n66 / n77 / n78 / n79</strong></div></div><p class="cellular-mimo__statement">${s.mimoStatement}</p><footer><span>EVIDENCE BOUNDARY</span><p>${s.evidence}</p></footer></article><div class="band-tables"><article class="band-table reveal"><header><span>WW / FCC ASSESSED</span><h3>${s.northAmerica}</h3></header>${dl([["GSM","850 / 1900"],["WCDMA","B2 / B4 / B5"],["LTE","B2 / B5 / B7 / B12 / B13 / B17 / B25 / B26 / B38 / B41 / B42 / B66 / B71"],["5G NR","n5 / n7 / n38 / n41 / n66 / n71 / n77 / n78"]])}</article><article class="band-table reveal"><header><span>EEA / CE ASSESSED</span><h3>${s.europe}</h3></header>${dl([["GSM","900 / 1800"],["UMTS","B1 / B5 / B8"],["LTE","B1 / B3 / B5 / B7 / B8 / B20 / B28 / B38 / B40 / B41 / B42"],["5G NR","n1 / n3 / n5 / n7 / n8 / n20 / n28 / n38 / n40 / n41 / n77 / n78 / n79"]])}</article></div><div class="network-capabilities reveal"><span>5G SA / NSA</span><span>EN-DC</span><span>4 × 4 CELLULAR DL MIMO</span><span>UP TO 100MHz</span><span>256QAM</span><span>HPUE</span><span>SUB-6 ONLY</span></div><p class="spec-footnote">${s.networkNote}</p></section>
  <section class="spec-sheet-section spec-sheet-section--dark" id="security"><header class="spec-sheet-heading"><span>06</span><div><p class="eyebrow">SECURITY · COMPLIANCE</p><h2>${lines(s.securityTitle)}</h2></div></header><div class="tech-spec-groups">${group(s.groups.hardwareSecurity,r.security)}${group(s.groups.identity,r.identity)}</div><div class="spec-evidence-links reveal"><a href="${pageHref(c, "security.html")}"><span>${s.evidenceLinks[0]}</span><strong>${s.evidenceLinks[1]}</strong></a><a href="${pageHref(c, "compliance.html")}"><span>${s.evidenceLinks[2]}</span><strong>${s.evidenceLinks[3]}</strong></a><a href="${pageHref(c, "phone-architecture.html")}"><span>${s.evidenceLinks[4]}</span><strong>${s.evidenceLinks[5]}</strong></a><a href="${pageHref(c, "mainboard-3d.html")}"><span>${s.evidenceLinks[6]}</span><strong>${s.evidenceLinks[7]}</strong></a></div><p class="spec-footnote">${s.sourceNote}</p></section>
</main>${footer(c, s.footerLine, s.dossier)}</body></html>`;
}

export async function generateCoreLocales() {
  for (const language of languages) {
    const directory = resolve(root, language);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, "phone.html"), renderPhone(copy[language]), "utf8");
    await writeFile(resolve(directory, "phone-specs.html"), renderSpecs(copy[language]), "utf8");
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  await generateCoreLocales();
  console.log("Generated published Phone and Phone Specs pages for EN. JA and KO source files remain unpublished.");
}
