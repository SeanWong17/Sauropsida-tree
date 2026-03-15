/**
 * main.js - 主应用逻辑
 * 重构版本：模块化、性能优化、支持国际化
 */

// 图像资源引用（images_data.js 中定义为 LOCAL_IMAGES）
// 使用函数实时查询，支持异步加载后自动生效
function getImage(key, fallback = '') {
    return (typeof window.LOCAL_IMAGES !== 'undefined' && window.LOCAL_IMAGES[key]) ? window.LOCAL_IMAGES[key] : fallback;
}

let imageDataLoadPromise = null;

function refreshRenderedImages() {
    document.querySelectorAll('img[data-image-key]').forEach((img) => {
        const key = img.dataset.imageKey || '';
        const fallback = img.dataset.fallbackSrc || '';
        const nextSrc = getImage(key, fallback);
        if (nextSrc && img.src !== nextSrc) {
            img.src = nextSrc;
            img.style.display = 'block';
        }
    });
}

/**
 * 异步加载图片数据（约 10.1MB），避免阻塞首屏渲染
 * 兼容 file:// 协议（双击 index.html 直接打开）
 */
function loadImageData() {
    if (typeof window.LOCAL_IMAGES !== 'undefined') {
        refreshRenderedImages();
        return Promise.resolve();
    }

    if (imageDataLoadPromise) return imageDataLoadPromise;

    imageDataLoadPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'data/images_data.js';
        script.onload = () => {
            refreshRenderedImages();
            resolve();
        };
        script.onerror = () => {
            console.warn('图片数据加载失败，将继续使用本地文件路径');
            refreshRenderedImages();
            resolve();
        };
        document.head.appendChild(script);
    });

    return imageDataLoadPromise;
}

/** Class 1: ParticleBackground (WebGL 星空) */
class ParticleBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.animationFrameId = null;
        this.mouseX = 0;
        this.mouseY = 0;

        // 预绑定方法引用，确保 removeEventListener 能正确匹配
        this._onResize = this.onResize.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onTouchMove = this._handleTouchMove.bind(this);
        this._animate = this.animate.bind(this);

        this.init();
    }

    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.createParticles();
        window.addEventListener('resize', this._onResize);
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('touchmove', this._onTouchMove, { passive: true });
        this._animate();
    }

    createParticles() {
        const particleCount = isMobile()
            ? getConfig('performance.particleCount.mobile')
            : getConfig('performance.particleCount.desktop');

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colorPalette = [
            new THREE.Color(0xc5a059),
            new THREE.Color(0x4a90a4),
            new THREE.Color(0x8b7355),
            new THREE.Color(0xffffff)
        ];

        for (let i = 0; i < particleCount; i++) {
            const radius = 800 + Math.random() * 1200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    _handleTouchMove(e) {
        if (e.touches.length > 0) {
            this.mouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.0003;
            this.mouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.0003;
        }
    }

    onMouseMove(e) {
        this.mouseX = (e.clientX - window.innerWidth / 2) * 0.0003;
        this.mouseY = (e.clientY - window.innerHeight / 2) * 0.0003;
    }

    onResize() {
        if (!this.camera) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this._animate);
        if (this.particles) {
            this.particles.rotation.y += 0.0002 + this.mouseX * 0.1;
            this.particles.rotation.x += 0.0001 + this.mouseY * 0.1;
        }
        this.renderer.render(this.scene, this.camera);
    }

    fadeOut(duration = 500) {
        const startOpacity = this.particles.material.opacity;
        const startTime = Date.now();
        const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            this.particles.material.opacity = startOpacity * (1 - progress);
            if (progress < 1) requestAnimationFrame(fade);
        };
        fade();
    }

    dispose() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        // 正确移除所有事件监听器
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('touchmove', this._onTouchMove);
        // 释放 GPU 资源
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }
        if (this.renderer) {
            this.renderer.dispose();
            if (this.container && this.renderer.domElement.parentNode === this.container) {
                this.container.removeChild(this.renderer.domElement);
            }
        }
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
    }
}

/** Class 2: HelixViewer (CSS3D 螺旋) */
class HelixViewer {
    constructor(containerId, data, onCardClick) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.onCardClick = onCardClick;
        this.objects = [];

        // 预绑定方法引用
        this._onResize = this.onResize.bind(this);
        this._animate = this.animate.bind(this);

        this.init();
    }

    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 5000);

        // 初始状态：极高空俯视
        this.camera.position.set(0, 5000, 10);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene();
        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(width, height);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 60;
        this.controls.enabled = false;

        this.renderer.domElement.style.touchAction = 'none';
        this.createHelix();
        window.addEventListener('resize', this._onResize);
        this._animate();

        this.playIntroSequence();
    }

    createHelix() {
        const helixGroup = new THREE.Group();
        const config = getConfig('scene3D.helix');

        // 动态计算半径
        let radius = Math.max(config.radiusBase, Math.min(window.innerWidth * 0.6, config.radiusMax));
        if (isMobile()) radius = config.radiusMobile;

        const yStep = config.yStep;
        const totalY = this.data.length * yStep;

        this.data.forEach((item, i) => {
            const imgBase64 = getImage(item.en_name, item.image_url || '');
            const element = DOMUtils.createCardElement(item, imgBase64);

            element.addEventListener('click', () => {
                if (this.onCardClick) this.onCardClick(item);
            });
            element.addEventListener('touchstart', () => {}, { passive: true });

            const object = new THREE.CSS3DObject(element);

            // 调整旋转角度密度
            const thetaDensity = config.thetaDensity * (config.radiusBase / radius);
            const theta = i * thetaDensity;
            const y = -(totalY / 2) + i * yStep;
            const offset = (i % 2) * Math.PI;

            object.position.setFromCylindricalCoords(radius, theta + offset, y);
            const vector = new THREE.Vector3(0, object.position.y, 0);
            object.lookAt(vector);

            helixGroup.add(object);
            this.objects.push(object);
        });

        this.scene.add(helixGroup);
    }

    // 动画序列
    playIntroSequence() {
        const config = getConfig('scene3D.camera');
        const targetZ = isMobile() ? config.targetZMobile : config.targetZDesktop;

        setTimeout(() => {
            // 位置下落 + 拉远
            new TWEEN.Tween(this.camera.position)
                .to({ x: 0, y: 0, z: targetZ }, 3000)
                .easing(TWEEN.Easing.Cubic.InOut)
                .start();

            // 旋转减速
            new TWEEN.Tween(this.controls)
                .to({ autoRotateSpeed: 2.0 }, 3000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(() => {
                    this.controls.enabled = true;
                    this.container.classList.add('interactive');
                })
                .start();
        }, 1500);
    }

    onResize() {
        if (!this.camera) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this._animate);
        this.controls.update();
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }

    zoomInAndEnd(onComplete) {
        const overlay = document.getElementById('transition-overlay');
        this.container.classList.remove('interactive');

        new TWEEN.Tween(this.controls)
            .to({ autoRotateSpeed: 20 }, 2000)
            .easing(TWEEN.Easing.Cubic.In)
            .start();

        new TWEEN.Tween(this.camera.position)
            .to({ x: 0, y: 0, z: -2000 }, 2000)
            .easing(TWEEN.Easing.Exponential.In)
            .onUpdate(() => this.camera.lookAt(this.scene.position))
            .start();

        setTimeout(() => {
            overlay.style.opacity = 1;
        }, 1500);

        setTimeout(() => {
            this.dispose();
            if (onComplete) onComplete();
            setTimeout(() => {
                overlay.style.opacity = 0;
            }, 300);
        }, 2000);
    }

    refreshLanguage() {
        this.objects.forEach((object) => {
            if (object && object.element && object.element.__cardData) {
                DOMUtils.updateCardElementLanguage(object.element, object.element.__cardData);
            }
        });
    }

    dispose() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this._onResize);
        if (this.container && this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.container.innerHTML = '';
        }
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
    }
}

/** Class 3: EvolutionTree (D3.js 演化树) */
class EvolutionTree {
    constructor(containerId, rawData, onNodeClick) {
        this.containerId = containerId;
        this.rawData = rawData;
        this.onNodeClick = onNodeClick;
        this.allNodes = [];
        this.axisGroup = null;
        this.axis = null;
        this.geologicalEpochs = getConfig('geologicalEpochs');
        this.isEasterEggActive = false;
        this.ghostData = (typeof EASTER_EGG_DATA !== 'undefined') ? EASTER_EGG_DATA : null;
        this.ghostRoot = null;
        this.ghostGroup = null;
        this.ghostNodes = null;
        this.savedTransform = null;
        this.skipHandler = null;
        this.textTimer = null;
        this.hasValidatedGhostData = false;
        this.treeTranslateExtent = getConfig('tree.zoom.translateExtent');
    }

    init() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';

        const config = getConfig('tree');
        const width = isMobile() ? config.width.mobile : config.width.desktop;
        const viewHeight = window.innerHeight;

        this.root = DataUtils.buildHierarchy(this.rawData);
        this.root.x0 = 0;
        this.root.y0 = 0;
        this.maxTime = Math.max(...this.root.descendants().map(d => d.data.divergence_time_mya || 0));
        this.axisMax = Math.ceil(this.maxTime / 25) * 25;

        this.svg = d3.select("#" + this.containerId)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        this.svg.on("click", (e) => {
            if (!e.target.closest('.node')) this.clearHighlight();
        });

        this.g = this.svg.append("g").attr("class", "tree-layer");
        this.timeScale = d3.scaleLinear().domain([this.axisMax, 0]).range([0, width]);

        this.drawBackground(width);
        this.setupTimeAxis();
        this.setupZoom(viewHeight, width);
        this.setupSearch();
        this.setupTreeControls();

        this.treeLayout = d3.cluster().size([viewHeight, width]);
        this.update(this.root);
        this.allNodes = this.root.descendants();
    }

    setupTreeControls() {
        document.getElementById('btn-expand-all').onclick = () => this.expandOneLevel();
        document.getElementById('btn-collapse-all').onclick = () => this.collapseOneLevel();
    }

    getNodeRankValue(d) {
        return DataUtils.getNodeRankValue(d);
    }

    expandOneLevel() {
        const collapsedNodes = this.root.descendants()
            .filter(d => d._children && d._children.length > 0);

        if (collapsedNodes.length === 0) return;

        let minHiddenRankVal = 999;
        collapsedNodes.forEach(p => {
            p._children.forEach(child => {
                const r = this.getNodeRankValue(child);
                if (r !== null && r < minHiddenRankVal) minHiddenRankVal = r;
            });
        });

        if (minHiddenRankVal === 999) return;

        let hasAction = false;
        collapsedNodes.forEach(d => {
            const hasTargetRankChild = d._children.some(child =>
                this.getNodeRankValue(child) === minHiddenRankVal
            );
            if (hasTargetRankChild) {
                d.children = d._children;
                d._children = null;
                hasAction = true;
            }
        });

        if (hasAction) this.update(this.root);
    }

    collapseOneLevel() {
        const expandedNodes = this.root.descendants()
            .filter(d => d.children && d.children.length > 0);

        if (expandedNodes.length === 0) return;

        let maxChildRankVal = -1;
        expandedNodes.forEach(p => {
            p.children.forEach(child => {
                const r = this.getNodeRankValue(child);
                if (r !== null && r > maxChildRankVal) maxChildRankVal = r;
            });
        });

        if (maxChildRankVal === -1) return;

        let hasAction = false;
        expandedNodes.forEach(d => {
            const hasTargetRankChild = d.children.some(child =>
                this.getNodeRankValue(child) === maxChildRankVal
            );
            if (hasTargetRankChild) {
                d._children = d.children;
                d.children = null;
                hasAction = true;
            }
        });

        if (hasAction) this.update(this.root);
    }

    clearHighlight() {
        this.g.selectAll('.node').classed('highlighted', false);
        document.getElementById('search-results').style.display = 'none';
    }

    drawBackground(width) {
        const bgGroup = this.g.append("g").attr("class", "bg-group");

        bgGroup.selectAll(".epoch-band")
            .data(this.geologicalEpochs)
            .enter()
            .append("rect")
            .attr("class", "epoch-band")
            .attr("x", d => Math.min(this.timeScale(d.start), this.timeScale(d.end)))
            .attr("y", -20000)
            .attr("width", d => Math.max(0, Math.abs(this.timeScale(d.start) - this.timeScale(d.end)) - 0.5))
            .attr("height", 40000)
            .attr("fill", d => d.color)
            .attr("stroke", "none");

        this.textGroup = this.g.append("g").attr("class", "text-group");

        this.textGroup.selectAll(".epoch-label")
            .data(this.geologicalEpochs)
            .enter()
            .append("text")
            .attr("class", "epoch-label")
            .attr("x", d => this.timeScale((d.start + d.end) / 2))
            .attr("y", 0)
            .text(d => d.name[currentLanguage]);
    }

    setupZoom(viewHeight, width) {
        const config = getConfig('tree.zoom');
        const initialScale = isMobile()
            ? config.initialScale.mobile
            : config.initialScale.desktop;
        const initialX = isMobile()
            ? config.initialX.mobile
            : config.initialX.desktop;

        this.zoom = d3.zoom()
            .extent(this.getZoomViewportExtent())
            .scaleExtent(config.scaleExtent)
            .translateExtent(config.translateExtent)
            .on("zoom", (e) => {
                this.g.attr("transform", e.transform);

                const centerY = (viewHeight / 2 - e.transform.y) / e.transform.k;
                this.g.selectAll(".epoch-label").attr("y", centerY);

                if (!this.isEasterEggActive) {
                    this.currentTransform = e.transform;
                }

                if (this.axisGroup && this.axis) {
                    const newScale = e.transform.rescaleX(this.timeScale);
                    const tickCount = isMobile() ? 4 : 8;
                    this.axis.scale(newScale).ticks(tickCount);
                    this.axisGroup.call(this.axis);
                    this.styleAxis();
                }
            });

        this.svg.call(this.zoom)
            .call(this.zoom.transform, d3.zoomIdentity
                .translate(initialX, viewHeight / 2 - 50)
                .scale(initialScale));

        this.currentTransform = d3.zoomIdentity
            .translate(initialX, viewHeight / 2 - 50)
            .scale(initialScale);

        // 鼠标移动事件
        this.svg.on("mousemove", (e) => this.updateTimeIndicator(e));

        // 移动端触摸事件
        this.svg.on("touchmove", (e) => {
            const touch = e.touches[0];
            this.updateTimeIndicator({ clientX: touch.clientX });
        });
    }

    getZoomViewportExtent() {
        const container = document.getElementById(this.containerId);
        const rect = container?.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect?.width || window.innerWidth));
        const height = Math.max(1, Math.round(rect?.height || window.innerHeight));
        return [[0, 0], [width, height]];
    }

    setZoomTranslateExtent(extent) {
        if (!this.zoom || !extent) return;
        this.zoom
            .extent(this.getZoomViewportExtent())
            .translateExtent(extent);
        this.svg.call(this.zoom);
    }

    setupTimeAxis() {
        const axisSvg = d3.select("#axis-svg");
        const axisSvgNode = axisSvg.node();
        const axisWidth = Math.max(1, Math.round(axisSvgNode?.getBoundingClientRect().width || window.innerWidth));
        const axisHeight = Math.max(1, Math.round(axisSvgNode?.getBoundingClientRect().height || 60));

        axisSvg.selectAll("*").remove();
        axisSvg
            .attr("viewBox", `0 0 ${axisWidth} ${axisHeight}`)
            .attr("preserveAspectRatio", "none");

        const mobile = isMobile();
        const tickCandidates = [this.axisMax, 250, 200, 145, 100, 66, 50, 25, 0]
            .filter((tick, index, arr) => tick <= this.axisMax && arr.indexOf(tick) === index)
            .sort((a, b) => b - a);
        const ticks = mobile
            ? tickCandidates.filter(tick => tick === this.axisMax || tick === 145 || tick === 66 || tick === 0)
            : tickCandidates;

        this.axis = d3.axisBottom(this.timeScale).tickValues(ticks).tickFormat(d => `${d} MYA`);
        this.axisGroup = axisSvg.append("g").attr("transform", "translate(0, 10)").call(this.axis);
        this.styleAxis();
    }

    styleAxis() {
        if (!this.axisGroup) return;
        const axisSvg = document.getElementById('axis-svg');
        const axisWidth = Math.max(1, Math.round(axisSvg?.getBoundingClientRect().width || window.innerWidth));

        this.axisGroup.selectAll("text")
            .style("font-family", "'Playfair Display', serif")
            .style("font-size", "11px")
            .style("fill", "#5d4037");
        this.axisGroup.selectAll("line, path")
            .style("stroke", "#5d4037");
        this.axisGroup.select(".domain")
            .attr("d", `M0.5,6V0.5H${Math.max(0.5, axisWidth - 0.5)}V6`);
    }

    updateTimeIndicator(e) {
        const indicator = document.getElementById('time-indicator');
        if (!this.currentTransform) return;
        const mouseX = e.clientX;
        const mya = this.currentTransform.rescaleX(this.timeScale).invert(mouseX);
        if (mya >= 0 && mya <= this.axisMax) {
            indicator.style.display = 'block';
            indicator.style.left = mouseX + 'px';
            indicator.textContent = mya.toFixed(1) + ' MYA';
        } else {
            indicator.style.display = 'none';
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        // 使用防抖优化搜索性能
        const performSearch = PerformanceUtils.debounce((query) => {
            if (query.length < 1) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = this.allNodes.filter(node => {
                const cn = (node.data.cn_name || node.data.family_cn || '').toLowerCase();
                const en = (node.data.en_name || node.data.family_en || '').toLowerCase();
                return cn.includes(query) || en.includes(query);
            }).slice(0, 10);

            // 使用 DOM API 构建搜索结果，避免 innerHTML XSS 风险
            searchResults.textContent = '';

            if (matches.length > 0) {
                matches.forEach(node => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.dataset.nodeId = node.id;

                    const cnSpan = document.createElement('span');
                    cnSpan.className = 'result-cn';
                    cnSpan.textContent = getLocalizedText(node.data, 'name');

                    const enSpan = document.createElement('span');
                    enSpan.className = 'result-en';
                    enSpan.textContent = node.data.en_name || node.data.family_en;

                    item.appendChild(cnSpan);
                    item.appendChild(enSpan);

                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.focusOnNode(parseInt(item.dataset.nodeId, 10));
                        searchResults.style.display = 'none';
                        searchInput.value = '';
                    });

                    searchResults.appendChild(item);
                });
                searchResults.style.display = 'block';
            } else {
                const noResult = document.createElement('div');
                noResult.className = 'search-result-item';
                noResult.textContent = t('noResults');
                searchResults.appendChild(noResult);
                searchResults.style.display = 'block';
            }
        }, 200);

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value.trim().toLowerCase());
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    focusOnNode(nodeId) {
        const targetNode = this.allNodes.find(n => n.id === nodeId);
        if (!targetNode) return;
        this.clearHighlight();
        let current = targetNode;
        while (current.parent) {
            if (current.parent._children) {
                current.parent.children = current.parent._children;
                current.parent._children = null;
            }
            current = current.parent;
        }
        this.update(this.root);
        setTimeout(() => {
            this.g.selectAll('.node')
                .filter(d => d.id === nodeId)
                .classed('highlighted', true)
                .raise();
        }, 50);

        const scale = isMobile() ? 1.0 : 1.5;
        const x = -targetNode.y * scale + window.innerWidth / 2;
        const y = -targetNode.x * scale + window.innerHeight / 2;
        this.svg.transition().duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
    }

    update(source) {
        let levelWidth = [1];
        const childCount = (level, n) => {
            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) levelWidth.push(0);
                levelWidth[level + 1] += n.children.length;
                n.children.forEach(d => childCount(level + 1, d));
            }
        };
        childCount(0, this.root);

        // 动态调整树高，防止重叠
        const config = getConfig('tree');
        const newHeight = Math.max(config.minHeight, d3.max(levelWidth) * config.nodeSpacing);
        this.treeTranslateExtent = [[-800, -500], [2200, newHeight + 200]];
        if (!this.isEasterEggActive) {
            this.setZoomTranslateExtent(this.treeTranslateExtent);
        }

        const treeWidth = isMobile() ? config.width.mobile : config.width.desktop;
        this.treeLayout = d3.cluster().size([newHeight, treeWidth]);
        this.treeLayout(this.root);

        this.root.descendants().forEach(d => {
            d.y = this.timeScale(d.data.divergence_time_mya || 0);
        });

        let i = 0;
        const nodes = this.root.descendants();
        const node = this.g.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter()
            .append('g')
            .attr('class', 'node')
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on('click', (e, d) => {
                e.stopPropagation();
                this.clickNode(e, d);
            });

        nodeEnter.append('circle')
            .attr('r', 1e-6);

        nodeEnter.append('text')
            .attr("dy", 4)
            .attr("x", d => d.children || d._children ? -10 : 10)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => getLocalizedText(d.data, 'name'))
            .style('fill-opacity', 1e-6)
            .on("click", (e, d) => {
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            });

        const nodeUpdate = node.merge(nodeEnter)
            .transition()
            .duration(500)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // 使用 CSS class 控制样式，不设置内联 fill 样式
        nodeUpdate.select('circle')
            .attr('r', 4.5)
            .attr('class', d => d._children ? "collapsed" : "");

        nodeUpdate.select('text')
            .style('fill-opacity', 1);

        const nodeExit = node.exit()
            .transition()
            .duration(500)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select('circle').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);

        const link = this.g.selectAll('path.link')
            .data(this.root.links(), d => d.target.id);

        const linkEnter = link.enter()
            .insert('path', "g")
            .attr("class", "link")
            .attr('d', d => {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o, true);
            });

        link.merge(linkEnter)
            .transition()
            .duration(500)
            .attr('d', d => this.diagonal(d.source, d.target));

        link.exit()
            .transition()
            .duration(500)
            .attr('d', d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o, true);
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        this.allNodes = this.root.descendants();
    }

    diagonal(s, d, isZero = false) {
        if (isZero || (s.x === d.x && s.y === d.y)) {
            return `M ${s.y} ${s.x} L ${d.y} ${d.x}`;
        }
        const radius = 12;
        const vDist = d.x - s.x;
        if (Math.abs(vDist) < radius * 2) {
            return `M ${s.y} ${s.x} L ${s.y} ${d.x} L ${d.y} ${d.x}`;
        }
        const dir = vDist > 0 ? 1 : -1;
        const curveEndX = Math.min(s.y + radius, d.y);
        return `
            M ${s.y} ${s.x}
            L ${s.y} ${d.x - radius * dir}
            Q ${s.y} ${d.x} ${curveEndX} ${d.x}
            L ${d.y} ${d.x}
        `;
    }

    initEasterEgg() {
        if (!this.ghostData) return;

        if (!this.hasValidatedGhostData) {
            this.validateGhostData();
            this.hasValidatedGhostData = true;
        }

        const btn = document.getElementById('origin-btn');
        const exitBtn = document.getElementById('exit-egg-btn');
        const githubLink = document.getElementById('github-link');

        if (btn) {
            btn.style.display = 'block';
            btn.onclick = () => this.triggerEasterEgg();
        }

        if (githubLink) {
            githubLink.style.display = 'flex';
        }

        if (exitBtn) {
            exitBtn.onclick = () => this.exitEasterEgg();
        }
    }

    markGhostSurvivorPaths(node) {
        const children = node.children || [];
        const childHasSurvivor = children.map(child => this.markGhostSurvivorPaths(child)).some(Boolean);
        node.data.hasSurvivorChild = children.some(child => child.data.survivor || child.data.hasSurvivorPath);
        node.data.hasSurvivorPath = Boolean(node.data.survivor || childHasSurvivor);
        return node.data.hasSurvivorPath;
    }

    validateGhostData() {
        if (!this.ghostData) return;

        const invalidTimes = [];
        const invalidEndTimes = [];
        const visitGhost = (node, parent = null) => {
            if (parent && typeof node.time === 'number' && typeof parent.time === 'number' && node.time > parent.time) {
                invalidTimes.push({
                    parent: parent.name,
                    parentTime: parent.time,
                    child: node.name,
                    childTime: node.time
                });
            }

            if (typeof node.time === 'number' && typeof node.end_time === 'number' && node.end_time > node.time) {
                invalidEndTimes.push({
                    node: node.name,
                    nodeTime: node.time,
                    endTime: node.end_time
                });
            }

            (node.children || []).forEach(child => visitGhost(child, node));
        };

        visitGhost(this.ghostData);

        if (invalidTimes.length || invalidEndTimes.length) {
            console.warn('Easter egg data validation issues detected.', {
                invalidTimes,
                invalidEndTimes
            });
        }
    }

    cleanGhostCnLabel(label) {
        if (!label) return '';
        return label
            .replace(/\s*[\[(（【][^)\]）】]*?(灭绝主线|灭绝|幸存主线|幸存孑遗|幸存末枝|现存恐龙)[^)\]）】]*?[\])）】]\s*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    getGhostDisplayName(data) {
        if (currentLanguage === 'zh') {
            return this.cleanGhostCnLabel(data.cn);
        }
        return data.name;
    }

    getGhostTreeWidth() {
        return isMobile() ? getConfig('tree.width.mobile') : getConfig('tree.width.desktop');
    }

    getGhostTimePosition(time, ghostTimeScale) {
        const normalizedTime = Number.isFinite(+time) ? +time : 0;
        return ghostTimeScale(Math.max(0, normalizedTime));
    }

    getGhostNodeDisplayTime(node) {
        const startTime = Number.isFinite(+node.data.time) ? +node.data.time : 0;
        const hasChildren = Boolean(node.children && node.children.length);

        if (hasChildren) {
            return startTime;
        }

        if (node.data.survivor) {
            return 0;
        }

        if (node.data.dead && Number.isFinite(+node.data.end_time)) {
            return Math.max(0, Math.min(startTime, +node.data.end_time));
        }

        return startTime;
    }

    assignGhostCoordinates(root) {
        const baseSpacing = getConfig('tree.nodeSpacing');
        const layoutStep = isMobile() ? Math.round(baseSpacing * 0.62) : Math.round(baseSpacing * 0.78);
        const layoutHeight = Math.max(root.leaves().length * layoutStep, isMobile() ? 300 : 520);
        const ghostTreeWidth = this.getGhostTreeWidth();
        const ghostTreeLayout = d3.cluster().size([layoutHeight, ghostTreeWidth]);
        const ghostMaxTime = Math.max(
            ...root.descendants().map(node => {
                const times = [node.data.time, node.data.end_time]
                    .map(value => Number.isFinite(+value) ? +value : 0);
                return Math.max(...times);
            })
        );
        const ghostTimeScale = d3.scaleLinear()
            .domain([ghostMaxTime, 0])
            .range([0, ghostTreeWidth]);
        this.ghostTimeScale = ghostTimeScale;
        ghostTreeLayout(root);
        const rootX = Number.isFinite(root.x) ? root.x : 0;

        const assignPostOrder = (node) => {
            (node.children || []).forEach(assignPostOrder);

            node.data.isAlignedToLive = false;
            node.data.display_time = this.getGhostNodeDisplayTime(node);
            node.gx = this.getGhostTimePosition(node.data.display_time, ghostTimeScale);

            if (!node.children || node.children.length === 0) {
                node.gy = (Number.isFinite(node.x) ? node.x : 0) - rootX;
                return;
            }

            const childYs = node.children
                .map(child => child.gy)
                .filter(value => Number.isFinite(value));
            node.gy = childYs.length ? d3.mean(childYs) : ((Number.isFinite(node.x) ? node.x : 0) - rootX);
        };

        const separateSiblings = (node) => {
            if (!node.children || node.children.length === 0) return;

            const freeChildren = node.children
                .filter(child => !child.data.isAlignedToLive)
                .sort((a, b) => a.x - b.x);

            if (freeChildren.length > 1) {
                const center = d3.mean(freeChildren.map(child => child.gy));
                const step = node.depth === 0
                    ? (isMobile() ? 18 : 24)
                    : node.depth === 1
                        ? (isMobile() ? 22 : 28)
                        : (isMobile() ? 26 : 34);
                const start = center - (step * (freeChildren.length - 1)) / 2;
                freeChildren.forEach((child, index) => {
                    child.gy = start + index * step;
                });
            }

            node.children.forEach(separateSiblings);

            if (!node.data.isAlignedToLive) {
                const childYs = node.children
                    .map(child => child.gy)
                    .filter(value => Number.isFinite(value));
                node.gy = childYs.length ? d3.mean(childYs) : ((Number.isFinite(node.x) ? node.x : 0) - rootX);
            }
        };

        assignPostOrder(root);
        separateSiblings(root);
        this.spreadFreeGhostLeaves(root);
        this.enforceGhostSiblingOrder(root);
        this.recenterFreeGhostAncestors(root);
    }

    spreadFreeGhostLeaves(root) {
        const freeLeaves = root.descendants()
            .filter(node => !node.data.isAlignedToLive && (!node.children || node.children.length === 0));
        const columnSnap = isMobile() ? 18 : 24;
        const minGap = isMobile() ? 26 : 34;
        const columns = d3.group(freeLeaves, node => Math.round(node.gx / columnSnap));

        columns.forEach(nodes => {
            if (nodes.length < 2) return;

            nodes.sort((a, b) => a.gy - b.gy);
            const originalCenter = d3.mean(nodes, node => node.gy);

            for (let i = 1; i < nodes.length; i++) {
                const previous = nodes[i - 1];
                const current = nodes[i];
                if (current.gy - previous.gy < minGap) {
                    current.gy = previous.gy + minGap;
                }
            }

            const shiftedCenter = d3.mean(nodes, node => node.gy);
            const recenterOffset = originalCenter - shiftedCenter;
            nodes.forEach(node => {
                node.gy += recenterOffset;
            });
        });
    }

    getGhostSubtreeBounds(node) {
        let minY = Number.isFinite(node.gy) ? node.gy : 0;
        let maxY = minY;

        (node.children || []).forEach(child => {
            const childBounds = this.getGhostSubtreeBounds(child);
            minY = Math.min(minY, childBounds.minY);
            maxY = Math.max(maxY, childBounds.maxY);
        });

        return { minY, maxY };
    }

    shiftGhostSubtree(node, delta) {
        node.gy += delta;
        (node.children || []).forEach(child => this.shiftGhostSubtree(child, delta));
    }

    enforceGhostSiblingOrder(node) {
        const children = node.children || [];
        if (!children.length) return;

        children.forEach(child => this.enforceGhostSiblingOrder(child));

        if (children.length === 1) {
            if (!node.data.isAlignedToLive) {
                node.gy = children[0].gy;
            }
            return;
        }

        const originalCenter = d3.mean(children, child => child.gy);
        const subtreeGap = node.depth === 0
            ? (isMobile() ? 4 : 6)
            : node.depth === 1
                ? (isMobile() ? 6 : 8)
                : (isMobile() ? 10 : 12);
        const bounds = children.map(child => ({
            child,
            ...this.getGhostSubtreeBounds(child)
        }));

        for (let index = 1; index < bounds.length; index++) {
            const previous = bounds[index - 1];
            const current = bounds[index];
            const delta = previous.maxY + subtreeGap - current.minY;

            if (delta > 0) {
                this.shiftGhostSubtree(current.child, delta);
                current.minY += delta;
                current.maxY += delta;
            }
        }

        const shiftedCenter = d3.mean(children, child => child.gy);
        const recenterOffset = originalCenter - shiftedCenter;
        if (Math.abs(recenterOffset) > 0.01) {
            children.forEach(child => this.shiftGhostSubtree(child, recenterOffset));
        }

        if (!node.data.isAlignedToLive) {
            node.gy = d3.mean(children, child => child.gy);
        }
    }

    buildRoundedOrthogonalPath(points, maxRadius = isMobile() ? 8 : 12) {
        const normalizedPoints = [];
        points.forEach(point => {
            if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
            const previous = normalizedPoints[normalizedPoints.length - 1];
            if (previous && previous.x === point.x && previous.y === point.y) return;
            normalizedPoints.push(point);
        });

        if (normalizedPoints.length < 2) {
            const fallback = normalizedPoints[0] || { x: 0, y: 0 };
            return `M ${fallback.x} ${fallback.y}`;
        }

        if (normalizedPoints.length === 2) {
            const [start, end] = normalizedPoints;
            return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        }

        let path = `M ${normalizedPoints[0].x} ${normalizedPoints[0].y}`;

        for (let index = 1; index < normalizedPoints.length - 1; index++) {
            const previous = normalizedPoints[index - 1];
            const current = normalizedPoints[index];
            const next = normalizedPoints[index + 1];
            const previousLength = Math.hypot(current.x - previous.x, current.y - previous.y);
            const nextLength = Math.hypot(next.x - current.x, next.y - current.y);

            if (previousLength < 0.01 || nextLength < 0.01) {
                continue;
            }

            const radius = Math.min(maxRadius, previousLength / 2, nextLength / 2);
            const entry = {
                x: current.x - ((current.x - previous.x) / previousLength) * radius,
                y: current.y - ((current.y - previous.y) / previousLength) * radius
            };
            const exit = {
                x: current.x + ((next.x - current.x) / nextLength) * radius,
                y: current.y + ((next.y - current.y) / nextLength) * radius
            };

            path += ` L ${entry.x} ${entry.y}`;
            path += ` Q ${current.x} ${current.y} ${exit.x} ${exit.y}`;
        }

        const lastPoint = normalizedPoints[normalizedPoints.length - 1];
        path += ` L ${lastPoint.x} ${lastPoint.y}`;
        return path;
    }

    ghostCurve(source, target) {
        return this.buildRoundedOrthogonalPath([
            { x: source.gx, y: source.gy },
            { x: source.gx, y: target.gy },
            { x: target.gx, y: target.gy }
        ]);
    }

    refreshGhostLanguage() {
        if (!this.ghostGroup || !this.ghostNodes || !this.ghostRoot) return;

        this.ghostNodes.select('text')
            .attr("x", d => d.children ? -12 : 12)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => this.getGhostDisplayName(d.data));

        this.resolveGhostCollisions(this.ghostGroup, this.ghostNodes, this.ghostRoot);
        this.updateGhostTranslateExtent(this.measureGhostBounds(this.ghostNodes, this.ghostRoot));
    }

    getMainTreeSelection() {
        return this.g.selectAll('.bg-group, .text-group, .node:not(.ghost), .link:not(.ghost)');
    }

    measureGhostBounds(nodeSelection, ghostRoot) {
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        ghostRoot.descendants().forEach(d => {
            minX = Math.min(minX, d.gx - 20);
            maxX = Math.max(maxX, d.gx + 20);
            minY = Math.min(minY, d.gy - 20);
            maxY = Math.max(maxY, d.gy + 20);
        });

        nodeSelection.select('text').each(function(d) {
            const box = this.getBBox();
            minX = Math.min(minX, d.gx + box.x - 18);
            maxX = Math.max(maxX, d.gx + box.x + box.width + 18);
            minY = Math.min(minY, d.gy + box.y - 12);
            maxY = Math.max(maxY, d.gy + box.y + box.height + 12);
        });

        return { minX, maxX, minY, maxY };
    }

    recenterFreeGhostAncestors(node) {
        (node.children || []).forEach(child => this.recenterFreeGhostAncestors(child));

        if (!node.data.isAlignedToLive && node.children && node.children.length > 0) {
            const childYs = node.children
                .map(child => child.gy)
                .filter(value => Number.isFinite(value));
            if (childYs.length) {
                node.gy = d3.mean(childYs);
            }
        }
    }

    refreshGhostGeometry(ghostGroup, gNodes) {
        gNodes.attr("transform", d => `translate(${d.gx},${d.gy})`);
        ghostGroup.selectAll(".link.ghost.ghost-branch")
            .attr("d", d => this.ghostCurve(d.source, d.target));
        const presentX = this.ghostTimeScale
            ? this.getGhostTimePosition(0, this.ghostTimeScale)
            : this.getGhostTreeWidth();
        ghostGroup.selectAll(".link.ghost.survivor-extension")
            .attr("d", d => `M ${d.gx} ${d.gy} L ${presentX} ${d.gy}`);
    }

    updateGhostTranslateExtent(bounds) {
        const minX = bounds.minX - (isMobile() ? 24 : 32);
        const maxX = bounds.maxX + (isMobile() ? 36 : 48);
        const minY = bounds.minY - (isMobile() ? 28 : 36);
        const maxY = bounds.maxY + (isMobile() ? 36 : 44);
        const extentPaddingX = Math.max(window.innerWidth * (isMobile() ? 0.4 : 0.5), isMobile() ? 180 : 260);
        const extentPaddingY = Math.max(window.innerHeight * (isMobile() ? 0.32 : 0.4), isMobile() ? 140 : 220);

        this.setZoomTranslateExtent([
            [minX - extentPaddingX, minY - extentPaddingY],
            [maxX + extentPaddingX, maxY + extentPaddingY]
        ]);

        return { minX, maxX, minY, maxY };
    }

    collectGhostBoxes(gNodes) {
        const boxes = [];
        gNodes.each(function(d) {
            const textNode = this.querySelector('text');
            const textBox = textNode ? textNode.getBBox() : { x: 0, y: 0, width: 0, height: 0 };
            const radius = 4;
            const left = Math.min(d.gx - radius, d.gx + textBox.x);
            const right = Math.max(d.gx + radius, d.gx + textBox.x + textBox.width);
            const top = Math.min(d.gy - radius, d.gy + textBox.y);
            const bottom = Math.max(d.gy + radius, d.gy + textBox.y + textBox.height);
            let boxLeft = left;
            let boxRight = right;
            let boxTop = top;
            let boxBottom = bottom;

            const isLeaf = !d.children || d.children.length === 0;
            if (isLeaf && d.parent) {
                const terminalStartX = Math.min(d.gx, d.parent.gx);
                const lineHalfHeight = isMobile() ? 5 : 6;

                boxLeft = Math.min(boxLeft, terminalStartX);
                boxRight = Math.max(boxRight, d.gx);
                boxTop = Math.min(boxTop, d.gy - lineHalfHeight);
                boxBottom = Math.max(boxBottom, d.gy + lineHalfHeight);
            }

            boxes.push({
                d,
                left: boxLeft,
                right: boxRight,
                top: boxTop,
                bottom: boxBottom,
                movable: !d.data.isAlignedToLive
            });
        });
        return boxes.sort((a, b) => (a.top - b.top) || (a.left - b.left));
    }

    boxesOverlap(a, b) {
        const paddingX = isMobile() ? 18 : 24;
        const paddingY = isMobile() ? 8 : 12;
        const aLeft = a.left - paddingX / 2;
        const aRight = a.right + paddingX / 2;
        const bLeft = b.left - paddingX / 2;
        const bRight = b.right + paddingX / 2;
        const aTop = a.top - paddingY / 2;
        const aBottom = a.bottom + paddingY / 2;
        const bTop = b.top - paddingY / 2;
        const bBottom = b.bottom + paddingY / 2;

        const xOverlap = aLeft < bRight && bLeft < aRight;
        const yOverlap = aTop < bBottom && bTop < aBottom;

        return xOverlap && yOverlap;
    }

    resolveGhostCollisions(ghostGroup, gNodes, ghostRoot) {
        const maxPasses = 48;
        const minGap = isMobile() ? 8 : 10;

        for (let pass = 0; pass < maxPasses; pass++) {
            this.recenterFreeGhostAncestors(ghostRoot);
            this.refreshGhostGeometry(ghostGroup, gNodes);

            const boxes = this.collectGhostBoxes(gNodes)
                .filter(box => !box.d.children || box.d.children.length === 0);
            let moved = false;

            outer:
            for (let i = 0; i < boxes.length; i++) {
                const upper = boxes[i];

                for (let j = i + 1; j < boxes.length; j++) {
                    const lower = boxes[j];
                    if (lower.top > upper.bottom + minGap) break;
                    if (!this.boxesOverlap(upper, lower)) continue;

                    const delta = upper.bottom + minGap - lower.top;
                    if (delta <= 0) continue;

                    if (upper.movable && lower.movable) {
                        upper.d.gy -= delta / 2;
                        lower.d.gy += delta / 2;
                    } else if (lower.movable) {
                        lower.d.gy += delta;
                    } else if (upper.movable) {
                        upper.d.gy -= delta;
                    } else {
                        continue;
                    }

                    this.enforceGhostSiblingOrder(ghostRoot);
                    moved = true;
                    break outer;
                }
            }

            if (!moved) {
                break;
            }
        }

        this.recenterFreeGhostAncestors(ghostRoot);
        this.refreshGhostGeometry(ghostGroup, gNodes);
    }

    triggerEasterEgg() {
        if (this.isEasterEggActive || !this.ghostData) return;
        this.svg.interrupt();
        this.g.interrupt();
        this.g.selectAll("*").interrupt();
        this.isEasterEggActive = true;
        this.savedTransform = this.currentTransform;

        const ghostRoot = d3.hierarchy(this.ghostData);
        this.markGhostSurvivorPaths(ghostRoot);
        this.assignGhostCoordinates(ghostRoot);
        const ghostGroup = this.g.insert("g", ":first-child")
            .attr("class", "ghost-layer");
        this.ghostRoot = ghostRoot;
        this.ghostGroup = ghostGroup;

        const getGhostLinkClass = (d) => {
            if (d.target.data.hasSurvivorPath) return "link ghost survivor-line";
            return "link ghost";
        };

        ghostGroup.selectAll(".link.ghost.ghost-branch")
            .data(ghostRoot.links())
            .enter()
            .append("path")
            .attr("class", d => `${getGhostLinkClass(d)} ghost-branch`)
            .attr("d", d => this.ghostCurve(d.source, d.target))
            .style("opacity", 0)
            .transition()
            .duration(2000)
            .style("opacity", d => d.target.data.hasSurvivorPath ? 0.8 : 0.3);

        const survivorExtensions = ghostRoot.descendants()
            .filter(d => d.data.survivor && d.children && !d.children.some(child => child.data.hasSurvivorPath));
        const presentX = this.ghostTimeScale
            ? this.getGhostTimePosition(0, this.ghostTimeScale)
            : this.getGhostTreeWidth();

        ghostGroup.selectAll(".link.ghost.survivor-extension")
            .data(survivorExtensions)
            .enter()
            .append("path")
            .attr("class", "link ghost survivor-line survivor-extension")
            .attr("d", d => `M ${d.gx} ${d.gy} L ${presentX} ${d.gy}`)
            .style("opacity", 0)
            .transition()
            .duration(2000)
            .style("opacity", 0.8);

        const gNodes = ghostGroup.selectAll(".node.ghost")
            .data(ghostRoot.descendants())
            .enter()
            .append("g")
            .attr("class", "node ghost")
            .attr("transform", d => `translate(${d.gx},${d.gy})`)
            .on("click", (e, d) => {
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            });
        this.ghostNodes = gNodes;

        gNodes.append("circle")
            .attr("r", 4)
            .style("opacity", 0)
            .transition()
            .duration(2000)
            .style("opacity", 0.6);

        gNodes.append("text")
            .attr("dy", 4)
            .attr("x", d => d.children ? -12 : 12)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => this.getGhostDisplayName(d.data))
            .style("opacity", 0)
            .transition()
            .duration(2000)
            .style("opacity", 0.8);

        this.resolveGhostCollisions(ghostGroup, gNodes, ghostRoot);

        const bounds = this.measureGhostBounds(gNodes, ghostRoot);
        const { minX, maxX, minY, maxY } = this.updateGhostTranslateExtent(bounds);
        const viewWidth = Math.max(1, maxX - minX);
        const viewHeight = Math.max(1, maxY - minY);
        const scale = Math.min(window.innerWidth / viewWidth, window.innerHeight / viewHeight) * (isMobile() ? 1.01 : 0.99);
        const transform = d3.zoomIdentity
            .translate(
                window.innerWidth / 2 - ((minX + maxX) / 2) * scale,
                window.innerHeight / 2 - ((minY + maxY) / 2) * scale
            )
            .scale(scale);

        this.svg.transition()
            .duration(3000)
            .ease(d3.easeCubicInOut)
            .call(this.zoom.transform, transform);

        this.getMainTreeSelection()
            .transition()
            .duration(2000)
            .style("opacity", 0)
            .on("end", function() {
                d3.select(this).style("display", "none");
            });

        document.getElementById('top-controls').style.display = 'none';
        document.getElementById('origin-btn').style.display = 'none';
        const githubLink = document.getElementById('github-link');
        if (githubLink) {
            githubLink.style.display = 'none';
        }
        document.getElementById('time-axis').style.opacity = 0;

        const overlay = document.getElementById('easter-egg-overlay');
        const mainText = document.querySelector('.ee-text-main');
        const exitBtn = document.getElementById('exit-egg-btn');

        overlay.classList.add('interactive');
        overlay.style.opacity = 1;
        if (mainText) {
            mainText.style.opacity = 1;
            mainText.style.transform = 'translateY(0)';
        }

        const enterExploreMode = () => {
            if (mainText) mainText.style.opacity = 0;
            overlay.classList.remove('interactive');
            setTimeout(() => {
                overlay.style.opacity = 0;
            }, 500);
            exitBtn.classList.add('visible');
        };

        this.skipHandler = () => {
            if (this.textTimer) clearTimeout(this.textTimer);
            enterExploreMode();
        };
        overlay.addEventListener('click', this.skipHandler, { once: true });

        this.textTimer = setTimeout(() => {
            overlay.removeEventListener('click', this.skipHandler);
            enterExploreMode();
        }, 2000);
    }

    exitEasterEgg() {
        if (!this.isEasterEggActive) return;
        this.svg.interrupt();
        this.g.interrupt();
        this.g.selectAll("*").interrupt();

        const exitBtn = document.getElementById('exit-egg-btn');
        const overlay = document.getElementById('easter-egg-overlay');
        const mainText = document.querySelector('.ee-text-main');

        if (this.textTimer) {
            clearTimeout(this.textTimer);
            this.textTimer = null;
        }
        if (this.skipHandler) {
            overlay.removeEventListener('click', this.skipHandler);
            this.skipHandler = null;
        }

        exitBtn.classList.remove('visible');
        if (mainText) {
            mainText.style.opacity = 0;
            setTimeout(() => {
                mainText.style.transform = 'translateY(20px)';
            }, 500);
        }
        overlay.classList.remove('interactive');
        overlay.style.opacity = 0;

        this.g.selectAll(".ghost-layer")
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove();
        this.ghostRoot = null;
        this.ghostGroup = null;
        this.ghostNodes = null;

        this.getMainTreeSelection()
            .style("display", null)
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

        this.setZoomTranslateExtent(this.treeTranslateExtent);
        if (this.savedTransform) {
            this.svg.transition()
                .duration(1500)
                .ease(d3.easeCubicOut)
                .call(this.zoom.transform, this.savedTransform);
            this.currentTransform = this.savedTransform;
        }

        setTimeout(() => {
            document.getElementById('top-controls').style.display = 'flex';
            document.getElementById('origin-btn').style.display = 'block';
            const githubLink = document.getElementById('github-link');
            if (githubLink) {
                githubLink.style.display = 'flex';
            }
            document.getElementById('time-axis').style.opacity = 1;
            this.isEasterEggActive = false;
        }, 1500);
    }

    clickNode(event, d) {
        if (this.isEasterEggActive) return;
        if (event.target.tagName === 'text') return;

        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        this.update(d);
    }

}

/** Class 4: AppManager (主控制器) */
class AppManager {
    constructor() {
        this.ui = {
            loading: document.getElementById('loading-screen'),
            introLayer: document.getElementById('ui-layer'),
            enterBtn: document.getElementById('enter-btn'),
            modal: document.getElementById('modal'),
            modalClose: document.querySelector('.modal-close'),
            infoModal: document.getElementById('info-modal'),
            infoBtn: document.getElementById('btn-info'),
            infoClose: document.getElementById('info-close'),
            vizContainer: document.getElementById('container-viz'),
            timeAxis: document.getElementById('time-axis'),
            topControls: document.getElementById('top-controls'),
            paperTexture: document.getElementById('paper-texture')
        };
        this.particleBg = null;
        this.helixApp = null;
        this.treeApp = null;
        this.rawData = null;
        this.activeModalData = null;
    }

    start() {
        // 尽早启动图片数据异步加载（约 10.1MB，不阻塞首屏）
        loadImageData();
        window.addEventListener('local-images-ready', refreshRenderedImages);

        window.onload = () => {
            const projectData = (typeof sauropsidaData !== 'undefined')
                ? sauropsidaData
                : ((typeof mammalsData !== 'undefined') ? mammalsData : null);

            if (!projectData) {
                alert("错误：未找到项目数据，请确保 data.js 已正确加载。");
                return;
            }

            this.rawData = projectData;

            // 初始化语言
            updateUILanguage();

            // 移动端减少纹理渲染以提升性能
            if (!isMobile() && this.ui.paperTexture) {
                const textureUrl = DOMUtils.generatePaperTexture();
                this.ui.paperTexture.style.backgroundImage = `url(${textureUrl})`;
            }

            this.particleBg = new ParticleBackground('container-particles');
            this.init3DScene();

            if (this.ui.loading) {
                this.ui.loading.style.opacity = 0;
                setTimeout(() => this.ui.loading.style.display = 'none', 500);
            }
        };

        if (this.ui.enterBtn) {
            this.ui.enterBtn.addEventListener('click', () => this.transitionToTree());
        }

        // 绑定资料模态框事件
        if (this.ui.modalClose) {
            this.ui.modalClose.addEventListener('click', () => this.closeModal(this.ui.modal));
        }
        if (this.ui.modal) {
            this.ui.modal.addEventListener('click', (e) => {
                if (e.target === this.ui.modal) this.closeModal(this.ui.modal);
            });
        }

        // 绑定信息模态框事件
        if (this.ui.infoBtn) {
            this.ui.infoBtn.addEventListener('click', () => {
                if (this.ui.infoModal) this.ui.infoModal.style.display = 'flex';
            });
        }
        if (this.ui.infoClose) {
            this.ui.infoClose.addEventListener('click', () => this.closeModal(this.ui.infoModal));
        }
        if (this.ui.infoModal) {
            this.ui.infoModal.addEventListener('click', (e) => {
                if (e.target === this.ui.infoModal) this.closeModal(this.ui.infoModal);
            });
        }

        // ESC 键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.treeApp && this.treeApp.isEasterEggActive) {
                    this.treeApp.exitEasterEgg();
                }
                if (this.ui.modal && this.ui.modal.style.display !== 'none') {
                    this.closeModal(this.ui.modal);
                }
                if (this.ui.infoModal && this.ui.infoModal.style.display !== 'none') {
                    this.closeModal(this.ui.infoModal);
                }
            }
        });

        // 添加语言切换按钮事件
        this.setupLanguageSwitch();
    }

    setupLanguageSwitch() {
        const langBtn = document.getElementById('lang-switch');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
                switchLanguage(newLang);
                langBtn.textContent = newLang === 'zh' ? 'EN' : '中';

                // 更新演化树节点文本
                if (this.treeApp && this.treeApp.g) {
                    this.treeApp.g.selectAll('.node text')
                        .text(d => getLocalizedText(d.data, 'name'));
                }

                // 更新地质年代标签
                if (this.treeApp && this.treeApp.textGroup) {
                    this.treeApp.textGroup.selectAll(".epoch-label")
                        .text(d => d.name[currentLanguage]);
                }

                if (this.treeApp) {
                    this.treeApp.refreshGhostLanguage();
                }

                if (this.helixApp) {
                    this.helixApp.refreshLanguage();
                }

                if (this.activeModalData && this.ui.modal && this.ui.modal.style.display !== 'none') {
                    this.showModal(this.activeModalData);
                }
            });
        }
    }

    init3DScene() {
        // 使用性能工具计算卡片数量
        const dynamicCount = PerformanceUtils.calculateCardCount();

        const flatData = this.rawData.families
            .map(fam => ({
                cn_name: fam.family_cn,
                en_name: fam.family_en,
                description: fam.description,
                en_description: fam.en_description,
                taxonomy: fam.taxonomy,
                terminal_rank: fam.terminal_rank,
                terminal_rank_cn: fam.terminal_rank_cn,
                terminal_rank_en: fam.terminal_rank_en,
                representative_species: fam.representative_species,
                divergence_time_mya: fam.divergence_time_mya,
                image_url: fam.image_url,
                isHero: Math.random() < 0.2
            }))
            .sort(() => Math.random() - 0.5)
            .slice(0, dynamicCount);

        this.helixApp = new HelixViewer('container-3d', flatData, (data) => this.showModal(data));
    }

    transitionToTree() {
        if (this.ui.introLayer) this.ui.introLayer.style.opacity = 0;

        if (this.particleBg) this.particleBg.fadeOut(1500);

        this.helixApp.zoomInAndEnd(() => {
            if (this.ui.introLayer) this.ui.introLayer.style.display = 'none';
            document.body.style.backgroundColor = 'var(--bg-color)';
            document.body.style.color = 'var(--text-color)';

            if (this.particleBg) {
                setTimeout(() => this.particleBg.dispose(), 500);
            }

            if (this.ui.vizContainer) this.ui.vizContainer.style.display = 'block';
            if (this.ui.timeAxis) this.ui.timeAxis.style.display = 'flex';
            if (this.ui.topControls) this.ui.topControls.style.display = 'flex';

            if (!isMobile() && this.ui.paperTexture) {
                this.ui.paperTexture.style.display = 'block';
            }

            this.treeApp = new EvolutionTree('container-viz', this.rawData, (data) => this.showModal(data));
            this.treeApp.init();
            this.treeApp.initEasterEgg();
        });
    }

    showModal(data) {
        this.activeModalData = data;

        const els = {
            cn: document.getElementById('modal-cn'),
            en: document.getElementById('modal-en'),
            desc: document.getElementById('modal-desc'),
            img: document.getElementById('modal-img'),
            tags: document.getElementById('modal-tags')
        };

        const primaryName = getLocalizedText(data, 'name');
        const secondaryName = getComplementaryName(data);

        if (els.cn) els.cn.textContent = primaryName;
        if (els.en) {
            els.en.textContent = secondaryName && secondaryName !== primaryName ? secondaryName : "";
            els.en.style.display = els.en.textContent ? 'inline' : 'none';
        }
        if (els.desc) els.desc.textContent = getLocalizedText(data, 'description');

        // 使用 DOM API 构建标签，避免 innerHTML XSS 风险
        if (els.tags) {
            els.tags.textContent = '';
            const isZh = currentLanguage === 'zh';
            if (data.status_label_cn || data.status_label_en) {
                const statusTag = document.createElement('span');
                statusTag.className = 'info-tag';
                statusTag.textContent = isZh
                    ? (data.status_label_cn || '')
                    : (data.status_label_en || data.status_label_cn || '');
                els.tags.appendChild(statusTag);
            }
            const localizedTimeRange = getLocalizedTimeRange(data);
            if (localizedTimeRange) {
                const rangeTag = document.createElement('span');
                rangeTag.className = 'info-tag';
                rangeTag.textContent = isZh
                    ? `生存区间: ${localizedTimeRange}`
                    : `Time span: ${localizedTimeRange}`;
                els.tags.appendChild(rangeTag);
            }
            if (data.origin_time_mya) {
                const originTag = document.createElement('span');
                originTag.className = 'info-tag';
                originTag.textContent = isZh
                    ? `首次出现: ${data.origin_time_mya} MYA`
                    : `First appearance: ${data.origin_time_mya} MYA`;
                els.tags.appendChild(originTag);
            }
            if (data.terminal_rank_cn) {
                const rankTag = document.createElement('span');
                rankTag.className = 'info-tag';
                rankTag.textContent = isZh
                    ? `末级等级: ${data.terminal_rank_cn}`
                    : `Terminal rank: ${data.terminal_rank_en || getLocalizedRankLabel(data.terminal_rank)}`;
                els.tags.appendChild(rankTag);
            }
            if (data.representative_species) {
                const speciesTag = document.createElement('span');
                speciesTag.className = 'info-tag';
                speciesTag.textContent = isZh
                    ? `代表物种: ${data.representative_species}`
                    : `Representative species: ${data.representative_species}`;
                els.tags.appendChild(speciesTag);
            }
            if (data.divergence_time_mya) {
                const timeTag = document.createElement('span');
                timeTag.className = 'info-tag';
                timeTag.textContent = isZh
                    ? `分化时间: ${data.divergence_time_mya} MYA`
                    : `Divergence: ${data.divergence_time_mya} MYA`;
                els.tags.appendChild(timeTag);
            }
            if (data.taxonomy) {
                Object.entries(data.taxonomy).forEach(([rank, name]) => {
                    const tag = document.createElement('span');
                    tag.className = 'info-tag';
                    tag.textContent = `${getLocalizedRankLabel(rank)}: ${name}`;
                    els.tags.appendChild(tag);
                });
            }
        }

        const familyEn = data.family_en || data.en_name;
        const imgBase64 = getImage(familyEn, data.image_url || '');

        if (els.img) {
            els.img.dataset.imageKey = familyEn;
            els.img.dataset.fallbackSrc = data.image_url || '';
            if (imgBase64) {
                els.img.style.display = "block";
                els.img.src = imgBase64;
                els.img.alt = getLocalizedText(data, 'name');
                els.img.onerror = () => {
                    els.img.style.display = 'none';
                };
            } else {
                els.img.style.display = "none";
            }
        }

        if (this.ui.modal) this.ui.modal.style.display = 'flex';
    }

    closeModal(modalElement) {
        if (modalElement) modalElement.style.display = 'none';
        if (modalElement === this.ui.modal) {
            this.activeModalData = null;
        }
    }
}

const app = new AppManager();
app.start();
