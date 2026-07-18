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
        this.axisWidth = 0;
        this.viewHeight = window.innerHeight;
        this.searchNodes = [];
        this.searchInput = null;
        this.searchResults = null;
        this.performSearch = null;
        this._searchInputHandler = null;
        this._searchKeydownHandler = null;
        this._documentClickHandler = null;
        this._originClickHandler = null;
        this.disposed = false;
        this.ghostData = (typeof EASTER_EGG_DATA !== 'undefined') ? EASTER_EGG_DATA : null;
        this.ghostRoot = null;
        this.ghostGroup = null;
        this.ghostNodes = null;
        this.savedTransform = null;
        this.skipHandler = null;
        this.textTimer = null;
        this.hasValidatedGhostData = false;
        this.treeTranslateExtent = getConfig('tree.zoom.translateExtent');
        this._onResize = PerformanceUtils.debounce(() => this.handleResize(), 120);
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) throw new Error(`Missing tree container: ${this.containerId}`);
        container.innerHTML = '';

        this.axisWidth = this.getTimelineWidth();
        this.viewHeight = window.innerHeight;

        this.root = DataUtils.buildHierarchy(this.rawData);
        this.searchNodes = Object.freeze(this.root.descendants());
        this.allNodes = this.searchNodes;
        this.root.x0 = 0;
        this.root.y0 = 0;
        this.maxTime = Math.max(...this.root.descendants().map(d => d.data.divergence_time_mya || 0));
        this.axisMax = Math.ceil(this.maxTime / 25) * 25;

        this.svg = d3.select("#" + this.containerId)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("role", "tree")
            .attr("aria-label", t('treeLabel'));

        this.svg.on("click", (e) => {
            if (!e.target.closest('.node')) this.clearHighlight();
        });

        this.g = this.svg.append("g").attr("class", "tree-layer");
        this.timeScale = d3.scaleLinear().domain([this.axisMax, 0]).range([0, this.axisWidth]);

        this.drawBackground();
        this.setupTimeAxis();
        this.setupZoom();
        this.setupSearch();
        this.setupTreeControls();

        this.treeLayout = d3.cluster().size([this.viewHeight, this.axisWidth]);
        this.update(this.root, { animate: false });

        window.removeEventListener('resize', this._onResize);
        window.addEventListener('resize', this._onResize);
    }

    setupTreeControls() {
        const expandButton = document.getElementById('btn-expand-all');
        const collapseButton = document.getElementById('btn-collapse-all');
        if (expandButton) expandButton.onclick = () => this.expandOneLevel();
        if (collapseButton) collapseButton.onclick = () => this.collapseOneLevel();
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
        this.g.selectAll('.node:not(.ghost)').classed('highlighted', false);
        this.setSearchExpanded(false);
    }

    getTimelineWidth() {
        const axisSvg = document.getElementById('axis-svg');
        const axisWidth = axisSvg?.getBoundingClientRect().width || axisSvg?.clientWidth || 0;
        if (axisWidth > 0) return axisWidth;

        const container = document.getElementById(this.containerId);
        return container?.getBoundingClientRect().width || container?.clientWidth || window.innerWidth;
    }

    drawBackground() {
        this.g.selectAll(".bg-group, .text-group").remove();
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

    setupZoom() {
        const config = getConfig('tree.zoom');
        const initialScale = isMobile()
            ? config.initialScale.mobile
            : config.initialScale.desktop;
        const initialX = isMobile()
            ? config.initialX.mobile
            : config.initialX.desktop;
        const [[minX, minY], [, maxY]] = config.translateExtent;

        this.zoom = d3.zoom()
            .extent(this.getZoomViewportExtent())
            .scaleExtent(config.scaleExtent)
            .translateExtent([[minX, minY], [this.axisWidth + 500, maxY]])
            .on("zoom", (e) => {
                this.g.attr("transform", e.transform);

                const centerY = (this.viewHeight / 2 - e.transform.y) / e.transform.k;
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
                .translate(initialX, this.viewHeight / 2 - 50)
                .scale(initialScale));

        this.currentTransform = d3.zoomIdentity
            .translate(initialX, this.viewHeight / 2 - 50)
            .scale(initialScale);

        // 鼠标移动事件
        this.svg.on("mousemove", (e) => this.updateTimeIndicator(e));

        // 移动端触摸事件
        this.svg.on("touchmove", (e) => {
            const touch = e.touches[0];
            this.updateTimeIndicator({ clientX: touch.clientX });
        });
    }

    handleResize() {
        if (!this.svg || !this.root || !this.zoom || !this.timeScale || this.isEasterEggActive) return;

        const previousScale = this.timeScale.copy();
        const previousTransform = this.currentTransform || d3.zoomIdentity;
        const visibleDomain = previousTransform.rescaleX(previousScale).domain();
        const newAxisWidth = this.getTimelineWidth();
        if (!newAxisWidth) return;

        this.axisWidth = newAxisWidth;
        this.viewHeight = window.innerHeight;
        this.timeScale.range([0, this.axisWidth]);
        this.treeLayout = d3.cluster().size([this.viewHeight, this.axisWidth]);

        this.drawBackground();
        this.setupTimeAxis();
        this.update(this.root, { animate: false });

        const worldStart = this.timeScale(visibleDomain[0]);
        const worldEnd = this.timeScale(visibleDomain[1]);
        const worldSpan = Math.abs(worldEnd - worldStart) || 1;
        const nextScale = this.axisWidth / worldSpan;
        const nextX = -nextScale * Math.min(worldStart, worldEnd);
        const nextTransform = d3.zoomIdentity
            .translate(nextX, previousTransform.y)
            .scale(nextScale);

        this.svg.call(this.zoom.transform, nextTransform);
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

    setSearchExpanded(expanded) {
        if (!this.searchInput || !this.searchResults) return;
        this.searchResults.style.display = expanded ? 'block' : 'none';
        this.searchInput.setAttribute('aria-expanded', String(expanded));
    }

    setupSearch() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        if (!this.searchInput || !this.searchResults) return;

        this.performSearch?.cancel();
        if (this._searchInputHandler) this.searchInput.removeEventListener('input', this._searchInputHandler);
        if (this._searchKeydownHandler) this.searchInput.removeEventListener('keydown', this._searchKeydownHandler);
        if (this._documentClickHandler) document.removeEventListener('click', this._documentClickHandler);

        this.performSearch = PerformanceUtils.debounce((query) => {
            if (query.length < 1) {
                this.setSearchExpanded(false);
                return;
            }

            const matches = this.searchNodes.filter(node => {
                const searchable = [
                    node.data.cn_name,
                    node.data.family_cn,
                    node.data.en_name,
                    node.data.family_en,
                    node.data.scientific_name,
                    node.data.representative_species
                ].filter(Boolean).join(' ').toLowerCase();
                return searchable.includes(query);
            }).slice(0, 10);

            this.searchResults.textContent = '';
            if (matches.length > 0) {
                matches.forEach(node => {
                    const item = document.createElement('button');
                    item.type = 'button';
                    item.className = 'search-result-item';
                    item.setAttribute('role', 'option');
                    item.dataset.nodeId = node.id;

                    const primary = document.createElement('span');
                    primary.className = 'result-cn';
                    primary.textContent = getLocalizedText(node.data, 'name');

                    const secondary = document.createElement('span');
                    secondary.className = 'result-en';
                    secondary.textContent = getComplementaryName(node.data);

                    item.append(primary, secondary);
                    item.addEventListener('click', event => {
                        event.stopPropagation();
                        this.focusOnNode(parseInt(item.dataset.nodeId, 10));
                        this.setSearchExpanded(false);
                        this.searchInput.value = '';
                        this.searchInput.focus();
                    });
                    this.searchResults.appendChild(item);
                });
            } else {
                const noResult = document.createElement('div');
                noResult.className = 'search-result-item';
                noResult.setAttribute('role', 'status');
                noResult.textContent = t('noResults');
                this.searchResults.appendChild(noResult);
            }
            this.setSearchExpanded(true);
        }, 200);

        this._searchInputHandler = event => {
            this.performSearch(event.target.value.trim().toLowerCase());
        };
        this._searchKeydownHandler = event => {
            if (event.key === 'Escape') {
                this.setSearchExpanded(false);
            } else if (event.key === 'ArrowDown') {
                const firstResult = this.searchResults.querySelector('button');
                if (firstResult) {
                    event.preventDefault();
                    firstResult.focus();
                }
            }
        };
        this.searchInput.addEventListener('input', this._searchInputHandler);
        this.searchInput.addEventListener('keydown', this._searchKeydownHandler);

        this._documentClickHandler = event => {
            if (!event.target.closest('#search-container')) this.setSearchExpanded(false);
        };
        document.addEventListener('click', this._documentClickHandler);
    }

    focusOnNode(nodeId) {
        const targetNode = this.searchNodes.find(n => n.id === nodeId);
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
            this.g.selectAll('.node:not(.ghost)')
                .filter(d => d.id === nodeId)
                .classed('highlighted', true)
                .raise();
        }, 50);

        const scale = isMobile() ? 1.0 : 1.5;
        const x = -targetNode.y * scale + window.innerWidth / 2;
        const y = -targetNode.x * scale + window.innerHeight / 2;
        this.svg.transition().duration(prefersReducedMotion() ? 0 : 750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
    }

    update(source, options = {}) {
        const duration = options.animate === false || prefersReducedMotion() ? 0 : 500;
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
        this.treeTranslateExtent = [[-800, -500], [this.axisWidth + 200, newHeight + 200]];
        if (!this.isEasterEggActive) {
            this.setZoomTranslateExtent(this.treeTranslateExtent);
        }

        this.treeLayout = d3.cluster().size([newHeight, this.axisWidth]);
        this.treeLayout(this.root);

        this.root.descendants().forEach(d => {
            d.y = this.timeScale(d.data.divergence_time_mya || 0);
        });

        let i = 0;
        const nodes = this.root.descendants();
        const node = this.g.selectAll('g.node:not(.ghost)')
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter()
            .append('g')
            .attr('class', 'node')
            .attr('role', 'treeitem')
            .attr('tabindex', 0)
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on('click', (e, d) => {
                e.stopPropagation();
                this.clickNode(e, d);
            })
            .on('keydown', (e, d) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                e.stopPropagation();
                if (d.children || d._children) {
                    this.clickNode(e, d);
                } else if (this.onNodeClick) {
                    this.onNodeClick(d.data);
                }
            });

        nodeEnter.append('circle')
            .attr('r', 1e-6);

        nodeEnter.append('text')
            .attr('role', 'button')
            .attr('tabindex', 0)
            .attr("dy", 4)
            .attr("x", d => d.children || d._children ? -10 : 10)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => getLocalizedText(d.data, 'name'))
            .style('fill-opacity', 1e-6)
            .on("click", (e, d) => {
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            })
            .on('keydown', (e, d) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            });

        const nodeMerge = node.merge(nodeEnter)
            .attr('aria-label', d => getLocalizedText(d.data, 'name'))
            .attr('aria-expanded', d => d.children || d._children ? String(Boolean(d.children)) : null);

        const nodeUpdate = nodeMerge
            .transition()
            .duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // 使用 CSS class 控制样式，不设置内联 fill 样式
        nodeUpdate.select('circle')
            .attr('r', 4.5)
            .attr('class', d => d._children ? "collapsed" : "");

        nodeUpdate.select('text')
            .attr('aria-label', d => `${t('openDetails')}: ${getLocalizedText(d.data, 'name')}`)
            .attr("x", d => d.children || d._children ? -10 : 10)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .style('fill-opacity', 1);

        const nodeExit = node.exit()
            .transition()
            .duration(duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select('circle').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);

        const link = this.g.selectAll('path.link:not(.ghost)')
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
            .duration(duration)
            .attr('d', d => this.diagonal(d.source, d.target));

        link.exit()
            .transition()
            .duration(duration)
            .attr('d', d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o, true);
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        this.allNodes = this.searchNodes;
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
            this._originClickHandler = () => this.triggerEasterEgg();
            btn.onclick = this._originClickHandler;
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

        this.ghostNodes.attr('aria-label', d => this.getGhostDisplayName(d.data));
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
        const revealDuration = prefersReducedMotion() ? 0 : 2000;
        const cameraDuration = prefersReducedMotion() ? 0 : 3000;
        const overlayDelay = prefersReducedMotion() ? 0 : 500;
        const textDuration = prefersReducedMotion() ? 0 : 2000;
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
            .duration(revealDuration)
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
            .duration(revealDuration)
            .style("opacity", 0.8);

        const gNodes = ghostGroup.selectAll(".node.ghost")
            .data(ghostRoot.descendants())
            .enter()
            .append("g")
            .attr("class", "node ghost")
            .attr('role', 'treeitem')
            .attr('tabindex', 0)
            .attr('aria-label', d => this.getGhostDisplayName(d.data))
            .attr("transform", d => `translate(${d.gx},${d.gy})`)
            .on("click", (e, d) => {
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            })
            .on('keydown', (e, d) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                e.stopPropagation();
                if (this.onNodeClick) this.onNodeClick(d.data);
            });
        this.ghostNodes = gNodes;

        gNodes.append("circle")
            .attr("r", 4)
            .style("opacity", 0)
            .transition()
            .duration(revealDuration)
            .style("opacity", 0.6);

        gNodes.append("text")
            .attr("dy", 4)
            .attr("x", d => d.children ? -12 : 12)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => this.getGhostDisplayName(d.data))
            .style("opacity", 0)
            .transition()
            .duration(revealDuration)
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
            .duration(cameraDuration)
            .ease(d3.easeCubicInOut)
            .call(this.zoom.transform, transform);

        this.getMainTreeSelection()
            .transition()
            .duration(revealDuration)
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
            }, overlayDelay);
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
        }, textDuration);
    }

    exitEasterEgg() {
        if (!this.isEasterEggActive) return;
        const textDelay = prefersReducedMotion() ? 0 : 500;
        const exitDuration = prefersReducedMotion() ? 0 : 1000;
        const restoreDuration = prefersReducedMotion() ? 0 : 1500;
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
            }, textDelay);
        }
        overlay.classList.remove('interactive');
        overlay.style.opacity = 0;

        this.g.selectAll(".ghost-layer")
            .transition()
            .duration(exitDuration)
            .style("opacity", 0)
            .remove();
        this.ghostRoot = null;
        this.ghostGroup = null;
        this.ghostNodes = null;

        this.getMainTreeSelection()
            .style("display", null)
            .style("opacity", 0)
            .transition()
            .duration(exitDuration)
            .style("opacity", 1);

        this.setZoomTranslateExtent(this.treeTranslateExtent);
        if (this.savedTransform) {
            this.svg.transition()
                .duration(restoreDuration)
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
        }, restoreDuration);
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

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        window.removeEventListener('resize', this._onResize);
        this._onResize.cancel?.();
        this.performSearch?.cancel();
        if (this.searchInput && this._searchInputHandler) {
            this.searchInput.removeEventListener('input', this._searchInputHandler);
        }
        if (this.searchInput && this._searchKeydownHandler) {
            this.searchInput.removeEventListener('keydown', this._searchKeydownHandler);
        }
        if (this._documentClickHandler) {
            document.removeEventListener('click', this._documentClickHandler);
        }
        if (this.textTimer) clearTimeout(this.textTimer);

        const overlay = document.getElementById('easter-egg-overlay');
        if (overlay && this.skipHandler) overlay.removeEventListener('click', this.skipHandler);
        const originButton = document.getElementById('origin-btn');
        if (originButton?.onclick === this._originClickHandler) originButton.onclick = null;
        const exitButton = document.getElementById('exit-egg-btn');
        if (exitButton) exitButton.onclick = null;
        const expandButton = document.getElementById('btn-expand-all');
        const collapseButton = document.getElementById('btn-collapse-all');
        if (expandButton) expandButton.onclick = null;
        if (collapseButton) collapseButton.onclick = null;

        this.svg?.interrupt();
        this.g?.selectAll('*').interrupt();
        this.svg?.on('.zoom', null).on('click', null).on('mousemove', null).on('touchmove', null);
        this.svg?.remove();
        this.ghostRoot = null;
        this.ghostGroup = null;
        this.ghostNodes = null;
        this.onNodeClick = null;
    }

}
