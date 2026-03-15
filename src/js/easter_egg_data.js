/**
 * easter_egg_data.js - 彩蛋数据：蜥形纲的失落繁盛与幸存主线
 */

const EASTER_EGG_DATA = {
    name: "Diapsida",
    cn: "双孔类",
    time: 310,
    time_range: "约 310 Ma 起",
    description: "这层彩蛋视图把镜头拉到现生蜥形纲冠群之外，展示双孔类在中生代曾经拥有的海洋、陆地与天空霸权。今天的鸟类、鳄类、龟鳖类和喙头类，并不是这段历史的全部，而是那场巨大辐射最后留下的几条幸存主线。",
    en_description: "This ghost view pulls the camera beyond living crown-group sauropsids to show how Diapsida once dominated sea, land, and sky, leaving only a few surviving lines behind.",
    children: [
        {
            name: "Ichthyosauromorpha",
            cn: "鱼龙形类 [灭绝主线]",
            time: 250,
            dead: true,
            time_range: "约 250-90 Ma",
            description: "鱼龙形类代表爬行动物最彻底的回海实验之一。它们的体型、视觉和推进方式高度特化，最终把双孔类带入了远洋高速猎食者的位置。",
            en_description: "Ichthyosauromorphs represent one of the most complete returns to the sea among reptiles, ultimately producing fast pelagic predators.",
            children: [
                {
                    name: "Hupehsuchia",
                    cn: "湖北鳄类 [灭绝]",
                    time: 248,
                    dead: true,
                    time_range: "约 248-247 Ma",
                    description: "湖北鳄类是三叠纪早期一种装甲化明显、形态非常古怪的海生爬行动物，显示鱼龙形类早期辐射曾探索过多种身体方案。",
                    en_description: "Hupehsuchians were bizarre armored marine reptiles of the Early Triassic, showing that early ichthyosauromorph radiation explored multiple body plans."
                },
                {
                    name: "Nasorostra",
                    cn: "鼻吻鱼龙类",
                    time: 247,
                    dead: true,
                    time_range: "约 247-90 Ma",
                    description: "鼻吻鱼龙类汇集了更典型的鱼龙型身体轮廓，是通向后期高速远洋鱼龙的关键主干。",
                    en_description: "Nasorostrans gather the more typical fish-shaped ichthyosaur lineages and lead toward the highly specialized pelagic forms."
                    ,
                    children: [
                        {
                            name: "Mixosauria",
                            cn: "混鱼龙类 [灭绝]",
                            time: 245,
                            dead: true,
                            time_range: "约 245-230 Ma",
                            description: "混鱼龙类保留了较早期的鱼龙式特征，说明鱼龙并不是一步到位变成后期那种极端流线化的样子。",
                            en_description: "Mixosaurs retained relatively early ichthyosaur traits, showing that the classic pelagic form emerged gradually rather than all at once."
                        },
                        {
                            name: "Ichthyopterygia",
                            cn: "鱼鳍类",
                            time: 247,
                            dead: true,
                            time_range: "约 247-90 Ma",
                            description: "鱼鳍类进一步强化了四肢鳍状化与躯干流线化，成为典型海生双孔类的代表形态。",
                            en_description: "Ichthyopterygians intensified limb-to-fin conversion and streamlining, becoming iconic marine diapsids.",
                            children: [
                                {
                                    name: "Shastasauridae",
                                    cn: "萨斯他鱼龙科 [灭绝]",
                                    time: 235,
                                    dead: true,
                                    time_range: "约 235-210 Ma",
                                    description: "这支大型三叠纪鱼龙曾发展出极为夸张的体型，提醒我们鱼龙类很早就已经进入巨型海洋脊椎动物的尺度。",
                                    en_description: "These giant Triassic ichthyosaurs reached striking body sizes early, showing that the group entered megafaunal marine roles very quickly."
                                },
                                {
                                    name: "Parvipelvia",
                                    cn: "小骨盆鱼龙类",
                                    time: 200,
                                    dead: true,
                                    time_range: "约 200-90 Ma",
                                    description: "小骨盆鱼龙类包含许多侏罗纪和白垩纪的典型远洋鱼龙，是鱼龙类后期成功辐射的核心部分。",
                                    en_description: "Parvipelvians include many of the classic Jurassic and Cretaceous open-ocean ichthyosaurs."
                                    ,
                                    children: [
                                        {
                                            name: "Ophthalmosauridae",
                                            cn: "大眼鱼龙科 [灭绝]",
                                            time: 165,
                                            dead: true,
                                            time_range: "约 165-90 Ma",
                                            description: "大眼鱼龙类拥有极端扩大的眼眶，通常被视作深潜和弱光猎食能力很强的典型远洋鱼龙。",
                                            en_description: "Ophthalmosaurids had enormous eyes and are often interpreted as strong deep-diving, low-light pelagic hunters."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Sauropterygia",
            cn: "鳍龙类 [灭绝主线]",
            time: 245,
            dead: true,
            time_range: "约 245-66 Ma",
            description: "鳍龙类是中生代另一条极其成功的海生爬行动物大支。它们从近岸底栖到远洋巨型掠食者都曾繁盛，和鱼龙一起定义了中生代海洋巨兽时代。",
            en_description: "Sauropterygians were another highly successful marine reptile radiation, spanning shallow coastal forms to giant pelagic predators.",
            children: [
                {
                    name: "Placodontia",
                    cn: "板齿龙类 [灭绝]",
                    time: 245,
                    dead: true,
                    time_range: "约 245-235 Ma",
                    description: "板齿龙类多生活于浅海近岸环境，牙齿粗壮，适于压碎贝类等硬壳猎物，是鳍龙类早期的一种特殊海洋实验。",
                    en_description: "Placodonts were shallow-water marine reptiles with crushing teeth adapted to hard-shelled prey."
                },
                {
                    name: "Eosauropterygia",
                    cn: "真鳍龙类",
                    time: 242,
                    dead: true,
                    time_range: "约 242-66 Ma",
                    description: "真鳍龙类逐步发展出更适合长时间游泳和公海活动的体态，是通向蛇颈龙类的主干。",
                    en_description: "Eosauropterygians developed body plans increasingly suited to sustained swimming and pelagic life, forming the line toward plesiosaurs.",
                    children: [
                        {
                            name: "Nothosauroidea",
                            cn: "幻龙总科 [灭绝]",
                            time: 240,
                            dead: true,
                            time_range: "约 240-210 Ma",
                            description: "幻龙类仍带有明显的近岸和半水栖特征，显示鳍龙类进入海洋的过程经历过多个过渡阶段。",
                            en_description: "Nothosaurs retained strong coastal and semi-aquatic traits, marking an intermediate phase in sauropterygian marine adaptation."
                        },
                        {
                            name: "Pistosauroidea",
                            cn: "鳍龙总科",
                            time: 235,
                            dead: true,
                            time_range: "约 235-66 Ma",
                            description: "这条主线向真正的远洋鳍肢推进者发展，最终孕育出长期统治海洋食物网高位的蛇颈龙类。",
                            en_description: "This lineage moved toward fully pelagic flipper-propelled forms and ultimately gave rise to plesiosaurs.",
                            children: [
                                {
                                    name: "Plesiosauria",
                                    cn: "蛇颈龙类 [灭绝]",
                                    time: 203,
                                    dead: true,
                                    time_range: "约 203-66 Ma",
                                    description: "蛇颈龙类包含长颈小头型与短颈巨颅型两种极端路线，是中生代海洋长期的顶级捕食支系之一。",
                                    en_description: "Plesiosaurs included both long-necked and short-necked giant-headed forms, making them one of the dominant marine reptile radiations of the Mesozoic.",
                                    children: [
                                        {
                                            name: "Pliosauridae",
                                            cn: "上龙科 [灭绝]",
                                            time: 170,
                                            dead: true,
                                            time_range: "约 170-90 Ma",
                                            description: "上龙类是短颈、巨头、咬合力极强的海洋巨兽，代表蛇颈龙类在大型掠食者方向上的极端成功。",
                                            en_description: "Pliosaurs were short-necked, huge-headed marine superpredators representing one major plesiosaur extreme."
                                        },
                                        {
                                            name: "Elasmosauridae",
                                            cn: "薄板龙科 [灭绝]",
                                            time: 160,
                                            dead: true,
                                            time_range: "约 160-66 Ma",
                                            description: "这支长颈蛇颈龙把颈椎数量推进到极端水平，是中生代海洋中最具辨识度的形态之一。",
                                            en_description: "Elasmosaurids pushed neck elongation to an extreme and became one of the most recognizable marine reptile body plans."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Sauria",
            cn: "蜥龙类",
            time: 275,
            time_range: "约 275 Ma 起",
            description: "蜥龙类主干最终分化出今天仍然存活的鳞龙类与龟鳖-主龙类，也孕育出中生代最强势的一批陆生与海生脊椎动物。彩蛋的重点，是让观者在幸存主线旁边同时看到那些已经消失的辉煌旁支。",
            en_description: "The saurian backbone eventually produced the surviving lepidosaur and archelosaur lines, as well as some of the most dominant terrestrial and marine vertebrate radiations of the Mesozoic.",
            children: [
                {
                    name: "Lepidosauria",
                    cn: "鳞龙类（幸存主线）",
                    time: 242,
                    survivor: true,
                    time_range: "约 242 Ma 起并延续至今",
                    description: "现生鳞龙类包括喙头类与有鳞类，是今天爬行动物多样性的主要来源之一。但把时间拉回中生代，就会发现它并不只是现代蛇蜥的集合，而是一条拥有广阔深时背景的幸存主线。",
                    en_description: "Living Lepidosauria includes rhynchocephalians and squamates; in deep time it was part of a much broader saurian radiation.",
                    children: [
                        {
                            name: "Rhynchocephalia",
                            cn: "喙头目（幸存孑遗）",
                            time: 238,
                            survivor: true,
                            time_range: "三叠纪起源，现仅残存极少数后裔",
                            description: "今天喙头目只剩下新西兰喙头蜥一支，但在中生代它们曾广泛分化。这里把幸存端点停在目级，是为了对应现生树里的喙头目节点，而不是再收束到最后的单一现生科。",
                            en_description: "Rhynchocephalia survives today only as the tuatara line, but it was once far more diverse. The survivor path stops at the order-level node to match the living tree."
                            ,
                            children: [
                                {
                                    name: "Clevosauridae",
                                    cn: "裂齿喙头蜥科 [灭绝]",
                                    time: 215,
                                    dead: true,
                                    time_range: "约 215-183 Ma",
                                    description: "裂齿喙头蜥类是三叠纪到侏罗纪早期常见的一支喙头类，说明这条谱系曾经并不稀少，也绝非今天这种孤零零的残存状态。",
                                    en_description: "Clevosaurs were common Triassic and Early Jurassic rhynchocephalians, showing that the lineage was once widespread rather than relictual."
                                },
                                {
                                    name: "Pleurosauridae",
                                    cn: "侧游蜥科 [灭绝]",
                                    time: 165,
                                    dead: true,
                                    time_range: "约 165-145 Ma",
                                    description: "侧游蜥类是高度水生化的喙头类成员，身体细长、四肢缩短，说明喙头目并不只尝试过陆生小型猎食者这一种生态路线。",
                                    en_description: "Pleurosaurs were highly aquatic rhynchocephalians with elongated bodies and reduced limbs, showing that the order explored far more than one terrestrial niche."
                                },
                                {
                                    name: "Opisthodontia",
                                    cn: "后齿喙头类 [灭绝]",
                                    time: 175,
                                    dead: true,
                                    time_range: "约 175-66 Ma",
                                    description: "后齿喙头类在咬合方式和头骨构型上都有进一步特化，代表喙头类中后期仍在持续探索多样生态位。",
                                    en_description: "Opisthodontian rhynchocephalians evolved further cranial and dental specializations, showing continued ecological experimentation."
                                }
                            ]
                        },
                        {
                            name: "Squamata",
                            cn: "有鳞目（幸存主线）",
                            time: 213,
                            survivor: true,
                            time_range: "约 213 Ma 起并延续至今",
                            description: "有鳞目是现生蜥形纲中最成功的幸存主线之一，今天以蜥蜴、蛇与蚓蜥的巨大多样性占据许多生态位。它在彩蛋里对应的是现代大辐射本身，而不是任何单一末端科。",
                            en_description: "Squamata is one of the most successful surviving sauropsid radiations, and here it represents the modern radiation itself rather than any terminal family.",
                            children: [
                                {
                                    name: "Dolichosauridae",
                                    cn: "长蛇蜥科 [灭绝]",
                                    time: 100,
                                    dead: true,
                                    time_range: "约 100-66 Ma",
                                    description: "长蛇蜥类展示了海生有鳞类向细长躯干与水生推进方式转变的早期阶段，常被视作沧龙线的一部分背景。",
                                    en_description: "Dolichosaurs show an early stage in the shift toward elongated, aquatic squamate body plans and are often discussed near the mosasaur line."
                                },
                                {
                                    name: "Mosasauroidea",
                                    cn: "沧龙总科 [灭绝]",
                                    time: 98,
                                    dead: true,
                                    time_range: "约 98-66 Ma",
                                    description: "沧龙类是白垩纪晚期最成功的海生有鳞类之一，从近岸到远洋都出现了大型掠食成员。它们提醒我们：有鳞目的历史并不只属于今天的陆地蜥蜴和蛇。",
                                    en_description: "Mosasaurs were one of the most successful marine squamate radiations of the Late Cretaceous, showing that squamates once held top predator roles at sea."
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Archelosauria",
                    cn: "龟鳖-主龙支（幸存主线）",
                    time: 255,
                    survivor: true,
                    time_range: "约 255 Ma 起并延续至今",
                    description: "龟鳖-主龙支保存了两种今天仍极具辨识度的古老身体蓝图：龟鳖类的甲壳系统，以及主龙类在姿态、呼吸和头骨结构上的深度改造。它也是翼龙、恐龙、鳄类和鸟类这些强势支系诞生的舞台。",
                    en_description: "Archelosauria preserves two deeply distinctive living body plans, turtles and archosaurs, and forms the stage from which pterosaurs, dinosaurs, crocodilians, and birds emerged.",
                    children: [
                        {
                            name: "Testudines",
                            cn: "龟鳖目（幸存孑遗）",
                            time: 220,
                            survivor: true,
                            time_range: "约 220 Ma 起并延续至今",
                            description: "龟鳖目看起来像古老而稳定的幸存支，但它背后同样有复杂的海洋和陆地扩张史。这里把幸存端点停在目级，用来对应现生树中的龟鳖目主节点。",
                            en_description: "Testudines may look conservative today, but they sit atop a long history of marine and terrestrial expansions. The survivor path therefore stops at the order-level turtle node."
                            ,
                            children: [
                                {
                                    name: "Meiolaniidae",
                                    cn: "角龟科 [灭绝]",
                                    time: 70,
                                    dead: true,
                                    time_range: "约 70-2 Ma",
                                    description: "角龟类是岛屿和南半球地区著名的巨型龟鳖支系，头部与尾部都拥有夸张装饰结构，说明龟鳖类并不只是“低调保守”的形象。",
                                    en_description: "Meiolaniids were striking horned turtles with exaggerated cranial and tail structures, showing that turtle evolution was not always conservative."
                                },
                                {
                                    name: "Protostegidae",
                                    cn: "原海龟科 [灭绝]",
                                    time: 100,
                                    dead: true,
                                    time_range: "约 100-66 Ma",
                                    description: "原海龟类中曾出现过体型极其巨大的成员，显示龟鳖类在中生代海洋中也占据过远比今天更壮阔的空间。",
                                    en_description: "Protostegids included gigantic marine turtles, showing that turtles once occupied a much grander range of marine roles than modern forms suggest."
                                }
                            ]
                        },
                        {
                            name: "Archosauria",
                            cn: "主龙类（幸存主线）",
                            time: 250,
                            survivor: true,
                            time_range: "约 250 Ma 起",
                            description: "主龙类是中生代最具统治力的脊椎动物总群之一，最终孕育出翼龙、恐龙、鳄类与鸟类。若要理解蜥形纲过去有多繁盛，主龙类几乎就是整场叙事的中心。",
                            en_description: "Archosaurs were among the most dominant vertebrate radiations of the Mesozoic, ultimately giving rise to pterosaurs, dinosaurs, crocodilians, and birds.",
                            children: [
                                {
                                    name: "Pseudosuchia",
                                    cn: "伪鳄类",
                                    time: 245,
                                    time_range: "约 245 Ma 起",
                                    description: "伪鳄类通向鳄形类，是主龙类较早分化出的重要一支。三叠纪时期它们曾经十分多样，远不只是今天鳄鱼那种半水栖伏击者形象。",
                                    en_description: "Pseudosuchians form the crocodilian side of archosaurs and were far more diverse in the Triassic than modern crocodilians alone would suggest.",
                                    children: [
                                        {
                                            name: "Rauisuchia",
                                            cn: "劳氏鳄类 [灭绝]",
                                            time: 240,
                                            dead: true,
                                            time_range: "约 240-201 Ma",
                                            description: "劳氏鳄类是三叠纪陆地上的大型掠食主龙类之一，说明通向鳄类的主线在早期也曾占据过大型陆地猎食者位置。",
                                            en_description: "Rauisuchians were large terrestrial archosaur predators of the Triassic, showing that the crocodilian side of archosaurs once held dominant land-predator roles."
                                        },
                                        {
                                            name: "Crocodylomorpha",
                                            cn: "鳄形类",
                                            time: 235,
                                            time_range: "约 235 Ma 起",
                                            description: "鳄形类并不只意味着现代鳄目。这个谱系在中生代曾扩张出陆栖奔跑者、海生成员与多种奇异头骨形态，今天的鳄类只是其幸存端点。",
                                            en_description: "Crocodylomorphs were far more diverse than modern crocodilians, once including terrestrial runners, marine forms, and many unusual skull types.",
                                            children: [
                                                {
                                                    name: "Thalattosuchia",
                                                    cn: "海鳄类 [灭绝]",
                                                    time: 190,
                                                    dead: true,
                                                    time_range: "约 190-140 Ma",
                                                    description: "海鳄类是进入海洋的鳄形类实验之一，部分成员四肢和尾部都向高效水生推进适应，说明鳄形类也曾反复进军海洋。",
                                                    en_description: "Thalattosuchians represent one marine experiment among crocodile-line archosaurs, with strong aquatic adaptations in limbs and tail."
                                                },
                                                {
                                                    name: "Mesoeucrocodylia",
                                                    cn: "中真鳄类",
                                                    time: 170,
                                                    time_range: "约 170 Ma 起",
                                                    description: "中真鳄类汇集了更接近现代鳄类的一批中后期鳄形类，但其中也分化出了与现生鳄目并不相连的已灭绝侧支。",
                                                    en_description: "Mesoeucrocodylians gather later crocodile-line forms closer to living crocodilians, while still including extinct side branches not leading to crown Crocodylia.",
                                                    children: [
                                                        {
                                                            name: "Notosuchia",
                                                            cn: "异鳄类 [灭绝]",
                                                            time: 120,
                                                            dead: true,
                                                            time_range: "约 120-66 Ma",
                                                            description: "异鳄类在冈瓦纳大陆高度多样化，其中一些成员甚至具有类似哺乳动物的齿列分工与陆生杂食、植食适应，远超公众对“鳄鱼祖先”的常规想象。",
                                                            en_description: "Notosuchians radiated strongly in Gondwana, with some forms showing mammal-like tooth differentiation and unusual terrestrial diets."
                                                        },
                                                        {
                                                            name: "Neosuchia",
                                                            cn: "新鳄类",
                                                            time: 170,
                                                            time_range: "约 170 Ma 起",
                                                            description: "新鳄类更接近现生鳄类常见的头骨和身体构型，是延伸到真鳄类与鳄目的主干。",
                                                            en_description: "Neosuchians more closely approach the familiar skull and body plan of living crocodilians and form the trunk leading to Eusuchia and Crocodylia.",
                                                            children: [
                                                                {
                                                                    name: "Goniopholididae",
                                                                    cn: "鳄鱼鳄科 [灭绝]",
                                                                    time: 145,
                                                                    dead: true,
                                                                    time_range: "约 145-66 Ma",
                                                                    description: "鳄鱼鳄类是中生代常见的一支半水栖新鳄类，说明接近现代鳄类的身体方案在鳄目冠群出现前已相当成功。",
                                                                    en_description: "Goniopholidids were widespread semi-aquatic neosuchians, showing that near-modern crocodilian body plans were already successful before crown Crocodylia."
                                                                },
                                                                {
                                                                    name: "Eusuchia",
                                                                    cn: "真鳄类",
                                                                    time: 145,
                                                                    time_range: "约 145 Ma 起",
                                                                    description: "真鳄类汇集了更接近现代鳄类体制的成员，是现生鳄目诞生前的重要中间层。",
                                                                    en_description: "Eusuchians gather the more modern crocodile-bodied forms and provide the immediate backdrop to living crocodilians.",
                                                                    children: [
                                                                        {
                                                                            name: "Crocodylia",
                                                                            cn: "鳄目（幸存孑遗）",
                                                                            time: 94,
                                                                            survivor: true,
                                                                            time_range: "白垩纪冠群起源至今",
                                                                            description: "现生鳄目是主龙类另一条幸存主线，看起来像古老样式的保守残存者，但它们背后其实站着一整段被大幅收缩的鳄形类宏大历史。这里同样停在目级，而不是继续收束到现生科。",
                                                                            en_description: "Living Crocodylia is another surviving archosaur line. The path stops at the order-level node instead of collapsing further into modern families."
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Avemetatarsalia",
                                    cn: "鸟颈类",
                                    time: 245,
                                    time_range: "约 245 Ma 起",
                                    description: "鸟颈类通向翼龙与恐龙，是主龙类中最终主导中生代陆空生态位的一边。它们不仅重塑了天空，也重塑了陆地大型动物格局。",
                                    en_description: "Avemetatarsalians form the bird-line side of archosaurs, eventually dominating both aerial and many terrestrial ecosystems of the Mesozoic.",
                                    children: [
                                        {
                                            name: "Ornithodira",
                                            cn: "鸟主龙类",
                                            time: 240,
                                            time_range: "约 240 Ma 起",
                                            description: "鸟主龙类包含翼龙与恐龙两大主线，是理解主龙类中“飞向天空”和“统治陆地”两种成功路线的关键节点。",
                                            en_description: "Ornithodira includes pterosaurs and dinosaurs, marking the split between two of the most successful archosaur experiments.",
                                            children: [
                                                {
                                                    name: "Pterosauria",
                                                    cn: "翼龙类 [灭绝]",
                                                    time: 228,
                                                    dead: true,
                                                    time_range: "约 228-66 Ma",
                                                    description: "翼龙类是第一批真正实现主动飞行的脊椎动物，翅膀由极度延长的第四指支撑，生态位从海岸拾食者到大型滑翔猎手都曾占据。它们与鸟类并行存在了漫长时代，却在白垩纪末彻底消失。",
                                                    en_description: "Pterosaurs were the first vertebrates to achieve powered flight, using wings supported by a massively elongated fourth finger."
                                                },
                                                {
                                                    name: "Dinosauria",
                                                    cn: "恐龙类",
                                                    time: 233,
                                                    time_range: "约 233 Ma 起",
                                                    description: "恐龙类并不是单一体型或生活方式的代名词，而是一个横跨小型灵活猎食者、巨型植食者与高机动性奔跑者的庞大主干。现代鸟类并非“恐龙之后”的生物，而是恐龙之内仍然存活的一支。",
                                                    en_description: "Dinosaurs were not a single body plan or lifestyle but a huge radiation ranging from small agile predators to giant herbivores. Modern birds remain inside Dinosauria.",
                                                    children: [
                                                        {
                                                            name: "Ornithischia",
                                                            cn: "鸟臀类 [灭绝]",
                                                            time: 228,
                                                            dead: true,
                                                            time_range: "约 228-66 Ma",
                                                            description: "鸟臀类包括甲龙、角龙和鸭嘴龙等多类群体，是中生代陆地大型植食动物最重要的组成之一。",
                                                            en_description: "Ornithischians included ankylosaurs, ceratopsians, and hadrosaurs, forming one of the most successful herbivorous dinosaur radiations."
                                                        },
                                                        {
                                                            name: "Sauropodomorpha",
                                                            cn: "蜥脚形类 [灭绝]",
                                                            time: 225,
                                                            dead: true,
                                                            time_range: "约 225-66 Ma",
                                                            description: "蜥脚形类包含地球历史上一些最庞大的陆生动物。长颈、巨体和高效取食系统让它们长期主导中生代许多陆地生态系统。",
                                                            en_description: "Sauropodomorphs included some of the largest land animals in Earth history, dominating many Mesozoic terrestrial ecosystems."
                                                        },
                                                        {
                                                            name: "Theropoda",
                                                            cn: "兽脚类",
                                                            time: 231,
                                                            time_range: "约 231 Ma 起",
                                                            description: "兽脚类是通向鸟类的恐龙主线，同时也包含霸王龙等最著名的大型捕食性恐龙。彩蛋把它放在鸟类之前，是为了让观者看到“现生鸟类”其实站在一条完整恐龙谱系的末端。",
                                                            en_description: "Theropods form the dinosaur lineage leading to birds while also including famous large predators such as tyrannosaurs.",
                                                            children: [
                                                                {
                                                                    name: "Dromaeosauridae",
                                                                    cn: "驰龙科 [灭绝]",
                                                                    time: 167,
                                                                    dead: true,
                                                                    time_range: "约 167-66 Ma",
                                                                    description: "驰龙类与鸟类关系很近，羽毛和前肢特化十分明显。它们让人更直观地看到鸟类并不是突然出现的，而是在兽脚类内部逐步成形。",
                                                                    en_description: "Dromaeosaurids were close relatives of birds, with clear feathers and forelimb specializations that make the dinosaur-bird transition more visible."
                                                                },
                                                                {
                                                                    name: "Avialae",
                                                                    cn: "鸟翼类",
                                                                    time: 160,
                                                                    time_range: "约 160 Ma 起",
                                                                    description: "鸟翼类是向现代鸟类逼近的兽脚类主干，既包含更接近飞行能力起源的早期成员，也包含最终通向现代鸟类冠群的谱系。",
                                                                    en_description: "Avialae is the bird-line theropod branch approaching the origin of flight and leading toward crown birds.",
                                                                    children: [
                                                                        {
                                                                            name: "Archaeopterygidae",
                                                                            cn: "始祖鸟科 [灭绝]",
                                                                            time: 150,
                                                                            dead: true,
                                                                            time_range: "约 150-145 Ma",
                                                                            description: "始祖鸟类保留了许多过渡式特征，是最经典的“带着恐龙影子的早期鸟翼类”之一。",
                                                                            en_description: "Archaeopterygids retained many transitional features and remain one of the most iconic early bird-line dinosaurs."
                                                                        },
                                                                        {
                                                                            name: "Enantiornithes",
                                                                            cn: "反鸟类 [灭绝]",
                                                                            time: 130,
                                                                            dead: true,
                                                                            time_range: "约 130-66 Ma",
                                                                            description: "反鸟类在白垩纪一度极其繁盛，占据了许多树栖、空栖与近地面生态位，但最终没有跨过白垩纪末的灭绝事件。",
                                                                            en_description: "Enantiornithines were once a highly successful Cretaceous bird radiation, yet failed to survive the end-Cretaceous extinction."
                                                                        },
                                                                        {
                                                                            name: "Euornithes",
                                                                            cn: "今鸟形类",
                                                                            time: 125,
                                                                            time_range: "约 125 Ma 起",
                                                                            description: "今鸟形类是更接近现代鸟类身体构造和飞行方式的主线，最终把恐龙的故事延续到了今天。",
                                                                            en_description: "Euornithines form the line more closely approaching the body plan and flight style of modern birds.",
                                                                            children: [
                                                                                {
                                                                                    name: "Hesperornithes",
                                                                                    cn: "黄昏鸟类 [灭绝]",
                                                                                    time: 100,
                                                                                    dead: true,
                                                                                    time_range: "约 100-66 Ma",
                                                                                    description: "黄昏鸟类是不会飞但擅长潜水的海生今鸟形类，说明接近现代鸟类的谱系在白垩纪也已探索出很宽的生态范围。",
                                                                                    en_description: "Hesperornithines were flightless diving marine birds, showing that near-modern bird lineages had already explored broad ecological space."
                                                                                },
                                                                                {
                                                                                    name: "Aves",
                                                                                    cn: "鸟纲（现存恐龙）",
                                                                                    time: 100,
                                                                                    survivor: true,
                                                                                    time_range: "白垩纪冠群起源至今",
                                                                                    description: "在这层彩蛋视图里，鸟纲不是单纯的现代类群，而是恐龙故事仍在继续书写的现存章节。这里把幸存端点停在鸟纲，用来和现生树中的鸟纲节点严格对应。",
                                                                                    en_description: "Here Aves is not merely a modern group but the living continuation of the dinosaur story. The survivor path stops at the class-level bird node to match the living tree."
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

if (typeof window !== 'undefined') {
    window.EASTER_EGG_DATA = EASTER_EGG_DATA;
}
