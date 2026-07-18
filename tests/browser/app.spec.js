const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('loads only local dependencies and independent image assets', async ({ page }) => {
    const externalRequests = [];
    page.on('request', request => {
        const url = request.url();
        if (!url.startsWith('http://127.0.0.1:4173')) externalRequests.push(url);
    });

    const response = await page.goto('/');
    await expect(page.locator('#loading-screen')).toBeHidden();
    await expect(page.locator('#enter-btn')).toBeEnabled();
    await expect(page.locator('.card-element')).not.toHaveCount(0);
    await expect(page.locator('.card-img').first()).toHaveAttribute('src', /assets\/images\/.+\.[a-f0-9]{12}\.webp$/);
    const loadedFonts = await page.evaluate(() => document.fonts.load('16px "Noto Serif SC"', '蜥形纲'));
    expect(loadedFonts.length).toBeGreaterThan(0);
    expect(externalRequests).toEqual([]);
    expect(response.headers()['content-security-policy']).toContain("default-src 'self'");
});

test('transition is idempotent and creates one tree', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#enter-btn')).toBeEnabled();
    await page.evaluate(() => {
        window.__treeInitCount = 0;
        const original = EvolutionTree.prototype.init;
        EvolutionTree.prototype.init = function(...args) {
            window.__treeInitCount += 1;
            return original.apply(this, args);
        };
        const button = document.getElementById('enter-btn');
        button.click();
        button.click();
    });

    await expect(page.locator('#container-viz > svg')).toHaveCount(1);
    expect(await page.evaluate(() => window.__treeInitCount)).toBe(1);
    expect(await page.evaluate(() => window.sauropsidaApp.state)).toBe('tree');
});

test('collapsed descendants remain searchable in both languages', async ({ page }) => {
    await page.goto('/');
    await page.click('#enter-btn');
    await expect(page.locator('#container-viz > svg')).toBeVisible();

    await page.click('#btn-collapse-all');
    await page.fill('#search-input', 'Homalopsidae');
    await expect(page.locator('#search-results')).toContainText('宽吻蛇科');

    await page.fill('#search-input', '');
    await page.click('#lang-switch');
    await page.fill('#search-input', 'Trionychidae');
    await expect(page.locator('#search-results')).toContainText('Trionychidae');
    await expect(page.locator('#search-results')).toContainText('鳖科');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('missing runtime dependency produces a retryable error state', async ({ page }) => {
    await page.route('**/vendor/three.min.js', route => route.abort('internetdisconnected'));
    await page.goto('/');

    await expect(page.locator('#loading-screen')).toHaveAttribute('role', 'alert');
    await expect(page.locator('#loading-screen')).toContainText(/初始化失败|could not start/);
    await expect(page.locator('.retry-btn')).toBeVisible();
    await expect(page.locator('#enter-btn')).toBeDisabled();
    expect(await page.evaluate(() => window.sauropsidaApp.state)).toBe('error');
});

test('WebGL background failure falls back to the CSS3D gallery and tree', async ({ page }) => {
    await page.route('**/vendor/three.min.js', async route => {
        const response = await route.fetch();
        const source = `${await response.text()}\nTHREE.WebGLRenderer = class { constructor() { throw new Error('WebGL unavailable'); } };`;
        await route.fulfill({ response, body: source });
    });

    await page.goto('/');
    await expect(page.locator('#loading-screen')).toBeHidden();
    await expect(page.locator('.card-element')).not.toHaveCount(0);
    await page.click('#enter-btn');
    await expect(page.locator('#container-viz > svg')).toBeVisible();
    expect(await page.evaluate(() => window.sauropsidaApp.state)).toBe('tree');
});

test('tree details dialog supports keyboard opening, closing, and focus restore', async ({ page }) => {
    await page.goto('/');
    await page.click('#enter-btn');
    const homalopsidaeText = page.locator('.node text[aria-label="查看详情: 宽吻蛇科"]');
    await homalopsidaeText.focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('#modal')).toHaveAttribute('aria-hidden', 'false');
    await expect(page.locator('#modal-close')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#modal')).toHaveAttribute('aria-hidden', 'true');
    await expect(homalopsidaeText).toBeFocused();
});

test('viewport allows zoom and layout does not overflow horizontally', async ({ page }) => {
    await page.goto('/');
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).not.toContain('user-scalable=no');
    expect(viewport).not.toContain('maximum-scale');
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.body.scrollWidth, width: innerWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
});

test('mobile English controls do not overlap', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The regression only applies to the mobile toolbar.');
    await page.goto('/');
    await page.click('#enter-btn');
    await page.click('#lang-switch');

    const bounds = await page.evaluate(() => {
        const origin = document.getElementById('origin-btn').getBoundingClientRect();
        const language = document.getElementById('lang-switch').getBoundingClientRect();
        return { originRight: origin.right, languageLeft: language.left };
    });
    expect(bounds.originRight).toBeLessThanOrEqual(bounds.languageLeft);
});

test('origin view supports keyboard details and returns to the living tree', async ({ page }) => {
    await page.goto('/');
    await page.click('#enter-btn');
    await page.click('#origin-btn');
    await expect(page.locator('.node.ghost')).not.toHaveCount(0);

    const ghostNode = page.locator('.node.ghost').first();
    await ghostNode.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#modal')).toHaveAttribute('aria-hidden', 'false');
    await page.keyboard.press('Escape');

    await expect(page.locator('#modal')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.node.ghost')).not.toHaveCount(0);
    expect(await page.evaluate(() => window.sauropsidaApp.treeApp.isEasterEggActive)).toBe(true);

    await page.keyboard.press('Escape');

    await expect(page.locator('.node.ghost')).toHaveCount(0);
    await expect(page.locator('#top-controls')).toBeVisible();
    expect(await page.evaluate(() => window.sauropsidaApp.treeApp.isEasterEggActive)).toBe(false);
});

test('supports direct file preview without a server', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop coverage is sufficient for the file protocol.');
    const fileUrl = pathToFileURL(path.resolve(__dirname, '../../index.html')).href;
    await page.goto(fileUrl);
    await expect(page.locator('#loading-screen')).toBeHidden();
    await expect(page.locator('#enter-btn')).toBeEnabled();
    await expect(page.locator('.card-img').first()).toHaveAttribute('src', /assets\/images\/.+\.webp$/);
});

test('normal-motion transition completes without lifecycle errors', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop coverage is sufficient for the animation lifecycle.');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.click('#enter-btn');
    await expect(page.locator('#container-viz > svg')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(3000);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => window.sauropsidaApp.state)).toBe('tree');
});

test('has no serious automated accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.click('#enter-btn');
    await page.click('#btn-info');
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    const serious = results.violations.filter(violation =>
        violation.impact === 'serious' || violation.impact === 'critical'
    );
    expect(serious).toEqual([]);
});
