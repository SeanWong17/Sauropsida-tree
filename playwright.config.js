const { defineConfig, devices } = require('@playwright/test');

const port = Number.parseInt(process.env.PLAYWRIGHT_PORT || '4173', 10);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PLAYWRIGHT_PORT must be a valid TCP port');
}
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
    testDir: './tests/browser',
    fullyParallel: false,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'mobile-chromium',
            use: { ...devices['Pixel 5'] }
        }
    ],
    webServer: {
        command: `PORT=${port} node scripts/serve.js`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 30000
    }
});
