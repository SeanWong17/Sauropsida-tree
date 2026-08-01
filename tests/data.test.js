const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { validateProject } = require('../scripts/validate-data');

const projectRoot = path.resolve(__dirname, '..');

function loadData() {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, 'data/bird_families.js'), 'utf8'), context);
    vm.runInContext(`${fs.readFileSync(path.join(projectRoot, 'data/data.js'), 'utf8')};this.data=sauropsidaData`, context);
    return JSON.parse(JSON.stringify(context.data));
}

function loadBirdDefinitions() {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, 'data/bird_families.js'), 'utf8'), context);
    vm.runInContext('this.definitions={ orders: BIRD_ORDER_DEFS, families: BIRD_FAMILY_DEFS }', context);
    return JSON.parse(JSON.stringify(context.definitions));
}

function loadDataUtils() {
    const context = {
        d3: { hierarchy: data => ({ data }) },
        console
    };
    vm.createContext(context);
    vm.runInContext(`${fs.readFileSync(path.join(projectRoot, 'src/js/utils.js'), 'utf8')};this.utils=DataUtils`, context);
    return context.utils;
}

function findNode(root, key) {
    if (root.taxon_key === key) return root;
    for (const child of root.children || []) {
        const match = findNode(child, key);
        if (match) return match;
    }
    return null;
}

test('taxonomy, times, and hashed image assets are internally consistent', () => {
    assert.deepEqual(validateProject(projectRoot), {
        clades: 105,
        terminals: 336,
        images: 336,
        root: 'Sauropsida'
    });
});

test('hierarchy preserves English common names separately from scientific keys', () => {
    const data = loadData();
    data.clades.Lepidosauria.en_name = 'Lepidosaurs';
    const hierarchy = loadDataUtils().buildHierarchy(data);
    const lepidosaurs = findNode(hierarchy.data, 'Lepidosauria');
    assert.ok(lepidosaurs);
    assert.equal(lepidosaurs.en_name, 'Lepidosaurs');
    assert.equal(lepidosaurs.scientific_name, 'Lepidosauria');
});

test('living birds follow the IOC v15.2 family-level roster', () => {
    const data = loadData();
    const definitions = loadBirdDefinitions();
    const birdFamilies = data.families.filter(family => family.taxonomy.subclass?.includes('Aves'));
    const familyParents = new Set(birdFamilies.map(family => family.parent_clade));

    assert.equal(definitions.orders.length, 44);
    assert.equal(definitions.families.length, 250);
    assert.equal(definitions.families.filter(family => family.reuse_image_from).length, 40);
    assert.ok(definitions.families.every(family => family.family_cn.endsWith('科')));
    assert.equal(birdFamilies.length, 250);
    assert.ok(birdFamilies.every(family => family.terminal_rank === 'family'));
    assert.equal(familyParents.size, 44);
    assert.ok([...familyParents].every(parent => data.clades[parent]?.rank === 'order'));
    assert.ok(!definitions.families.some(family => family.family_en === 'Mohoidae'));
});

test('hierarchy rejects missing parents instead of silently dropping nodes', () => {
    const data = loadData();
    data.clades.Lepidosauria.parent = 'MissingParent';
    assert.throws(() => loadDataUtils().buildHierarchy(data), /Missing parent/);
});
