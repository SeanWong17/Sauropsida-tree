const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const imageDir = path.join(projectRoot, 'assets/images');
const context = {};
vm.createContext(context);
vm.runInContext(
    `${fs.readFileSync(path.join(projectRoot, 'data/data.js'), 'utf8')};this.data=sauropsidaData`,
    context
);

const familyKeys = context.data.families.map(family => family.family_en).sort();
const existingFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.webp'));
const manifest = {};

for (const key of familyKeys) {
    const candidates = existingFiles.filter(file => file.startsWith(`${key}.`));
    if (candidates.length !== 1) {
        throw new Error(`Expected one WebP asset for ${key}, found ${candidates.length}`);
    }
    const currentName = candidates[0];
    const image = fs.readFileSync(path.join(imageDir, currentName));
    const hash = crypto.createHash('sha256').update(image).digest('hex').slice(0, 12);
    const hashedName = `${key}.${hash}.webp`;
    if (currentName !== hashedName) {
        fs.renameSync(path.join(imageDir, currentName), path.join(imageDir, hashedName));
    }
    manifest[key] = `assets/images/${hashedName}`;
}

const knownPrefixes = new Set(familyKeys.map(key => `${key}.`));
const unexpected = existingFiles.filter(file => ![...knownPrefixes].some(prefix => file.startsWith(prefix)));
if (unexpected.length) throw new Error(`Unexpected WebP assets: ${unexpected.join(', ')}`);

fs.writeFileSync(
    path.join(projectRoot, 'data/images_manifest.js'),
    `const IMAGE_MANIFEST = Object.freeze(${JSON.stringify(manifest, null, 4)});\n`
);
console.log(`Generated manifest for ${familyKeys.length} images.`);
