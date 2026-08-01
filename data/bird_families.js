/**
 * Current bird family taxonomy for the living-tree view.
 * Taxonomy: IOC World Bird List v15.2 (2026), DOI 10.14344/IOC.ML.15.2.
 * Chinese taxon labels: Wikidata labels cross-checked against IOC's multilingual species list;
 * editorial Chinese labels fill the small set of families without a Wikidata Chinese label.
 */
const BIRD_ORDER_DEFS = Object.freeze([
  {
    "id": "Struthioniformes",
    "cn_name": "鸵鸟目",
    "rank": "order",
    "parent": "Palaeognathae",
    "divergence_time_mya": 20,
    "description": "非洲大型平胸鸟类，善于高速奔跑，不具真正飞行能力。",
    "en_description": "Large African ratites specialized for fast running and lacking true powered flight.",
    "en_name": "Struthioniformes"
  },
  {
    "id": "Rheiformes",
    "cn_name": "美洲鸵鸟目",
    "rank": "order",
    "parent": "Palaeognathae",
    "divergence_time_mya": 20,
    "description": "南美洲大型平胸鸟类，栖息于草原和稀树草原环境。",
    "en_description": "Large South American ratites of grassland and savanna environments.",
    "en_name": "Rheiformes"
  },
  {
    "id": "Apterygiformes",
    "cn_name": "无翼鸟目",
    "rank": "order",
    "parent": "Palaeognathae",
    "divergence_time_mya": 30,
    "description": "新西兰夜行性平胸鸟类，嗅觉发达，羽毛呈毛状。",
    "en_description": "Nocturnal New Zealand ratites with strong olfaction and hair-like plumage.",
    "en_name": "Apterygiformes"
  },
  {
    "id": "Casuariiformes",
    "cn_name": "鹤鸵目",
    "rank": "order",
    "parent": "Palaeognathae",
    "divergence_time_mya": 25,
    "description": "大洋洲大型平胸鸟类，后肢强健，适应开阔地快速奔跑。",
    "en_description": "Large Australasian ratites with powerful hindlimbs, adapted for rapid running in open habitats.",
    "en_name": "Casuariiformes"
  },
  {
    "id": "Tinamiformes",
    "cn_name": "䳍形目",
    "rank": "order",
    "parent": "Palaeognathae",
    "divergence_time_mya": 45,
    "description": "古颚类中仍保留飞行能力的地栖鸟类，以中南美洲森林和灌丛为主。",
    "en_description": "Ground-dwelling paleognaths that retained flight, centered in Central and South American forests and scrub.",
    "en_name": "Tinamiformes"
  },
  {
    "id": "Galliformes",
    "cn_name": "鸡形目",
    "rank": "order",
    "parent": "Galloanserae",
    "divergence_time_mya": 50,
    "description": "地栖型陆鸟类，翅短而爆发力强，多取食种子、嫩叶和小型无脊椎动物。",
    "en_description": "Mostly terrestrial landbirds with short powerful wings, feeding widely on seeds, shoots, and small invertebrates.",
    "en_name": "Galliformes"
  },
  {
    "id": "Anseriformes",
    "cn_name": "雁形目",
    "rank": "order",
    "parent": "Galloanserae",
    "divergence_time_mya": 45,
    "description": "雁鸭类水鸟，嘴缘与蹼足适于滤食、游水和涉水生活。",
    "en_description": "Waterfowl whose lamellate bills and webbed feet suit swimming, filtering, and wading lifestyles.",
    "en_name": "Anseriformes"
  },
  {
    "id": "Caprimulgiformes",
    "cn_name": "夜鹰目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 40,
    "description": "夜鹰类多为夜行或晨昏活动的空中捕食鸟，现行 IOC 体系在本目仅保留夜鹰科。",
    "en_description": "Nightjars are mainly nocturnal or crepuscular aerial insectivores; current IOC treatment retains only Caprimulgidae in this order.",
    "en_name": "Caprimulgiformes"
  },
  {
    "id": "Apodiformes",
    "cn_name": "雨燕目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 35,
    "description": "雨燕与蜂鸟所在支系，飞行能力极强，部分类群悬停特化显著。",
    "en_description": "The swift-hummingbird lineage, marked by exceptional flight ability and extreme hovering specialization in some members.",
    "en_name": "Apodiformes"
  },
  {
    "id": "Musophagiformes",
    "cn_name": "蕉鹃目",
    "rank": "order",
    "parent": "Otidimorphae",
    "divergence_time_mya": 28,
    "description": "蕉鹃类为非洲树栖果食鸟，常具鲜艳羽色或显著羽冠。",
    "en_description": "African arboreal fruit-eating birds often notable for bright plumage or prominent crests.",
    "en_name": "Musophagiformes"
  },
  {
    "id": "Otidiformes",
    "cn_name": "鸨形目",
    "rank": "order",
    "parent": "Otidimorphae",
    "divergence_time_mya": 24,
    "description": "鸨类多为开阔地大型地栖鸟，雄鸟常具夸张的求偶展示行为。",
    "en_description": "Mostly large ground-dwelling birds of open country, with males often showing elaborate courtship displays.",
    "en_name": "Otidiformes"
  },
  {
    "id": "Cuculiformes",
    "cn_name": "鹃形目",
    "rank": "order",
    "parent": "Otidimorphae",
    "divergence_time_mya": 38,
    "description": "鹃类多样化明显，许多种类演化出典型巢寄生行为。",
    "en_description": "A diverse order in which many species evolved classic brood-parasitic behavior.",
    "en_name": "Cuculiformes"
  },
  {
    "id": "Mesitornithiformes",
    "cn_name": "拟鹑目",
    "rank": "order",
    "parent": "Columbimorphae",
    "divergence_time_mya": 25,
    "description": "拟鹑类为马达加斯加特有的小型地栖鸟，是现代鸟类中的孑遗支。",
    "en_description": "Small ground birds endemic to Madagascar, representing a relict modern avian lineage.",
    "en_name": "Mesitornithiformes"
  },
  {
    "id": "Pterocliformes",
    "cn_name": "沙鸡目",
    "rank": "order",
    "parent": "Columbimorphae",
    "divergence_time_mya": 32,
    "description": "沙鸡类适应干旱开阔环境，善远距离飞行取水。",
    "en_description": "Sandgrouse adapted to arid open country and capable of long-distance flights to water.",
    "en_name": "Pterocliformes"
  },
  {
    "id": "Columbiformes",
    "cn_name": "鸽形目",
    "rank": "order",
    "parent": "Columbimorphae",
    "divergence_time_mya": 36,
    "description": "鸽形类具喙基蜡膜，飞行能力强，多取食果实和种子。",
    "en_description": "Pigeons and doves, strong fliers with a fleshy cere and diets centered largely on fruits and seeds.",
    "en_name": "Columbiformes"
  },
  {
    "id": "Gruiformes",
    "cn_name": "鹤形目",
    "rank": "order",
    "parent": "Neoaves",
    "divergence_time_mya": 38,
    "description": "鹤形类包含长腿涉禽和部分地栖杂食鸟，是形态差异较大的古老支系。",
    "en_description": "An old and morphologically varied order containing long-legged waders as well as some terrestrial omnivores.",
    "en_name": "Gruiformes"
  },
  {
    "id": "Eurypygiformes",
    "cn_name": "日鳽目",
    "rank": "order",
    "parent": "Neoaves",
    "divergence_time_mya": 18,
    "description": "日鳽类现生仅少数孤立支系，保留了较独特的早期新鸟谱系特征。",
    "en_description": "A tiny surviving order of isolated lineages retaining unusual early neoavian traits.",
    "en_name": "Eurypygiformes"
  },
  {
    "id": "Phaethontiformes",
    "cn_name": "鹲形目",
    "rank": "order",
    "parent": "Neoaves",
    "divergence_time_mya": 15,
    "description": "鹲类为热带远洋海鸟，中央尾羽常极度延长。",
    "en_description": "Tropical pelagic seabirds with greatly elongated central tail feathers.",
    "en_name": "Phaethontiformes"
  },
  {
    "id": "Opisthocomiformes",
    "cn_name": "麝雉目",
    "rank": "order",
    "parent": "Neoaves",
    "divergence_time_mya": 10,
    "description": "麝雉单型目，南美树栖叶食鸟，消化系统与雏鸟特征都很独特。",
    "en_description": "A monotypic South American arboreal leaf-eating bird with highly unusual digestive and juvenile traits.",
    "en_name": "Opisthocomiformes"
  },
  {
    "id": "Charadriiformes",
    "cn_name": "鸻形目",
    "rank": "order",
    "parent": "Aequorlitornithes",
    "divergence_time_mya": 45,
    "description": "鸻形类包含鸻鹬鸥燕鸻等多个支系，是滨海和湿地鸟类的重要主体。",
    "en_description": "A major coastal and wetland bird radiation including plovers, sandpipers, gulls, terns, and allies.",
    "en_name": "Charadriiformes"
  },
  {
    "id": "Podicipediformes",
    "cn_name": "䴙䴘目",
    "rank": "order",
    "parent": "Mirandornithes",
    "divergence_time_mya": 20,
    "description": "䴙䴘类为高度潜水化水鸟，足叶瓣化显著，陆上行动笨拙。",
    "en_description": "Highly specialized diving birds with lobed toes and awkward movement on land.",
    "en_name": "Podicipediformes"
  },
  {
    "id": "Phoenicopteriformes",
    "cn_name": "红鹳目",
    "rank": "order",
    "parent": "Mirandornithes",
    "divergence_time_mya": 18,
    "description": "红鹳类以滤食为主，长腿长颈，常形成大群栖息繁殖地。",
    "en_description": "Filter-feeding flamingos with long legs and necks that often breed and roost in dense colonies.",
    "en_name": "Phoenicopteriformes"
  },
  {
    "id": "Gaviiformes",
    "cn_name": "潜鸟目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 16,
    "description": "潜鸟类适应寒温带水域潜水捕食，后肢明显后移。",
    "en_description": "Diving birds of cool temperate waters, with hindlimbs set far back on the body.",
    "en_name": "Gaviiformes"
  },
  {
    "id": "Sphenisciformes",
    "cn_name": "企鹅目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 25,
    "description": "企鹅类为南半球海生潜水鸟，前肢演化为鳍状翼。",
    "en_description": "Southern Hemisphere marine diving birds whose forelimbs evolved into flipper-like wings.",
    "en_name": "Sphenisciformes"
  },
  {
    "id": "Procellariiformes",
    "cn_name": "鹱形目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 30,
    "description": "鹱形类为典型管鼻海鸟，远洋滑翔与长距离迁飞能力突出。",
    "en_description": "Classic tube-nosed seabirds with exceptional oceanic gliding and long-distance travel ability.",
    "en_name": "Procellariiformes"
  },
  {
    "id": "Ciconiiformes",
    "cn_name": "鹳形目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 26,
    "description": "鹳类为大型涉禽，颈腿修长，多在开阔湿地或农田觅食。",
    "en_description": "Large wading birds with long necks and legs, usually foraging in open wetlands or agricultural land.",
    "en_name": "Ciconiiformes"
  },
  {
    "id": "Suliformes",
    "cn_name": "鲣鸟目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 26,
    "description": "鲣鸟类包含鲣鸟、军舰鸟、鸬鹚和蛇鹈，捕鱼方式多样。",
    "en_description": "A fishing-bird assemblage including boobies, frigatebirds, cormorants, and darters, with diverse capture styles.",
    "en_name": "Suliformes"
  },
  {
    "id": "Pelecaniformes",
    "cn_name": "鹈形目",
    "rank": "order",
    "parent": "Aequornithes",
    "divergence_time_mya": 30,
    "description": "鹈形类多为涉水或近海捕鱼鸟，部分支系喉囊和嘴形高度特化。",
    "en_description": "Mostly wading or nearshore fishing birds, some with highly specialized bills and throat pouches.",
    "en_name": "Pelecaniformes"
  },
  {
    "id": "Accipitriformes",
    "cn_name": "鹰形目",
    "rank": "order",
    "parent": "Accipitrimorphae",
    "divergence_time_mya": 32,
    "description": "IOC 现行框架下的鹰形目包含鹰、鹫、鹞、鸢及美洲鹫等日行猛禽，钩喙与利爪高度发达。",
    "en_description": "Under the current IOC framework this order includes eagles, vultures, hawks, harriers, kites, and New World vultures, all with strongly hooked bills and talons.",
    "en_name": "Accipitriformes"
  },
  {
    "id": "Strigiformes",
    "cn_name": "鸮形目",
    "rank": "order",
    "parent": "Accipitrimorphae",
    "divergence_time_mya": 34,
    "description": "鸮形类为夜行猛禽，面盘结构与听觉定位能力突出。",
    "en_description": "Nocturnal birds of prey with facial discs and highly developed auditory localization.",
    "en_name": "Strigiformes"
  },
  {
    "id": "Coliiformes",
    "cn_name": "鼠鸟目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 20,
    "description": "鼠鸟类是非洲特有的小型树栖鸟，尾长且常群居活动。",
    "en_description": "Small African arboreal birds with long tails and strongly social habits.",
    "en_name": "Coliiformes"
  },
  {
    "id": "Leptosomiformes",
    "cn_name": "鹃鴗目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 15,
    "description": "鹃鴗类为马达加斯加及邻近岛屿特有的孤立支系。",
    "en_description": "An isolated lineage endemic to Madagascar and nearby islands.",
    "en_name": "Leptosomiformes"
  },
  {
    "id": "Trogoniformes",
    "cn_name": "咬鹃目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 22,
    "description": "咬鹃类多分布于热带森林，羽色华丽，趾型特化明显。",
    "en_description": "Mostly tropical forest birds, often brilliantly colored and marked by distinctive toe arrangements.",
    "en_name": "Trogoniformes"
  },
  {
    "id": "Bucerotiformes",
    "cn_name": "犀鸟目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 28,
    "description": "犀鸟类包含犀鸟、戴胜和地犀鸟，喙大且常具盔突。",
    "en_description": "The hornbill lineage, including hornbills, hoopoes, and ground hornbills, often with large bills and casque-like structures.",
    "en_name": "Bucerotiformes"
  },
  {
    "id": "Coraciiformes",
    "cn_name": "佛法僧目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 30,
    "description": "佛法僧类多为色彩鲜艳的伏击型捕食鸟，含翠鸟、蜂虎等。",
    "en_description": "Often brightly colored sit-and-wait predators, including kingfishers, bee-eaters, and allies.",
    "en_name": "Coraciiformes"
  },
  {
    "id": "Piciformes",
    "cn_name": "䴕形目",
    "rank": "order",
    "parent": "Coraciimorphae",
    "divergence_time_mya": 26,
    "description": "䴕形类多具攀树或凿木适应，包括啄木鸟和巨嘴鸟等。",
    "en_description": "A largely scansorial or wood-excavating group including woodpeckers, toucans, and relatives.",
    "en_name": "Piciformes"
  },
  {
    "id": "Cariamiformes",
    "cn_name": "叫鹤目",
    "rank": "order",
    "parent": "Australaves",
    "divergence_time_mya": 22,
    "description": "叫鹤类为南美开阔地长腿掠食鸟，是南方鸟类的早期分支之一。",
    "en_description": "Long-legged predatory birds of open South American habitats and one of the earliest branches within Australaves.",
    "en_name": "Cariamiformes"
  },
  {
    "id": "Falconiformes",
    "cn_name": "隼形目",
    "rank": "order",
    "parent": "Australaves",
    "divergence_time_mya": 20,
    "description": "隼形类为高速俯冲型猛禽，喙缘常具明显齿突。",
    "en_description": "High-speed raptorial birds, often with a distinct tomial tooth on the bill.",
    "en_name": "Falconiformes"
  },
  {
    "id": "Psittaciformes",
    "cn_name": "鹦形目",
    "rank": "order",
    "parent": "Australaves",
    "divergence_time_mya": 32,
    "description": "鹦形类具弯喙和对趾足，社会性和认知能力普遍较高。",
    "en_description": "Parrots with strongly curved bills, zygodactyl feet, and generally high social and cognitive complexity.",
    "en_name": "Psittaciformes"
  },
  {
    "id": "Passeriformes",
    "cn_name": "雀形目",
    "rank": "order",
    "parent": "Australaves",
    "divergence_time_mya": 35,
    "description": "雀形目为现生鸟类中物种最丰富的辐射支，鸣管结构高度特化。",
    "en_description": "The most species-rich living bird radiation, with a highly specialized syrinx.",
    "en_name": "Passeriformes"
  },
  {
    "id": "Steatornithiformes",
    "cn_name": "油夜鹰目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 30,
    "description": "油夜鹰为南美洲夜行性果食鸟，现生仅存一个科。",
    "en_description": "The oilbird is a nocturnal fruit-eating South American lineage represented by one living family.",
    "en_name": "Steatornithiformes"
  },
  {
    "id": "Nyctibiiformes",
    "cn_name": "钩嘴夜鹰目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 30,
    "description": "钩嘴夜鹰类为热带美洲夜行伏栖鸟，现生仅存一个科。",
    "en_description": "Potoos are nocturnal Neotropical birds specialized for cryptic upright roosting and form one living family.",
    "en_name": "Nyctibiiformes"
  },
  {
    "id": "Podargiformes",
    "cn_name": "蟆口鸱目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 35,
    "description": "蟆口鸱类为澳大拉西亚夜行性林鸟，现生仅存一个科。",
    "en_description": "Frogmouths are nocturnal Australasian forest birds represented by one living family.",
    "en_name": "Podargiformes"
  },
  {
    "id": "Aegotheliformes",
    "cn_name": "鸱夜鹰目",
    "rank": "order",
    "parent": "Strisores",
    "divergence_time_mya": 30,
    "description": "鸱夜鹰类为澳大拉西亚夜行性林鸟，现生仅存一个科。",
    "en_description": "Owlet-nightjars are nocturnal Australasian forest birds represented by one living family.",
    "en_name": "Aegotheliformes"
  }
]);

const BIRD_FAMILY_DEFS = Object.freeze([
  {
    "order": "Struthioniformes",
    "family_en": "Struthionidae",
    "family_cn": "鸵鸟科",
    "family_common_en": "Ostriches",
    "representative_species": "Struthio camelus",
    "representative_species_en": "Common Ostrich",
    "representative_species_cn": "非洲鸵鸟",
    "reuse_image_from": "Struthioniformes",
    "divergence_time_mya": 12
  },
  {
    "order": "Rheiformes",
    "family_en": "Rheidae",
    "family_cn": "美洲鸵科",
    "family_common_en": "Rheas",
    "representative_species": "Rhea americana",
    "representative_species_en": "Greater Rhea",
    "representative_species_cn": "大美洲鸵",
    "reuse_image_from": "Rheiformes",
    "divergence_time_mya": 12
  },
  {
    "order": "Apterygiformes",
    "family_en": "Apterygidae",
    "family_cn": "鹬鸵科",
    "family_common_en": "Kiwis",
    "representative_species": "Apteryx mantelli",
    "representative_species_en": "North Island Brown Kiwi",
    "representative_species_cn": "北岛褐几维",
    "reuse_image_from": "Apterygiformes",
    "divergence_time_mya": 18
  },
  {
    "order": "Casuariiformes",
    "family_en": "Casuariidae",
    "family_cn": "鹤鸵科",
    "family_common_en": "Cassowaries, Emu",
    "representative_species": "Dromaius novaehollandiae",
    "representative_species_en": "Emu",
    "representative_species_cn": "鸸鹋",
    "reuse_image_from": "Casuariiformes",
    "divergence_time_mya": 15
  },
  {
    "order": "Tinamiformes",
    "family_en": "Tinamidae",
    "family_cn": "䳍科",
    "family_common_en": "Tinamous",
    "representative_species": "Tinamus major",
    "representative_species_en": "Great Tinamou",
    "representative_species_cn": "大䳍",
    "reuse_image_from": "Tinamiformes",
    "divergence_time_mya": 27
  },
  {
    "order": "Anseriformes",
    "family_en": "Anhimidae",
    "family_cn": "叫鸭科",
    "family_common_en": "Screamers",
    "representative_species": "Anhima cornuta",
    "representative_species_en": "Horned Screamer",
    "representative_species_cn": "角叫鸭",
    "divergence_time_mya": 27
  },
  {
    "order": "Anseriformes",
    "family_en": "Anseranatidae",
    "family_cn": "鹊雁科",
    "family_common_en": "Magpie Goose",
    "representative_species": "Anseranas semipalmata",
    "representative_species_en": "Magpie Goose",
    "representative_species_cn": "鹊雁",
    "divergence_time_mya": 27
  },
  {
    "order": "Anseriformes",
    "family_en": "Anatidae",
    "family_cn": "鸭科",
    "family_common_en": "Ducks, Geese, Swans",
    "representative_species": "Anas platyrhynchos",
    "representative_species_en": "Mallard",
    "representative_species_cn": "绿头鸭",
    "reuse_image_from": "Anseriformes",
    "divergence_time_mya": 27
  },
  {
    "order": "Galliformes",
    "family_en": "Megapodiidae",
    "family_cn": "冢雉科",
    "family_common_en": "Megapodes",
    "representative_species": "Alectura lathami",
    "representative_species_en": "Australian Brushturkey",
    "representative_species_cn": "大塚雉",
    "divergence_time_mya": 30
  },
  {
    "order": "Galliformes",
    "family_en": "Cracidae",
    "family_cn": "凤冠雉科",
    "family_common_en": "Chachalacas, Curassows, Guans",
    "representative_species": "Ortalis vetula",
    "representative_species_en": "Plain Chachalaca",
    "representative_species_cn": "纯色小冠雉",
    "divergence_time_mya": 30
  },
  {
    "order": "Galliformes",
    "family_en": "Numididae",
    "family_cn": "珠雞科",
    "family_common_en": "Guineafowl",
    "representative_species": "Agelastes meleagrides",
    "representative_species_en": "White-breasted Guineafowl",
    "representative_species_cn": "白胸珠鸡",
    "divergence_time_mya": 30
  },
  {
    "order": "Galliformes",
    "family_en": "Odontophoridae",
    "family_cn": "齿鹑科",
    "family_common_en": "New World Quail",
    "representative_species": "Ptilopachus petrosus",
    "representative_species_en": "Stone Partridge",
    "representative_species_cn": "石鹑",
    "divergence_time_mya": 30
  },
  {
    "order": "Galliformes",
    "family_en": "Phasianidae",
    "family_cn": "雉科",
    "family_common_en": "Pheasants & Allies",
    "representative_species": "Gallus gallus",
    "representative_species_en": "Red Junglefowl",
    "representative_species_cn": "红原鸡",
    "reuse_image_from": "Galliformes",
    "divergence_time_mya": 30
  },
  {
    "order": "Caprimulgiformes",
    "family_en": "Caprimulgidae",
    "family_cn": "夜鹰科",
    "family_common_en": "Nightjars",
    "representative_species": "Caprimulgus indicus",
    "representative_species_en": "Jungle Nightjar",
    "representative_species_cn": "丛林夜鹰",
    "reuse_image_from": "Caprimulgiformes",
    "divergence_time_mya": 24
  },
  {
    "order": "Steatornithiformes",
    "family_en": "Steatornithidae",
    "family_cn": "油鸱科",
    "family_common_en": "Oilbird",
    "representative_species": "Steatornis caripensis",
    "representative_species_en": "Oilbird",
    "representative_species_cn": "油夜鹰",
    "divergence_time_mya": 18
  },
  {
    "order": "Nyctibiiformes",
    "family_en": "Nyctibiidae",
    "family_cn": "钩嘴夜鹰科",
    "family_common_en": "Potoos",
    "representative_species": "Nyctibius grandis",
    "representative_species_en": "Great Potoo",
    "representative_species_cn": "大钩嘴夜鹰",
    "divergence_time_mya": 18
  },
  {
    "order": "Podargiformes",
    "family_en": "Podargidae",
    "family_cn": "蟆口鸱科",
    "family_common_en": "Frogmouths",
    "representative_species": "Podargus strigoides",
    "representative_species_en": "Tawny Frogmouth",
    "representative_species_cn": "茶色蛙口夜鹰",
    "divergence_time_mya": 21
  },
  {
    "order": "Aegotheliformes",
    "family_en": "Aegothelidae",
    "family_cn": "裸鼻鸱科",
    "family_common_en": "Owlet-nightjars",
    "representative_species": "Aegotheles cristatus",
    "representative_species_en": "Australian Owlet-nightjar",
    "representative_species_cn": "澳洲裸鼻夜鹰",
    "divergence_time_mya": 18
  },
  {
    "order": "Apodiformes",
    "family_en": "Hemiprocnidae",
    "family_cn": "凤头雨燕科",
    "family_common_en": "Treeswifts",
    "representative_species": "Hemiprocne coronata",
    "representative_species_en": "Crested Treeswift",
    "representative_species_cn": "凤头雨燕",
    "divergence_time_mya": 21
  },
  {
    "order": "Apodiformes",
    "family_en": "Apodidae",
    "family_cn": "雨燕科",
    "family_common_en": "Swifts",
    "representative_species": "Apus apus",
    "representative_species_en": "Common Swift",
    "representative_species_cn": "普通雨燕",
    "reuse_image_from": "Apodiformes",
    "divergence_time_mya": 21
  },
  {
    "order": "Apodiformes",
    "family_en": "Trochilidae",
    "family_cn": "蜂鸟科",
    "family_common_en": "Hummingbirds",
    "representative_species": "Topaza pella",
    "representative_species_en": "Crimson Topaz",
    "representative_species_cn": "赤叉尾蜂鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Musophagiformes",
    "family_en": "Musophagidae",
    "family_cn": "蕉鹃科",
    "family_common_en": "Turacos",
    "representative_species": "Corythaeola cristata",
    "representative_species_en": "Great Blue Turaco",
    "representative_species_cn": "蓝蕉鹃",
    "reuse_image_from": "Musophagiformes",
    "divergence_time_mya": 17
  },
  {
    "order": "Otidiformes",
    "family_en": "Otididae",
    "family_cn": "鸨科",
    "family_common_en": "Bustards",
    "representative_species": "Otis tarda",
    "representative_species_en": "Great Bustard",
    "representative_species_cn": "大鸨",
    "reuse_image_from": "Otidiformes",
    "divergence_time_mya": 14
  },
  {
    "order": "Cuculiformes",
    "family_en": "Cuculidae",
    "family_cn": "杜鹃科",
    "family_common_en": "Cuckoos",
    "representative_species": "Cuculus canorus",
    "representative_species_en": "Common Cuckoo",
    "representative_species_cn": "大杜鹃",
    "reuse_image_from": "Cuculiformes",
    "divergence_time_mya": 23
  },
  {
    "order": "Mesitornithiformes",
    "family_en": "Mesitornithidae",
    "family_cn": "拟鹑科",
    "family_common_en": "Mesites",
    "representative_species": "Mesitornis unicolor",
    "representative_species_en": "Brown Mesite",
    "representative_species_cn": "褐拟鹑",
    "reuse_image_from": "Mesitornithiformes",
    "divergence_time_mya": 15
  },
  {
    "order": "Pterocliformes",
    "family_en": "Pteroclidae",
    "family_cn": "沙鸡科",
    "family_common_en": "Sandgrouse",
    "representative_species": "Pterocles alchata",
    "representative_species_en": "Pin-tailed Sandgrouse",
    "representative_species_cn": "白腹沙鸡",
    "reuse_image_from": "Pterocliformes",
    "divergence_time_mya": 19
  },
  {
    "order": "Columbiformes",
    "family_en": "Columbidae",
    "family_cn": "鸠鸽科",
    "family_common_en": "Pigeons, Doves",
    "representative_species": "Columba livia",
    "representative_species_en": "Rock Dove",
    "representative_species_cn": "原鸽",
    "reuse_image_from": "Columbiformes",
    "divergence_time_mya": 22
  },
  {
    "order": "Gruiformes",
    "family_en": "Heliornithidae",
    "family_cn": "日鷉科",
    "family_common_en": "Finfoots",
    "representative_species": "Podica senegalensis",
    "representative_species_en": "African Finfoot",
    "representative_species_cn": "非洲鳍趾䴘",
    "divergence_time_mya": 23
  },
  {
    "order": "Gruiformes",
    "family_en": "Sarothruridae",
    "family_cn": "侏秧鸡科",
    "family_common_en": "Flufftails & Forest Rails",
    "representative_species": "Mentocrex kioloides",
    "representative_species_en": "Madagascar Forest Rail",
    "representative_species_cn": "马岛林秧鸡",
    "divergence_time_mya": 23
  },
  {
    "order": "Gruiformes",
    "family_en": "Rallidae",
    "family_cn": "秧鸡科",
    "family_common_en": "Rails, Crakes & Coots",
    "representative_species": "Canirallus oculeus",
    "representative_species_en": "Grey-throated Rail",
    "representative_species_cn": "灰喉秧鸡",
    "divergence_time_mya": 23
  },
  {
    "order": "Gruiformes",
    "family_en": "Psophiidae",
    "family_cn": "喇叭鸟科",
    "family_common_en": "Trumpeters",
    "representative_species": "Psophia crepitans",
    "representative_species_en": "Grey-winged Trumpeter",
    "representative_species_cn": "灰翅喇叭声鹤",
    "divergence_time_mya": 23
  },
  {
    "order": "Gruiformes",
    "family_en": "Gruidae",
    "family_cn": "鹤科",
    "family_common_en": "Cranes",
    "representative_species": "Grus grus",
    "representative_species_en": "Common Crane",
    "representative_species_cn": "灰鹤",
    "reuse_image_from": "Gruiformes",
    "divergence_time_mya": 23
  },
  {
    "order": "Gruiformes",
    "family_en": "Aramidae",
    "family_cn": "秧鹤科",
    "family_common_en": "Limpkin",
    "representative_species": "Aramus guarauna",
    "representative_species_en": "Limpkin",
    "representative_species_cn": "秧鹤",
    "divergence_time_mya": 23
  },
  {
    "order": "Podicipediformes",
    "family_en": "Podicipedidae",
    "family_cn": "鷿鷈科",
    "family_common_en": "Grebes",
    "representative_species": "Podiceps cristatus",
    "representative_species_en": "Great Crested Grebe",
    "representative_species_cn": "凤头䴙䴘",
    "reuse_image_from": "Podicipediformes",
    "divergence_time_mya": 12
  },
  {
    "order": "Phoenicopteriformes",
    "family_en": "Phoenicopteridae",
    "family_cn": "红鹳科",
    "family_common_en": "Flamingos",
    "representative_species": "Phoenicopterus roseus",
    "representative_species_en": "Greater Flamingo",
    "representative_species_cn": "大红鹳",
    "reuse_image_from": "Phoenicopteriformes",
    "divergence_time_mya": 11
  },
  {
    "order": "Charadriiformes",
    "family_en": "Turnicidae",
    "family_cn": "三趾鹑科",
    "family_common_en": "Buttonquail",
    "representative_species": "Turnix tanki",
    "representative_species_en": "Yellow-legged Buttonquail",
    "representative_species_cn": "黄脚三趾鹑",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Burhinidae",
    "family_cn": "石鸻科",
    "family_common_en": "Stone-curlews, Thick-knees",
    "representative_species": "Hesperoburhinus bistriatus",
    "representative_species_en": "Double-striped Thick-knee",
    "representative_species_cn": "双纹石鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Pluvianellidae",
    "family_cn": "麦哲伦鸻科",
    "family_common_en": "Magellanic Plover",
    "representative_species": "Pluvianellus socialis",
    "representative_species_en": "Magellanic Plover",
    "representative_species_cn": "短腿鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Chionidae",
    "family_cn": "鞘嘴鸥科",
    "family_common_en": "Sheathbills",
    "representative_species": "Chionis albus",
    "representative_species_en": "Snowy Sheathbill",
    "representative_species_cn": "白鞘嘴鸥",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Haematopodidae",
    "family_cn": "蛎鹬科",
    "family_common_en": "Oystercatchers",
    "representative_species": "Haematopus leucopodus",
    "representative_species_en": "Magellanic Oystercatcher",
    "representative_species_cn": "智利蛎鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Ibidorhynchidae",
    "family_cn": "鹮嘴鹬科",
    "family_common_en": "Ibisbill",
    "representative_species": "Ibidorhyncha struthersii",
    "representative_species_en": "Ibisbill",
    "representative_species_cn": "鹮嘴鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Recurvirostridae",
    "family_cn": "反嘴鹬科",
    "family_common_en": "Stilts, Avocets",
    "representative_species": "Himantopus himantopus",
    "representative_species_en": "Black-winged Stilt",
    "representative_species_cn": "黑翅长脚鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Charadriidae",
    "family_cn": "鸻科",
    "family_common_en": "Plovers",
    "representative_species": "Pluvialis squatarola",
    "representative_species_en": "Grey Plover",
    "representative_species_cn": "灰斑鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Pluvianidae",
    "family_cn": "埃及鸻科",
    "family_common_en": "Egyptian Plover",
    "representative_species": "Pluvianus aegyptius",
    "representative_species_en": "Egyptian Plover",
    "representative_species_cn": "蓝腿燕鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Rostratulidae",
    "family_cn": "彩鹬科",
    "family_common_en": "Painted-snipes",
    "representative_species": "Rostratula benghalensis",
    "representative_species_en": "Greater Painted-snipe",
    "representative_species_cn": "彩鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Jacanidae",
    "family_cn": "雉鸻科",
    "family_common_en": "Jacanas",
    "representative_species": "Hydrophasianus chirurgus",
    "representative_species_en": "Pheasant-tailed Jacana",
    "representative_species_cn": "水雉",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Pedionomidae",
    "family_cn": "领鹑科",
    "family_common_en": "Plains-wanderer",
    "representative_species": "Pedionomus torquatus",
    "representative_species_en": "Plains-wanderer",
    "representative_species_cn": "领鹑",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Thinocoridae",
    "family_cn": "籽鹬科",
    "family_common_en": "Seedsnipes",
    "representative_species": "Attagis gayi",
    "representative_species_en": "Rufous-bellied Seedsnipe",
    "representative_species_cn": "棕腹籽鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Scolopacidae",
    "family_cn": "鹬科",
    "family_common_en": "Sandpipers, Snipes",
    "representative_species": "Bartramia longicauda",
    "representative_species_en": "Upland Sandpiper",
    "representative_species_cn": "高原鹬",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Dromadidae",
    "family_cn": "蟹鸻科",
    "family_common_en": "Crab-plover",
    "representative_species": "Dromas ardeola",
    "representative_species_en": "Crab-plover",
    "representative_species_cn": "蟹鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Glareolidae",
    "family_cn": "燕鸻科",
    "family_common_en": "Coursers, Pratincoles",
    "representative_species": "Smutsornis africanus",
    "representative_species_en": "Double-banded Courser",
    "representative_species_cn": "双领斑走鸻",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Laridae",
    "family_cn": "鸥科",
    "family_common_en": "Gulls, Terns, Skimmers",
    "representative_species": "Larus argentatus",
    "representative_species_en": "European Herring Gull",
    "representative_species_cn": "银鸥",
    "reuse_image_from": "Charadriiformes",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Stercorariidae",
    "family_cn": "贼鸥科",
    "family_common_en": "Skuas",
    "representative_species": "Stercorarius longicaudus",
    "representative_species_en": "Long-tailed Jaeger",
    "representative_species_cn": "长尾贼鸥",
    "divergence_time_mya": 27
  },
  {
    "order": "Charadriiformes",
    "family_en": "Alcidae",
    "family_cn": "海雀科",
    "family_common_en": "Auks",
    "representative_species": "Cerorhinca monocerata",
    "representative_species_en": "Rhinoceros Auklet",
    "representative_species_cn": "角嘴海雀",
    "divergence_time_mya": 27
  },
  {
    "order": "Eurypygiformes",
    "family_en": "Rhynochetidae",
    "family_cn": "鹭鹤科",
    "family_common_en": "Kagu",
    "representative_species": "Rhynochetos jubatus",
    "representative_species_en": "Kagu",
    "representative_species_cn": "鹭鹤",
    "divergence_time_mya": 11
  },
  {
    "order": "Eurypygiformes",
    "family_en": "Eurypygidae",
    "family_cn": "日鳽科",
    "family_common_en": "Sunbittern",
    "representative_species": "Eurypyga helias",
    "representative_species_en": "Sunbittern",
    "representative_species_cn": "日鳽",
    "reuse_image_from": "Eurypygiformes",
    "divergence_time_mya": 11
  },
  {
    "order": "Phaethontiformes",
    "family_en": "Phaethontidae",
    "family_cn": "鹲科",
    "family_common_en": "Tropicbirds",
    "representative_species": "Phaethon rubricauda",
    "representative_species_en": "Red-tailed Tropicbird",
    "representative_species_cn": "红尾鹲",
    "reuse_image_from": "Phaethontiformes",
    "divergence_time_mya": 9
  },
  {
    "order": "Gaviiformes",
    "family_en": "Gaviidae",
    "family_cn": "潜鸟科",
    "family_common_en": "Loons",
    "representative_species": "Gavia immer",
    "representative_species_en": "Common Loon",
    "representative_species_cn": "普通潜鸟",
    "reuse_image_from": "Gaviiformes",
    "divergence_time_mya": 10
  },
  {
    "order": "Sphenisciformes",
    "family_en": "Spheniscidae",
    "family_cn": "企鵝科",
    "family_common_en": "Penguins",
    "representative_species": "Aptenodytes forsteri",
    "representative_species_en": "Emperor Penguin",
    "representative_species_cn": "帝企鹅",
    "reuse_image_from": "Sphenisciformes",
    "divergence_time_mya": 15
  },
  {
    "order": "Procellariiformes",
    "family_en": "Oceanitidae",
    "family_cn": "南风暴海燕科",
    "family_common_en": "Austral Storm Petrels",
    "representative_species": "Oceanites oceanicus",
    "representative_species_en": "Wilson's Storm Petrel",
    "representative_species_cn": "黄蹼洋海燕",
    "divergence_time_mya": 18
  },
  {
    "order": "Procellariiformes",
    "family_en": "Diomedeidae",
    "family_cn": "信天翁科",
    "family_common_en": "Albatrosses",
    "representative_species": "Diomedea exulans",
    "representative_species_en": "Snowy Albatross",
    "representative_species_cn": "漂泊信天翁",
    "reuse_image_from": "Procellariiformes",
    "divergence_time_mya": 18
  },
  {
    "order": "Procellariiformes",
    "family_en": "Hydrobatidae",
    "family_cn": "海燕科",
    "family_common_en": "Northern Storm Petrels",
    "representative_species": "Hydrobates pelagicus",
    "representative_species_en": "European Storm Petrel",
    "representative_species_cn": "暴风海燕",
    "divergence_time_mya": 18
  },
  {
    "order": "Procellariiformes",
    "family_en": "Procellariidae",
    "family_cn": "鹱科",
    "family_common_en": "Petrels, Shearwaters, Diving Petrels",
    "representative_species": "Macronectes giganteus",
    "representative_species_en": "Southern Giant Petrel",
    "representative_species_cn": "巨鹱",
    "divergence_time_mya": 18
  },
  {
    "order": "Ciconiiformes",
    "family_en": "Ciconiidae",
    "family_cn": "鹳科",
    "family_common_en": "Storks",
    "representative_species": "Ciconia ciconia",
    "representative_species_en": "White Stork",
    "representative_species_cn": "白鹳",
    "reuse_image_from": "Ciconiiformes",
    "divergence_time_mya": 16
  },
  {
    "order": "Suliformes",
    "family_en": "Fregatidae",
    "family_cn": "军舰鸟科",
    "family_common_en": "Frigatebirds",
    "representative_species": "Fregata aquila",
    "representative_species_en": "Ascension Frigatebird",
    "representative_species_cn": "阿岛军舰鸟",
    "divergence_time_mya": 16
  },
  {
    "order": "Suliformes",
    "family_en": "Sulidae",
    "family_cn": "鲣鸟科",
    "family_common_en": "Gannets, Boobies",
    "representative_species": "Papasula abbotti",
    "representative_species_en": "Abbott's Booby",
    "representative_species_cn": "粉嘴鲣鸟",
    "divergence_time_mya": 16
  },
  {
    "order": "Suliformes",
    "family_en": "Anhingidae",
    "family_cn": "蛇鹈科",
    "family_common_en": "Anhingas, Darters",
    "representative_species": "Anhinga anhinga",
    "representative_species_en": "Anhinga",
    "representative_species_cn": "美洲蛇鹈",
    "divergence_time_mya": 16
  },
  {
    "order": "Suliformes",
    "family_en": "Phalacrocoracidae",
    "family_cn": "鸕鶿科",
    "family_common_en": "Cormorants, Shags",
    "representative_species": "Phalacrocorax carbo",
    "representative_species_en": "Great Cormorant",
    "representative_species_cn": "普通鸬鹚",
    "reuse_image_from": "Suliformes",
    "divergence_time_mya": 16
  },
  {
    "order": "Pelecaniformes",
    "family_en": "Threskiornithidae",
    "family_cn": "鹮科",
    "family_common_en": "Ibises, Spoonbills",
    "representative_species": "Threskiornis aethiopicus",
    "representative_species_en": "African Sacred Ibis",
    "representative_species_cn": "非洲白鹮",
    "divergence_time_mya": 18
  },
  {
    "order": "Pelecaniformes",
    "family_en": "Ardeidae",
    "family_cn": "鹭科",
    "family_common_en": "Herons, Bitterns",
    "representative_species": "Tigriornis leucolopha",
    "representative_species_en": "White-crested Tiger Heron",
    "representative_species_cn": "白冠虎鹭",
    "divergence_time_mya": 18
  },
  {
    "order": "Pelecaniformes",
    "family_en": "Scopidae",
    "family_cn": "锤头鹳科",
    "family_common_en": "Hamerkop",
    "representative_species": "Scopus umbretta",
    "representative_species_en": "Hamerkop",
    "representative_species_cn": "锤头鹳",
    "divergence_time_mya": 18
  },
  {
    "order": "Pelecaniformes",
    "family_en": "Balaenicipitidae",
    "family_cn": "鲸头鹳科",
    "family_common_en": "Shoebill",
    "representative_species": "Balaeniceps rex",
    "representative_species_en": "Shoebill",
    "representative_species_cn": "鲸头鹳",
    "divergence_time_mya": 18
  },
  {
    "order": "Pelecaniformes",
    "family_en": "Pelecanidae",
    "family_cn": "鹈鹕科",
    "family_common_en": "Pelicans",
    "representative_species": "Pelecanus onocrotalus",
    "representative_species_en": "Great White Pelican",
    "representative_species_cn": "白鹈鹕",
    "reuse_image_from": "Pelecaniformes",
    "divergence_time_mya": 18
  },
  {
    "order": "Opisthocomiformes",
    "family_en": "Opisthocomidae",
    "family_cn": "麝雉科",
    "family_common_en": "Hoatzin",
    "representative_species": "Opisthocomus hoazin",
    "representative_species_en": "Hoatzin",
    "representative_species_cn": "麝雉",
    "reuse_image_from": "Opisthocomiformes",
    "divergence_time_mya": 6
  },
  {
    "order": "Accipitriformes",
    "family_en": "Cathartidae",
    "family_cn": "新大陆秃鹫科",
    "family_common_en": "New World Vultures",
    "representative_species": "Gymnogyps californianus",
    "representative_species_en": "California Condor",
    "representative_species_cn": "加州神鹫",
    "divergence_time_mya": 19
  },
  {
    "order": "Accipitriformes",
    "family_en": "Sagittariidae",
    "family_cn": "鹭鹰科",
    "family_common_en": "Secretarybird",
    "representative_species": "Sagittarius serpentarius",
    "representative_species_en": "Secretarybird",
    "representative_species_cn": "鹭鹰",
    "divergence_time_mya": 19
  },
  {
    "order": "Accipitriformes",
    "family_en": "Pandionidae",
    "family_cn": "鹗科",
    "family_common_en": "Osprey",
    "representative_species": "Pandion haliaetus",
    "representative_species_en": "Osprey",
    "representative_species_cn": "鹗",
    "divergence_time_mya": 19
  },
  {
    "order": "Accipitriformes",
    "family_en": "Accipitridae",
    "family_cn": "鹰科",
    "family_common_en": "Kites, Hawks, Eagles",
    "representative_species": "Aquila chrysaetos",
    "representative_species_en": "Golden Eagle",
    "representative_species_cn": "金雕",
    "reuse_image_from": "Accipitriformes",
    "divergence_time_mya": 19
  },
  {
    "order": "Strigiformes",
    "family_en": "Tytonidae",
    "family_cn": "草鸮科",
    "family_common_en": "Barn Owls",
    "representative_species": "Tyto tenebricosa",
    "representative_species_en": "Greater Sooty Owl",
    "representative_species_cn": "乌草鸮",
    "divergence_time_mya": 20
  },
  {
    "order": "Strigiformes",
    "family_en": "Strigidae",
    "family_cn": "鸱鸮科",
    "family_common_en": "Owls",
    "representative_species": "Bubo bubo",
    "representative_species_en": "Eurasian Eagle-Owl",
    "representative_species_cn": "雕鸮",
    "reuse_image_from": "Strigiformes",
    "divergence_time_mya": 20
  },
  {
    "order": "Coliiformes",
    "family_en": "Coliidae",
    "family_cn": "鼠鸟科",
    "family_common_en": "Mousebirds",
    "representative_species": "Colius striatus",
    "representative_species_en": "Speckled Mousebird",
    "representative_species_cn": "斑鼠鸟",
    "reuse_image_from": "Coliiformes",
    "divergence_time_mya": 12
  },
  {
    "order": "Leptosomiformes",
    "family_en": "Leptosomidae",
    "family_cn": "鹃三宝鸟科",
    "family_common_en": "Cuckoo-roller",
    "representative_species": "Leptosomus discolor",
    "representative_species_en": "Cuckoo-roller",
    "representative_species_cn": "鹃三宝鸟",
    "reuse_image_from": "Leptosomiformes",
    "divergence_time_mya": 9
  },
  {
    "order": "Trogoniformes",
    "family_en": "Trogonidae",
    "family_cn": "咬鹃科",
    "family_common_en": "Trogons",
    "representative_species": "Pharomachrus mocinno",
    "representative_species_en": "Resplendent Quetzal",
    "representative_species_cn": "凤尾绿咬鹃",
    "reuse_image_from": "Trogoniformes",
    "divergence_time_mya": 13
  },
  {
    "order": "Bucerotiformes",
    "family_en": "Upupidae",
    "family_cn": "戴胜科",
    "family_common_en": "Hoopoes",
    "representative_species": "Upupa epops",
    "representative_species_en": "Common Hoopoe",
    "representative_species_cn": "戴胜",
    "divergence_time_mya": 17
  },
  {
    "order": "Bucerotiformes",
    "family_en": "Phoeniculidae",
    "family_cn": "林戴胜科",
    "family_common_en": "Wood Hoopoes",
    "representative_species": "Phoeniculus castaneiceps",
    "representative_species_en": "Forest Wood Hoopoe",
    "representative_species_cn": "栗头林戴胜",
    "divergence_time_mya": 17
  },
  {
    "order": "Bucerotiformes",
    "family_en": "Bucerotidae",
    "family_cn": "犀鸟科",
    "family_common_en": "Hornbills",
    "representative_species": "Buceros bicornis",
    "representative_species_en": "Great Hornbill",
    "representative_species_cn": "双角犀鸟",
    "reuse_image_from": "Bucerotiformes",
    "divergence_time_mya": 17
  },
  {
    "order": "Coraciiformes",
    "family_en": "Coraciidae",
    "family_cn": "佛法僧科",
    "family_common_en": "Rollers",
    "representative_species": "Coracias naevius",
    "representative_species_en": "Purple Roller",
    "representative_species_cn": "棕顶佛法僧",
    "divergence_time_mya": 18
  },
  {
    "order": "Coraciiformes",
    "family_en": "Brachypteraciidae",
    "family_cn": "地三宝鸟科",
    "family_common_en": "Ground Rollers",
    "representative_species": "Brachypteracias leptosomus",
    "representative_species_en": "Short-legged Ground Roller",
    "representative_species_cn": "短腿地三宝鸟",
    "divergence_time_mya": 18
  },
  {
    "order": "Coraciiformes",
    "family_en": "Alcedinidae",
    "family_cn": "翠鸟科",
    "family_common_en": "Kingfishers",
    "representative_species": "Alcedo atthis",
    "representative_species_en": "Common Kingfisher",
    "representative_species_cn": "普通翠鸟",
    "reuse_image_from": "Coraciiformes",
    "divergence_time_mya": 18
  },
  {
    "order": "Coraciiformes",
    "family_en": "Todidae",
    "family_cn": "短尾鴗科",
    "family_common_en": "Todies",
    "representative_species": "Todus multicolor",
    "representative_species_en": "Cuban Tody",
    "representative_species_cn": "杂色短尾鴗",
    "divergence_time_mya": 18
  },
  {
    "order": "Coraciiformes",
    "family_en": "Momotidae",
    "family_cn": "翠鴗科",
    "family_common_en": "Motmots",
    "representative_species": "Hylomanes momotula",
    "representative_species_en": "Tody Motmot",
    "representative_species_cn": "短尾翠鴗",
    "divergence_time_mya": 18
  },
  {
    "order": "Coraciiformes",
    "family_en": "Meropidae",
    "family_cn": "蜂虎科",
    "family_common_en": "Bee-eaters",
    "representative_species": "Nyctyornis amictus",
    "representative_species_en": "Red-bearded Bee-eater",
    "representative_species_cn": "赤须夜蜂虎",
    "divergence_time_mya": 18
  },
  {
    "order": "Piciformes",
    "family_en": "Galbulidae",
    "family_cn": "鹟鴷科",
    "family_common_en": "Jacamars",
    "representative_species": "Galbalcyrhynchus leucotis",
    "representative_species_en": "White-eared Jacamar",
    "representative_species_cn": "白耳鹟䴕",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Bucconidae",
    "family_cn": "喷鴷科",
    "family_common_en": "Puffbirds",
    "representative_species": "Notharchus hyperrhynchus",
    "representative_species_en": "White-necked Puffbird",
    "representative_species_cn": "白颈蓬头䴕",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Capitonidae",
    "family_cn": "美洲拟啄木鸟科",
    "family_common_en": "New World Barbets",
    "representative_species": "Capito aurovirens",
    "representative_species_en": "Scarlet-crowned Barbet",
    "representative_species_cn": "红顶拟啄木鸟",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Semnornithidae",
    "family_cn": "巨嘴拟啄木鸟科",
    "family_common_en": "Toucan Barbets",
    "representative_species": "Semnornis frantzii",
    "representative_species_en": "Prong-billed Barbet",
    "representative_species_cn": "厚嘴拟啄木鸟",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Ramphastidae",
    "family_cn": "巨嘴鸟科",
    "family_common_en": "Toucans",
    "representative_species": "Ramphastos toco",
    "representative_species_en": "Toco Toucan",
    "representative_species_cn": "巨嘴鸟",
    "reuse_image_from": "Piciformes",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Megalaimidae",
    "family_cn": "拟啄木鸟科",
    "family_common_en": "Asian Barbets",
    "representative_species": "Psilopogon pyrolophus",
    "representative_species_en": "Fire-tufted Barbet",
    "representative_species_cn": "火簇拟啄木鸟",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Lybiidae",
    "family_cn": "非洲拟啄木鸟科",
    "family_common_en": "African Barbets",
    "representative_species": "Trachylaemus goffinii",
    "representative_species_en": "Western Yellow-billed Barbet",
    "representative_species_cn": "西黄嘴拟啄木鸟 ",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Indicatoridae",
    "family_cn": "响蜜䴕科",
    "family_common_en": "Honeyguides",
    "representative_species": "Prodotiscus insignis",
    "representative_species_en": "Cassin's Honeybird",
    "representative_species_cn": "尖嘴蜜䴕",
    "divergence_time_mya": 16
  },
  {
    "order": "Piciformes",
    "family_en": "Picidae",
    "family_cn": "啄木鸟科",
    "family_common_en": "Woodpeckers",
    "representative_species": "Jynx torquilla",
    "representative_species_en": "Eurasian Wryneck",
    "representative_species_cn": "蚁䴕",
    "divergence_time_mya": 16
  },
  {
    "order": "Cariamiformes",
    "family_en": "Cariamidae",
    "family_cn": "叫鹤科",
    "family_common_en": "Seriemas",
    "representative_species": "Cariama cristata",
    "representative_species_en": "Red-legged Seriema",
    "representative_species_cn": "红腿叫鹤",
    "reuse_image_from": "Cariamiformes",
    "divergence_time_mya": 13
  },
  {
    "order": "Falconiformes",
    "family_en": "Falconidae",
    "family_cn": "隼科",
    "family_common_en": "Caracaras, Falcons",
    "representative_species": "Falco peregrinus",
    "representative_species_en": "Peregrine Falcon",
    "representative_species_cn": "游隼",
    "reuse_image_from": "Falconiformes",
    "divergence_time_mya": 12
  },
  {
    "order": "Psittaciformes",
    "family_en": "Strigopidae",
    "family_cn": "鸮面鹦鹉科",
    "family_common_en": "New Zealand Parrots",
    "representative_species": "Strigops habroptilus",
    "representative_species_en": "Kakapo",
    "representative_species_cn": "鸮面鹦鹉",
    "divergence_time_mya": 19
  },
  {
    "order": "Psittaciformes",
    "family_en": "Cacatuidae",
    "family_cn": "凤头鹦鹉科",
    "family_common_en": "Cockatoos",
    "representative_species": "Zanda funerea",
    "representative_species_en": "Yellow-tailed Black Cockatoo",
    "representative_species_cn": "黑凤头鹦鹉",
    "divergence_time_mya": 19
  },
  {
    "order": "Psittaciformes",
    "family_en": "Psittacidae",
    "family_cn": "金刚鹦鹉科",
    "family_common_en": "African & New World Parrots",
    "representative_species": "Ara macao",
    "representative_species_en": "Scarlet Macaw",
    "representative_species_cn": "绯红金刚鹦鹉",
    "reuse_image_from": "Psittaciformes",
    "divergence_time_mya": 19
  },
  {
    "order": "Psittaciformes",
    "family_en": "Psittaculidae",
    "family_cn": "鹦鹉科",
    "family_common_en": "Old World Parrots",
    "representative_species": "Psittrichas fulgidus",
    "representative_species_en": "Pesquet's Parrot",
    "representative_species_cn": "彼氏鹦鹉",
    "divergence_time_mya": 19
  },
  {
    "order": "Passeriformes",
    "family_en": "Acanthisittidae",
    "family_cn": "刺鹩科",
    "family_common_en": "New Zealand Wrens",
    "representative_species": "Acanthisitta chloris",
    "representative_species_en": "Rifleman",
    "representative_species_cn": "刺鹩",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Sapayoidae",
    "family_cn": "阔嘴霸鹟科",
    "family_common_en": "Sapayoa",
    "representative_species": "Sapayoa aenigma",
    "representative_species_en": "Sapayoa",
    "representative_species_cn": "阔嘴霸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Philepittidae",
    "family_cn": "裸眉鸫科",
    "family_common_en": "Asities",
    "representative_species": "Philepitta schlegeli",
    "representative_species_en": "Schlegel's Asity",
    "representative_species_cn": "施氏裸眉鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Eurylaimidae",
    "family_cn": "阔嘴鸟科",
    "family_common_en": "Typical Broadbills",
    "representative_species": "Pseudocalyptomena graueri",
    "representative_species_en": "Grauer's Broadbill",
    "representative_species_cn": "非洲绿阔嘴鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Calyptomenidae",
    "family_cn": "非洲阔嘴鸟科",
    "family_common_en": "African & Green Broadbills",
    "representative_species": "Smithornis sharpei",
    "representative_species_en": "Grey-headed Broadbill",
    "representative_species_cn": "灰头阔嘴鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pittidae",
    "family_cn": "八色鸫科",
    "family_common_en": "Pittas",
    "representative_species": "Hydrornis phayrei",
    "representative_species_en": "Eared Pitta",
    "representative_species_cn": "双辫八色鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Furnariidae",
    "family_cn": "灶鸟科",
    "family_common_en": "Ovenbirds",
    "representative_species": "Sclerurus mexicanus",
    "representative_species_en": "Tawny-throated Leaftosser",
    "representative_species_cn": "茶喉硬尾雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Thamnophilidae",
    "family_cn": "蟻鵙科",
    "family_common_en": "Antbirds",
    "representative_species": "Euchrepomis callinota",
    "representative_species_en": "Rufous-rumped Antwren",
    "representative_species_cn": "棕腰蚁鹩",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Formicariidae",
    "family_cn": "蚁鸟科",
    "family_common_en": "Antthrushes",
    "representative_species": "Formicarius colma",
    "representative_species_en": "Rufous-capped Antthrush",
    "representative_species_cn": "棕顶蚁鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Grallariidae",
    "family_cn": "短尾蚁鸫科",
    "family_common_en": "Antpittas",
    "representative_species": "Grallaria squamigera",
    "representative_species_en": "Undulated Antpitta",
    "representative_species_cn": "波纹蚁鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Conopophagidae",
    "family_cn": "食蚊鸟科",
    "family_common_en": "Gnateaters",
    "representative_species": "Conopophaga lineata",
    "representative_species_en": "Rufous Gnateater",
    "representative_species_cn": "棕食蚊鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Rhinocryptidae",
    "family_cn": "窜鸟科",
    "family_common_en": "Tapaculos",
    "representative_species": "Acropternis orthonyx",
    "representative_species_en": "Ocellated Tapaculo",
    "representative_species_cn": "眼斑窜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Melanopareiidae",
    "family_cn": "月胸窜鸟科",
    "family_common_en": "Crescentchests",
    "representative_species": "Melanopareia torquata",
    "representative_species_en": "Collared Crescentchest",
    "representative_species_cn": "领月胸窜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Tyrannidae",
    "family_cn": "霸鶲科",
    "family_common_en": "Tyrant Flycatchers, Calyptura",
    "representative_species": "Piprites griseiceps",
    "representative_species_en": "Grey-headed Piprites",
    "representative_species_cn": "灰头娇鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cotingidae",
    "family_cn": "伞鸟科",
    "family_common_en": "Cotingas",
    "representative_species": "Ampelioides tschudii",
    "representative_species_en": "Scaled Fruiteater",
    "representative_species_cn": "鳞斑食果伞鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pipridae",
    "family_cn": "侏儒鸟科",
    "family_common_en": "Manakins",
    "representative_species": "Tyranneutes stolzmanni",
    "representative_species_en": "Dwarf Tyrant-Manakin",
    "representative_species_cn": "侏霸娇鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Tityridae",
    "family_cn": "南美霸鹟科",
    "family_common_en": "Tityras, Becards & Allies",
    "representative_species": "Tityra inquisitor",
    "representative_species_en": "Black-crowned Tityra",
    "representative_species_cn": "黑顶蒂泰霸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Oxyruncidae",
    "family_cn": "尖喙鸟科",
    "family_common_en": "Sharpbill",
    "representative_species": "Oxyruncus cristatus",
    "representative_species_en": "Sharpbill",
    "representative_species_cn": "尖喙霸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Onychorhynchidae",
    "family_cn": "皇霸鹟科",
    "family_common_en": "Royal Flycatchers & Allies",
    "representative_species": "Onychorhynchus swainsoni",
    "representative_species_en": "Atlantic Royal Flycatcher",
    "representative_species_cn": "东皇霸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Menuridae",
    "family_cn": "琴鸟科",
    "family_common_en": "Lyrebirds",
    "representative_species": "Menura alberti",
    "representative_species_en": "Albert's Lyrebird",
    "representative_species_cn": "艾氏琴鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Atrichornithidae",
    "family_cn": "薮鸟科",
    "family_common_en": "Scrubbirds",
    "representative_species": "Atrichornis rufescens",
    "representative_species_en": "Rufous Scrubbird",
    "representative_species_cn": "棕薮鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Ptilonorhynchidae",
    "family_cn": "园丁鸟科",
    "family_common_en": "Bowerbirds",
    "representative_species": "Ailuroedus stonii",
    "representative_species_en": "Ochre-breasted Catbird",
    "representative_species_cn": "赭胸园丁鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Climacteridae",
    "family_cn": "短嘴旋木雀科",
    "family_common_en": "Australasian Treecreepers",
    "representative_species": "Cormobates leucophaea",
    "representative_species_en": "White-throated Treecreeper",
    "representative_species_cn": "白喉短嘴旋木雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Maluridae",
    "family_cn": "细尾鹩莺科",
    "family_common_en": "Australasian Wrens",
    "representative_species": "Sipodotus wallacii",
    "representative_species_en": "Wallace's Fairywren",
    "representative_species_cn": "华氏鹩莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Meliphagidae",
    "family_cn": "吸蜜鳥科",
    "family_common_en": "Honeyeaters",
    "representative_species": "Myza celebensis",
    "representative_species_en": "Dark-eared Myza",
    "representative_species_cn": "暗耳汲蜜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Dasyornithidae",
    "family_cn": "澳洲刺莺科",
    "family_common_en": "Bristlebirds",
    "representative_species": "Dasyornis brachypterus",
    "representative_species_en": "Eastern Bristlebird",
    "representative_species_cn": "棕刺莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pardalotidae",
    "family_cn": "斑啄果鸟科",
    "family_common_en": "Pardalotes",
    "representative_species": "Pardalotus punctatus",
    "representative_species_en": "Spotted Pardalote",
    "representative_species_cn": "斑翅食蜜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Acanthizidae",
    "family_cn": "刺嘴莺科",
    "family_common_en": "Australasian Warblers",
    "representative_species": "Pachycare flavogriseum",
    "representative_species_en": "Goldenface",
    "representative_species_cn": "金脸啸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pomatostomidae",
    "family_cn": "弯嘴鹛科",
    "family_common_en": "Australasian Babblers",
    "representative_species": "Garritornis isidorei",
    "representative_species_en": "Papuan Babbler",
    "representative_species_cn": "弯嘴鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Orthonychidae",
    "family_cn": "刺尾鸫科",
    "family_common_en": "Logrunners",
    "representative_species": "Orthonyx novaeguineae",
    "representative_species_en": "Papuan Logrunner",
    "representative_species_cn": "新几内亚刺尾鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cnemophilidae",
    "family_cn": "短嘴极乐鸟科",
    "family_common_en": "Satinbirds",
    "representative_species": "Cnemophilus loriae",
    "representative_species_en": "Loria's Satinbird",
    "representative_species_cn": "黑短嘴极乐鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Melanocharitidae",
    "family_cn": "啄果鸟科",
    "family_common_en": "Berrypeckers, Longbills",
    "representative_species": "Melanocharis arfakiana",
    "representative_species_en": "Obscure Berrypecker",
    "representative_species_cn": "暗色啄果鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Paramythiidae",
    "family_cn": "冠啄果鳥科",
    "family_common_en": "Painted Berrypeckers",
    "representative_species": "Oreocharis arfaki",
    "representative_species_en": "Tit Berrypecker",
    "representative_species_cn": "拟雀啄果鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Callaeidae",
    "family_cn": "垂耳鸦科",
    "family_common_en": "New Zealand Wattlebirds",
    "representative_species": "Callaeas wilsoni",
    "representative_species_en": "North Island Kokako",
    "representative_species_cn": "北岛垂耳鸦",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Notiomystidae",
    "family_cn": "须吸蜜鸟科",
    "family_common_en": "Stitchbird",
    "representative_species": "Notiomystis cincta",
    "representative_species_en": "Stitchbird",
    "representative_species_cn": "须吸蜜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Psophodidae",
    "family_cn": "啸冠鸫科",
    "family_common_en": "Whipbirds",
    "representative_species": "Androphobus viridis",
    "representative_species_en": "Papuan Whipbird",
    "representative_species_cn": "绿背鹛鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cinclosomatidae",
    "family_cn": "鹑鸫科",
    "family_common_en": "Jewel-babblers, Quail-thrushes",
    "representative_species": "Ptilorrhoa leucosticta",
    "representative_species_en": "Spotted Jewel-babbler",
    "representative_species_cn": "斑丽鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Platysteiridae",
    "family_cn": "疣眼鹟科",
    "family_common_en": "Wattle-eyes, Batises",
    "representative_species": "Batis diops",
    "representative_species_en": "Rwenzori Batis",
    "representative_species_cn": "鲁文蓬背鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Malaconotidae",
    "family_cn": "丛鵙科",
    "family_common_en": "Bushshrikes",
    "representative_species": "Malaconotus cruentus",
    "representative_species_en": "Fiery-breasted Bushshrike",
    "representative_species_cn": "红胸丛鵙",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Machaerirhynchidae",
    "family_cn": "船嘴鹟科",
    "family_common_en": "Boatbills",
    "representative_species": "Machaerirhynchus flaviventer",
    "representative_species_en": "Yellow-breasted Boatbill",
    "representative_species_cn": "黄胸船嘴鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Vangidae",
    "family_cn": "钩嘴鵙科",
    "family_common_en": "Vangas & Allies",
    "representative_species": "Calicalicus madagascariensis",
    "representative_species_en": "Red-tailed Vanga",
    "representative_species_cn": "红尾钩嘴鵙",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pityriasidae",
    "family_cn": "棘头鵙科",
    "family_common_en": "Bristlehead",
    "representative_species": "Pityriasis gymnocephala",
    "representative_species_en": "Bornean Bristlehead",
    "representative_species_cn": "棘头鵙",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Artamidae",
    "family_cn": "燕鵙科",
    "family_common_en": "Woodswallows, Butcherbirds & Allies",
    "representative_species": "Artamus fuscus",
    "representative_species_en": "Ashy Woodswallow",
    "representative_species_cn": "灰燕鵙",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Rhagologidae",
    "family_cn": "斑啸鹟科",
    "family_common_en": "Mottled Berryhunter",
    "representative_species": "Rhagologus leucostigma",
    "representative_species_en": "Mottled Berryhunter",
    "representative_species_cn": "斑啸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Aegithinidae",
    "family_cn": "雀鹎科",
    "family_common_en": "Ioras",
    "representative_species": "Aegithina tiphia",
    "representative_species_en": "Common Iora",
    "representative_species_cn": "黑翅雀鹎",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Campephagidae",
    "family_cn": "山椒鸟科",
    "family_common_en": "Cuckooshrikes",
    "representative_species": "Pericrocotus erythropygius",
    "representative_species_en": "White-bellied Minivet",
    "representative_species_cn": "白腹山椒鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Mohouidae",
    "family_cn": "白头雀科",
    "family_common_en": "Whiteheads",
    "representative_species": "Mohoua ochrocephala",
    "representative_species_en": "Yellowhead",
    "representative_species_cn": "黄头刺莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Neosittidae",
    "family_cn": "澳䴓科",
    "family_common_en": "Sittellas",
    "representative_species": "Daphoenositta chrysoptera",
    "representative_species_en": "Varied Sittella",
    "representative_species_cn": "杂色澳䴓",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Eulacestomatidae",
    "family_cn": "肉垂犁嘴鸟科",
    "family_common_en": "Ploughbill",
    "representative_species": "Eulacestoma nigropectus",
    "representative_species_en": "Wattled Ploughbill",
    "representative_species_cn": "肉垂犁嘴鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Oreoicidae",
    "family_cn": "钟鹟科",
    "family_common_en": "Australo-Papuan Bellbirds",
    "representative_species": "Aleadryas rufinucha",
    "representative_species_en": "Rufous-naped Bellbird",
    "representative_species_cn": "棕颈钟鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Falcunculidae",
    "family_cn": "鵙雀鹟科",
    "family_common_en": "Shriketits",
    "representative_species": "Falcunculus whitei",
    "representative_species_en": "Northern Shriketit",
    "representative_species_cn": "北鵙雀鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pachycephalidae",
    "family_cn": "啸鹟科",
    "family_common_en": "Whistlers & Allies",
    "representative_species": "Coracornis raveni",
    "representative_species_en": "Maroon-backed Whistler",
    "representative_species_cn": "栗背啸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Vireonidae",
    "family_cn": "绿鹃科",
    "family_common_en": "Vireos, Greenlets, Shrike-babblers",
    "representative_species": "Pteruthius xanthochlorus",
    "representative_species_en": "Green Shrike-babbler",
    "representative_species_cn": "淡绿鵙鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Oriolidae",
    "family_cn": "黄鹂科",
    "family_common_en": "Figbirds, Old World Orioles, Piopios",
    "representative_species": "Sphecotheres viridis",
    "representative_species_en": "Green Figbird",
    "representative_species_cn": "绿裸眼鹂",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Dicruridae",
    "family_cn": "卷尾科",
    "family_common_en": "Drongos",
    "representative_species": "Dicrurus aeneus",
    "representative_species_en": "Bronzed Drongo",
    "representative_species_cn": "古铜色卷尾",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Rhipiduridae",
    "family_cn": "扇尾鹟科",
    "family_common_en": "Fantails",
    "representative_species": "Rhipidura superciliaris",
    "representative_species_en": "Mindanao Blue Fantail",
    "representative_species_cn": "蓝扇尾鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Monarchidae",
    "family_cn": "王鹟科",
    "family_common_en": "Monarchs",
    "representative_species": "Hypothymis azurea",
    "representative_species_en": "Black-naped Monarch",
    "representative_species_cn": "黑枕王鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Platylophidae",
    "family_cn": "冠鸦科",
    "family_common_en": "Jayshrike",
    "representative_species": "Platylophus galericulatus",
    "representative_species_en": "Crested Jayshrike",
    "representative_species_cn": "冠鸦",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Laniidae",
    "family_cn": "伯劳科",
    "family_common_en": "Shrikes",
    "representative_species": "Eurocephalus ruppelli",
    "representative_species_en": "Northern White-crowned Shrike",
    "representative_species_cn": "白腰林鵙",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Corvidae",
    "family_cn": "鸦科",
    "family_common_en": "Crows, Jays",
    "representative_species": "Corvus corax",
    "representative_species_en": "Northern Raven",
    "representative_species_cn": "渡鸦",
    "reuse_image_from": "Passeriformes",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Corcoracidae",
    "family_cn": "澳鸦科",
    "family_common_en": "Australian Mudnesters",
    "representative_species": "Corcorax melanorhamphos",
    "representative_species_en": "White-winged Chough",
    "representative_species_cn": "白翅澳鸦",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Melampittidae",
    "family_cn": "黑脚风鸟科",
    "family_common_en": "Melampittas",
    "representative_species": "Melampitta lugubris",
    "representative_species_en": "Lesser Melampitta",
    "representative_species_cn": "小黑脚风鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Ifritidae",
    "family_cn": "幽鸫科",
    "family_common_en": "Ifrit",
    "representative_species": "Ifrita kowaldi",
    "representative_species_en": "Blue-capped Ifrit",
    "representative_species_cn": "蓝顶鹛鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Paradisaeidae",
    "family_cn": "极乐鸟科",
    "family_common_en": "Birds-of-paradise",
    "representative_species": "Lycocorax pyrrhopterus",
    "representative_species_en": "Halmahera Paradise-crow",
    "representative_species_cn": "褐翅极乐鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Petroicidae",
    "family_cn": "鸲鹟科",
    "family_common_en": "Australasian Robins",
    "representative_species": "Amalocichla incerta",
    "representative_species_en": "Lesser Ground Robin",
    "representative_species_cn": "小地鸲",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Picathartidae",
    "family_cn": "岩鹛科",
    "family_common_en": "Rockfowl",
    "representative_species": "Picathartes gymnocephalus",
    "representative_species_en": "White-necked Rockfowl",
    "representative_species_cn": "白颈岩鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Chaetopidae",
    "family_cn": "岩鸫科",
    "family_common_en": "Rockjumpers",
    "representative_species": "Chaetops frenatus",
    "representative_species_en": "Cape Rockjumper",
    "representative_species_cn": "棕岩鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Eupetidae",
    "family_cn": "白眉长颈鸫科",
    "family_common_en": "Rail-babbler",
    "representative_species": "Eupetes macrocerus",
    "representative_species_en": "Rail-babbler",
    "representative_species_cn": "白眉长颈鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Bombycillidae",
    "family_cn": "太平鸟科",
    "family_common_en": "Waxwings",
    "representative_species": "Bombycilla garrulus",
    "representative_species_en": "Bohemian Waxwing",
    "representative_species_cn": "太平鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Ptiliogonatidae",
    "family_cn": "丝鹟科",
    "family_common_en": "Silky-flycatchers",
    "representative_species": "Phainoptila melanoxantha",
    "representative_species_en": "Black-and-yellow Phainoptila",
    "representative_species_cn": "黑黄丝鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Hypocoliidae",
    "family_cn": "灰连雀科",
    "family_common_en": "Hypocolius",
    "representative_species": "Hypocolius ampelinus",
    "representative_species_en": "Grey Hypocolius",
    "representative_species_cn": "灰连雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Dulidae",
    "family_cn": "棕榈雀科",
    "family_common_en": "Palmchat",
    "representative_species": "Dulus dominicus",
    "representative_species_en": "Palmchat",
    "representative_species_cn": "棕榈䳭",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Hylocitreidae",
    "family_cn": "林啸鹟科",
    "family_common_en": "Hylocitrea",
    "representative_species": "Hylocitrea bonensis",
    "representative_species_en": "Hylocitrea",
    "representative_species_cn": "林啸鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Stenostiridae",
    "family_cn": "玉鹟科",
    "family_common_en": "Fairy Flycatchers",
    "representative_species": "Chelidorhynx hypoxanthus",
    "representative_species_en": "Yellow-bellied Fantail",
    "representative_species_cn": "黄腹扇尾鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Paridae",
    "family_cn": "山雀科",
    "family_common_en": "Tits, Chickadees",
    "representative_species": "Cephalopyrus flammiceps",
    "representative_species_en": "Fire-capped Tit",
    "representative_species_cn": "火冠雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Remizidae",
    "family_cn": "攀雀科",
    "family_common_en": "Penduline Tits",
    "representative_species": "Remiz pendulinus",
    "representative_species_en": "Eurasian Penduline Tit",
    "representative_species_cn": "欧亚攀雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Nicatoridae",
    "family_cn": "斗鹎科",
    "family_common_en": "Nicators",
    "representative_species": "Nicator chloris",
    "representative_species_en": "Western Nicator",
    "representative_species_cn": "黄翼斑斗鹎",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Panuridae",
    "family_cn": "文须雀科",
    "family_common_en": "Bearded Reedling",
    "representative_species": "Panurus biarmicus",
    "representative_species_en": "Bearded Reedling",
    "representative_species_cn": "文须雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Alaudidae",
    "family_cn": "百灵科",
    "family_common_en": "Larks",
    "representative_species": "Alaemon alaudipes",
    "representative_species_en": "Greater Hoopoe-Lark",
    "representative_species_cn": "拟戴胜百灵",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pycnonotidae",
    "family_cn": "鹎科",
    "family_common_en": "Bulbuls",
    "representative_species": "Andropadus importunus",
    "representative_species_en": "Sombre Greenbul",
    "representative_species_cn": "黄腹绿鹎",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Hirundinidae",
    "family_cn": "燕科",
    "family_common_en": "Swallows, Martins",
    "representative_species": "Pseudochelidon eurystomina",
    "representative_species_en": "African River Martin",
    "representative_species_cn": "非洲河燕",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pnoepygidae",
    "family_cn": "鳞胸鹪鹛科",
    "family_common_en": "Cupwings",
    "representative_species": "Pnoepyga albiventer",
    "representative_species_en": "Scaly-breasted Cupwing",
    "representative_species_cn": "鳞胸鹪鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Macrosphenidae",
    "family_cn": "长嘴莺科",
    "family_common_en": "Crombecs, African Warblers",
    "representative_species": "Melocichla mentalis",
    "representative_species_en": "Moustached Grass Warbler",
    "representative_species_cn": "须薮莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cettiidae",
    "family_cn": "树莺科",
    "family_common_en": "Cettia Bush Warblers & Allies",
    "representative_species": "Abroscopus superciliaris",
    "representative_species_en": "Yellow-bellied Warbler",
    "representative_species_cn": "黄腹鹟莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Scotocercidae",
    "family_cn": "纹鹪莺科",
    "family_common_en": "Streaked Scrub Warbler",
    "representative_species": "Scotocerca inquieta",
    "representative_species_en": "Streaked Scrub Warbler",
    "representative_species_cn": "纹鹪莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Erythrocercidae",
    "family_cn": "红鹟科",
    "family_common_en": "Yellow Flycatchers",
    "representative_species": "Erythrocercus holochlorus",
    "representative_species_en": "Little Yellow Flycatcher",
    "representative_species_cn": "黄红鹟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Hyliidae",
    "family_cn": "绿莺科",
    "family_common_en": "Hylias",
    "representative_species": "Hylia prasina",
    "representative_species_en": "Green Hylia",
    "representative_species_cn": "绿莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Aegithalidae",
    "family_cn": "长尾山雀科",
    "family_common_en": "Bushtits",
    "representative_species": "Leptopoecile sophiae",
    "representative_species_en": "White-browed Tit-warbler",
    "representative_species_cn": "花彩雀莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Phylloscopidae",
    "family_cn": "柳莺科",
    "family_common_en": "Leaf Warblers",
    "representative_species": "Phylloscopus sibilatrix",
    "representative_species_en": "Wood Warbler",
    "representative_species_cn": "林柳莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Acrocephalidae",
    "family_cn": "苇莺科",
    "family_common_en": "Reed Warblers & Allies",
    "representative_species": "Graueria vittata",
    "representative_species_en": "Grauer's Warbler",
    "representative_species_cn": "格氏丛莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Locustellidae",
    "family_cn": "蝗莺科",
    "family_common_en": "Grassbirds & Allies",
    "representative_species": "Robsonius rabori",
    "representative_species_en": "Cordillera Ground Warbler",
    "representative_species_cn": "锈脸地莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Donacobiidae",
    "family_cn": "黑顶鹪莺科",
    "family_common_en": "Black-capped Donacobius",
    "representative_species": "Donacobius atricapilla",
    "representative_species_en": "Black-capped Donacobius",
    "representative_species_cn": "黑顶鹪莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Bernieridae",
    "family_cn": "马岛莺科",
    "family_common_en": "Tetrakas & Allies",
    "representative_species": "Oxylabes madagascariensis",
    "representative_species_en": "White-throated Oxylabes",
    "representative_species_cn": "白喉马岛莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cisticolidae",
    "family_cn": "扇尾莺科",
    "family_common_en": "Cisticolas & Allies",
    "representative_species": "Neomixis tenella",
    "representative_species_en": "Common Jery",
    "representative_species_cn": "北杂鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Sylviidae",
    "family_cn": "莺科",
    "family_common_en": "Sylviid Babblers",
    "representative_species": "Sylvia atricapilla",
    "representative_species_en": "Eurasian Blackcap",
    "representative_species_cn": "黑顶林莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Paradoxornithidae",
    "family_cn": "鸦雀科",
    "family_common_en": "Parrotbills & Allies",
    "representative_species": "Myzornis pyrrhoura",
    "representative_species_en": "Fire-tailed Myzornis",
    "representative_species_cn": "火尾绿鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Zosteropidae",
    "family_cn": "绣眼鸟科",
    "family_common_en": "White-eyes",
    "representative_species": "Parayuhina diademata",
    "representative_species_en": "White-collared Yuhina",
    "representative_species_cn": "白领凤鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Timaliidae",
    "family_cn": "画眉科",
    "family_common_en": "Babblers, Scimitar Babblers",
    "representative_species": "Timalia pileata",
    "representative_species_en": "Chestnut-capped Babbler",
    "representative_species_cn": "红顶鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Pellorneidae",
    "family_cn": "幽鹛科",
    "family_common_en": "Ground Babblers",
    "representative_species": "Graminicola bengalensis",
    "representative_species_en": "Indian Grassbird",
    "representative_species_cn": "南亚草鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Leiothrichidae",
    "family_cn": "噪鹛科",
    "family_common_en": "Laughingthrushes & Allies",
    "representative_species": "Alcippe poioicephala",
    "representative_species_en": "Brown-cheeked Fulvetta",
    "representative_species_cn": "褐脸雀鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Modulatricidae",
    "family_cn": "喉䳭科",
    "family_common_en": "Dapple-throat & Allies",
    "representative_species": "Modulatrix stictigula",
    "representative_species_en": "Spot-throat",
    "representative_species_cn": "斑喉䳭",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Promeropidae",
    "family_cn": "食蜜鸟科",
    "family_common_en": "Sugarbirds",
    "representative_species": "Promerops cafer",
    "representative_species_en": "Cape Sugarbird",
    "representative_species_cn": "长尾食蜜鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Irenidae",
    "family_cn": "和平鸟科",
    "family_common_en": "Fairy-bluebirds",
    "representative_species": "Irena puella",
    "representative_species_en": "Asian Fairy-bluebird",
    "representative_species_cn": "和平鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Regulidae",
    "family_cn": "戴菊科",
    "family_common_en": "Goldcrests, Kinglets",
    "representative_species": "Corthylio calendula",
    "representative_species_en": "Ruby-crowned Kinglet",
    "representative_species_cn": "红冠戴菊",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Elachuridae",
    "family_cn": "丽星鹩鹛科",
    "family_common_en": "Elachura",
    "representative_species": "Elachura formosa",
    "representative_species_en": "Spotted Elachura",
    "representative_species_cn": "丽星鹩鹛",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Hyliotidae",
    "family_cn": "丛莺科",
    "family_common_en": "Hyliotas",
    "representative_species": "Hyliota flavigaster",
    "representative_species_en": "Yellow-bellied Hyliota",
    "representative_species_cn": "黄腹丛莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Troglodytidae",
    "family_cn": "鹪鹩科",
    "family_common_en": "Wrens",
    "representative_species": "Campylorhynchus albobrunneus",
    "representative_species_en": "White-headed Wren",
    "representative_species_cn": "白头曲嘴鹪鹩",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Polioptilidae",
    "family_cn": "蚋莺科",
    "family_common_en": "Gnatcatchers",
    "representative_species": "Ramphocaenus sticturus",
    "representative_species_en": "Chattering Gnatwren",
    "representative_species_cn": "噪蚋莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Sittidae",
    "family_cn": "䴓科",
    "family_common_en": "Nuthatches",
    "representative_species": "Sitta leucopsis",
    "representative_species_en": "White-cheeked Nuthatch",
    "representative_species_cn": "喜山䴓",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Tichodromidae",
    "family_cn": "旋壁雀科",
    "family_common_en": "Wallcreeper",
    "representative_species": "Tichodroma muraria",
    "representative_species_en": "Wallcreeper",
    "representative_species_cn": "红翅旋壁雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Certhiidae",
    "family_cn": "旋木雀科",
    "family_common_en": "Treecreepers",
    "representative_species": "Certhia familiaris",
    "representative_species_en": "Eurasian Treecreeper",
    "representative_species_cn": "旋木雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Salpornithidae",
    "family_cn": "斑旋木雀科",
    "family_common_en": "Spotted Creepers",
    "representative_species": "Salpornis spilonota",
    "representative_species_en": "Indian Spotted Creeper",
    "representative_species_cn": "斑旋木雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Mimidae",
    "family_cn": "嘲鸫科",
    "family_common_en": "Mockingbirds, Thrashers",
    "representative_species": "Dumetella carolinensis",
    "representative_species_en": "Grey Catbird",
    "representative_species_cn": "灰嘲鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Sturnidae",
    "family_cn": "椋鸟科",
    "family_common_en": "Starlings, Rhabdornises",
    "representative_species": "Aplonis metallica",
    "representative_species_en": "Metallic Starling",
    "representative_species_cn": "群辉椋鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Buphagidae",
    "family_cn": "牛椋鸟科",
    "family_common_en": "Oxpeckers",
    "representative_species": "Buphagus africanus",
    "representative_species_en": "Yellow-billed Oxpecker",
    "representative_species_cn": "黄嘴牛椋鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Turdidae",
    "family_cn": "鸫科",
    "family_common_en": "Thrushes",
    "representative_species": "Grandala coelicolor",
    "representative_species_en": "Grandala",
    "representative_species_cn": "蓝大翅鸲",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Muscicapidae",
    "family_cn": "鹟科",
    "family_common_en": "Chats, Old World Flycatchers",
    "representative_species": "Alethe diademata",
    "representative_species_en": "White-tailed Alethe",
    "representative_species_cn": "白尾鸲鸫",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cinclidae",
    "family_cn": "河乌科",
    "family_common_en": "Dippers",
    "representative_species": "Cinclus cinclus",
    "representative_species_en": "White-throated Dipper",
    "representative_species_cn": "河乌",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Chloropseidae",
    "family_cn": "叶鹎科",
    "family_common_en": "Leafbirds",
    "representative_species": "Chloropsis flavipennis",
    "representative_species_en": "Philippine Leafbird",
    "representative_species_cn": "黄翅叶鹎",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Dicaeidae",
    "family_cn": "啄花鸟科",
    "family_common_en": "Flowerpeckers",
    "representative_species": "Prionochilus maculatus",
    "representative_species_en": "Yellow-breasted Flowerpecker",
    "representative_species_cn": "黄喉锯齿啄花鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Nectariniidae",
    "family_cn": "太阳鸟科",
    "family_common_en": "Sunbirds",
    "representative_species": "Chalcoparia singalensis",
    "representative_species_en": "Ruby-cheeked Sunbird",
    "representative_species_cn": "紫颊直嘴太阳鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Passeridae",
    "family_cn": "雀科",
    "family_common_en": "Old World Sparrows, Snowfinches",
    "representative_species": "Hypocryptadius cinnamomeus",
    "representative_species_en": "Cinnamon Ibon",
    "representative_species_cn": "桂红绣眼雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Ploceidae",
    "family_cn": "织布鸟科",
    "family_common_en": "Weavers, Widowbirds",
    "representative_species": "Bubalornis albirostris",
    "representative_species_en": "White-billed Buffalo Weaver",
    "representative_species_cn": "白嘴牛文鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Estrildidae",
    "family_cn": "梅花雀科",
    "family_common_en": "Waxbills, Munias & Allies",
    "representative_species": "Heteromunia pectoralis",
    "representative_species_en": "Pictorella Mannikin",
    "representative_species_cn": "斑胸文鸟",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Viduidae",
    "family_cn": "维达雀科",
    "family_common_en": "Indigobirds, Whydahs",
    "representative_species": "Vidua chalybeata",
    "representative_species_en": "Village Indigobird",
    "representative_species_cn": "靛蓝维达雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Peucedramidae",
    "family_cn": "橄榄绿森莺科",
    "family_common_en": "Olive Warbler",
    "representative_species": "Peucedramus taeniatus",
    "representative_species_en": "Olive Warbler",
    "representative_species_cn": "橄榄绿森莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Prunellidae",
    "family_cn": "岩鹨科",
    "family_common_en": "Accentors",
    "representative_species": "Prunella collaris",
    "representative_species_en": "Alpine Accentor",
    "representative_species_cn": "领岩鹨",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Motacillidae",
    "family_cn": "鶺鴒科",
    "family_common_en": "Wagtails, Pipits",
    "representative_species": "Dendronanthus indicus",
    "representative_species_en": "Forest Wagtail",
    "representative_species_cn": "山鹡鸰",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Urocynchramidae",
    "family_cn": "朱鹀科",
    "family_common_en": "Przevalski's Finch",
    "representative_species": "Urocynchramus pylzowi",
    "representative_species_en": "Przevalski's Finch",
    "representative_species_cn": "朱鹀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Fringillidae",
    "family_cn": "燕雀科",
    "family_common_en": "Finches, Euphonias",
    "representative_species": "Fringilla coelebs",
    "representative_species_en": "Eurasian Chaffinch",
    "representative_species_cn": "苍头燕雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Calcariidae",
    "family_cn": "铁爪鹀科",
    "family_common_en": "Longspurs, Snow Buntings",
    "representative_species": "Rhynchophanes mccownii",
    "representative_species_en": "Thick-billed Longspur",
    "representative_species_cn": "麦氏铁爪鹀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Rhodinocichlidae",
    "family_cn": "鸫唐纳雀科",
    "family_common_en": "Thrush-tanager",
    "representative_species": "Rhodinocichla rosea",
    "representative_species_en": "Rosy Thrush-tanager",
    "representative_species_cn": "鸫唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Emberizidae",
    "family_cn": "鹀科",
    "family_common_en": "Buntings",
    "representative_species": "Emberiza lathami",
    "representative_species_en": "Crested Bunting",
    "representative_species_cn": "凤头鹀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Passerellidae",
    "family_cn": "美洲鹀科",
    "family_common_en": "New World Sparrows",
    "representative_species": "Oreothraupis arremonops",
    "representative_species_en": "Tanager Finch",
    "representative_species_cn": "拟唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Calyptophilidae",
    "family_cn": "䳭唐納雀科",
    "family_common_en": "Chat-tanagers",
    "representative_species": "Calyptophilus tertius",
    "representative_species_en": "Western Chat-Tanager",
    "representative_species_cn": "西䳭唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Phaenicophilidae",
    "family_cn": "长尾唐纳雀科",
    "family_common_en": "Greater Antillean Tanagers",
    "representative_species": "Phaenicophilus palmarum",
    "representative_species_en": "Black-crowned Palm-tanager",
    "representative_species_cn": "黑顶长尾唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Zeledoniidae",
    "family_cn": "冠鹩森莺科",
    "family_common_en": "Wrenthrush",
    "representative_species": "Zeledonia coronata",
    "representative_species_en": "Wrenthrush",
    "representative_species_cn": "冠鹩森莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Teretistridae",
    "family_cn": "灰森莺科",
    "family_common_en": "Cuban Warblers",
    "representative_species": "Teretistris fernandinae",
    "representative_species_en": "Yellow-headed Warbler",
    "representative_species_cn": "黄头灰森莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Icteridae",
    "family_cn": "拟黄鹂科",
    "family_common_en": "Oropendolas, New World Orioles, Blackbirds",
    "representative_species": "Icteria virens",
    "representative_species_en": "Yellow-breasted Chat",
    "representative_species_cn": "黄胸大䳭莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Parulidae",
    "family_cn": "森莺科",
    "family_common_en": "New World Warblers",
    "representative_species": "Seiurus aurocapilla",
    "representative_species_en": "Ovenbird",
    "representative_species_cn": "橙顶灶莺",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Mitrospingidae",
    "family_cn": "乌脸唐纳雀科",
    "family_common_en": "Mitrospingid Tanagers",
    "representative_species": "Mitrospingus cassinii",
    "representative_species_en": "Dusky-faced Tanager",
    "representative_species_cn": "乌脸唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Cardinalidae",
    "family_cn": "红鸟科",
    "family_common_en": "Cardinals & Allies",
    "representative_species": "Piranga bidentata",
    "representative_species_en": "Flame-colored Tanager",
    "representative_species_cn": "火领丽唐纳雀",
    "divergence_time_mya": 21
  },
  {
    "order": "Passeriformes",
    "family_en": "Thraupidae",
    "family_cn": "裸鼻雀科",
    "family_common_en": "Tanagers & Allies",
    "representative_species": "Catamblyrhynchus diadema",
    "representative_species_en": "Plushcap",
    "representative_species_cn": "绒顶唐纳雀",
    "divergence_time_mya": 21
  }
]);

const BIRD_FAMILY_BY_KEY = Object.freeze(Object.fromEntries(
  BIRD_FAMILY_DEFS.map((family) => [family.family_en, family])
));
