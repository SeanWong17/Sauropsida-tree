/**
 * i18n.js - 国际化配置
 */

// 语言配置
const i18n = {
    zh: {
        // UI 文本
        title: "SAUROPSIDA",
        subtitle: "现生蜥形纲演化时间树 · 交互式导览",
        enterBtn: "探索演化树",
        loading: "资源加载中...",
        
        // 控制按钮
        btnCollapse: "逐级收起",
        btnExpand: "逐级展开",
        btnInfo: "说明与日志",
        searchPlaceholder: "搜索目/科名（中文/拉丁名）...",
        noResults: "无匹配结果",
        
        // 彩蛋
        originBtn: "溯源：失落的蜥形时代",
        exitEggBtn: "返回现生蜥形纲",
        easterEggText: "我们看到的现生蜥形纲，并不是盛世本身，只是那场中生代辐射最后幸存的枝条。",
        
        // 模态框
        aboutTitle: "关于本项目",
        aboutIntro: "这是一个交互式现生蜥形纲演化可视化项目，按“鸟类到目，其余到科”的粒度展示龟鳖、喙头蜥、鳄类、鸟类与有鳞类的系统关系。",
        dataTitle: "数据与技术说明",
        dataSource: "数据基准",
        dataSourceDesc: "：分类系统主要参考 Reptile Database 与 IOC World Bird List；中间层仅在现行分类中有明确命名支、总科或同类层级时才补入。",
        birdBackbone: "鸟类主干",
        birdBackboneDesc: "：鸟类末级采用 IOC 当前目级框架；Neoaves 内部主干优先参照近年广泛使用的系统发育结果，避免沿用已被并回的旧目级拆分。",
        timeScale: "时间标尺",
        timeScaleDesc: "：高阶节点优先参考文献常见的冠群分化时间；末级节点时间为便于可视化整理的近似冠群时间。",
        sourcesTitle: "参考来源",
        imageGen: "图像生成",
        imageGenDesc: "：当前阶段优先完成树结构与数据整理，图像资源仍待后续按节点逐步补充。",
        techStack: "技术架构",
        techStackDesc: "：本项目基于 D3.js (2D) 与 Three.js (3D) 混合开发。为了提升国内访问体验，所有图像资源均采用 CDN 链路进行加速分发。",
        guideTitle: "操作指南",
        guideDrag: "拖拽画布",
        guideDragDesc: "：自由移动演化树视图",
        guideZoom: "滚轮/双指",
        guideZoomDesc: "：缩放查看演化细节",
        guideNode: "点击节点",
        guideNodeDesc: "：展开或收起演化分支",
        guideText: "点击文字",
        guideTextDesc: "：查看物种/科目的详细资料卡片",
        thanksTitle: "致谢与联系",
        thanksGemini: "当前版本的重点是把现生蜥形纲的树结构整理清楚，后续还会继续补时间来源、配图和节点细节。",
        thanksNote: "如果你发现分类层级、节点时间或节点说明仍有可优化之处，可以继续在这个兄弟项目上迭代。",
        version: "当前版本",
        feedback: "反馈邮箱",
        closeBtn: "×"
    },
    en: {
        // UI 文本
        title: "SAUROPSIDA",
        subtitle: "Living Sauropsid Evolution Tree · Interactive Guide",
        enterBtn: "Explore Evolution",
        loading: "Loading Resources...",
        
        // 控制按钮
        btnCollapse: "Collapse Level",
        btnExpand: "Expand Level",
        btnInfo: "About & Changelog",
        searchPlaceholder: "Search order/family (Chinese/Latin)...",
        noResults: "No Results",
        
        // 彩蛋
        originBtn: "Trace the Lost Age of Sauropsids",
        exitEggBtn: "Return to Living Sauropsida",
        easterEggText: "The living sauropsids we see today are not the whole grandeur, but the surviving branches of a far larger Mesozoic radiation.",
        
        // 模态框
        aboutTitle: "About This Project",
        aboutIntro: "This is an interactive visualization of living Sauropsida, organized at order level for birds and family level for the remaining extant sauropsid lineages.",
        dataTitle: "Data & Technical Notes",
        dataSource: "Data Source",
        dataSourceDesc: ": Taxonomy is mainly aligned with the Reptile Database and the IOC World Bird List; intermediate nodes are only added where current classifications recognize named clades, superfamilies, or comparable levels.",
        birdBackbone: "Bird Backbone",
        birdBackboneDesc: ": Bird terminals follow the current IOC order-level framework; the Neoaves backbone prioritizes widely used recent phylogenetic results rather than older order splits that are now merged back.",
        timeScale: "Time Scale",
        timeScaleDesc: ": Higher clades prioritize literature-based crown ages; terminal-node ages are approximate crown-age estimates for visualization.",
        sourcesTitle: "References",
        imageGen: "Image Generation",
        imageGenDesc: ": This stage focuses on tree structure and data curation; image assets will be added later on a node-by-node basis.",
        techStack: "Technical Architecture",
        techStackDesc: ": This project is developed using a hybrid of D3.js (2D) and Three.js (3D). To improve access experience, all image resources are distributed via CDN.",
        guideTitle: "User Guide",
        guideDrag: "Drag Canvas",
        guideDragDesc: ": Freely move the evolution tree view",
        guideZoom: "Scroll/Pinch",
        guideZoomDesc: ": Zoom to view evolutionary details",
        guideNode: "Click Node",
        guideNodeDesc: ": Expand or collapse evolutionary branches",
        guideText: "Click Text",
        guideTextDesc: ": View detailed information cards of species/families",
        thanksTitle: "Acknowledgments & Contact",
        thanksGemini: "The current milestone is to make the extant sauropsid tree scientifically cleaner and visually better structured.",
        thanksNote: "If a rank placement, age estimate, or node description still looks weak, the sibling project can continue to be refined from here.",
        version: "Current Version",
        feedback: "Feedback Email",
        closeBtn: "×"
    }
};

// 当前语言状态
let currentLanguage = 'zh';

const rankLabels = {
    root: { zh: '根', en: 'Root' },
    class: { zh: '纲', en: 'Class' },
    subclass: { zh: '亚纲', en: 'Subclass' },
    infraclass: { zh: '下纲', en: 'Infraclass' },
    superorder: { zh: '总目', en: 'Superorder' },
    clade: { zh: '演化支', en: 'Clade' },
    order: { zh: '目', en: 'Order' },
    suborder: { zh: '亚目', en: 'Suborder' },
    infraorder: { zh: '下目', en: 'Infraorder' },
    parvorder: { zh: '小目', en: 'Parvorder' },
    superfamily: { zh: '总科', en: 'Superfamily' },
    family: { zh: '科', en: 'Family' }
};

/**
 * 切换语言
 * @param {string} lang - 语言代码 ('zh' 或 'en')
 */
function switchLanguage(lang) {
    if (!i18n[lang]) {
        console.warn(`Language '${lang}' not found, keeping current language`);
        return;
    }
    currentLanguage = lang;
    updateUILanguage();
}

/**
 * 获取翻译文本
 * @param {string} key - 翻译键（支持点号分隔的路径）
 * @returns {string} 翻译后的文本
 */
function t(key) {
    const keys = key.split('.');
    let value = i18n[currentLanguage];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || key;
}

/**
 * 更新 UI 语言
 */
function updateUILanguage() {
    // 更新标题和副标题
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    const enterBtn = document.getElementById('enter-btn');
    
    if (title) title.textContent = t('title');
    if (subtitle) subtitle.textContent = t('subtitle');
    if (enterBtn) enterBtn.textContent = t('enterBtn');
    
    // 更新加载文本
    const loading = document.getElementById('loading-screen');
    if (loading) loading.textContent = t('loading');
    
    // 更新控制按钮
    const btnCollapse = document.getElementById('btn-collapse-all');
    const btnExpand = document.getElementById('btn-expand-all');
    const btnInfo = document.getElementById('btn-info');
    
    if (btnCollapse) btnCollapse.title = t('btnCollapse');
    if (btnExpand) btnExpand.title = t('btnExpand');
    if (btnInfo) btnInfo.title = t('btnInfo');
    
    // 更新搜索框
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');

    // 更新彩蛋按钮与文案
    const originBtn = document.getElementById('origin-btn');
    const exitEggBtn = document.getElementById('exit-egg-btn');
    const easterEggText = document.querySelector('.ee-text-main');
    if (originBtn) originBtn.textContent = t('originBtn');
    if (exitEggBtn) exitEggBtn.textContent = t('exitEggBtn');
    if (easterEggText) easterEggText.textContent = t('easterEggText');
    
    // 更新模态框内容
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (translation && translation !== key) {
            el.textContent = translation;
        }
    });
}

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
function getCurrentLanguage() {
    return currentLanguage;
}

function getLocalizedRankLabel(rank) {
    if (!rank) return '';
    const normalized = String(rank).toLowerCase();
    const labels = rankLabels[normalized];
    if (!labels) return rank;
    return labels[currentLanguage] || labels.zh || rank;
}

function getComplementaryName(data) {
    if (currentLanguage === 'en') {
        return data.cn_name || data.family_cn || data.cn || '';
    }
    return data.en_name || data.family_en || data.name || '';
}

function translateTimeRangeToEnglish(timeRange) {
    if (!timeRange) return '';

    return String(timeRange)
        .trim()
        .replace(/^约\s*/, 'ca. ')
        .replace(/(\d+(?:\.\d+)?)\s*Ma\s*起并延续至今/g, '$1 Ma to present')
        .replace(/(\d+(?:\.\d+)?)\s*Ma\s*起$/g, '$1 Ma onward')
        .replace(/白垩纪冠群起源至今/g, 'Cretaceous crown origin to present')
        .replace(/三叠纪起源，现仅残存极少数后裔/g, 'Originated in the Triassic; only a few relict descendants survive today')
        .replace(/三叠纪/g, 'Triassic')
        .replace(/侏罗纪/g, 'Jurassic')
        .replace(/白垩纪/g, 'Cretaceous')
        .replace(/古近纪/g, 'Paleogene')
        .replace(/新近纪/g, 'Neogene')
        .replace(/并延续至今/g, ' to present')
        .replace(/至今/g, 'to present');
}

function getLocalizedTimeRange(data) {
    if (!data) return '';

    if (currentLanguage === 'en') {
        return data.time_range_en || translateTimeRangeToEnglish(data.time_range_cn || data.time_range || '');
    }

    return data.time_range_cn || data.time_range || '';
}

/**
 * 获取多语言文本 - 用于数据字段
 * @param {object} data - 数据对象
 * @param {string} field - 字段名（如 'name', 'description'）
 * @returns {string} 对应语言的文本
 */
function getLocalizedText(data, field) {
    const lang = currentLanguage;
    
    if (field === 'name') {
        // 名称字段
        if (lang === 'en') {
            // 英文模式：优先显示英文名称，如果没有则显示拉丁学名
            if (data.en_name) {
                return data.en_name;
            } else if (data.family_en) {
                return data.family_en;
            } else if (data.name) {
                return data.name;
            } else {
                // 如果都没有，显示拉丁学名（通常是键名）
                return data.cn_name || data.family_cn || data.cn || 'Unknown';
            }
        } else {
            // 中文模式
            return data.cn_name || data.family_cn || data.cn || data.en_name || data.family_en || data.name || '未命名';
        }
    } else if (field === 'description') {
        // 描述字段
        if (lang === 'en') {
            if (data.en_description) {
                return data.en_description;
            }
            return data.description || data.desc || 'Description not available.';
        } else {
            // 中文模式
            return data.description || data.desc || '暂无详细资料...';
        }
    }
    
    return '';
}
