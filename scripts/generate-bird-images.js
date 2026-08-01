#!/usr/bin/env node

/*
 * Bounded-concurrency Wuzu GPT Image 2 runner for missing bird-family illustrations.
 * Candidates stay outside the repository until reviewed and promoted.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const imageDir = path.join(projectRoot, 'assets/images');
const defaultReviewDir = path.join(os.tmpdir(), 'sauropsida-bird-image-review');
const tokenFile = '/home/code/.codex/skills/wuzu-api-gpt-image-2-generator/config/token.txt';
const apiBase = 'https://wuzuapi.com/v1';
const speciesTraits = Object.freeze({
    Heliornithidae: 'For Podica senegalensis, show the long tail, bold white facial stripes, chestnut-spotted back, and separate broad lobes on every toe. The toes must be lobed like a coot, never joined by a duck-like web.',
    Trochilidae: 'For a male Topaza pella, show the deep crimson-red head, throat, breast, and belly; metallic green upperparts; and the characteristically very long forked tail with elongated central feathers.',
    Chionidae: 'For Chionis albus, show a compact pigeon-like all-white sheathbill with short broad wings, a stout pale bill, and obvious pinkish-red bare facial caruncles around the base of the bill. It must not resemble a gull or a seabird.',
    Pluvianidae: 'For Pluvianus aegyptius, show slate-blue gray upperparts, a bold black crown, eye mask, and complete neck collar, a sharply visible white shoulder band, and a warm peach-orange breast and belly. It must not be a generic sandy plover.',
    Psittaculidae: 'For Psittrichas fulgidus, show the large Pesquet\'s parrot as overwhelmingly black with a bare vulture-like black face, a heavy hooked bill, rich red belly and wing panels, and a red tail. Do not use green parrot plumage.',
    Philepittidae: 'For a male Philepitta schlegeli, show a bright yellow breast and belly, olive-brown wings, a black head, and unmistakable iridescent green and blue bare facial wattles around the eye. Do not use a striped head or a speckled chest.',
    Conopophagidae: 'For Conopophaga lineata, show a small compact forest bird with an olive-brown head and upperparts, a distinct pale buff eyebrow above the dark eye, a thin straight bill, short wings and tail, and warm rufous-buff breast and belly. Do not use black-and-white vertical breast stripes, heavy streaking, or a thrush-like body.',
    Rhinocryptidae: 'For Acropternis orthonyx, show a compact tapaculo with dark nearly black upperparts densely marked by crisp white oval spots, a warm chestnut-rufous head, face, and flanks, a small dark straight bill, dark legs, and short rounded wings and tail. Its eye must be normal-sized; never show an oversized orange-and-black eye ring. The ocellated pattern belongs on the plumage, especially the head, back, and wings.',
    Cotingidae: 'For an adult male Rupicola rupicola, show the Guianan Cock-of-the-rock with its saturated orange body and its very large, smooth, semicircular orange fan crest that obscures most of the bill. Keep the flight feathers, wing edges, and tail black. Do not use a brown, gray, or thrush-like bird.',
    Melanopareiidae: 'For Melanopareia torquata, show a small short-tailed Collared Crescentchest with warm rufous-brown upperparts and head, a distinct solid black collar across the upper breast, paler buff underparts, a thin pointed bill, and a long pale eyebrow. Do not make it a heavily spotted, quail-like, or long-tailed bird.',
    Onychorhynchidae: 'For a male Onychorhynchus coronatus, show the Tropical Royal Flycatcher with a large fully raised semicircular fan crest of bright scarlet-red to orange feathers with dark black-and-blue tips. The rest of the bird must be olive-brown above and pale yellowish-buff below, with a fine flycatcher bill. Do not use a narrow spiky mohawk or a yellow-and-black crest.',
    Oxyruncidae: 'For Oxyruncus cristatus, show the Sharpbill with olive-green upperparts, a grayish head, a conspicuously pointed narrow bill, a pale throat and breast densely marked by dark streaking, and a compact short-tailed body. Do not add a head crest or make it a brown wren.',
    Pipridae: 'For an adult male Manacus manacus, show the White-bearded Manakin as a compact glossy black bird with a broad brilliant white throat and breast beard, pale gray-white wing bars, dark legs, and a short tail. Do not use blue body plumage or omit the large white beard.',
    Tyrannidae: 'For Tyrannus savana, show the Fork-tailed Flycatcher with a pale gray head and upperparts, a dark eye mask, a white throat and breast, dark wings, and an extremely long deeply forked black tail with two very long outer streamers. Do not use yellow underparts or a short unforked tail.',
    Maluridae: 'For an adult male Malurus splendens, show the Splendid Fairywren with intensely cobalt-blue crown, ear coverts, mantle, shoulders, breast, belly, and tail, contrasting with a crisp black face mask, throat, and breast bib. Keep the body fully blue rather than brown; do not make a female or a different fairywren.',
    Meliphagidae: 'For Anthochaera carunculata, show the Red Wattlebird with a long downcurved dark bill, gray-brown heavily streaked body, a yellow patch on the lower belly, and very obvious red bare wattles hanging on both sides of the neck. Do not omit the red wattles or make the head uniformly black.',
    Ptilonorhynchidae: 'For an adult male Ptilonorhynchus violaceus, show the Satin Bowerbird as a completely glossy deep violet-blue to blue-black bird with a vivid purple-blue sheen, a pale bluish bill, and a conspicuous bright violet eye. Do not use brown, orange, or golden body plumage.',
    Acanthizidae: 'For Acanthiza chrysorrhoa, show the Yellow-rumped Thornbill as a very small olive-gray and brown thornbill with a pale buff breast and belly finely streaked in brown, a narrow pale eyebrow and dark eye line, a slender pointed bill, and a clearly visible bright yellow rump at the base of the tail. Do not use a yellow face, yellow breast, or a honeyeater-like body.',
    Machaerirhynchidae: 'For a male Machaerirhynchus nigripectus, show the Black-breasted Boatbill with a huge broad flattened silvery-blue boat-shaped bill, olive-green upperparts, bright yellow underparts, a black breast bib, and a yellow forehead and eyebrow. Do not use a narrow-billed generic green songbird or omit the black breast.',
    Notiomystidae: 'For a male Notiomystis cincta, show the Stitchbird with a glossy black head and upper breast, sharply contrasting white ear tufts and a white shoulder patch, a vivid golden-yellow breast band and shoulders, olive-brown back, and a fine slightly curved bill. Do not use a plain brown-and-white wren-like bird.',
    Platysteiridae: 'For a male Platysteira cyanea, show the Brown-throated Wattle-eye with a black head and upperparts, clean white underparts, a warm brown throat, a bright blue bare wattle around the eye, white wing bars, and a compact flycatcher shape. Do not omit the blue eye wattle or make a generic black-and-white flycatcher.',
    Psophodidae: 'For Psophodes olivaceus, show the Eastern Whipbird with olive-green upperparts and tail, a high black crest, a black throat and face mask, a bold white cheek and throat patch, and a long tail. Do not use a plain streaked olive songbird or omit the crest and white cheek.',
    Artamidae: 'For Gymnorhina tibicen, show the Australian Magpie with a glossy black head, breast, wings, and tail, a large clean white nape and upper back, broad white shoulder patches, a pale bluish-white bill, and black legs. Do not use a gray generic corvid-like bird.',
    Campephagidae: 'For an adult male Pericrocotus speciosus, show the Scarlet Minivet with saturated scarlet-red to orange-red head, throat, breast, belly, rump, and wing patches, contrasting with velvety black back, wings, and tail. Do not use white underparts or only a red tail.',
    Dicruridae: 'For Dicrurus paradiseus, show the Greater Racket-tailed Drongo as a glossy black bird with a swept-back black crest and two extremely long outer tail shafts that end in separate oval racket-shaped vanes far beyond the rest of the tail. Do not use a short forked tail without racket tips.',
    Eulacestomatidae: 'For a male Eulacestoma nigropectus, show the Wattled Ploughbill with a very broad heavy plough-shaped pale bill, bright yellow face and underparts, a solid black breast patch, olive-green upperparts, and obvious fleshy yellow wattles at the base of the bill. Do not use a thin-billed brown wren-like bird.',
    Falcunculidae: 'For an adult male Falcunculus frontatus, show the Eastern Shriketit with a strong short hooked bill, a black face mask and throat, bold white cheek and collar, olive-green back and wings, and a bright yellow breast and belly. Do not use a mostly white black-winged flycatcher.',
    Oreoicidae: 'For Oreoica gutturalis, show the Crested Bellbird with gray-brown upperparts, a tall pointed black crest, a black throat bib, a pale white cheek and throat border, and a stout bellbird-like bill. Do not make it an all-black bird or omit the crest.',
    Oriolidae: 'For Oriolus chinensis, show the Black-naped Oriole with a vivid pure yellow head, body, and underparts, a strong black eye stripe continuing across the nape, black wings and tail with yellow wing panels, and a pinkish-red bill. Do not use green streaked plumage.',
    Pachycephalidae: 'For an adult male Pachycephala pectoralis, show the Australian Golden Whistler with a black head and throat, a broad clean white collar, intensely yellow breast and belly, and olive-gray back and wings. Do not use maroon shoulder patches or white underparts.',
    Pityriasidae: 'For Pityriasis gymnocephala, show the Bornean Bristlehead with a compact blackish body, a bare vivid orange-red head and throat, stiff spiky bristles around the crown, a strong pale bill, and pale white wing patches. Do not use a brown speckled bird or a feathered head.',
    Rhipiduridae: 'For Rhipidura rufifrons, show the Australian Rufous Fantail with a rufous forehead and upperparts, a pale throat and belly, a dark eye mask, and a prominently fanned rounded tail with rufous and dark feathers. Do not use a black-and-white bird or a narrow blue tail.',
    Vangidae: 'For Vanga curvirostris, show the Hook-billed Vanga with blue-gray upperparts, white underparts, a dark eye patch, and an exceptionally large stout pale blue-gray bill with a strongly downcurved hooked tip. Do not use a red tail or a straight small bill.',
    Ifritidae: 'For Ifrita kowaldi, show the Blue-capped Ifrit with a glossy blue-black crown, black eye mask, olive-brown upperparts, warm buff to yellowish underparts, and a compact thrush-like body. Do not use an all-black or metallic blue drongo-like bird.',
    Laniidae: 'For Lanius schach, show the Long-tailed Shrike with a gray crown and nape, a broad black eye mask, warm chestnut-brown back and flanks, pale whitish breast and belly, and a very long black tail. Do not omit the chestnut back or make it a plain black-and-white bird.',
    Melampittidae: 'For Melampitta lugubris, show the Lesser Melampitta as a compact entirely velvety black to blue-black bird with a striking red iris, dark bill, and dark legs. Do not use streaked brown plumage or a thrush-like pattern.',
    Monarchidae: 'For an adult male Hypothymis azurea, show the Black-naped Monarch with bright sky-blue head, back, wings, and breast, a sharply visible black nape patch and black throat necklace, a dark bill, and a pale lower belly. Do not use an all-blue head without the black nape marking.',
    Paradisaeidae: 'For an adult male Paradisaea apoda, show the Greater Bird-of-paradise with a rich yellow head and mantle, long golden-yellow flank plumes, an iridescent emerald-green throat, a warm brown body, and dark wings and tail. Do not use a plain black bird with a red wing.',
    Petroicidae: 'For an adult male Petroica phoenicea, show the Flame Robin with a brilliant flame-orange to red forehead, throat, breast, and upper belly, slaty gray back and wings, a crisp white wing bar, and a dark tail. Do not use an all gray-brown female-like bird.',
    Picathartidae: 'For Picathartes gymnocephalus, show the White-necked Rockfowl with a long white neck and breast, black back, wings, and tail, long pale legs, and a large bare bicolored head with vivid yellow and blue to violet skin. Do not use a feathered black-and-white head.',
    Ptiliogonatidae: 'For an adult male Phainopepla nitens, show the Phainopepla as a silky all-black bird with a tall pointed black crest, a conspicuous white wing patch, a slim dark bill, and a bright red eye. Do not use yellow underparts.',
    Cettiidae: 'For Cettia cetti, show Cetti\'s Warbler with rich rufous-brown upperparts, a long rounded rufous tail, a thin pale eyebrow, and plain warm buff-gray underparts. Do not use yellow underparts or a yellow wagtail-like bird.',
    Dulidae: 'For Dulus dominicus, show the Palmchat as a shaggy olive-brown to dark brown bird with dense pale whitish streaking over the throat, breast, and belly, a modest pointed crest, a sturdy bill, and a long tail. Do not use a sharply black-and-white masked bird.',
    Hirundinidae: 'For Hirundo rustica, show the Barn Swallow with a metallic deep blue head and back, a vivid rufous-red forehead and throat, pale buff underparts, and an extremely long deeply forked tail with thin outer streamers. Do not omit the red throat or use a short tail.',
    Macrosphenidae: 'For Sylvietta brachyura, show the Northern Crombec as a tiny olive-gray warbler with a pale eyebrow, fine slender bill, and an exceptionally short blunt tail that barely projects beyond the folded wings. Do not use a long-tailed heavily streaked lark-like bird.',
    Nicatoridae: 'For Nicator gularis, show the Eastern Nicator with olive-green upperparts, a grayish head, yellowish throat and breast boldly streaked in dark lines, and a medium slender slightly hooked bill. Do not use an oversized thick banana-shaped bill.',
    Paridae: 'For Cyanistes caeruleus, show the Eurasian Blue Tit with a bright blue crown, blue wings and tail, clean white cheeks crossed by a dark blue-black eye stripe, and a sunny yellow breast and belly. Do not use a red cap or a large black bib.',
    Pycnonotidae: 'For Pycnonotus jocosus, show the Red-whiskered Bulbul with a tall black pointed crest, white cheeks and breast, a distinct crimson-red whisker patch behind the eye, a small red vent patch, and brown upperparts. Do not use a plain olive-gray bird.',
    Stenostiridae: 'For Culicicapa ceylonensis, show the Grey-headed Canary-flycatcher with a soft gray head and throat, bright yellow breast and belly, olive-gray wings and back, a fine dark flycatcher bill, and a short tail. Do not use a black-and-white fantail-like bird.',
    Acrocephalidae: 'For Acrocephalus arundinaceus, show the Great Reed Warbler as a large long-bodied reed warbler with plain warm brown upperparts, a broad pale eyebrow, a long stout pointed bill, and mostly unmarked pale buff underparts. Do not use a small heavily streaked sedge-warbler-like bird.',
    Aegithalidae: 'For Aegithalos caudatus, show the Long-tailed Tit with an exceptionally long narrow tail at least one and a half times the body length, a white crown and cheeks framed by black eye stripes, black-and-white wings, and a delicate pale pink wash on the flanks. Do not use a short-tailed gray tit.',
    Bernieridae: 'For Bernieria madagascariensis, show the Long-billed Bernieria with olive-brown upperparts, plain pale grayish-buff underparts, a distinct long thin straight bill, and an understated warbler-like face. Do not use a black head, white bib, or strong black-and-white pattern.',
    Cisticolidae: 'For a breeding male Cisticola exilis, show the Golden-headed Cisticola with a vivid golden-orange head and crown, dark-streaked brown upperparts, warm buff-yellow underparts, and a small pointed bill. Do not use a dull brown head or a generic lark.',
    Erythrocercidae: 'For Erythrocercus livingstonei, show Livingstone\'s Flycatcher with a soft gray head and upper breast, olive-green back and wings, bright yellow lower breast and belly, and a fine dark flycatcher bill. Do not use an all-yellow warbler-like bird.',
    Hyliidae: 'For Hylia prasina, show the Green Hylia as a tiny plain green and olive bird with a pale grayish throat and breast, a fine straight bill, and no black facial mask or black throat bib.',
    Locustellidae: 'For Megalurus palustris, show the Striated Grassbird with a very long broad graduated tail roughly the length of the body, strongly streaked brown upperparts, pale buff underparts with darker streaking, and a slender bill. Do not use a short-tailed generic brown warbler.',
    Paradoxornithidae: 'For Paradoxornis aemodius, show the Great Parrotbill with an exceptionally large deep yellowish horn-colored curved parrot-like bill, a compact brown and black patterned body, and a short tail. Do not use a fine small bill or a long red tail.',
    Zosteropidae: 'For Zosterops japonicus, show the Warbling White-eye with yellow-green upperparts, yellow throat, pale gray-white belly, a thin dark bill, and a large crisp white ring completely encircling each eye. Do not use a crest or omit the eye ring.',
    Polioptilidae: 'For Polioptila caerulea, show the Blue-gray Gnatcatcher with pale blue-gray head and upperparts, clean white underparts, a thin dark bill, and a very long narrow black tail with obvious white outer feathers. Do not use brown streaked plumage.',
    Promeropidae: 'For Promerops cafer, show the Cape Sugarbird with a long downcurved dark bill, gray-brown upperparts, a warm yellow breast and belly, and an exceptionally long graduated dark tail much longer than the body. Do not use a mostly white throat or short tail.',
    Sturnidae: 'For Gracula religiosa, show the Common Hill Myna with glossy black plumage, a bright orange-yellow bill, and large vivid yellow bare wattles extending behind and below each eye. Do not omit the yellow wattles or use an all-blue bird.',
    Turdidae: 'For an adult male Turdus merula, show the Common Blackbird as entirely matte black with a bright yellow-orange bill and matching yellow-orange eye ring. Do not use spotted orange underparts or blue-gray plumage.',
    Cardinalidae: 'For an adult male Cardinalis cardinalis, show the Northern Cardinal with a tall pointed red crest, saturated scarlet-red body, a bold black face mask and throat, and a thick coral-red conical bill. Do not use a smooth-headed all-red bird.',
    Dicaeidae: 'For an adult male Dicaeum trigonostigma, show the Orange-bellied Flowerpecker as a tiny compact bird with glossy blue-black head and back, a white throat and upper breast, a vivid orange belly, a short tail, and a thin pointed bill. Do not use a gray-and-yellow warbler-like bird.',
    Emberizidae: 'For an adult male Emberiza citrinella, show the Yellowhammer with a bright yellow head, throat, and breast, a warm chestnut-streaked brown back, and a long tail. Do not use a black-and-white crested lark-like bird.',
    Estrildidae: 'For an adult male Taeniopygia guttata, show the Sunda Zebra Finch with a vivid orange cheek patch, a bright orange-red bill, gray head and body, black-and-white zebra barring on the throat and upper breast, and chestnut flanks dotted with white. Do not use a plain brown finch.',
    Fringillidae: 'For Carduelis carduelis, show the European Goldfinch with a vivid red face, black-and-white head, warm brown body, and a large unmistakable bright yellow wing panel. Do not use a gray chaffinch-like bird.',
    Icteridae: 'For an adult male Icterus galbula, show the Baltimore Oriole with a black head, throat, back, wings, and tail, plus saturated orange breast, belly, rump, and wing patches. Do not use olive-green plumage or a white eyebrow.',
    Nectariniidae: 'For an adult male Cinnyris asiaticus, show the Purple Sunbird with an iridescent deep purple-black head, throat, breast, and back, a long thin downcurved bill, small yellow pectoral tufts only, and dark wings. Do not use a green-and-yellow sunbird with a red throat.',
    Parulidae: 'For an adult male Setophaga ruticilla, show the American Redstart with a glossy black head, back, and breast, crisp white belly, and bright orange patches on both wings and the outer tail feathers. Do not use a heavily streaked yellow warbler-like bird.',
    Passerellidae: 'For Zonotrichia leucophrys, show the White-crowned Sparrow with bold alternating black and white crown stripes, a plain gray face and breast, a pinkish conical bill, brown streaked wings, and a long tail. Do not use a brown-crowned sparrow without the crown stripes.',
    Peucedramidae: 'For an adult male Peucedramus taeniatus, show the Olive Warbler with a gray head, dark black throat and upper breast, a rich orange throat and breast patch below the black, olive-gray wings and back, and white wing bars. Do not use a plain olive warbler.',
    Phaenicophilidae: 'For Phaenicophilus palmarum, show the Black-crowned Palm-Tanager with a distinct black crown, olive-green upperparts, muted yellow-olive underparts, and a stout tanager bill. Do not use bright blue body plumage.',
    Ploceidae: 'For an adult male Ploceus cucullatus, show the Village Weaver in breeding plumage with an intense yellow head, breast, and belly, a solid black hood and face, and yellow-and-black patterned wings. Do not use a black bird with chestnut wings.',
    Thraupidae: 'For Tangara seledon, show the Green-headed Tanager with a luminous emerald-green head, turquoise-blue face and underparts, black wings decorated with bright green and blue edging, and a small orange-gold shoulder patch. Do not use a red-headed black tanager.',
    Urocynchramidae: 'For Urocynchramus pylzowi, show Przevalski\'s Finch with a gray head and breast, warm brown streaked back, soft buff to pinkish flanks, a stout pale conical bill, and a long rufous-brown tail. Do not use a plain short-tailed brown sparrow.',
    Viduidae: 'For an adult male Vidua paradisaea, show the Long-tailed Paradise Whydah with a black head and upper breast, a warm chestnut-brown body, and several extremely long narrow black tail streamers extending far beyond the body. Do not use a short-tailed blue-black bird.',
    Zeledoniidae: 'For Zeledonia coronata, show the Wrenthrush with a dark slate-gray head and throat, warm rufous-brown upperparts and tail, a soft cinnamon-orange breast and belly, and a compact short-tailed body. Do not use a pale heavily streaked thrush-like bird.'
});

function parseArgs(argv) {
    const options = {
        families: new Set(),
        limit: Number.POSITIVE_INFINITY,
        concurrency: 1,
        force: false,
        promote: false,
        dryRun: false,
        reviewDir: defaultReviewDir
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        const value = argv[index + 1];
        if (arg === '--family' && value) {
            value.split(',').map(item => item.trim()).filter(Boolean).forEach(item => options.families.add(item));
            index += 1;
        } else if (arg === '--limit' && value) {
            options.limit = Number.parseInt(value, 10);
            index += 1;
        } else if (arg === '--concurrency' && value) {
            options.concurrency = Number.parseInt(value, 10);
            index += 1;
        } else if (arg === '--review-dir' && value) {
            options.reviewDir = path.resolve(value);
            index += 1;
        } else if (arg === '--force') {
            options.force = true;
        } else if (arg === '--promote') {
            options.promote = true;
        } else if (arg === '--dry-run') {
            options.dryRun = true;
        } else if (arg === '--help') {
            console.log('Usage: node scripts/generate-bird-images.js [--family FamilyA,FamilyB] [--limit N] [--concurrency 1-4] [--review-dir DIR] [--force] [--promote] [--dry-run]');
            process.exit(0);
        } else {
            throw new Error(`Unknown or incomplete argument: ${arg}`);
        }
    }

    if (options.limit !== Number.POSITIVE_INFINITY && (!Number.isInteger(options.limit) || options.limit < 1)) {
        throw new Error('--limit must be a positive integer');
    }
    if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 4) {
        throw new Error('--concurrency must be an integer from 1 to 4');
    }
    return options;
}

function loadBirdFamilies() {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, 'data/bird_families.js'), 'utf8'), context);
    vm.runInContext('this.families=BIRD_FAMILY_DEFS', context);
    return context.families;
}

function promotedImageFiles(family) {
    return fs.readdirSync(imageDir)
        .filter(file => file.startsWith(`${family.family_en}.`) && file.endsWith('.webp'));
}

function loadToken() {
    const fromEnvironment = process.env.WUZU_API_KEY?.trim();
    if (fromEnvironment) return fromEnvironment.replace(/^Bearer\s+/i, '');
    if (!fs.existsSync(tokenFile)) throw new Error('No Wuzu API token is available');

    const line = fs.readFileSync(tokenFile, 'utf8')
        .split(/\r?\n/)
        .map(value => value.trim())
        .find(value => value && !value.startsWith('#'));
    if (!line) throw new Error('No Wuzu API token is available');
    return line.replace(/^Bearer\s+/i, '');
}

function run(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', chunk => { stdout += chunk; });
        child.stderr.on('data', chunk => { stderr += chunk; });
        child.on('error', reject);
        child.on('close', code => {
            if (code === 0) resolve(stdout);
            else reject(new Error(`${command} exited with ${code}: ${stderr.trim()}`));
        });
    });
}

async function fetchJson(url, options, token) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 310000);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${token}`,
                ...(options.headers || {})
            }
        });
        const body = await response.text();
        let payload;
        try {
            payload = body ? JSON.parse(body) : {};
        } catch {
            throw new Error(`Wuzu returned non-JSON HTTP ${response.status}: ${body.slice(0, 300)}`);
        }
        if (!response.ok) {
            const message = payload?.error?.message || payload?.message || JSON.stringify(payload).slice(0, 300);
            const error = new Error(`Wuzu request failed (${response.status}): ${message}`);
            error.status = response.status;
            throw error;
        }
        return payload;
    } finally {
        clearTimeout(timeout);
    }
}

function collectBase64(value, result = []) {
    if (Array.isArray(value)) value.forEach(item => collectBase64(item, result));
    else if (value && typeof value === 'object') {
        if (typeof value.b64_json === 'string') result.push(value.b64_json);
        else Object.values(value).forEach(item => collectBase64(item, result));
    }
    return result;
}

function collectUrls(value, result = []) {
    if (Array.isArray(value)) value.forEach(item => collectUrls(item, result));
    else if (value && typeof value === 'object') {
        if (typeof value.url === 'string') result.push(value.url);
        if (Array.isArray(value.url)) {
            value.url.filter(item => typeof item === 'string').forEach(item => result.push(item));
        }
        Object.values(value).forEach(item => collectUrls(item, result));
    }
    return result;
}

function taskIdFrom(payload) {
    return payload?.task_id || payload?.id || payload?.data?.task_id || payload?.data?.id || null;
}

function taskStatus(payload) {
    return payload?.status || payload?.data?.status || null;
}

async function imageBufferFromPayload(payload) {
    const base64 = collectBase64(payload)[0];
    if (base64) return Buffer.from(base64, 'base64');

    const url = collectUrls(payload).find(value => /^https?:\/\//.test(value));
    if (!url) return null;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Generated image download failed (${response.status})`);
    return Buffer.from(await response.arrayBuffer());
}

async function requestImage(prompt, token) {
    const payload = await fetchJson(`${apiBase}/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-image-2', prompt, size: '4:3', n: 1 })
    }, token);

    const immediate = await imageBufferFromPayload(payload);
    if (immediate) return immediate;

    const taskId = taskIdFrom(payload);
    if (!taskId) throw new Error('Wuzu response did not contain an image or task ID');

    await new Promise(resolve => setTimeout(resolve, 15000));
    for (let attempt = 0; attempt < 72; attempt += 1) {
        const task = await fetchJson(`${apiBase}/tasks/${encodeURIComponent(taskId)}`, { method: 'GET' }, token);
        const status = String(taskStatus(task) || '').toLowerCase();
        if (['completed', 'succeeded', 'success'].includes(status)) {
            const image = await imageBufferFromPayload(task);
            if (image) return image;
            throw new Error('Wuzu completed the task without returning an image');
        }
        if (['failed', 'cancelled', 'canceled', 'error'].includes(status)) {
            throw new Error(`Wuzu task ${taskId} failed`);
        }
        await new Promise(resolve => setTimeout(resolve, 4000));
    }
    throw new Error(`Wuzu task ${taskId} timed out`);
}

function promptFor(family) {
    const commonSpecies = family.representative_species_en ? ` (${family.representative_species_en})` : '';
    const commonFamily = family.family_common_en ? `, representative of ${family.family_en} (${family.family_common_en})` : `, representative of ${family.family_en}`;
    const traits = speciesTraits[family.family_en] ? ` ${speciesTraits[family.family_en]}` : '';
    return [
        `Create a single accurate ${family.representative_species}${commonSpecies}${commonFamily} as a clean vintage zoological illustration.`,
        `Show a clear full-body side or three-quarter profile with the diagnostic bill shape, feet, wing and tail proportions, plumage pattern, and coloration of this exact species visible.${traits}`,
        'Center the complete bird in a 4:3 landscape frame with generous blank margins. Keep the full body, bill, feet, wing tips, and tail well inside the canvas.',
        'Use a warm blank paper background. No labels, Latin names, captions, plate numbers, watermark, border, extra birds, eggs, nests, or unrelated props.'
    ].join(' ');
}

async function makeCandidate(family, reviewDir, token, force) {
    const candidate = path.join(reviewDir, `${family.family_en}.webp`);
    if (fs.existsSync(candidate) && !force) return { candidate, skipped: true };

    fs.mkdirSync(reviewDir, { recursive: true });
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sauropsida-bird-image-'));
    const pngPath = path.join(workDir, 'generated.png');
    const webpPath = path.join(workDir, 'candidate.webp');
    try {
        let image;
        for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
                image = await requestImage(promptFor(family), token);
                break;
            } catch (error) {
                const retryable = error.status === 429 || (error.status && error.status >= 500) || !error.status;
                if (!retryable || attempt === 2) throw error;
                await new Promise(resolve => setTimeout(resolve, 5000 * (attempt + 1)));
            }
        }
        fs.writeFileSync(pngPath, image);
        await run('ffmpeg', [
            '-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-i', pngPath,
            '-vf', 'scale=800:600:flags=lanczos,format=yuv420p', '-frames:v', '1',
            '-c:v', 'libwebp', '-q:v', '84', '-compression_level', '6', webpPath
        ]);
        const imageInfo = await run('ffprobe', [
            '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,pix_fmt',
            '-of', 'csv=p=0', webpPath
        ]);
        if (!/^800,600,yuv420p\s*$/.test(imageInfo)) {
            throw new Error(`Converted ${family.family_en} image has unexpected dimensions or pixel format: ${imageInfo.trim()}`);
        }
        fs.copyFileSync(webpPath, candidate);
        return { candidate, skipped: false };
    } finally {
        fs.rmSync(workDir, { recursive: true, force: true });
    }
}

async function promoteCandidate(family, reviewDir) {
    const candidate = path.join(reviewDir, `${family.family_en}.webp`);
    if (!fs.existsSync(candidate)) throw new Error(`Missing reviewed candidate for ${family.family_en}`);
    const existing = promotedImageFiles(family);
    if (existing.length) {
        throw new Error(`${family.family_en} already has a promoted image (${existing.join(', ')}); remove it only after review before promoting a replacement`);
    }
    const image = fs.readFileSync(candidate);
    const hash = crypto.createHash('sha256').update(image).digest('hex').slice(0, 12);
    const target = path.join(imageDir, `${family.family_en}.${hash}.webp`);
    const stagingTarget = path.join(imageDir, `.${family.family_en}.${hash}.${process.pid}.${Date.now()}.tmp`);
    fs.mkdirSync(imageDir, { recursive: true });
    // The review directory normally lives under /tmp, which may be on a
    // different filesystem from the repository. Stage a copy alongside the
    // final asset, then atomically rename it within assets/images.
    try {
        fs.copyFileSync(candidate, stagingTarget);
        fs.renameSync(stagingTarget, target);
    } finally {
        fs.rmSync(stagingTarget, { force: true });
    }
    fs.unlinkSync(candidate);
    return target;
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    const generatedFamilies = loadBirdFamilies().filter(family => !family.reuse_image_from);
    const requestedKnownFamilies = generatedFamilies
        .filter(family => options.families.has(family.family_en));
    if (options.families.size && requestedKnownFamilies.length !== options.families.size) {
        const known = new Set(requestedKnownFamilies.map(family => family.family_en));
        const unknown = [...options.families].filter(family => !known.has(family));
        throw new Error(`Unknown or reused bird family: ${unknown.join(', ')}`);
    }

    const selectedFamilies = generatedFamilies
        .filter(family => options.families.size === 0 || options.families.has(family.family_en));
    const incompleteFamilies = options.promote
        ? selectedFamilies
        : selectedFamilies.filter(family => promotedImageFiles(family).length === 0);

    if (!options.promote && options.families.size && incompleteFamilies.length !== options.families.size) {
        const incomplete = new Set(incompleteFamilies.map(family => family.family_en));
        const promoted = [...options.families].filter(family => !incomplete.has(family));
        throw new Error(`Bird family already has a promoted image: ${promoted.join(', ')}. Remove it only after review before requesting a replacement.`);
    }

    const families = incompleteFamilies.slice(0, options.limit);
    if (!families.length) {
        console.log(options.promote ? 'No bird-family candidates selected for promotion.' : 'No missing bird-family images selected.');
        return;
    }

    if (options.dryRun) {
        families.forEach(family => console.log(`${family.family_en}\t${family.representative_species}`));
        return;
    }

    if (options.promote) {
        for (const [index, family] of families.entries()) {
            const target = await promoteCandidate(family, options.reviewDir);
            console.log(`[${index + 1}/${families.length}] promoted ${family.family_en} -> ${path.basename(target)}`);
        }
        return;
    }

    const token = loadToken();
    let nextIndex = 0;
    let completed = 0;
    const worker = async () => {
        while (nextIndex < families.length) {
            const family = families[nextIndex++];
            const result = await makeCandidate(family, options.reviewDir, token, options.force);
            completed += 1;
            console.log(`[${completed}/${families.length}] ${result.skipped ? 'kept' : 'generated'} ${family.family_en} -> ${result.candidate}`);
        }
    };
    await Promise.all(Array.from({ length: Math.min(options.concurrency, families.length) }, worker));
}

main().catch(error => {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
});
