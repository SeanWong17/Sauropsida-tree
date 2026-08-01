#!/usr/bin/env node

/* Builds a labelled contact sheet for candidates still awaiting review. */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const defaultReviewDir = path.join(os.tmpdir(), 'sauropsida-bird-image-review');
const fontFile = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

function parseArgs(argv) {
    const options = { page: 1, perPage: 12, reviewDir: defaultReviewDir };
    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        const value = argv[index + 1];
        if (arg === '--page' && value) {
            options.page = Number.parseInt(value, 10);
            index += 1;
        } else if (arg === '--per-page' && value) {
            options.perPage = Number.parseInt(value, 10);
            index += 1;
        } else if (arg === '--review-dir' && value) {
            options.reviewDir = path.resolve(value);
            index += 1;
        } else if (arg === '--help') {
            console.log('Usage: node scripts/build-bird-review-sheet.js [--page N] [--per-page N] [--review-dir DIR]');
            process.exit(0);
        } else {
            throw new Error(`Unknown or incomplete argument: ${arg}`);
        }
    }
    if (!Number.isInteger(options.page) || options.page < 1) throw new Error('--page must be a positive integer');
    if (!Number.isInteger(options.perPage) || options.perPage < 1 || options.perPage > 24) {
        throw new Error('--per-page must be an integer from 1 to 24');
    }
    return options;
}

function loadFamilies() {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, 'data/bird_families.js'), 'utf8'), context);
    vm.runInContext('this.families=BIRD_FAMILY_DEFS', context);
    return context.families;
}

function filterEscape(value) {
    return value.replace(/([\\':,\[\]])/g, '\\$1');
}

const options = parseArgs(process.argv.slice(2));
if (!fs.existsSync(fontFile)) throw new Error(`Review font is missing: ${fontFile}`);
const candidateNames = new Set(
    fs.existsSync(options.reviewDir)
        ? fs.readdirSync(options.reviewDir).filter(file => file.endsWith('.webp')).map(file => path.basename(file, '.webp'))
        : []
);
const candidates = loadFamilies()
    .filter(family => candidateNames.has(family.family_en))
    .sort((left, right) => left.family_en.localeCompare(right.family_en));
const start = (options.page - 1) * options.perPage;
const page = candidates.slice(start, start + options.perPage);
if (!page.length) throw new Error(`No candidate images on page ${options.page}; ${candidates.length} candidates are available`);

const columns = Math.min(4, page.length);
const tileWidth = 320;
const tileImageHeight = 240;
const tileHeight = 276;
const ffmpegArgs = ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y'];
for (const family of page) ffmpegArgs.push('-i', path.join(options.reviewDir, `${family.family_en}.webp`));

const filters = page.map((family, index) => {
    const label = filterEscape(family.family_en);
    return `[${index}:v]scale=${tileWidth}:${tileImageHeight}:flags=lanczos,pad=${tileWidth}:${tileHeight}:0:0:color=white,drawtext=fontfile=${fontFile}:text='${label}':x=(w-text_w)/2:y=${tileImageHeight + 14}:fontcolor=black:fontsize=17[t${index}]`;
});
const layout = page.map((_, index) => `${(index % columns) * tileWidth}_${Math.floor(index / columns) * tileHeight}`).join('|');
if (page.length === 1) {
    filters.push('[t0]null[sheet]');
} else {
    const rows = Math.ceil(page.length / columns);
    filters.push(`${page.map((_, index) => `[t${index}]`).join('')}xstack=inputs=${page.length}:layout=${layout}[stack]`);
    filters.push(`[stack]pad=${columns * tileWidth}:${rows * tileHeight}:0:0:color=white[sheet]`);
}

const output = path.join(options.reviewDir, `review-page-${String(options.page).padStart(3, '0')}.png`);
ffmpegArgs.push('-filter_complex', filters.join(';'), '-map', '[sheet]', '-frames:v', '1', output);
const result = spawnSync('ffmpeg', ffmpegArgs, { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`ffmpeg failed: ${result.stderr.trim()}`);
console.log(`${output}\n${page.map(family => family.family_en).join(', ')}`);
