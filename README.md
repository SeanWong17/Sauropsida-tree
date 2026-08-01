<div align="center">
  <img src="assets/logo.png" alt="DeepTime Sauropsida Logo" width="120" height="120">
  <h1>DeepTime Sauropsida</h1>
  <h3>交互式蜥形纲演化树 · 沉浸式深时导览</h3>

  <p>
    <b>从二叠纪晚期的主干分化，到今日仍存的鸟类、鳄类、龟鳖与鳞龙。</b><br>
    把现生蜥形纲放回 3 亿年的深时背景中重新观看。
  </p>

  <p>
    <b>中文</b> | <a href="README_EN.md">English</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js" alt="Three.js">
    <img src="https://img.shields.io/badge/D3.js-v7-orange?style=flat-square&logo=d3.js" alt="D3.js">
  </p>
</div>

---

## 📖 简介 (Introduction)

**DeepTime Sauropsida** 是一个运行于现代浏览器端的交互式数据可视化项目，尝试把现生蜥形纲重新放回更长的演化时间轴中展示。项目以 3D 螺旋序幕、动态演化树和节点资料卡的组合方式，呈现鸟类、鳄类、龟鳖类、喙头类与有鳞类之间的系统关系。

当前版本以“**鸟类与其余现生主线均到科**”为主要展示粒度，共整理 **336 个末级节点** 与 **105 个内部分类节点**。鸟类采用 **IOC World Bird List v15.2（2026）** 的 44 目、250 个现生科框架；IOC 表中的全灭绝 Mohoidae 不纳入本项目的现生范围。在节点过密的支系中，额外补入下目、总科等中间层，以保持树形结构和可读性。

> **🌟 亮点：** 项目包含一个“溯源：失落的蜥形时代”彩蛋视图，会把镜头从现生冠群拉回到蜥形纲更深的中生代辐射历史。

## 🧭 相关推荐 (Related Project)

如果你也想看看羊膜动物另一条幸存主线，可以继续浏览姊妹项目 **DeepTime Mammalia**：它聚焦合弓纲到现代哺乳动物的演化历程，用同样的沉浸式方式呈现哺乳纲的深时展开。

👉 GitHub：<https://github.com/SeanWong17/Mammalia-tree>  
👉 Live Demo：<https://mammalia-tree.pages.dev/>

## ✨ 核心特性 (Features)

### 🌌 沉浸式 3D 序幕
- **双螺旋画廊**：基于 `Three.js + CSS3DRenderer` 构建的卡片序幕，用视觉节奏引导用户进入主树。
- **粒子背景与平滑运镜**：使用 WebGL 粒子和补间动画串联开场、转场和树图视图切换。

### 🌿 交互式演化图谱
- **D3.js 动态时间树**：支持缩放、拖拽、展开与收起，按时间轴横向展开现生蜥形纲主树。
- **地质时间轴**：底部动态标尺展示当前视口对应的年代范围。
- **节点资料卡**：点击节点文字可查看中英文名称、时间范围和说明信息。
- **智能搜索**：支持中文与拉丁名搜索、匹配高亮和快速定位。

### 🌐 国际化支持
- **中英文切换**：界面、节点名称、说明文本和时间范围均可在中英文之间切换。
- **语言联动彩蛋视图**：彩蛋树中的节点名称和资料卡也会跟随语言同步刷新。

### 🥚 溯源彩蛋 (The Easter Egg)
- 点击界面左上角“溯源”按钮，可进入一棵包含大量灭绝旁支的幽灵树。
- 该视图强调蜥形纲在海洋、陆地与天空中的中生代大辐射，以及通向现生类群的少数幸存主线。

### ⚡ 性能与体验
- **响应式布局**：桌面端和移动端分别配置粒子密度、树宽和初始缩放参数。
- **图片按需加载**：336 张图片拆分为内容哈希 WebP 文件，由轻量 manifest 映射，避免下载和解析整包 Base64。
- **完全自托管**：D3、Three.js、Tween.js 与字体均随项目提供，无需连接第三方 CDN。
- **可靠启动**：依赖缺失会显示可重试错误；WebGL 不可用时仍可继续进入 2D 演化树。
- **无障碍支持**：支持键盘导航、对话框焦点管理、页面缩放与减少动效偏好。

## 📸 预览 (Screenshots)

| 3D 螺旋画廊 | 演化树概览 |
|:---:|:---:|
| <img src="examples/gallery.png" alt="Gallery View" width="100%"> | <img src="examples/tree.png" alt="Tree View" width="100%"> |

| 资料卡片 | 溯源彩蛋 |
|:---:|:---:|
| <img src="examples/card.png" alt="Detail Card" width="100%"> | <img src="examples/egg.png" alt="Easter Egg View" width="100%"> |

## 🛠️ 技术栈 (Tech Stack)

本项目采用 **Vanilla JavaScript (ES6+)** 开发，无运行时构建步骤，适合直接预览与静态部署；Node.js 工具仅用于验证、测试和更新 vendored 资源。

* **Core**: HTML5, CSS3, JavaScript
* **Visualization**: [D3.js](https://d3js.org/) (v7) - 负责演化树布局、缩放和节点交互。
* **3D Engine**: [Three.js](https://threejs.org/) (r128) - 负责 3D 螺旋画廊、粒子背景与 CSS3D 场景。
* **Animation**: [Tween.js](https://github.com/tweenjs/tween.js/) - 负责相机和界面过渡动画。
* **Fonts**: 自托管 Noto Serif SC，系统衬线字体回退

## 📂 目录结构 (Structure)

项目主体是一个纯前端静态站点，数据、图像映射和交互逻辑都已包含在仓库中。

```text
Sauropsida-tree/
├── assets/                  # Logo、内容哈希图片与自托管字体
├── data/                    # 演化树数据与轻量图片 manifest
├── scripts/                 # 资源更新、数据校验与静态服务器
├── src/
│   ├── css/
│   │   ├── noto-serif-sc.css
│   │   └── style.css
│   └── js/
│       ├── config.js       # 布局与性能配置
│       ├── easter_egg_data.js  # 彩蛋树数据
│       ├── gallery.js      # WebGL 背景与 CSS3D 画廊
│       ├── i18n.js         # 国际化文本
│       ├── tree.js         # D3 主树与溯源彩蛋
│       ├── app.js          # 启动状态与界面控制
│       └── utils.js        # 工具函数
├── tests/                   # Node、Playwright 与 Axe 测试
├── vendor/                  # 固定版本的浏览器依赖及许可
├── index.html               # 入口页面
├── package.json             # 开发验证命令与锁定依赖
├── README.md                # 中文说明
└── README_EN.md             # English Documentation
```

## 🚀 本地运行 (How to Run)

### 方式一：直接打开
1. Clone 或下载本仓库。
2. 直接打开 `index.html`。
3. 所有运行时资源均已内置，可直接体验完整功能。

### 方式二：本地服务器
如果你希望避免部分浏览器的本地文件限制，建议启动一个静态服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

然后访问 `http://localhost:8000`

### 开发验证

```bash
npm ci
npm run check
npm run test:browser
```

## 🔬 数据范围与说明 (Data Scope)

* **分类基准**：主要参考 **Reptile Database** 与 **IOC World Bird List v15.2（2026）**。
* **层级策略**：鸟类与其余现生蜥形纲主线均以科级为末端；鸟类的 44 个目作为中间节点，对过密分支补入总科、下目等中间层。
* **时间信息**：高阶节点优先采用常见冠群分化时间，末级节点时间以便于可视化整理的近似冠群时间为主。
* **彩蛋视图**：额外扩展了大量已灭绝旁支，用于展示蜥形纲在深时尺度上的辐射与收缩。
* **图像资源**：末级科以代表物种配图；生成式图像经构图、边缘、文字残留和形态审核后，以内容哈希 WebP 资源接入。

## 🔧 可调配置 (Customization)

项目的大部分显示参数集中在 `src/js/config.js`：

```javascript
performance: {
    particleCount: { desktop: 2000, mobile: 1000 },
    cardCount: { base: 30, densityFactor: 25, min: 35, max: 80 }
},

scene3D: {
    helix: { radiusBase: 600, radiusMax: 800, yStep: 30 },
    camera: { targetZDesktop: 2000, targetZMobile: 1400 }
},

tree: {
    width: { desktop: 2000, mobile: 1200 },
    nodeSpacing: 45,
    zoom: { scaleExtent: [0.15, 3] }
}
```

## 🤝 致谢与声明 (Credits & Disclaimer)

* **分类与时间基准**：参考 Reptile Database、IOC World Bird List v15.2（2026，DOI: 10.14344/IOC.ML.15.2）以及部分近年的蜥形纲、龟鳖类与鸟类系统发育研究。
* **技术实现**：项目基于 D3.js、Three.js 与 Tween.js 的纯前端组合实现。
* **当前阶段**：现阶段优先保证树结构、节点时间和交互流程清晰，后续会继续补充资料来源、配图与节点细节。

## 📄 开源协议 (License)

本作品采用 [知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 (CC BY-NC-SA 4.0)](LICENSE) 进行许可。

* ✅ 你可以自由分享和修改本项目。
* ❌ 不可用于商业用途。
* 📝 转载或修改请注明原作者：**Sean Wong**。

---

<div align="center">
  <sub>Designed with ❤️ by Sean Wong</sub>
</div>
