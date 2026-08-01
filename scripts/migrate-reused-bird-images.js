#!/usr/bin/env node

/*
 * Moves the 40 former order-level bird illustrations to their now-correct
 * family-level keys. The source files are only renamed after every mapping
 * has passed validation, so the operation cannot leave a partial migration.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const imageDir = path.join(projectRoot, 'assets/images');
const argumentsList = process.argv.slice(2);
const apply = argumentsList.includes('--apply');
const dryRun = argumentsList.includes('--dry-run');

if (argumentsList.some(argument => argument !== '--apply' && argument !== '--dry-run') || (apply && dryRun)) {
    throw new Error('Usage: node scripts/migrate-reused-bird-images.js [--dry-run|--apply]');
}

function loadBirdFamilies() {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, 'data/bird_families.js'), 'utf8'), context);
    vm.runInContext('this.families=BIRD_FAMILY_DEFS', context);
    return context.families;
}

function matchingImageFiles(key) {
    return fs.readdirSync(imageDir)
        .filter(file => file.startsWith(`${key}.`) && file.endsWith('.webp'));
}

const migrations = loadBirdFamilies()
    .filter(family => family.reuse_image_from)
    .map(family => {
        const sources = matchingImageFiles(family.reuse_image_from);
        const targetFiles = matchingImageFiles(family.family_en);

        if (sources.length === 0 && targetFiles.length === 1) {
            const target = path.join(imageDir, targetFiles[0]);
            const hash = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0, 12);
            if (targetFiles[0] !== `${family.family_en}.${hash}.webp`) {
                throw new Error(`Migrated asset has a stale hash for ${family.family_en}: ${targetFiles[0]}`);
            }
            return { family, target, status: 'already-migrated' };
        }

        if (sources.length !== 1 || targetFiles.length !== 0) {
            throw new Error(`Expected one source and no target asset for ${family.family_en}, found ${sources.length} source and ${targetFiles.length} target files`);
        }

        const source = path.join(imageDir, sources[0]);
        const hash = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0, 12);
        return {
            family,
            source,
            target: path.join(imageDir, `${family.family_en}.${hash}.webp`),
            status: 'pending'
        };
    });

const pendingMoves = migrations.filter(migration => migration.status === 'pending');
const sourceNames = new Set(pendingMoves.map(move => move.source));
const targetNames = new Set(migrations.map(move => move.target));
if (sourceNames.size !== pendingMoves.length || targetNames.size !== migrations.length) {
    throw new Error('Bird image migration contains duplicate source or target paths');
}

for (const migration of migrations) {
    if (migration.status === 'already-migrated') {
        console.log(`already migrated ${path.basename(migration.target)}`);
    } else {
        console.log(`${apply ? 'move' : 'would move'} ${path.basename(migration.source)} -> ${path.basename(migration.target)}`);
    }
}

if (apply) {
    for (const move of pendingMoves) fs.renameSync(move.source, move.target);
    console.log(`Migrated ${pendingMoves.length} reusable bird illustrations; ${migrations.length - pendingMoves.length} were already in place.`);
} else {
    console.log(`Validated ${migrations.length} reusable bird illustration migrations. Re-run with --apply to rename pending files.`);
}
