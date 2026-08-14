(() => {
  if (new URLSearchParams(location.search).get("lang") !== "en") return;

  document.documentElement.lang = "en";
  document.title = "MAGNE.AI Structure Viewer";

  const translations = new Map(Object.entries({
    "结构查看器": "Structure Viewer", "显示模式": "Display mode", "展示": "Showcase", "工程": "Engineering",
    "视图工具": "View tools", "机身颜色": "Body color", "白色机型": "White model", "黑色机型": "Black model",
    "白色": "White", "黑色": "Black", "等轴视图": "Isometric view", "正面视图": "Front view",
    "侧面视图": "Side view", "顶部视图": "Top view", "复位相机": "Reset camera", "保存截图": "Save screenshot",
    "全屏": "Fullscreen", "组件列表": "Component list", "MAGNE.AI 手机 3D 爆炸结构": "MAGNE.AI phone 3D exploded structure",
    "正在载入结构模型": "Loading structure model", "装载结构数据": "Loading structure data", "准备 3D 引擎": "Preparing 3D engine",
    "拆解阶段": "Disassembly stages", "组件浏览器": "Component Browser", "装配结构": "Assembly structure",
    "收起组件列表": "Close component list", "可见": "visible", "STEP 精确件": "STEP exact parts",
    "V51 外观": "V51 appearance", "建模补件": "Modeled supplements", "当前选择": "Current selection",
    "点击模型或列表选择组件": "Select a component in the model or list", "可聚焦、隐藏或单独查看": "Focus, hide or isolate a component",
    "聚焦": "Focus", "隐藏": "Hide", "单独": "Isolate", "全部显示": "Show all", "建模": "modeled",
    "爆炸进度控制": "Exploded-view progress", "播放拆解动画": "Play disassembly animation", "暂停拆解动画": "Pause disassembly animation",
    "完整装配": "Complete assembly", "爆炸拆解进度": "Exploded-view progress", "装配": "Assembly", "外壳": "Enclosure",
    "摄像": "Imaging", "核心": "Core", "完全拆解": "Fully disassembled", "恢复装配": "Restore assembly",
    "显示组件": "Show components", "外观与密封": "Exterior and sealing", "影像系统": "Imaging system",
    "电源系统": "Power system", "主板与传感器": "Mainboard and sensors", "音频与接口": "Audio and interfaces",
    "中框骨架": "Midframe", "紧固件": "Fasteners", "模型载入失败，请刷新重试": "Model failed to load. Please refresh.",
    "结构模型载入失败": "Structure model failed to load", "隐藏整组": "Hide group", "退出单独": "Exit isolation",
    "建模补充几何": "Modeled supplemental geometry", "V51 精修外观": "V51 refined appearance", "STEP 精确几何": "STEP exact geometry",
    "耳机孔密封胶": "Headphone-jack seal", "摄像头支架": "Camera bracket", "摄像头装饰岛": "Camera trim island",
    "闪光灯透镜": "Flash lens", "主摄像头模组": "Main camera module", "副摄像头 A": "Auxiliary camera A",
    "副摄像头 B": "Auxiliary camera B", "前壳支架": "Front housing bracket", "金属中框": "Metal midframe",
    "屏幕总成": "Display assembly", "后盖保护膜": "Rear-cover protective film", "后盖": "Rear cover",
    "侧边按键": "Side buttons", "侧键密封胶": "Side-button seal", "SIM 卡托金属片": "SIM-tray metal insert",
    "SIM 卡托密封圈": "SIM-tray gasket", "SIM 卡托": "SIM tray", "螺丝与紧固件": "Screws and fasteners",
    "指纹识别模组": "Fingerprint module", "电池包": "Battery pack", "主板": "Mainboard",
    "NFC 天线与隔磁片": "NFC antenna and magnetic shield", "无线充电控制芯片": "Wireless-charging controller",
    "无线充电线圈与铁氧体片": "Wireless-charging coil and ferrite sheet", "无线充电磁环": "Wireless-charging magnetic ring",
    "底部扬声器": "Bottom speaker", "顶部扬声器": "Top speaker", "听筒": "Earpiece",
    "USB 副板": "USB daughterboard", "硬币式振子": "Coin vibration motor", "主柔性排线": "Main flex cable",
    "摄像头排线": "Camera flex cable", "射频同轴线": "RF coaxial cable", "主控 SoC 芯片": "Main SoC",
    "电源管理 PMIC 芯片": "Power-management PMIC", "射频收发芯片": "RF transceiver", "UFS / 内存芯片": "UFS / memory package",
    "石墨散热片": "Graphite thermal sheet", "双摄光学保护玻璃": "Dual-camera protective glass", "主摄镜筒": "Main-camera lens barrel",
    "主摄 CMOS 传感器": "Main-camera CMOS sensor", "主摄模组板": "Main-camera module board", "主摄连接排线": "Main-camera flex cable",
    "副摄 A 镜筒": "Auxiliary-camera A lens barrel", "副摄 A CMOS 传感器": "Auxiliary-camera A CMOS sensor",
    "副摄 A 模组板": "Auxiliary-camera A module board", "副摄 A 连接排线": "Auxiliary-camera A flex cable",
    "副摄 B 镜筒": "Auxiliary-camera B lens barrel", "副摄 B CMOS 传感器": "Auxiliary-camera B CMOS sensor",
    "副摄 B 模组板": "Auxiliary-camera B module board", "副摄 B 连接排线": "Auxiliary-camera B flex cable",
    "外壳分离": "Enclosure separation", "电源分离": "Power separation", "核心模组": "Core modules", "骨架拆解": "Frame disassembly"
  }));

  const replaceText = (value) => {
    let output = value;
    for (const [source, target] of translations) output = output.replaceAll(source, target);
    return output;
  };

  const localize = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const next = replaceText(node.nodeValue || "");
      if (next !== node.nodeValue) node.nodeValue = next;
    });
    root.querySelectorAll?.("[aria-label],[title],[alt]").forEach((element) => {
      ["aria-label", "title", "alt"].forEach((name) => {
        const value = element.getAttribute(name);
        if (value) element.setAttribute(name, replaceText(value));
      });
    });
  };

  localize(document.body);
  [0, 100, 300, 700, 1500, 3000].forEach((delay) => setTimeout(() => localize(document.body), delay));
  document.addEventListener("click", () => setTimeout(() => localize(document.body), 0), true);
})();
