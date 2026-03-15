const sauropsidaData = (() => {
  const cladeDefs = [
    {
      id: "Sauropsida",
      cn_name: "蜥形纲",
      rank: "class",
      parent: null,
      divergence_time_mya: 271,
      description: "现生蜥形类的冠群总称，包含鳞龙类与龟鳖-主龙类两大主支。"
    },
    {
      id: "Lepidosauria",
      cn_name: "鳞龙总纲",
      rank: "subclass",
      parent: "Sauropsida",
      divergence_time_mya: 242,
      description: "由喙头蜥与有鳞类构成的现生鳞龙支，是现生蜥形纲的重要主干之一。"
    },
    {
      id: "Rhynchocephalia",
      cn_name: "喙头目",
      rank: "order",
      parent: "Lepidosauria",
      divergence_time_mya: 238,
      description: "现生仅存喙头蜥科，是中生代鳞龙类在现代的孑遗支系。"
    },
    {
      id: "Squamata",
      cn_name: "有鳞目",
      rank: "order",
      parent: "Lepidosauria",
      divergence_time_mya: 213,
      description: "现生爬行动物中物种最丰富的类群，包含蜥蜴、蛇与蚓蜥。"
    },
    {
      id: "Iguania",
      cn_name: "鬣蜥类",
      rank: "suborder",
      parent: "Squamata",
      divergence_time_mya: 136,
      description: "以视觉捕食和头骨特化为代表的有鳞类支系，包含鬣蜥、避役及其近亲。"
    },
    {
      id: "Acrodonta",
      cn_name: "端齿类",
      rank: "infraorder",
      parent: "Iguania",
      divergence_time_mya: 96,
      description: "主要包含旧大陆鬣蜥与避役，牙齿多与颌骨顶部融合。"
    },
    {
      id: "Pleurodonta",
      cn_name: "侧齿类",
      rank: "infraorder",
      parent: "Iguania",
      divergence_time_mya: 76,
      description: "主要为新大陆鬣蜥类辐射，牙齿多附着于颌骨内侧。"
    },
    {
      id: "Iguanoidea",
      cn_name: "美洲鬣蜥总科",
      rank: "superfamily",
      parent: "Pleurodonta",
      divergence_time_mya: 65,
      description: "包含传统美洲鬣蜥、冠蜥、环颈蜥和角蜥等侧齿类主支。"
    },
    {
      id: "Anoloidea",
      cn_name: "安乐蜥总科",
      rank: "superfamily",
      parent: "Pleurodonta",
      divergence_time_mya: 55,
      description: "以安乐蜥、卷尾蜥和长腿鬣蜥等树栖或灌丛型侧齿类为代表。"
    },
    {
      id: "Tropiduroidea",
      cn_name: "新热带地蜥总科",
      rank: "superfamily",
      parent: "Pleurodonta",
      divergence_time_mya: 60,
      description: "包含多种南美和马达加斯加侧齿类，是热带地表和林缘生态位的重要辐射。"
    },
    {
      id: "Gekkota",
      cn_name: "壁虎类",
      rank: "suborder",
      parent: "Squamata",
      divergence_time_mya: 76,
      description: "以趾下黏附结构、夜行性和发声能力著称的有鳞类支系。"
    },
    {
      id: "Scinciformata",
      cn_name: "石龙子类",
      rank: "suborder",
      parent: "Squamata",
      divergence_time_mya: 138,
      description: "包含石龙子及其近亲，常表现出身体修长、四肢退化等多样体态。"
    },
    {
      id: "Scincoidea",
      cn_name: "石龙子总科",
      rank: "superfamily",
      parent: "Scinciformata",
      divergence_time_mya: 95,
      description: "包含石龙子、环尾蜥和板蜥等成员，是石龙子类的核心支系。"
    },
    {
      id: "Lacertoidea",
      cn_name: "正蜥总科",
      rank: "superfamily",
      parent: "Scinciformata",
      divergence_time_mya: 90,
      description: "现行广义正蜥总科包含正蜥科与蚓蜥类，是 lateratan 蜥类的重要主干。"
    },
    {
      id: "Gymnophthalmoidea",
      cn_name: "裸眼蜥总科",
      rank: "superfamily",
      parent: "Scinciformata",
      divergence_time_mya: 85,
      description: "包含美洲蜥蜴科与裸眼蜥科，是新大陆 lateratan 蜥类的重要辐射支。"
    },
    {
      id: "Amphisbaenia",
      cn_name: "蚓蜥类",
      rank: "clade",
      parent: "Lacertoidea",
      divergence_time_mya: 80,
      description: "高度穴居化的正蜥总科内部主支，身体环节化明显，多数四肢退化或完全消失。"
    },
    {
      id: "Anguimorpha",
      cn_name: "蛇蜥-巨蜥类",
      rank: "suborder",
      parent: "Squamata",
      divergence_time_mya: 129,
      description: "包含蛇蜥、鳄蜥、巨蜥与毒蜥等，是毒液系统研究的重要来源支系。"
    },
    {
      id: "Diploglossa",
      cn_name: "复舌蜥总科",
      rank: "superfamily",
      parent: "Anguimorpha",
      divergence_time_mya: 75,
      description: "包含蛇蜥、复舌蜥和异蜥等类群，是蛇蜥-巨蜥类中较偏基干的主支。"
    },
    {
      id: "Platynota",
      cn_name: "巨蜥类",
      rank: "clade",
      parent: "Anguimorpha",
      divergence_time_mya: 60,
      description: "包含毒蜥与巨蜥近缘支，是研究蜥蜴毒液演化的重要支系。"
    },
    {
      id: "Varanoidea",
      cn_name: "巨蜥超科",
      rank: "superfamily",
      parent: "Platynota",
      divergence_time_mya: 45,
      description: "包含拟毒蜥与巨蜥，是现生 platynotan 蜥类中更接近巨蜥的一支。"
    },
    {
      id: "Shinisaurioidea",
      cn_name: "鳄蜥总科",
      rank: "superfamily",
      parent: "Anguimorpha",
      divergence_time_mya: 20,
      description: "以鳄蜥科为代表的东亚孑遗支系，偏好山地溪流环境。"
    },
    {
      id: "Serpentes",
      cn_name: "蛇亚目",
      rank: "suborder",
      parent: "Squamata",
      divergence_time_mya: 110,
      description: "由极端身体延长与颌骨高活动性定义的有鳞类支系。"
    },
    {
      id: "Scolecophidia",
      cn_name: "盲蛇下目",
      rank: "infraorder",
      parent: "Serpentes",
      divergence_time_mya: 75,
      description: "由盲蛇与细盲蛇等掘穴小型蛇类组成的基干蛇类总群。"
    },
    {
      id: "Typhlopoidea",
      cn_name: "盲蛇总科",
      rank: "superfamily",
      parent: "Scolecophidia",
      divergence_time_mya: 65,
      description: "现生盲蛇类在 Reptile Database 体系下汇入同一总科，包含异盲蛇与各类盲蛇科群。"
    },
    {
      id: "Alethinophidia",
      cn_name: "真蛇下目",
      rank: "infraorder",
      parent: "Serpentes",
      divergence_time_mya: 95,
      description: "除盲蛇类外绝大多数现生蛇类所在的大支系。"
    },
    {
      id: "Henophidia",
      cn_name: "原蛇类",
      rank: "clade",
      parent: "Alethinophidia",
      divergence_time_mya: 70,
      description: "包含管蛇、林蚺、蚺蟒与盾尾蛇等较基干真蛇支，是现生缠绕蛇与穴居蛇的重要总群。"
    },
    {
      id: "Booidea",
      cn_name: "蚺总科",
      rank: "superfamily",
      parent: "Henophidia",
      divergence_time_mya: 55,
      description: "包含蚺类及其近缘岛蚺支系，是新旧大陆古老缠绕蛇的主体。"
    },
    {
      id: "Pythonoidea",
      cn_name: "蟒总科",
      rank: "superfamily",
      parent: "Henophidia",
      divergence_time_mya: 45,
      description: "现行框架中除蟒科外，也常并入美洲闪鳞蛇与闪鳞蛇等近缘原蛇类。"
    },
    {
      id: "Caenophidia",
      cn_name: "新蛇类",
      rank: "clade",
      parent: "Alethinophidia",
      divergence_time_mya: 60,
      description: "包含瘰鳞蛇与游蛇总科，是现代高等蛇类多样化的主干支。"
    },
    {
      id: "Colubroidea",
      cn_name: "游蛇总科",
      rank: "superfamily",
      parent: "Caenophidia",
      divergence_time_mya: 55,
      description: "现生多样性最高的真蛇总群，包含游蛇、眼镜蛇、蝰类及其近亲。"
    },
    {
      id: "Elapoidea",
      cn_name: "眼镜蛇总科",
      rank: "superfamily",
      parent: "Colubroidea",
      divergence_time_mya: 40,
      description: "包含眼镜蛇、穴蝰和穴居游蛇等非洲及亚洲重要毒蛇辐射支。"
    },
    {
      id: "Viperoidea",
      cn_name: "蝰总科",
      rank: "superfamily",
      parent: "Colubroidea",
      divergence_time_mya: 35,
      description: "以蝰科为代表的可折叠前毒牙蛇类支系。"
    },
    {
      id: "Pareoidea",
      cn_name: "钝头蛇总科",
      rank: "superfamily",
      parent: "Colubroidea",
      divergence_time_mya: 20,
      description: "以食蜗牛特化的钝头蛇类为代表的东亚-东南亚蛇支。"
    },
    {
      id: "Homalopsoidea",
      cn_name: "宽吻蛇总科",
      rank: "superfamily",
      parent: "Colubroidea",
      divergence_time_mya: 25,
      description: "以咸淡水河口环境适应著称的宽吻蛇类支系。"
    },
    {
      id: "Xenodermoidea",
      cn_name: "闪皮蛇总科",
      rank: "superfamily",
      parent: "Colubroidea",
      divergence_time_mya: 25,
      description: "包含若干古老奇异蛇类，体鳞与椎骨特征常较独特。"
    },
    {
      id: "Archelosauria",
      cn_name: "龟鳖-主龙支",
      rank: "subclass",
      parent: "Sauropsida",
      divergence_time_mya: 255,
      description: "由龟鳖类与主龙类组成的现代蜥形纲另一主干。"
    },
    {
      id: "Testudines",
      cn_name: "龟鳖目",
      rank: "order",
      parent: "Archelosauria",
      divergence_time_mya: 220,
      description: "以背腹甲高度特化为标志的古老类群，现生类群分为侧颈龟与曲颈龟诸支。"
    },
    {
      id: "Cryptodira",
      cn_name: "曲颈龟亚目",
      rank: "suborder",
      parent: "Testudines",
      divergence_time_mya: 170,
      description: "缩颈时头部向后垂直收折的龟鳖支系，包含绝大多数现生海龟、陆龟和淡水龟。"
    },
    {
      id: "Trionychoidea",
      cn_name: "鳖总科",
      rank: "superfamily",
      parent: "Cryptodira",
      divergence_time_mya: 120,
      description: "以软壳、流水环境适应和高度水栖化为特征的龟鳖支系。"
    },
    {
      id: "Kinosternoidea",
      cn_name: "动胸龟总科",
      rank: "superfamily",
      parent: "Cryptodira",
      divergence_time_mya: 75,
      description: "以底栖淡水生活为主，包含动胸龟与泥龟的支系。"
    },
    {
      id: "Chelydroidea",
      cn_name: "鳄龟总科",
      rank: "superfamily",
      parent: "Cryptodira",
      divergence_time_mya: 95,
      description: "包含鳄龟和平胸龟等类群，头部与颌部结构相对强壮。"
    },
    {
      id: "Chelonioidea",
      cn_name: "海龟总科",
      rank: "superfamily",
      parent: "Cryptodira",
      divergence_time_mya: 110,
      description: "远洋海生龟鳖支系，前肢鳍状化显著。"
    },
    {
      id: "Testudinoidea",
      cn_name: "泽龟总科",
      rank: "superfamily",
      parent: "Cryptodira",
      divergence_time_mya: 75,
      description: "现生淡水龟与陆龟中物种最丰富的主支之一。"
    },
    {
      id: "Pleurodira",
      cn_name: "侧颈龟亚目",
      rank: "suborder",
      parent: "Testudines",
      divergence_time_mya: 160,
      description: "缩颈时头部向侧方折叠的龟鳖类群，主要分布于南半球。"
    },
    {
      id: "Archosauria",
      cn_name: "主龙总目",
      rank: "superorder",
      parent: "Archelosauria",
      divergence_time_mya: 250,
      description: "现生由鳄类与鸟类构成，是中生代主龙辐射在现代的两个残存主支。"
    },
    {
      id: "Crocodylia",
      cn_name: "鳄目",
      rank: "order",
      parent: "Archosauria",
      divergence_time_mya: 94,
      description: "半水栖伏击型主龙类，保留了许多主龙类基础形态特征。"
    },
    {
      id: "Aves",
      cn_name: "鸟纲",
      rank: "subclass",
      parent: "Archosauria",
      divergence_time_mya: 100,
      description: "现生鸟类冠群，是羽毛、飞行相关骨骼与高代谢体系高度整合的主龙支系。"
    },
    {
      id: "Palaeognathae",
      cn_name: "古颚下纲",
      rank: "infraclass",
      parent: "Aves",
      divergence_time_mya: 80,
      description: "包含平胸类与䳍形目，腭部保留较原始构型。"
    },
    {
      id: "Neognathae",
      cn_name: "今颚下纲",
      rank: "infraclass",
      parent: "Aves",
      divergence_time_mya: 95,
      description: "除古颚类外的全部现生鸟类，构成现代鸟类多样性的主体。"
    },
    {
      id: "Galloanserae",
      cn_name: "鸡雁总目",
      rank: "clade",
      parent: "Neognathae",
      divergence_time_mya: 80,
      description: "由鸡形目与雁形目构成的早期今颚类主支。"
    },
    {
      id: "Neoaves",
      cn_name: "新鸟总目",
      rank: "clade",
      parent: "Neognathae",
      divergence_time_mya: 74,
      description: "除鸡雁类外绝大多数现生鸟类所在的巨大辐射支。"
    },
    {
      id: "Strisores",
      cn_name: "夜鸟类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 65,
      description: "包含夜鹰、雨燕及其近亲，多与夜行或空中捕食相关。"
    },
    {
      id: "Otidimorphae",
      cn_name: "鸨鹃类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 60,
      description: "包含蕉鹃、鸨与鹃形类的现代支系。"
    },
    {
      id: "Columbimorphae",
      cn_name: "鸽类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 60,
      description: "包含拟鹑、沙鸡与鸽形类的现代支系。"
    },
    {
      id: "Mirandornithes",
      cn_name: "奇迹鸟类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 45,
      description: "由䴙䴘与红鹳构成的著名姐妹群。"
    },
    {
      id: "Aequorlitornithes",
      cn_name: "滨水鸟类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 62,
      description: "由鸻形目与核心水鸟类构成的现代新鸟支系，是涉禽、滨鸟与多类水鸟的重要总群。"
    },
    {
      id: "Aequornithes",
      cn_name: "水鸟类",
      rank: "clade",
      parent: "Aequorlitornithes",
      divergence_time_mya: 60,
      description: "核心水鸟类，包含潜鸟、企鹅、鹱形类、鹳、鲣鸟类和鹈形类等多个深度水生或涉水主支。"
    },
    {
      id: "Telluraves",
      cn_name: "陆禽类",
      rank: "clade",
      parent: "Neoaves",
      divergence_time_mya: 60,
      description: "包含猛禽、佛法僧类、隼鹦雀类等多支陆生新鸟，不再纳入麝雉。"
    },
    {
      id: "Accipitrimorphae",
      cn_name: "鹰鹫类",
      rank: "clade",
      parent: "Telluraves",
      divergence_time_mya: 55,
      description: "包含鹰形目与鸮形目等猛禽支系；在 IOC 现行框架下，美洲鹫并入鹰形目。"
    },
    {
      id: "Coraciimorphae",
      cn_name: "佛法僧类",
      rank: "clade",
      parent: "Telluraves",
      divergence_time_mya: 55,
      description: "包含鼠鸟、咬鹃、犀鸟、佛法僧与䴕形类等支系。"
    },
    {
      id: "Australaves",
      cn_name: "南方鸟类",
      rank: "clade",
      parent: "Telluraves",
      divergence_time_mya: 55,
      description: "包含叫鹤、隼、鹦鹉与雀形目，是现生陆禽中最重要的辐射支之一。"
    }
  ];

  const cladeEnDescriptions = {
    Sauropsida: "The crown group of living sauropsids, comprising the two major surviving branches Lepidosauria and Archelosauria.",
    Lepidosauria: "The living lepidosaur branch formed by Rhynchocephalia and Squamata, one of the two main trunks of extant Sauropsida.",
    Rhynchocephalia: "Today represented only by Sphenodontidae, this is the surviving relict branch of a once broader Mesozoic lepidosaur radiation.",
    Squamata: "The most species-rich living reptile clade, including lizards, snakes, and amphisbaenians.",
    Iguania: "A squamate lineage marked by visually oriented predation and cranial specialization, including iguanians, chameleons, and their relatives.",
    Acrodonta: "Mostly Old World iguanians and chameleons, with teeth commonly fused to the crest of the jaws.",
    Pleurodonta: "Primarily a New World iguanian radiation, with teeth attached mainly to the inner side of the jaws.",
    Iguanoidea: "The major pleurodont branch containing the traditional iguanas, casquehead lizards, collared lizards, horned lizards, and relatives.",
    Anoloidea: "A pleurodont superfamily centered on anoles, curly-tailed lizards, and long-legged arboreal or shrub-dwelling relatives.",
    Tropiduroidea: "A mainly South American and Malagasy pleurodont radiation occupying tropical ground-layer and forest-edge niches.",
    Gekkota: "A squamate lineage best known for adhesive toe pads, nocturnality, and vocal behavior.",
    Scinciformata: "The skink-line squamates, including skinks and relatives, often with elongated bodies and repeated limb reduction.",
    Scincoidea: "The core scinciform superfamily containing skinks, girdled lizards, plated lizards, and relatives.",
    Lacertoidea: "In the broad modern sense this superfamily includes Lacertidae and amphisbaenians, forming a major trunk of lateratan lizards.",
    Gymnophthalmoidea: "A major New World lateratan radiation containing teiids and gymnophthalmids.",
    Amphisbaenia: "A highly fossorial branch within Lacertoidea, with ringed bodies and strong trends toward limb reduction or complete limblessness.",
    Anguimorpha: "The clade including anguids, shinisaurs, monitor lizards, and venom lizards, and an important source for venom-evolution research.",
    Diploglossa: "A relatively basal anguimorph branch containing anguids, diploglossids, xenosaurids, and relatives.",
    Platynota: "The anguimorph branch containing helodermatids and monitor-lizard relatives, important for studies of lizard venom evolution.",
    Varanoidea: "The superfamily containing Lanthanotidae and Varanidae, the monitor-lizard side of living platynotans.",
    Shinisaurioidea: "An East Asian relict lineage represented by Shinisauridae, associated mainly with montane stream habitats.",
    Serpentes: "The squamate lineage defined by extreme body elongation and highly kinetic jaws.",
    Scolecophidia: "The basal radiation of small fossorial snakes including blind snakes and threadsnakes.",
    Typhlopoidea: "In the Reptile Database framework, living blind snakes are grouped here, including gerrhopilids, typhlopids, and related families.",
    Alethinophidia: "The major snake lineage containing almost all living snakes except the blind-snake assemblage.",
    Henophidia: "A basal assemblage of alethinophidian snakes including pipe snakes, dwarf boas, boas, pythons, shieldtails, and relatives.",
    Booidea: "The superfamily containing boas and close island boa relatives, forming the core of old constricting snakes in both the New and Old Worlds.",
    Pythonoidea: "In current classifications this superfamily often includes pythons together with Loxocemidae and Xenopeltidae.",
    Caenophidia: "The advanced snake lineage containing Acrochordidae and Colubroidea, the main trunk of modern snake diversification.",
    Colubroidea: "The most diverse living alethinophidian radiation, including colubrids, elapids, vipers, and many relatives.",
    Elapoidea: "An Afro-Asian radiation within Colubroidea including elapids, atractaspidids, lamprophiids, and related venomous or burrowing snakes.",
    Viperoidea: "The viper branch of front-fanged venomous snakes, represented today by Viperidae.",
    Pareoidea: "An East and Southeast Asian snake branch centered on snail-eating pareids.",
    Homalopsoidea: "A primarily aquatic snake lineage adapted to brackish and freshwater estuarine habitats.",
    Xenodermoidea: "A small assemblage of ancient and unusual snakes with distinctive scalation and vertebral traits.",
    Archelosauria: "The other major surviving trunk of modern sauropsids, uniting turtles and archosaurs.",
    Testudines: "An ancient clade marked by highly specialized dorsal and ventral shells, with living diversity split between Pleurodira and Cryptodira.",
    Cryptodira: "The hidden-neck turtle branch, retracting the head vertically backward and containing most living sea, land, and freshwater turtles.",
    Trionychoidea: "The turtle lineage marked by soft shells, riverine adaptation, and strong aquatic specialization.",
    Kinosternoidea: "A mainly bottom-dwelling freshwater turtle lineage including mud turtles and musk turtles.",
    Chelydroidea: "The superfamily containing snapping turtles and big-headed turtles, generally with robust heads and jaws.",
    Chelonioidea: "The oceanic sea turtle lineage, strongly specialized with flipper-like forelimbs.",
    Testudinoidea: "One of the most species-rich living turtle radiations, including many freshwater turtles and tortoises.",
    Pleurodira: "The side-necked turtles, which fold the head sideways during neck retraction and are centered in the Southern Hemisphere.",
    Archosauria: "The living archosaur crown group of crocodilians and birds, representing the two surviving main branches of the Mesozoic archosaur radiation.",
    Crocodylia: "Semi-aquatic ambush archosaurs that retain many basal archosaurian body-plan features.",
    Aves: "The crown group of living birds, a highly integrated archosaur lineage defined by feathers, flight-related skeletal traits, and high metabolism.",
    Palaeognathae: "The paleognath branch including ratites and tinamous, retaining a relatively primitive palatal construction.",
    Neognathae: "All living birds except paleognaths, forming the main body of modern avian diversity.",
    Galloanserae: "The early neognath branch containing Galliformes and Anseriformes.",
    Neoaves: "The enormous radiation containing most living birds other than the galloanseran line.",
    Strisores: "The clade including nightjars, swifts, and relatives, often associated with nocturnality or aerial feeding.",
    Otidimorphae: "The modern bird clade containing turacos, bustards, and cuckoos.",
    Columbimorphae: "The modern bird clade containing mesites, sandgrouse, and pigeons.",
    Mirandornithes: "The well-known sister grouping of grebes and flamingos.",
    Aequorlitornithes: "A modern neoavian clade uniting Charadriiformes with the core waterbird assemblage.",
    Aequornithes: "The core waterbird clade including loons, penguins, tube-noses, storks, suliforms, and pelicans.",
    Telluraves: "A landbird radiation including raptors, coraciimorphs, and the falcon-parrot-passerine branch, with hoatzins excluded in current usage.",
    Accipitrimorphae: "The raptorial landbird clade containing Accipitriformes and Strigiformes; in current IOC usage New World vultures are included within Accipitriformes.",
    Coraciimorphae: "The clade containing mousebirds, trogons, hornbills, roller-allies, woodpeckers, and relatives.",
    Australaves: "A major landbird radiation containing seriemas, falcons, parrots, and passerines."
  };

  const terminalGroups = [
    {
      parent: "Trionychoidea",
      terminal_rank: "family",
      items: [
        ["Trionychidae", "鳖科", 60],
        ["Carettochelyidae", "两爪鳖科", 50]
      ]
    },
    {
      parent: "Kinosternoidea",
      terminal_rank: "family",
      items: [
        ["Kinosternidae", "动胸龟科", 55],
        ["Dermatemydidae", "泥龟科", 20]
      ]
    },
    {
      parent: "Chelydroidea",
      terminal_rank: "family",
      items: [
        ["Chelydridae", "鳄龟科", 25],
        ["Platysternidae", "平胸龟科", 20]
      ]
    },
    {
      parent: "Chelonioidea",
      terminal_rank: "family",
      items: [
        ["Cheloniidae", "海龟科", 40],
        ["Dermochelyidae", "棱皮龟科", 15]
      ]
    },
    {
      parent: "Testudinoidea",
      terminal_rank: "family",
      items: [
        ["Testudinidae", "陆龟科", 50],
        ["Emydidae", "泽龟科", 35],
        ["Geoemydidae", "地龟科", 45]
      ]
    },
    {
      parent: "Pleurodira",
      terminal_rank: "family",
      items: [
        ["Chelidae", "蛇颈龟科", 90],
        ["Pelomedusidae", "非洲侧颈龟科", 50],
        ["Podocnemididae", "南美侧颈龟科", 75]
      ]
    },
    {
      parent: "Rhynchocephalia",
      terminal_rank: "family",
      items: [
        ["Sphenodontidae", "喙头蜥科", 20]
      ]
    },
    {
      parent: "Crocodylia",
      terminal_rank: "family",
      items: [
        ["Crocodylidae", "鳄科", 25],
        ["Alligatoridae", "短吻鳄科", 40],
        ["Gavialidae", "食鱼鳄科", 35]
      ]
    },
    {
      parent: "Palaeognathae",
      terminal_rank: "order",
      items: [
        ["Struthioniformes", "鸵鸟目", 20],
        ["Rheiformes", "美洲鸵鸟目", 20],
        ["Apterygiformes", "无翼鸟目", 30],
        ["Casuariiformes", "鹤鸵目", 25],
        ["Tinamiformes", "䳍形目", 45]
      ]
    },
    {
      parent: "Galloanserae",
      terminal_rank: "order",
      items: [
        ["Galliformes", "鸡形目", 50],
        ["Anseriformes", "雁形目", 45]
      ]
    },
    {
      parent: "Strisores",
      terminal_rank: "order",
      items: [
        ["Caprimulgiformes", "夜鹰目", 40],
        ["Apodiformes", "雨燕目", 35]
      ]
    },
    {
      parent: "Otidimorphae",
      terminal_rank: "order",
      items: [
        ["Musophagiformes", "蕉鹃目", 28],
        ["Otidiformes", "鸨形目", 24],
        ["Cuculiformes", "鹃形目", 38]
      ]
    },
    {
      parent: "Columbimorphae",
      terminal_rank: "order",
      items: [
        ["Mesitornithiformes", "拟鹑目", 25],
        ["Pterocliformes", "沙鸡目", 32],
        ["Columbiformes", "鸽形目", 36]
      ]
    },
    {
      parent: "Neoaves",
      terminal_rank: "order",
      items: [
        ["Gruiformes", "鹤形目", 38],
        ["Eurypygiformes", "日鳽目", 18],
        ["Phaethontiformes", "鹲形目", 15],
        ["Opisthocomiformes", "麝雉目", 10]
      ]
    },
    {
      parent: "Aequorlitornithes",
      terminal_rank: "order",
      items: [
        ["Charadriiformes", "鸻形目", 45]
      ]
    },
    {
      parent: "Mirandornithes",
      terminal_rank: "order",
      items: [
        ["Podicipediformes", "䴙䴘目", 20],
        ["Phoenicopteriformes", "红鹳目", 18]
      ]
    },
    {
      parent: "Aequornithes",
      terminal_rank: "order",
      items: [
        ["Gaviiformes", "潜鸟目", 16],
        ["Sphenisciformes", "企鹅目", 25],
        ["Procellariiformes", "鹱形目", 30],
        ["Ciconiiformes", "鹳形目", 26],
        ["Suliformes", "鲣鸟目", 26],
        ["Pelecaniformes", "鹈形目", 30]
      ]
    },
    {
      parent: "Accipitrimorphae",
      terminal_rank: "order",
      items: [
        ["Accipitriformes", "鹰形目", 32],
        ["Strigiformes", "鸮形目", 34]
      ]
    },
    {
      parent: "Coraciimorphae",
      terminal_rank: "order",
      items: [
        ["Coliiformes", "鼠鸟目", 20],
        ["Leptosomiformes", "鹃鴗目", 15],
        ["Trogoniformes", "咬鹃目", 22],
        ["Bucerotiformes", "犀鸟目", 28],
        ["Coraciiformes", "佛法僧目", 30],
        ["Piciformes", "䴕形目", 26]
      ]
    },
    {
      parent: "Australaves",
      terminal_rank: "order",
      items: [
        ["Cariamiformes", "叫鹤目", 22],
        ["Falconiformes", "隼形目", 20],
        ["Psittaciformes", "鹦形目", 32],
        ["Passeriformes", "雀形目", 35]
      ]
    },
    {
      parent: "Acrodonta",
      terminal_rank: "family",
      items: [
        ["Agamidae", "鬣蜥科", 60],
        ["Chamaeleonidae", "避役科", 50]
      ]
    },
    {
      parent: "Iguanoidea",
      terminal_rank: "family",
      items: [
        ["Iguanidae", "美洲鬣蜥科", 35],
        ["Corytophanidae", "冠蜥科", 25],
        ["Crotaphytidae", "环颈蜥科", 35],
        ["Phrynosomatidae", "角蜥科", 45]
      ]
    },
    {
      parent: "Anoloidea",
      terminal_rank: "family",
      items: [
        ["Dactyloidae", "安乐蜥科", 45],
        ["Leiocephalidae", "卷尾蜥科", 20],
        ["Polychrotidae", "长腿鬣蜥科", 25]
      ]
    },
    {
      parent: "Tropiduroidea",
      terminal_rank: "family",
      items: [
        ["Hoplocercidae", "木鳞蜥科", 25],
        ["Leiosauridae", "平鳞蜥科", 40],
        ["Liolaemidae", "平咽蜥科", 30],
        ["Opluridae", "马岛鬣蜥科", 35],
        ["Tropiduridae", "新热带地蜥科", 45]
      ]
    },
    {
      parent: "Gekkota",
      terminal_rank: "family",
      items: [
        ["Gekkonidae", "壁虎科", 70],
        ["Carphodactylidae", "瘤尾虎科", 30],
        ["Diplodactylidae", "澳洲壁虎科", 50],
        ["Eublepharidae", "睑虎科", 35],
        ["Phyllodactylidae", "叶趾虎科", 40],
        ["Sphaerodactylidae", "球趾虎科", 35]
      ]
    },
    {
      parent: "Gekkota",
      terminal_rank: "family",
      items: [
        ["Pygopodidae", "鳞脚蜥科", 45]
      ]
    },
    {
      parent: "Scincoidea",
      terminal_rank: "family",
      items: [
        ["Scincidae", "石龙子科", 85],
        ["Cordylidae", "环尾蜥科", 35],
        ["Gerrhosauridae", "板蜥科", 40]
      ]
    },
    {
      parent: "Scincoidea",
      terminal_rank: "family",
      items: [
        ["Xantusiidae", "夜蜥科", 60]
      ]
    },
    {
      parent: "Lacertoidea",
      terminal_rank: "family",
      items: [
        ["Lacertidae", "正蜥科", 55]
      ]
    },
    {
      parent: "Gymnophthalmoidea",
      terminal_rank: "family",
      items: [
        ["Teiidae", "美洲蜥蜴科", 70],
        ["Gymnophthalmidae", "裸眼蜥科", 60]
      ]
    },
    {
      parent: "Amphisbaenia",
      terminal_rank: "family",
      items: [
        ["Amphisbaenidae", "蚓蜥科", 55],
        ["Bipedidae", "双足蚓蜥科", 20],
        ["Blanidae", "布兰蚓蜥科", 25],
        ["Cadeidae", "古巴蚓蜥科", 15],
        ["Rhineuridae", "佛罗里达蚓蜥科", 35],
        ["Trogonophiidae", "短头蚓蜥科", 25]
      ]
    },
    {
      parent: "Diploglossa",
      terminal_rank: "family",
      items: [
        ["Anguidae", "蛇蜥科", 70],
        ["Anniellidae", "蠕蜥科", 25],
        ["Diploglossidae", "复舌蜥科", 55],
        ["Xenosauridae", "异蜥科", 30]
      ]
    },
    {
      parent: "Platynota",
      terminal_rank: "family",
      items: [
        ["Helodermatidae", "毒蜥科", 25]
      ]
    },
    {
      parent: "Varanoidea",
      terminal_rank: "family",
      items: [
        ["Lanthanotidae", "拟毒蜥科", 20],
        ["Varanidae", "巨蜥科", 45]
      ]
    },
    {
      parent: "Shinisaurioidea",
      terminal_rank: "family",
      items: [
        ["Shinisauridae", "鳄蜥科", 20]
      ]
    },
    {
      parent: "Typhlopoidea",
      terminal_rank: "family",
      items: [
        ["Typhlopidae", "盲蛇科", 50],
        ["Leptotyphlopidae", "细盲蛇科", 65],
        ["Anomalepididae", "异盲蛇科", 50],
        ["Gerrhopilidae", "岛盲蛇科", 35],
        ["Xenotyphlopidae", "异盾盲蛇科", 15]
      ]
    },
    {
      parent: "Henophidia",
      terminal_rank: "family",
      items: [
        ["Aniliidae", "管蛇科", 30],
        ["Tropidophiidae", "林蚺科", 25]
      ]
    },
    {
      parent: "Booidea",
      terminal_rank: "family",
      items: [
        ["Boidae", "蚺科", 55],
        ["Bolyeriidae", "岛蚺科", 10]
      ]
    },
    {
      parent: "Pythonoidea",
      terminal_rank: "family",
      items: [
        ["Pythonidae", "蟒科", 45],
        ["Loxocemidae", "美洲闪鳞蛇科", 15],
        ["Xenopeltidae", "闪鳞蛇科", 20]
      ]
    },
    {
      parent: "Henophidia",
      terminal_rank: "family",
      items: [
        ["Cylindrophiidae", "筒蛇科", 35],
        ["Uropeltidae", "盾尾蛇科", 40]
      ]
    },
    {
      parent: "Caenophidia",
      terminal_rank: "family",
      items: [
        ["Acrochordidae", "瘰鳞蛇科", 35]
      ]
    },
    {
      parent: "Colubroidea",
      terminal_rank: "family",
      items: [
        ["Colubridae", "游蛇科", 45],
        ["Dipsadidae", "异齿蛇科", 50],
        ["Natricidae", "水游蛇科", 35],
        ["Pseudoxenodontidae", "颈槽蛇科", 15]
      ]
    },
    {
      parent: "Elapoidea",
      terminal_rank: "family",
      items: [
        ["Elapidae", "眼镜蛇科", 35],
        ["Atractaspididae", "穴蝰科", 30],
        ["Lamprophiidae", "穴居游蛇科", 40]
      ]
    },
    {
      parent: "Viperoidea",
      terminal_rank: "family",
      items: [
        ["Viperidae", "蝰科", 35]
      ]
    },
    {
      parent: "Pareoidea",
      terminal_rank: "family",
      items: [
        ["Pareidae", "钝头蛇科", 20]
      ]
    },
    {
      parent: "Homalopsoidea",
      terminal_rank: "family",
      items: [
        ["Homalopsidae", "宽吻蛇科", 25]
      ]
    },
    {
      parent: "Xenodermoidea",
      terminal_rank: "family",
      items: [
        ["Xenodermidae", "闪皮蛇科", 25]
      ]
    }
  ];

  const terminalDetails = {
    Testudinidae: { representative_species: "Testudo graeca", description: "典型陆栖龟类，背甲高拱、四肢粗壮，适应干旱或半干旱陆地环境。" },
    Cheloniidae: { representative_species: "Chelonia mydas", description: "现代海龟主支，前肢鳍状化明显，广泛分布于热带和亚热带海域。" },
    Dermochelyidae: { representative_species: "Dermochelys coriacea", description: "棱皮龟单型科，背甲退化为皮质嵌骨板，深海远洋能力极强。" },
    Trionychidae: { representative_species: "Pelodiscus sinensis", description: "软壳淡水龟类，骨甲外覆柔软皮肤，吻端常延长成短管状。" },
    Carettochelyidae: { representative_species: "Carettochelys insculpta", description: "两爪鳖单型科，兼具鳍状前肢与淡水生活史，俗称猪鼻龟。" },
    Chelydridae: { representative_species: "Chelydra serpentina", description: "咬合力强、头颈粗壮的伏击型淡水龟类，攻击性较强。" },
    Kinosternidae: { representative_species: "Sternotherus odoratus", description: "小型底栖淡水龟，腹甲活动性较高，常生活于缓流水体和沼泽。" },
    Dermatemydidae: { representative_species: "Dermatemys mawii", description: "中美洲河龟单型科，现生仅一属一种，是高度濒危的古老支系。" },
    Platysternidae: { representative_species: "Platysternon megacephalum", description: "平胸龟单型科，头大尾长，擅长攀附山溪岩石环境。" },
    Emydidae: { representative_species: "Trachemys scripta", description: "泽龟和箱龟的主要类群之一，以新大陆为分布中心，淡水适应显著。" },
    Geoemydidae: { representative_species: "Mauremys reevesii", description: "亚洲最重要的淡水龟辐射之一，也包含少数跨洋分布类群。" },
    Chelidae: { representative_species: "Chelodina longicollis", description: "南美和澳新侧颈龟类，许多成员颈部较长，缩颈时向侧方弯折。" },
    Pelomedusidae: { representative_species: "Pelomedusa subrufa", description: "非洲侧颈龟类，常生活于静水、季节性池塘和缓流环境。" },
    Podocnemididae: { representative_species: "Podocnemis expansa", description: "南美与马达加斯加的大河型侧颈龟，现生仅存少数古老谱系。" },
    Sphenodontidae: { representative_species: "Sphenodon punctatus", description: "现生仅存喙头蜥属，保留了许多原始鳞龙类头骨与齿列特征。" },
    Crocodylidae: { representative_species: "Crocodylus porosus", description: "典型真鳄类，多分布于热带淡水和河口环境，吻型变化较大。" },
    Alligatoridae: { representative_species: "Alligator mississippiensis", description: "短吻鳄与凯门鳄类，吻部通常较宽，许多种偏好淡水环境。" },
    Gavialidae: { representative_species: "Gavialis gangeticus", description: "长吻食鱼型鳄类代表，吻极狭长，强烈适应大型河流生态位。" },
    Struthioniformes: { representative_species: "Struthio camelus", description: "非洲大型平胸鸟类，善于高速奔跑，不具真正飞行能力。" },
    Rheiformes: { representative_species: "Rhea americana", description: "南美洲大型平胸鸟类，栖息于草原和稀树草原环境。" },
    Apterygiformes: { representative_species: "Apteryx mantelli", description: "新西兰夜行性平胸鸟类，嗅觉发达，羽毛呈毛状。" },
    Casuariiformes: { representative_species: "Dromaius novaehollandiae", description: "大洋洲大型平胸鸟类，后肢强健，适应开阔地快速奔跑。" },
    Tinamiformes: { representative_species: "Tinamus major", description: "古颚类中仍保留飞行能力的地栖鸟类，以中南美洲森林和灌丛为主。" },
    Galliformes: { representative_species: "Gallus gallus", description: "地栖型陆鸟类，翅短而爆发力强，多取食种子、嫩叶和小型无脊椎动物。" },
    Anseriformes: { representative_species: "Anas platyrhynchos", description: "雁鸭类水鸟，嘴缘与蹼足适于滤食、游水和涉水生活。" },
    Caprimulgiformes: { representative_species: "Caprimulgus indicus", description: "IOC 现行框架下的夜鹰目包含传统夜鹰、油鸱、林鸱与蟆口鸱等夜行或晨昏活动鸟类。" },
    Apodiformes: { representative_species: "Apus apus", description: "雨燕与蜂鸟所在支系，飞行能力极强，部分类群悬停特化显著。" },
    Musophagiformes: { representative_species: "Corythaeola cristata", description: "蕉鹃类为非洲树栖果食鸟，常具鲜艳羽色或显著羽冠。" },
    Otidiformes: { representative_species: "Otis tarda", description: "鸨类多为开阔地大型地栖鸟，雄鸟常具夸张的求偶展示行为。" },
    Cuculiformes: { representative_species: "Cuculus canorus", description: "鹃类多样化明显，许多种类演化出典型巢寄生行为。" },
    Mesitornithiformes: { representative_species: "Mesitornis unicolor", description: "拟鹑类为马达加斯加特有的小型地栖鸟，是现代鸟类中的孑遗支。" },
    Pterocliformes: { representative_species: "Pterocles alchata", description: "沙鸡类适应干旱开阔环境，善远距离飞行取水。" },
    Columbiformes: { representative_species: "Columba livia", description: "鸽形类具喙基蜡膜，飞行能力强，多取食果实和种子。" },
    Gruiformes: { representative_species: "Grus grus", description: "鹤形类包含长腿涉禽和部分地栖杂食鸟，是形态差异较大的古老支系。" },
    Podicipediformes: { representative_species: "Podiceps cristatus", description: "䴙䴘类为高度潜水化水鸟，足叶瓣化显著，陆上行动笨拙。" },
    Phoenicopteriformes: { representative_species: "Phoenicopterus roseus", description: "红鹳类以滤食为主，长腿长颈，常形成大群栖息繁殖地。" },
    Charadriiformes: { representative_species: "Larus argentatus", description: "鸻形类包含鸻鹬鸥燕鸻等多个支系，是滨海和湿地鸟类的重要主体。" },
    Eurypygiformes: { representative_species: "Eurypyga helias", description: "日鳽类现生仅少数孤立支系，保留了较独特的早期新鸟谱系特征。" },
    Phaethontiformes: { representative_species: "Phaethon rubricauda", description: "鹲类为热带远洋海鸟，中央尾羽常极度延长。" },
    Gaviiformes: { representative_species: "Gavia immer", description: "潜鸟类适应寒温带水域潜水捕食，后肢明显后移。" },
    Sphenisciformes: { representative_species: "Aptenodytes forsteri", description: "企鹅类为南半球海生潜水鸟，前肢演化为鳍状翼。" },
    Procellariiformes: { representative_species: "Diomedea exulans", description: "鹱形类为典型管鼻海鸟，远洋滑翔与长距离迁飞能力突出。" },
    Ciconiiformes: { representative_species: "Ciconia ciconia", description: "鹳类为大型涉禽，颈腿修长，多在开阔湿地或农田觅食。" },
    Suliformes: { representative_species: "Phalacrocorax carbo", description: "鲣鸟类包含鲣鸟、军舰鸟、鸬鹚和蛇鹈，捕鱼方式多样。" },
    Pelecaniformes: { representative_species: "Pelecanus onocrotalus", description: "鹈形类多为涉水或近海捕鱼鸟，部分支系喉囊和嘴形高度特化。" },
    Opisthocomiformes: { representative_species: "Opisthocomus hoazin", description: "麝雉单型目，南美树栖叶食鸟，消化系统与雏鸟特征都很独特。" },
    Accipitriformes: { representative_species: "Aquila chrysaetos", description: "IOC 现行框架下的鹰形目包含鹰、鹫、鹞、鸢及美洲鹫等日行猛禽，钩喙与利爪高度发达。" },
    Strigiformes: { representative_species: "Bubo bubo", description: "鸮形类为夜行猛禽，面盘结构与听觉定位能力突出。" },
    Coliiformes: { representative_species: "Colius striatus", description: "鼠鸟类是非洲特有的小型树栖鸟，尾长且常群居活动。" },
    Leptosomiformes: { representative_species: "Leptosomus discolor", description: "鹃鴗类为马达加斯加及邻近岛屿特有的孤立支系。" },
    Trogoniformes: { representative_species: "Pharomachrus mocinno", description: "咬鹃类多分布于热带森林，羽色华丽，趾型特化明显。" },
    Bucerotiformes: { representative_species: "Buceros bicornis", description: "犀鸟类包含犀鸟、戴胜和地犀鸟，喙大且常具盔突。" },
    Coraciiformes: { representative_species: "Alcedo atthis", description: "佛法僧类多为色彩鲜艳的伏击型捕食鸟，含翠鸟、蜂虎等。" },
    Piciformes: { representative_species: "Ramphastos toco", description: "䴕形类多具攀树或凿木适应，包括啄木鸟和巨嘴鸟等。" },
    Cariamiformes: { representative_species: "Cariama cristata", description: "叫鹤类为南美开阔地长腿掠食鸟，是南方鸟类的早期分支之一。" },
    Falconiformes: { representative_species: "Falco peregrinus", description: "隼形类为高速俯冲型猛禽，喙缘常具明显齿突。" },
    Psittaciformes: { representative_species: "Ara macao", description: "鹦形类具弯喙和对趾足，社会性和认知能力普遍较高。" },
    Passeriformes: { representative_species: "Corvus corax", description: "雀形目为现生鸟类中物种最丰富的辐射支，鸣管结构高度特化。" },
    Agamidae: { representative_species: "Pogona vitticeps", description: "旧大陆鬣蜥类，树栖与地栖形态多样，常具棘鳞和喉囊展示。" },
    Chamaeleonidae: { representative_species: "Chamaeleo calyptratus", description: "避役类独立演化出弹射舌、并趾足和高度灵活的双眼系统。" },
    Iguanidae: { representative_species: "Iguana iguana", description: "美洲大型鬣蜥代表支，常偏植食或杂食，树栖能力较强。" },
    Corytophanidae: { representative_species: "Basiliscus plumifrons", description: "冠蜥类头冠显著，部分种可借助后肢快速掠过水面。" },
    Crotaphytidae: { representative_species: "Crotaphytus collaris", description: "环颈蜥类多见于北美干旱或半干旱环境，奔跑速度快，捕食性较强。" },
    Dactyloidae: { representative_species: "Anolis carolinensis", description: "安乐蜥辐射极盛，喉垂和趾垫形态多样，是生态位分化经典案例。" },
    Hoplocercidae: { representative_species: "Hoplocercus spinosus", description: "木鳞蜥类多为新热带林地和岩地蜥蜴，鳞片粗壮且常具刺状结构。" },
    Leiocephalidae: { representative_species: "Leiocephalus carinatus", description: "卷尾蜥类主要限于西印度群岛，尾部卷曲和地表活动习性明显。" },
    Leiosauridae: { representative_species: "Enyalius iheringii", description: "平鳞蜥类为南美树栖或半树栖蜥群，外形与鬣蜥类相近。" },
    Liolaemidae: { representative_species: "Liolaemus chiliensis", description: "平咽蜥类在南美高纬与高海拔地区多样化显著，环境适应广。" },
    Opluridae: { representative_species: "Oplurus cuvieri", description: "马达加斯加特有鬣蜥类孑遗支，兼有岩栖与树栖成员。" },
    Phrynosomatidae: { representative_species: "Phrynosoma cornutum", description: "角蜥科为北美辐射显著的蜥群，含角蜥、栅蜥和侧斑蜥等。" },
    Polychrotidae: { representative_species: "Polychrus marmoratus", description: "长腿鬣蜥类多为树栖、身体侧扁的细长蜥蜴。" },
    Tropiduridae: { representative_species: "Tropidurus torquatus", description: "新热带地蜥类常生活于岩地、沙地和开阔灌丛，地表活动活跃。" },
    Gekkonidae: { representative_species: "Gekko gecko", description: "壁虎最大科之一，趾下黏附结构与夜行适应最为典型。" },
    Carphodactylidae: { representative_species: "Nephrurus levis", description: "瘤尾虎科多为澳大利亚地栖或岩栖壁虎，尾部常膨大。" },
    Diplodactylidae: { representative_species: "Diplodactylus vittatus", description: "澳洲壁虎科在澳洲和新西兰辐射显著，生态型丰富。" },
    Eublepharidae: { representative_species: "Eublepharis macularius", description: "睑虎类保留可动眼睑，是较原始型的壁虎支系。" },
    Phyllodactylidae: { representative_species: "Tarentola mauritanica", description: "叶趾虎类趾端常扩大成叶状或扇状，广泛分布于温暖地区。" },
    Sphaerodactylidae: { representative_species: "Sphaerodactylus argus", description: "球趾虎类多为极小型岛屿壁虎，种群辐射和地方性强。" },
    Pygopodidae: { representative_species: "Lialis burtonis", description: "鳞脚蜥类为澳洲无肢蜥，与壁虎近缘，常以蛇样姿态行动。" },
    Scincidae: { representative_species: "Tiliqua scincoides", description: "石龙子科全球辐射极广，鳞片光滑、体形流线化，是现生最大蜥类科之一。" },
    Cordylidae: { representative_species: "Ouroborus cataphractus", description: "环尾蜥类多具装甲化鳞片和棘刺，常栖非洲岩地。" },
    Gerrhosauridae: { representative_species: "Gerrhosaurus major", description: "板蜥类为非洲中大型陆蜥，体表骨板和硬鳞明显。" },
    Xantusiidae: { representative_species: "Xantusia vigilis", description: "夜蜥类隐蔽性强，常栖岩缝、树皮或多肉植物丛中。" },
    Lacertidae: { representative_species: "Lacerta agilis", description: "正蜥科为旧大陆活跃型昼行蜥类代表，奔跑和视觉捕食能力突出。" },
    Teiidae: { representative_species: "Salvator merianae", description: "美洲蜥蜴科多为快速奔跑型蜥类，舌分叉显著，捕食范围广。" },
    Gymnophthalmidae: { representative_species: "Gymnophthalmus speciosus", description: "裸眼蜥科多为小型林下或穴居蜥类，肢体常退化。" },
    Amphisbaenidae: { representative_species: "Amphisbaena alba", description: "蚓蜥科是典型无肢穴居蚓蜥的主体，头骨适于掘土推进。" },
    Bipedidae: { representative_species: "Bipes biporus", description: "双足蚓蜥保留一对强壮前肢，仅分布于墨西哥西北部。" },
    Blanidae: { representative_species: "Blanus cinereus", description: "布兰蚓蜥为地中海及西亚残存的古老穴居支系。" },
    Cadeidae: { representative_species: "Cadea blanoides", description: "古巴蚓蜥科为加勒比地区地方性极强的小型穴居支系。" },
    Rhineuridae: { representative_species: "Rhineura floridana", description: "佛罗里达蚓蜥单型科，为北美残存的孑遗型穴居蜥类。" },
    Trogonophiidae: { representative_species: "Trogonophis wiegmanni", description: "短头蚓蜥类分布于北非和西亚，头短而坚实，适于推土掘穴。" },
    Anguidae: { representative_species: "Anguis fragilis", description: "蛇蜥科包含有肢和无肢成员，许多种类具骨板强化的皮肤。" },
    Anniellidae: { representative_species: "Anniella pulchra", description: "蠕蜥科为北美沙地无肢蜥类，眼和外耳孔显著退化。" },
    Diploglossidae: { representative_species: "Diploglossus monotropis", description: "复舌蜥类多为新热带粗壮蜥蜴，部分种类具半树栖习性。" },
    Helodermatidae: { representative_species: "Heloderma suspectum", description: "毒蜥科为现生少数具完善毒液系统的大型蜥蜴类群。" },
    Lanthanotidae: { representative_species: "Lanthanotus borneensis", description: "拟毒蜥科现仅婆罗洲无耳巨蜥一种，是半水栖孑遗支。" },
    Varanidae: { representative_species: "Varanus komodoensis", description: "巨蜥科具高活动性和较强认知能力，是大型掠食蜥类代表。" },
    Shinisauridae: { representative_species: "Shinisaurus crocodilurus", description: "鳄蜥科单型，偏好山地溪流环境，是东亚孑遗支系。" },
    Xenosauridae: { representative_species: "Xenosaurus grandis", description: "异蜥类多藏身岩缝和树洞，繁殖缓慢，微栖息地专化明显。" },
    Typhlopidae: { representative_species: "Indotyphlops braminus", description: "盲蛇科广布热带地区，体型细小，掘穴性和蚁白蚁食性显著。" },
    Leptotyphlopidae: { representative_species: "Rena dulcis", description: "细盲蛇类吻尖细小，专食蚂蚁和白蚁，是地下生态位代表。" },
    Anomalepididae: { representative_species: "Anomalepis mexicanus", description: "异盲蛇类为美洲基干盲蛇支，眼部更退化，体型通常较小。" },
    Gerrhopilidae: { representative_species: "Gerrhopilus ater", description: "岛盲蛇类多分布于东洋和澳洲地区，体表光滑，掘穴性强。" },
    Xenotyphlopidae: { representative_species: "Xenotyphlops grandidieri", description: "异盾盲蛇为马达加斯加特有的稀少盲蛇支系。" },
    Aniliidae: { representative_species: "Anilius scytale", description: "管蛇科保留较原始的蛇类头骨和椎骨特征，分布于新热带地区。" },
    Tropidophiidae: { representative_species: "Tropidophis melanurus", description: "林蚺类为美洲小型蚺状蛇，部分种类具有变色能力。" },
    Boidae: { representative_species: "Boa constrictor", description: "蚺科为典型缠绕蛇类，多胎生，部分成员具有热感受器官。" },
    Pythonidae: { representative_species: "Python bivittatus", description: "蟒科为旧大陆大型缠绕蛇，通常卵生且雌蛇具护卵行为。" },
    Bolyeriidae: { representative_species: "Casarea dussumieri", description: "岛蚺科仅残存少数马斯克林群岛蛇类，头骨运动方式特殊。" },
    Cylindrophiidae: { representative_species: "Cylindrophis ruffus", description: "筒蛇类体粗尾短、穴居性强，常见于东南亚土壤或林下。" },
    Uropeltidae: { representative_species: "Uropeltis woodmasoni", description: "盾尾蛇为南亚特有掘穴蛇类，尾端常硬化成盾状。" },
    Loxocemidae: { representative_species: "Loxocemus bicolor", description: "美洲闪鳞蛇科单型，兼具若干原始和特化特征。" },
    Xenopeltidae: { representative_species: "Xenopeltis unicolor", description: "闪鳞蛇类以强烈虹彩鳞片著称，多生活于东南亚土壤表层或浅穴中。" },
    Acrochordidae: { representative_species: "Acrochordus javanicus", description: "瘰鳞蛇类为完全水栖粗皮蛇，皮肤松弛且善于伏击鱼类。" },
    Colubridae: { representative_species: "Pantherophis guttatus", description: "游蛇科是现生最大蛇科之一，生态、体型与食性多样度极高。" },
    Dipsadidae: { representative_species: "Xenodon merremii", description: "异齿蛇科以新大陆后沟牙蛇类为主，食性专化现象丰富。" },
    Natricidae: { representative_species: "Natrix natrix", description: "水游蛇科常与湿地或水域相关，许多成员善游泳且无强毒。" },
    Pseudoxenodontidae: { representative_species: "Pseudoxenodon macrops", description: "颈槽蛇科为东亚和东南亚小型支系，与若干后沟牙蛇关系密切。" },
    Elapidae: { representative_species: "Naja naja", description: "眼镜蛇科为前沟牙毒蛇主支，包含眼镜蛇、珊瑚蛇与海蛇。" },
    Viperidae: { representative_species: "Vipera berus", description: "蝰科具可折叠长毒牙，伏击捕食和毒液系统高度特化。" },
    Atractaspididae: { representative_species: "Atractaspis bibronii", description: "穴蝰类多穴居，部分成员具独特侧刺式咬击机制。" },
    Lamprophiidae: { representative_species: "Boaedon fuliginosus", description: "穴居游蛇科以非洲为中心多样化，包含多种地栖与穴居蛇类。" },
    Pareidae: { representative_species: "Pareas carinatus", description: "钝头蛇科为以蜗牛、蛞蝓等软体动物为主食的特化树蛇类。" },
    Homalopsidae: { representative_species: "Cerberus rynchops", description: "宽吻蛇类生活于热带咸淡水交汇环境，后沟牙与水栖适应明显。" },
    Xenodermidae: { representative_species: "Xenodermus javanicus", description: "闪皮蛇科为东亚至东南亚的古老奇异蛇支，体鳞常异常特化。" }
  };

  const terminalEnDescriptions = {
    Testudinidae: "Typical terrestrial turtles with high-domed shells and sturdy limbs, adapted to arid or semi-arid land habitats.",
    Cheloniidae: "The main modern sea turtle radiation, with strongly flippered forelimbs and a broad tropical to subtropical marine distribution.",
    Dermochelyidae: "A monotypic family whose shell is reduced to a leathery mosaic of embedded bones, giving leatherbacks exceptional pelagic ability.",
    Trionychidae: "Softshell freshwater turtles with flexible skin-covered shells and a snout often extended into a short tube.",
    Carettochelyidae: "A monotypic freshwater turtle family combining flipper-like forelimbs with a riverine life history; best known as the pig-nosed turtle.",
    Chelydridae: "Powerful freshwater ambush turtles with strong bites and robust heads and necks, often notably aggressive.",
    Kinosternidae: "Small bottom-dwelling freshwater turtles with relatively mobile plastrons, common in slow waters and marshes.",
    Dermatemydidae: "A monotypic Central American river turtle lineage represented by a single highly endangered living species.",
    Platysternidae: "A monotypic family with an oversized head and long tail, well adapted to climbing in rocky mountain-stream habitats.",
    Emydidae: "One of the main turtle and box turtle radiations, centered in the New World and strongly adapted to freshwater habitats.",
    Geoemydidae: "One of Asia's major freshwater turtle radiations, also including a few more broadly distributed lineages.",
    Chelidae: "South American and Australasian side-necked turtles, many with long necks that fold sideways during retraction.",
    Pelomedusidae: "African side-necked turtles usually associated with still waters, seasonal pools, and slow-moving habitats.",
    Podocnemididae: "Large-river side-necked turtles of South America and Madagascar, representing a few surviving ancient lineages.",
    Sphenodontidae: "The only living tuatara family, retaining many primitive lepidosaur cranial and dental traits.",
    Crocodylidae: "Typical crocodiles, widespread in tropical freshwater and estuarine habitats and diverse in snout form.",
    Alligatoridae: "Alligators and caimans, generally broader-snouted than crocodiles and often centered in freshwater habitats.",
    Gavialidae: "The long-snouted fish-eating crocodilian lineage, strongly specialized for large-river environments.",
    Struthioniformes: "Large African ratites specialized for fast running and lacking true powered flight.",
    Rheiformes: "Large South American ratites of grassland and savanna environments.",
    Apterygiformes: "Nocturnal New Zealand ratites with strong olfaction and hair-like plumage.",
    Casuariiformes: "Large Australasian ratites with powerful hindlimbs, adapted for rapid running in open habitats.",
    Tinamiformes: "Ground-dwelling paleognaths that retained flight, centered in Central and South American forests and scrub.",
    Galliformes: "Mostly terrestrial landbirds with short powerful wings, feeding widely on seeds, shoots, and small invertebrates.",
    Anseriformes: "Waterfowl whose lamellate bills and webbed feet suit swimming, filtering, and wading lifestyles.",
    Caprimulgiformes: "Under current IOC usage this order includes traditional nightjars, oilbirds, potoos, frogmouths, and other mainly nocturnal or crepuscular birds.",
    Apodiformes: "The swift-hummingbird lineage, marked by exceptional flight ability and extreme hovering specialization in some members.",
    Musophagiformes: "African arboreal fruit-eating birds often notable for bright plumage or prominent crests.",
    Otidiformes: "Mostly large ground-dwelling birds of open country, with males often showing elaborate courtship displays.",
    Cuculiformes: "A diverse order in which many species evolved classic brood-parasitic behavior.",
    Mesitornithiformes: "Small ground birds endemic to Madagascar, representing a relict modern avian lineage.",
    Pterocliformes: "Sandgrouse adapted to arid open country and capable of long-distance flights to water.",
    Columbiformes: "Pigeons and doves, strong fliers with a fleshy cere and diets centered largely on fruits and seeds.",
    Gruiformes: "An old and morphologically varied order containing long-legged waders as well as some terrestrial omnivores.",
    Podicipediformes: "Highly specialized diving birds with lobed toes and awkward movement on land.",
    Phoenicopteriformes: "Filter-feeding flamingos with long legs and necks that often breed and roost in dense colonies.",
    Charadriiformes: "A major coastal and wetland bird radiation including plovers, sandpipers, gulls, terns, and allies.",
    Eurypygiformes: "A tiny surviving order of isolated lineages retaining unusual early neoavian traits.",
    Phaethontiformes: "Tropical pelagic seabirds with greatly elongated central tail feathers.",
    Gaviiformes: "Diving birds of cool temperate waters, with hindlimbs set far back on the body.",
    Sphenisciformes: "Southern Hemisphere marine diving birds whose forelimbs evolved into flipper-like wings.",
    Procellariiformes: "Classic tube-nosed seabirds with exceptional oceanic gliding and long-distance travel ability.",
    Ciconiiformes: "Large wading birds with long necks and legs, usually foraging in open wetlands or agricultural land.",
    Suliformes: "A fishing-bird assemblage including boobies, frigatebirds, cormorants, and darters, with diverse capture styles.",
    Pelecaniformes: "Mostly wading or nearshore fishing birds, some with highly specialized bills and throat pouches.",
    Opisthocomiformes: "A monotypic South American arboreal leaf-eating bird with highly unusual digestive and juvenile traits.",
    Accipitriformes: "Under the current IOC framework this order includes eagles, vultures, hawks, harriers, kites, and New World vultures, all with strongly hooked bills and talons.",
    Strigiformes: "Nocturnal birds of prey with facial discs and highly developed auditory localization.",
    Coliiformes: "Small African arboreal birds with long tails and strongly social habits.",
    Leptosomiformes: "An isolated lineage endemic to Madagascar and nearby islands.",
    Trogoniformes: "Mostly tropical forest birds, often brilliantly colored and marked by distinctive toe arrangements.",
    Bucerotiformes: "The hornbill lineage, including hornbills, hoopoes, and ground hornbills, often with large bills and casque-like structures.",
    Coraciiformes: "Often brightly colored sit-and-wait predators, including kingfishers, bee-eaters, and allies.",
    Piciformes: "A largely scansorial or wood-excavating group including woodpeckers, toucans, and relatives.",
    Cariamiformes: "Long-legged predatory birds of open South American habitats and one of the earliest branches within Australaves.",
    Falconiformes: "High-speed raptorial birds, often with a distinct tomial tooth on the bill.",
    Psittaciformes: "Parrots with strongly curved bills, zygodactyl feet, and generally high social and cognitive complexity.",
    Passeriformes: "The most species-rich living bird radiation, with a highly specialized syrinx.",
    Agamidae: "Old World iguanians with great arboreal and terrestrial diversity, often bearing spiny scales and display dewlaps.",
    Chamaeleonidae: "Chameleons independently evolved projectile tongues, zygodactyl feet, and highly mobile eyes.",
    Iguanidae: "A representative New World iguanian branch, often herbivorous or omnivorous and strongly arboreal.",
    Corytophanidae: "Casquehead lizards with conspicuous cranial crests; some species can run rapidly across water on the hind limbs.",
    Crotaphytidae: "Collared-lizard relatives of North American arid and semi-arid habitats, fast-running and strongly predatory.",
    Dactyloidae: "The anole radiation, famous for diverse dewlaps, toe pads, and classic examples of niche differentiation.",
    Hoplocercidae: "Mostly Neotropical forest and rocky-ground lizards with robust scales, often including spiny structures.",
    Leiocephalidae: "Curly-tailed lizards largely confined to the West Indies, notable for their curled tails and active ground behavior.",
    Leiosauridae: "South American arboreal or semi-arboreal lizards that often resemble iguanians in general form.",
    Liolaemidae: "A diverse South American radiation especially successful at high latitudes and elevations.",
    Opluridae: "A Malagasy relict iguanian family including both rock-dwelling and arboreal forms.",
    Phrynosomatidae: "A major North American lizard radiation including horned lizards, fence lizards, and side-blotched lizards.",
    Polychrotidae: "Mostly arboreal, laterally compressed, slender lizards with long limbs.",
    Tropiduridae: "Active ground-dwelling Neotropical lizards common in rocky, sandy, and open scrub habitats.",
    Gekkonidae: "One of the largest gecko families, especially typical for adhesive toe pads and nocturnal habits.",
    Carphodactylidae: "Mostly Australian terrestrial or rock-dwelling geckos, often with swollen or knobbed tails.",
    Diplodactylidae: "A major Australasian gecko radiation, especially diverse across Australia and New Zealand.",
    Eublepharidae: "Eyelid geckos that retain movable eyelids and represent a relatively basal gecko lineage.",
    Phyllodactylidae: "Leaf-toed geckos whose toe tips are often expanded into leaf- or fan-like pads and are widespread in warm regions.",
    Sphaerodactylidae: "Often tiny island geckos notable for strong local endemism and repeated radiations.",
    Pygopodidae: "Australian legless lizards closely related to geckos and often moving with a snake-like body plan.",
    Scincidae: "A globally widespread skink radiation with smooth scales, streamlined bodies, and enormous diversity.",
    Cordylidae: "Often heavily armored African lizards with spiny scales, especially associated with rocky habitats.",
    Gerrhosauridae: "Medium to large African terrestrial lizards with obvious osteoderms and tough scales.",
    Xantusiidae: "Secretive night lizards living in rock crevices, beneath bark, or among succulents.",
    Lacertidae: "Classic Old World active diurnal lizards with strong running ability and visually guided predation.",
    Teiidae: "Mostly fast-running American lizards with strongly forked tongues and broad predatory diets.",
    Gymnophthalmidae: "Mostly small leaf-litter or fossorial lizards, often with reduced limbs.",
    Amphisbaenidae: "The main radiation of limbless burrowing amphisbaenians, with skulls specialized for digging.",
    Bipedidae: "A Mexican amphisbaenian lineage that retains a strong pair of forelimbs.",
    Blanidae: "An old fossorial lineage surviving around the Mediterranean and western Asia.",
    Cadeidae: "A highly endemic small fossorial radiation restricted to the Caribbean, especially Cuba.",
    Rhineuridae: "A monotypic North American relict burrowing lizard lineage surviving in Florida.",
    Trogonophiidae: "Short-headed amphisbaenians of North Africa and western Asia, with stout heads adapted for digging.",
    Anguidae: "Anguids include both limbed and limbless forms, many with osteoderm-reinforced skin.",
    Anniellidae: "Limbless sand lizards of western North America, with strongly reduced eyes and external ear openings.",
    Diploglossidae: "Mostly robust Neotropical lizards, some with semi-arboreal habits.",
    Helodermatidae: "One of the few living large lizard lineages with a well-developed venom system.",
    Lanthanotidae: "Now represented only by the Bornean earless monitor, a semi-aquatic relict lineage.",
    Varanidae: "Monitor lizards, noted for high activity, strong cognition, and large predatory forms.",
    Shinisauridae: "A monotypic East Asian lineage favoring cool montane streams.",
    Xenosauridae: "A microhabitat-specialized lineage often hiding in rock cracks and tree cavities, with slow reproduction.",
    Typhlopidae: "Widespread tropical blind snakes, tiny-bodied and strongly specialized for burrowing and ant/termite feeding.",
    Leptotyphlopidae: "Threadsnakes with very narrow snouts, specialized on ants and termites in subterranean habitats.",
    Anomalepididae: "A basal American blind-snake lineage with further reduced eyes and typically small body size.",
    Gerrhopilidae: "Blind snakes centered in the Oriental and Australasian regions, smooth-scaled and strongly fossorial.",
    Xenotyphlopidae: "A rare blind-snake lineage endemic to Madagascar.",
    Aniliidae: "Pipe snakes retaining several primitive cranial and vertebral snake traits, centered in the Neotropics.",
    Tropidophiidae: "Small American boa-like snakes, some capable of notable color change.",
    Boidae: "Classic constricting snakes, mostly viviparous and in some cases equipped with heat-sensing organs.",
    Pythonidae: "Large Old World constrictors, generally egg-laying with maternal brooding behavior.",
    Bolyeriidae: "A relict Mascarenes island lineage with unusual cranial kinesis.",
    Cylindrophiidae: "Short-tailed, stout-bodied burrowing snakes common in Southeast Asian soils and forest-floor habitats.",
    Uropeltidae: "South Asian burrowing shieldtails, usually with hardened tail tips forming a shield.",
    Loxocemidae: "A monotypic American lineage combining several primitive and specialized traits.",
    Xenopeltidae: "Sunbeam snakes, famous for strong iridescent scales and life close to the soil surface or in shallow burrows.",
    Acrochordidae: "Fully aquatic file snakes with loose skin and strong fish-ambush specialization.",
    Colubridae: "One of the largest living snake families, with extreme ecological, dietary, and body-form diversity.",
    Dipsadidae: "A chiefly New World rear-fanged radiation rich in dietary specializations.",
    Natricidae: "Water and grass snakes often associated with wetlands and swimming habits, usually without strong venom systems.",
    Pseudoxenodontidae: "A small East and Southeast Asian lineage closely related to several rear-fanged snakes.",
    Elapidae: "The main front-fanged venomous snake radiation, including cobras, coral snakes, and sea snakes.",
    Viperidae: "Vipers with long foldable fangs and highly specialized venom and ambush systems.",
    Atractaspididae: "Mostly burrowing snakes, some with the distinctive side-stabbing strike mechanism.",
    Lamprophiidae: "An African-centered radiation including many terrestrial and fossorial snakes.",
    Pareidae: "Arboreal snakes specialized on snails, slugs, and other soft-bodied mollusks.",
    Homalopsidae: "Rear-fanged water snakes of tropical brackish and estuarine habitats.",
    Xenodermidae: "An ancient East and Southeast Asian snake lineage often marked by highly unusual scalation."
  };

  const clades = {};

  cladeDefs.forEach((def) => {
    clades[def.id] = {
      cn_name: def.cn_name,
      rank: def.rank,
      parent: def.parent,
      divergence_time_mya: def.divergence_time_mya,
      description: def.description,
      en_description: cladeEnDescriptions[def.id] || "",
      en_name: def.id
    };
  });

  function lineageOf(cladeId) {
    const lineage = [];
    let current = cladeId;

    while (current && clades[current]) {
      lineage.unshift(current);
      current = clades[current].parent;
    }

    return lineage;
  }

  function formatNodeLabel(cladeId) {
    return clades[cladeId] ? `${clades[cladeId].cn_name} (${cladeId})` : cladeId;
  }

  function buildTaxonomy(cladeId) {
    const taxonomy = {};

    lineageOf(cladeId).forEach((id) => {
      const node = clades[id];
      if (!node) return;
      taxonomy[node.rank] = `${node.cn_name} (${id})`;
    });

    return taxonomy;
  }

  function defaultTerminalDescription(cnName, parentId, terminalRank) {
    if (terminalRank === "order") {
      return `${cnName}是现生鸟类中的一个目级冠群，在本项目中作为鸟纲的末级节点展示。`;
    }

    return `${cnName}是${formatNodeLabel(parentId)}下的现生科级类群，在本项目中作为末级节点展示。`;
  }

  function defaultTerminalEnDescription(familyEn, parentId, terminalRank) {
    if (terminalRank === "order") {
      return `${familyEn} is an order-level crown group of living birds and is shown here as a terminal bird node.`;
    }

    return `${familyEn} is a living family-level lineage within ${parentId}, shown here as a terminal node in this project.`;
  }

  const families = [];
  let terminalId = 1;

  terminalGroups.forEach((group) => {
    group.items.forEach(([familyEn, familyCn, time]) => {
      const detail = terminalDetails[familyEn] || {};
      families.push({
        id: terminalId++,
        family_cn: familyCn,
        family_en: familyEn,
        representative_species: detail.representative_species || "",
        image_url: `images/${familyEn}.png`,
        taxonomy: buildTaxonomy(group.parent),
        parent_node: formatNodeLabel(group.parent),
        parent_rank: clades[group.parent].rank,
        description: detail.description || defaultTerminalDescription(familyCn, group.parent, group.terminal_rank),
        en_description: detail.en_description || terminalEnDescriptions[familyEn] || defaultTerminalEnDescription(familyEn, group.parent, group.terminal_rank),
        divergence_time_mya: time,
        time_note: "此节点时间为便于可视化整理的近似冠群分化时间，宜视为区间估计而非单点定年。",
        time_note_en: "This age is an approximate crown-age estimate used for visualization and should be treated as a range rather than a point date.",
        tags: [],
        parent_clade: group.parent,
        terminal_rank: group.terminal_rank,
        terminal_rank_cn: group.terminal_rank === "order" ? "目" : "科",
        terminal_rank_en: group.terminal_rank === "order" ? "Order" : "Family"
      });
    });
  });

  return {
    meta: {
      project: "Sauropsida Phylogeny",
      version: "0.2 (enriched data)",
      total_families: families.length,
      total_clades: Object.keys(clades).length,
      total_terminal_orders: families.filter((item) => item.terminal_rank === "order").length,
      total_terminal_families: families.filter((item) => item.terminal_rank === "family").length,
      scope: "现生蜥形纲；鸟类整理到目，其余整理到科",
      time_basis: "高阶节点优先采用文献常见冠群分化时间；末级节点为便于可视化而整理的近似冠群时间",
      sources: [
        "Reptile Database（现生爬行动物高阶分类）",
        "IOC World Bird List（现生鸟类目级框架）",
        "Jones et al. 2013；Thomson et al. 2021；近期鸟类与鳄类系统发育研究（高阶冠群时间参考）"
      ]
    },
    clades,
    families
  };
})();

const mammalsData = sauropsidaData;
