/* =========================================================================
   虎卫五 · 站点内容配置
   -------------------------------------------------------------------------
   这个文件是整站的「文案 + 链接」总入口，改这里即可，不用动 index.html。

   1) 改文案      → 修改下面 COPY 里 zh / en / ja 对应的句子
   2) 填下载链接  → 修改 SITE.download.quark，粘贴夸克网盘分享链接即可
   3) 放游戏截图  → 往 SITE.screenshots 数组里加条目（见示例注释）
   4) 放 LOGO     → 修改 SITE.logo，填入图片路径
   -------------------------------------------------------------------------
   注意：文案里若要用引号，请保持 JSON 风格的英文引号；中文引号可直接写。
   ========================================================================= */

window.SITE = {
  /* 夸克网盘链接：留空 = 页面上显示「链接即将开放」且按钮不可跳转
     填好后会自动变为可点击。例：'https://pan.quark.cn/s/xxxxxxxx' */
  download: {
    quark: ''
  },

  /* 游戏截图（玩法模块）。
     留空数组 [] 时显示 4 个占位框；有内容时按顺序横向排列，图片自动懒加载。
     条目格式：
     {
       src: 'assets/img/shot-01.webp',       // 图片路径，建议 16:9
       alt: '中央大厅，控制台前的对峙',        // 无障碍描述
       caption: { zh: '中央大厅', en: 'Central hall', ja: '中央ホール' }
       // caption 也可以直接写一个字符串，三种语言共用
     }
  */
  screenshots: [],

  /* LOGO 图片路径：留空 = 显示占位框。例：'assets/img/logo.svg' */
  logo: ''
};

/* =========================================================================
   三语文案
   ========================================================================= */

window.COPY = {

  zh: {
    meta: {
      title: '虎卫五 · 官方站点',
      desc: '虎星战争爆发，你驻扎在虎卫五「坟墓」监测站——虎星封锁网的第 76 号节点。你在一次外出执行任务时，意外发生了……科幻视觉小说《虎卫五》序章 Demo。'
    },
    brand: '虎卫五',
    brandSub: 'TIGRIS PLANETA V',
    bgm: '背景音乐',
    nav: { home: '首页', world: '世界观', excerpt: '节选', gameplay: '玩法', download: '下载' },

    hero: {
      eyebrow: '第 87 号星际探索舰队 · 76 号节点',
      title: '虎卫五',
      sub: 'TIGRIS PLANETA V',
      prologue: '序章 · 太空奇遇',
      tagline: '虎星战争爆发，你驻扎在虎卫五「坟墓」监测站——虎星封锁网的第 76 号节点。你在一次外出执行任务时，意外发生了……',
      cta1: '下载 Demo',
      cta2: '了解世界观'
    },

    world: {
      kicker: '世界观',
      title: '两个文明，一场战争',
      lead: '两年前，人类第 87 号远征队抵达虎星。双方数次交涉未果，摩擦持续升级，同年冬，虎帝国向人类宣战。',
      a: {
        name: '虎帝国',
        tag: '守方 · 主场 · 补给充足',
        line: '完整生物圈与星际工业，但无力夺回轨道。'
      },
      b: {
        name: '人类远征队',
        tag: '攻方 · 远征 · 科技略高',
        line: '掌握轨道与航道，但无力登陆母星。'
      },
      stat: '虎卫五 · 直径 25.2 公里 · 站内代号「坟墓」'
    },

    excerpt: {
      label: '剧情节选',
      quote: '这颗卫星没有大气。没有风，没有声音，这里只有遍地的岩石和天空中那脆绿色的虎星。',
      cite: '序章 · 第一幕《异常信号》'
    },

    gameplay: {
      kicker: '玩法',
      title: '玩法与画面',
      lead: '视觉小说为骨架，解谜与战斗为关节。以下为开发中画面。',
      hint: '左右拖动浏览',
      empty: '截图待接入',
      shot: '画面'
    },

    download: {
      kicker: '下载',
      title: '下载序章 Demo',
      desc: '当前为开发中版本，包含序章三幕与战斗模块。正式内容以最终发布为准。',
      cta: '夸克网盘',
      pending: '链接即将开放',
      toast: '下载链接即将开放，请稍后再来。',
      meta: 'v0.1 Demo · Windows · 免费试玩',
      note: '下载链接由制作组手动更新，若无法打开请稍后再试。',
      credits: '制作'
    },

    legal: {
      notice: '声明',
      noticeTitle: '开发声明',
      n1: '本游戏使用 Godot Engine（MIT License）开发。',
      n2: '游戏玩法、流程逻辑由作者设计，GDScript 脚本由 AI 辅助生成，经作者人工修改、调试。',
      n3: '关键 CG 为作者手绘原创；次要场景背景为 AI 辅助生成。',
      copy: '版权声明',
      copyTitle: '版权声明',
      c1: '角色、剧本、手绘美术著作权归作者本人所有。',
      c2: '允许个人非盈利二创，禁止未经许可私自开团、售卖、摊费回本、任何形式商用。',
      c3: '若需要小规模二创开团、商用授权，请私信作者单独申请。'
    },

    warning: {
      label: 'CONTENT WARNING',
      title: '内容预警',
      t1: '本作品为架空科幻故事，包含星际战争、文明冲突、大屠杀、文明覆灭相关沉重悲剧叙事，剧情基调压抑，部分情节容易带来心理冲击。',
      t2: '所有文明、势力、事件完全虚构，和现实世界、历史、国家无关，不代表现实立场。',
      t3: '本作无专门感情线，主要人物中包含女性，角色设定包含多元性取向：部分 NPC 为异性恋；作品不含低俗、不雅内容，请根据自身喜好选择体验。',
      t4: '建议 16 周岁以上体验；未成年人请监护人充分评估后陪同体验，心理承受能力弱、容易 PTSD 的人群谨慎游玩。',
      accept: '我已了解，继续'
    },

    foot: { copy: '© 2026 虎卫五', age: '16+' }
  },

  en: {
    meta: {
      title: 'Tigris Planeta V · Official Site',
      desc: 'War has broken out at the Tiger Star. You are stationed at the Grave listening post on Tigris Planeta V — Node 076 of the blockade network. On a mission outside, something goes wrong. A sci-fi visual novel.'
    },
    brand: 'Tigris Planeta V',
    brandSub: '虎卫五',
    bgm: 'Background music',
    nav: { home: 'Home', world: 'World', excerpt: 'Excerpt', gameplay: 'Gameplay', download: 'Download' },

    hero: {
      eyebrow: '87th Deep Space Expeditionary Fleet · Node 076',
      title: 'Tigris Planeta V',
      sub: '虎卫五',
      prologue: 'Prologue · An Encounter in Deep Space',
      tagline: 'War has broken out at the Tiger Star. You are stationed at the Grave listening post on Tigris Planeta V — Node 076 of the Tiger Star blockade network. On a mission outside, something goes wrong…',
      cta1: 'Download Demo',
      cta2: 'Enter the World'
    },

    world: {
      kicker: 'World',
      title: 'Two civilisations, one war',
      lead: 'Two years ago, the 87th Human Expeditionary Fleet reached the Tiger Star. Several rounds of talks came to nothing, friction kept escalating, and that winter the Tiger Empire declared war on humanity.',
      a: {
        name: 'Tiger Empire',
        tag: 'Defender · Home ground · Supplied',
        line: 'A full biosphere and orbital industry, but no way to retake orbit.'
      },
      b: {
        name: 'Human Expedition',
        tag: 'Attacker · Far from home · Tech lead',
        line: 'Orbit and shipping lanes secured, but no way to land on the homeworld.'
      },
      stat: 'Tigris Planeta V · 25.2 km across · Station codename “Grave”'
    },

    excerpt: {
      label: 'Excerpt',
      quote: 'This moon has no atmosphere. No wind, no sound. Only rock in every direction, and that crisp green tiger star hanging in the sky.',
      cite: 'Prologue · Act I, “Anomalous Signal”'
    },

    gameplay: {
      kicker: 'Gameplay',
      title: 'Gameplay & Visuals',
      lead: 'A visual novel at the core, puzzles and combat at the joints. All footage below is work in progress.',
      hint: 'Drag to browse',
      empty: 'Screenshot pending',
      shot: 'Shot'
    },

    download: {
      kicker: 'Download',
      title: 'Download the Prologue Demo',
      desc: 'A work-in-progress build containing the three prologue acts and the combat module. Final content may change.',
      cta: 'Quark Drive',
      pending: 'Link coming soon',
      toast: 'The download link is not open yet. Please check back later.',
      meta: 'v0.1 Demo · Windows · Free',
      note: 'The link is updated manually by the team. If it does not open, please try again later.',
      credits: 'Credits'
    },

    legal: {
      notice: 'Notice',
      noticeTitle: 'Development Notice',
      n1: 'This game is developed with Godot Engine (MIT License).',
      n2: 'Gameplay and flow logic are designed by the author. GDScript was generated with AI assistance, then manually revised and debugged by the author.',
      n3: 'Key CG illustrations are hand-drawn originals by the author; secondary background scenes are AI-assisted.',
      copy: 'Copyright',
      copyTitle: 'Copyright Notice',
      c1: 'Copyright in the characters, script and hand-drawn artwork belongs to the author.',
      c2: 'Personal, non-commercial fan works are permitted. Unauthorised group orders, sales, cost-recovery pooling or any form of commercial use are prohibited.',
      c3: 'For small-scale fan group orders or commercial licensing, please contact the author directly.'
    },

    warning: {
      label: 'CONTENT WARNING',
      title: 'Content Warning',
      t1: 'This is a fictional sci-fi story. It deals with interstellar war, conflict between civilisations, massacre and the fall of civilisations, and its tone is heavy. Some scenes may be distressing.',
      t2: 'All civilisations, factions and events are entirely fictional. They bear no relation to the real world, its history or any nation, and do not represent any real-world position.',
      t3: 'This work has no dedicated romance route. The main cast includes women, and characters have diverse sexual orientations; some NPCs are heterosexual. It contains no obscene or indecent content. Please decide for yourself whether to play.',
      t4: 'Recommended for ages 16 and over. Minors should play only after a guardian has fully assessed the work and with the guardian present. Those with low psychological resilience or a tendency toward PTSD are advised to proceed with caution.',
      accept: 'I understand, continue'
    },

    foot: { copy: '© 2026 Tigris Planeta V', age: '16+' }
  },

  ja: {
    meta: {
      title: '虎衛伍 · 公式サイト',
      desc: '虎星戦争が勃発。あなたは虎衛伍「墓」監視ステーション——虎星封鎖網の第76ノードに駐在している。ある外出任務の最中、予期せぬ事故が起きた……SFビジュアルノベル『虎衛伍』序章体験版。'
    },
    brand: '虎衛伍',
    brandSub: 'TIGRIS PLANETA V',
    bgm: 'BGM',
    nav: { home: 'ホーム', world: '世界観', excerpt: '抜粋', gameplay: 'システム', download: 'ダウンロード' },

    hero: {
      eyebrow: '第87星际探査艦隊 · 第76ノード',
      title: '虎衛伍',
      sub: 'TIGRIS PLANETA V',
      prologue: '序章・宇宙の邂逅',
      tagline: '虎星戦争が勃発。あなたは虎衛伍「墓」監視ステーション——虎星封鎖網の第76ノードに駐在している。ある外出任務の最中、予期せぬ事故が起きた……',
      cta1: '体験版をダウンロード',
      cta2: '世界観を見る'
    },

    world: {
      kicker: '世界観',
      title: '二つの文明、一つの戦争',
      lead: '二年前、人類第 87 遠征隊が虎星に到達した。数度の交渉はまとまらず、摩擦は激化し続け、同年の冬、虎帝国は人類に宣戦布告した。',
      a: {
        name: '虎帝国',
        tag: '守勢 · 母星 · 補給十分',
        line: '完全な生物圏と宇宙産業を持つが、軌道は奪還できない。'
      },
      b: {
        name: '人類遠征隊',
        tag: '攻勢 · 遠征 · 技術はわずかに上',
        line: '軌道と航路を掌握するが、母星には上陸できない。'
      },
      stat: '虎衛伍 · 直径25.2キロ · 基地コードネーム「墓」'
    },

    excerpt: {
      label: '抜粋',
      quote: 'この衛星には大気がない。風も、音もない。あるのは岩ばかりの大地と、空に浮かぶ冴えた緑の虎星だけだ。',
      cite: '序章・第一幕「異常信号」'
    },

    gameplay: {
      kicker: 'ゲームシステム',
      title: 'システムと画面',
      lead: '骨格はビジュアルノベル、関節はパズルと戦闘。以下の画面はすべて開発中のもの。',
      hint: 'ドラッグで閲覧',
      empty: '画面準備中',
      shot: '画面'
    },

    download: {
      kicker: 'ダウンロード',
      title: '序章体験版をダウンロード',
      desc: '開発中のバージョンです。序章三幕と戦闘パートを収録しています。内容は最終版で変更される場合があります。',
      cta: 'Quarkドライブ',
      pending: 'リンク公開準備中',
      toast: 'ダウンロードリンクは公開準備中です。しばらくしてからお試しください。',
      meta: 'v0.1 Demo · Windows · 無料',
      note: 'リンクは制作チームが手動で更新しています。開けない場合はしばらくしてからお試しください。',
      credits: 'クレジット'
    },

    legal: {
      notice: '表記',
      noticeTitle: '開発について',
      n1: '本作は Godot Engine（MIT License）で開発されています。',
      n2: 'ゲームプレイと進行ロジックは作者が設計し、GDScript は AI の支援を受けて生成したうえで、作者が手作業で修正・デバッグしています。',
      n3: '主要な CG は作者による手描きのオリジナル、副次的な背景は AI 支援によるものです。',
      copy: '著作権',
      copyTitle: '著作権について',
      c1: 'キャラクター、シナリオ、手描き美術の著作権は作者本人に帰属します。',
      c2: '個人による非営利の二次創作は許可されます。無断での共同購入（開団）、販売、費用回収、あらゆる形態の商用利用は禁止します。',
      c3: '小規模な二次創作の共同購入や商用ライセンスについては、作者に直接ご相談ください。'
    },

    warning: {
      label: 'CONTENT WARNING',
      title: 'コンテンツ警告',
      t1: '本作は架空の SF 物語です。星間戦争、文明の衝突、大虐殺、文明の滅亡といった重い悲劇を扱い、作風は陰鬱です。一部の描写は心理的な負担となる可能性があります。',
      t2: '作中に登場する文明・勢力・出来事はすべて架空のもので、現実世界・歴史・国家とは一切関係なく、現実の立場を代表するものではありません。',
      t3: '本作に専用の恋愛ルートはありません。主要人物には女性が含まれ、登場人物の性的指向は多様です（一部の NPC は異性愛者です）。低俗・卑猥な内容は含みません。ご自身の判断で体験してください。',
      t4: '16 歳以上でのプレイを推奨します。未成年者は保護者が十分に評価したうえで同伴してください。精神的に負担を感じやすい方、PTSD の傾向がある方は慎重にご判断ください。',
      accept: '理解して続ける'
    },

    foot: { copy: '© 2026 虎衛伍', age: '16+' }
  }
};
