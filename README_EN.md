<div align="center">
  <img src="assets/logo.png" alt="DeepTime Sauropsida Logo" width="120" height="120">
  <h1>DeepTime Sauropsida</h1>
  <h3>Interactive Sauropsid Phylogeny · An Immersive Deep-Time Guide</h3>

  <p>
    <b>From Late Permian divergences to the living branches of birds, crocodilians, turtles, and lepidosaurs.</b><br>
    A browser-based view of Sauropsida placed back into a 300-million-year timeline.
  </p>

  <p>
    <a href="README.md">中文</a> | <b>English</b>
  </p>

  <p>
    <img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js" alt="Three.js">
    <img src="https://img.shields.io/badge/D3.js-v7-orange?style=flat-square&logo=d3.js" alt="D3.js">
  </p>
</div>

---

## 📖 Introduction

**DeepTime Sauropsida** is an interactive browser-based visualization project that reframes living sauropsids within a much longer evolutionary timescale. It combines a 3D helix prologue, a dynamic phylogenetic tree, and node detail cards to present the relationships among birds, crocodilians, turtles, tuataras, and squamates.

The current release uses a display policy of "**orders for birds, families for the remaining extant sauropsid lines**", covering **126 terminal nodes** and **64 internal clade nodes**. For especially dense branches, additional intermediate ranks such as infraorders and superfamilies are inserted to preserve readability.

> **🌟 Highlight:** The project includes a hidden "Origin: The Lost Age of Sauropsids" ghost-tree mode that pulls the camera beyond the living crown groups into the deeper Mesozoic radiation of Sauropsida.

## ✨ Features

### 🌌 Immersive 3D Prologue
- **Helix gallery**: A `Three.js + CSS3DRenderer` sequence that introduces the project before entering the tree view.
- **Particle background and smooth camera motion**: WebGL particles and tweened transitions connect the opening sequence with the main visualization.

### 🌿 Interactive Phylogeny
- **Dynamic D3.js time tree**: Zoom, pan, expand, and collapse the extant sauropsid tree along a horizontal time axis.
- **Geological timeline**: A bottom timeline updates with the current viewport.
- **Node detail cards**: Click node labels to inspect bilingual names, time ranges, and descriptive notes.
- **Smart search**: Search by Chinese names or Latin names and jump directly to matched clades.

### 🌐 Internationalization
- **Chinese / English toggle**: The interface, labels, descriptions, and time-range text switch between both languages.
- **Ghost-tree language refresh**: The easter egg view updates node labels and cards when the language changes.

### 🥚 The Origin Easter Egg
- The upper-left "Origin" button opens a ghost tree that includes many extinct side branches.
- This view emphasizes the large Mesozoic radiation of Sauropsida across sea, land, and sky, alongside the few surviving lineages that reach the present.

### ⚡ Performance and Usability
- **Responsive layout**: Separate desktop/mobile parameters for particles, tree width, and initial zoom.
- **Lazy-loaded image data**: `images_data.js` is loaded asynchronously to keep first render lighter.
- **Static hosting friendly**: No backend is required; the project works as a static site.

## 🛠️ Tech Stack

The project is built with **Vanilla JavaScript (ES6+)** and does not require a build step.

* **Core**: HTML5, CSS3, JavaScript
* **Visualization**: [D3.js](https://d3js.org/) (v7) - tree layout, zooming, and node interaction
* **3D Engine**: [Three.js](https://threejs.org/) (r128) - 3D helix gallery, particle background, and CSS3D scene
* **Animation**: [Tween.js](https://github.com/tweenjs/tween.js/) - camera and UI transitions
* **Fonts**: Noto Serif SC & Playfair Display (via Google Fonts)

## 📂 Structure

This repository is a static frontend project. Data, image mappings, and interaction logic are all included locally.

```text
Sauropsida-tree/
├── assets/                  # Static assets such as the logo
├── data/                    # Tree data and image mappings
│   ├── data.js             # Main extant-tree dataset
│   ├── image_generation_status.json
│   └── images_data.js      # Image mapping data
├── result/
│   └── webp_q75/           # Preprocessed image assets
├── scripts/                 # Data and image-processing scripts
├── src/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       ├── config.js       # Layout and performance configuration
│       ├── easter_egg_data.js  # Ghost-tree dataset
│       ├── i18n.js         # Internationalization strings
│       ├── main.js         # Application logic
│       └── utils.js        # Utility helpers
├── index.html               # Entry page
├── README.md                # Chinese documentation
└── README_EN.md             # English documentation
```

## 🚀 How to Run

### Method 1: Open Directly
1. Clone or download the repository.
2. Open `index.html` directly.
3. In permissive browser environments, the main experience should work immediately.

### Method 2: Use a Local Server
If you want to avoid local-file restrictions in some browsers, run a simple static server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

Then visit `http://localhost:8000`

## 🔬 Data Scope and Notes

* **Taxonomic basis**: primarily **Reptile Database** and **IOC World Bird List**
* **Hierarchy policy**: terminal nodes are orders for birds and families for the remaining extant sauropsid branches; extra intermediate ranks are inserted for dense clades
* **Time data**: higher clades prioritize commonly cited crown divergence estimates, while terminal-node ages are approximate crown-age values adjusted for visualization
* **Ghost-tree mode**: extends the dataset with many extinct side branches to show sauropsid expansion and contraction through deep time
* **Image assets**: the current milestone still prioritizes topology, timings, and node descriptions; image coverage is continuing to improve

## 🔧 Customization

Most visual parameters are defined in `src/js/config.js`:

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

## 🤝 Credits & Disclaimer

* **Taxonomy and chronology**: based on Reptile Database, IOC World Bird List, and selected recent phylogenetic studies on major sauropsid lineages
* **Implementation**: built as a pure frontend project with D3.js, Three.js, and Tween.js
* **Current focus**: the present release prioritizes tree topology, timing structure, and interaction flow; references, illustrations, and node-level detail will continue to be refined

## 📄 License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](http://creativecommons.org/licenses/by-nc-sa/4.0/).

* ✅ You may share and adapt this project.
* ❌ Commercial use is not allowed.
* 📝 Please attribute the original author: **Sean Wong**.

---

<div align="center">
  <sub>Designed with ❤️ by Sean Wong</sub>
</div>
