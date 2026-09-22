import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // -------------------------------------------------------------
  // 第 1 模組：CSS 基礎與語法引入
  // -------------------------------------------------------------
  {
    id: 'css-syntax-basics',
    title: 'CSS 語法結構與三種引用方式',
    subtitle: 'HTML 是人體骨架，CSS 是時尚服裝造型師',
    category: 'basics',
    categoryName: '第 1 模組：CSS 基礎概念',
    difficulty: '入門',
    concept: {
      summary: 'CSS 負責網頁的顏值。透過「選擇器 { 屬性: 屬性值; }」的經典公式，精準為 HTML 骨架穿上漂亮的衣服。',
      metaphor: {
        icon: '👗',
        title: '芭比娃娃換裝秀 (HTML vs CSS)',
        story: '如果把 HTML 當成素顏未化妝的人體骨架，CSS 就是造型師的化妝箱與衣帽間。你可以把衣服「直接穿在身上 (Inline 行內)」、也可以在「出門前照鏡子貼標籤 (Internal 內部)」，而競賽最推崇的是「擁有獨立專屬更衣室 (External 外部 .css 檔)」，既乾淨又便於複用。'
      },
      keyPoints: [
        '選擇器 (Selector)：決定要改造網頁上的哪一個元素。',
        '屬性與值 (Property & Value)：以冒號區隔，結尾務必加上分號 ;',
        '最佳實務：競賽請一律使用 <link rel="stylesheet"> 外部樣式表，保持乾淨分離。'
      ],
      badVsGood: {
        badCode: '<h1 style="color:red;font-size:20px;">新手寫法</h1>',
        badReason: '使用行內 style 樣式會將內容與樣式混死，難以維護且權重過高無法覆蓋。',
        goodCode: '/* 乾淨優雅的外部 CSS */\n.hero-title {\n  color: #38bdf8;\n  font-size: 24px;\n}',
        goodReason: '樣式抽離成 Class，隨時能在全站複用，是技能競賽高分基準。'
      },
      mnemonic: '選擇器在門口點名，大括號是更衣室，屬性冒號值分號，外部引入最可靠！',
      syntaxTable: [
        { property: 'color', values: '#hex / rgb() / 英文', explanation: '設定文字前景色彩' },
        { property: 'background-color', values: '#hex / transparent', explanation: '設定元素的背景底色' },
        { property: 'text-align', values: 'left | center | right', explanation: '控制文字水平對齊方式' }
      ],
      championTip: '金手獎選手切忌在 HTML 標籤寫死 style=""！考官在檢視原始碼結構分時，這會被判定為「結構與外觀未分離」而嚴重扣分。',
      commonPitfalls: [
        '初學者最常忘記在每條 CSS 規則結尾補上「分號 (;)」，導致下一行整條失效！',
        '標點符號打成全形中文分號（；）或全形冒號（：）。'
      ],
      quickToggles: [
        {
          label: '🌟 璀璨藍夜風格',
          overrideCss: '.demo-box { background: #0f172a; color: #38bdf8; text-align: center; border-radius: 12px; padding: 24px; }',
          desc: '採用現代科技藍黑底色'
        },
        {
          label: '🔥 金手奪冠金橘',
          overrideCss: '.demo-box { background: #78350f; color: #fde047; text-align: center; border-radius: 12px; padding: 24px; font-weight: bold; }',
          desc: '象徵最高榮譽金牌配搭'
        }
      ]
    },
    teacherCode: {
      explanation: '老師示範：定義乾淨的 CSS 規則，讓樸素的文字卡片立刻擁有科技感底色與置中文字。',
      html: `<div class="demo-box">
  <h2>歡迎來到 CSS 競賽特訓</h2>
  <p>這是你的第一個 CSS 造型體驗！</p>
</div>`,
      css: `.demo-box {
  background-color: #0f172a;
  color: #38bdf8;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #1e293b;
}`
    },
    challenge: {
      title: '挑戰 1：親手打造你的第一張名片樣式',
      targetGoalDescription: '為 .card 設定深藍底色、亮藍文字並讓文字水平置中。',
      instructions: [
        '選擇器選中 .card',
        '設定 background-color 為 #0f172a (或 navy / midnightblue)',
        '設定 color 為 #38bdf8 (或 skyblue / cyan)',
        '設定 text-align 為 center'
      ],
      starterHtml: `<div class="card">
  <h2>CSS 競賽選手</h2>
  <p>金手獎技能競賽培訓專用</p>
</div>`,
      starterCss: ``,
      solutionCss: `.card {
  background-color: #0f172a;
  color: #38bdf8;
  text-align: center;
}`,
      hints: [
        '從零開始輸入：.card {',
        '在括號內依序寫入 background-color: #0f172a; 與 color: #38bdf8;',
        '最後補上 text-align: center;'
      ],
      checks: [
        {
          id: 'check-bg',
          description: '包含 background-color: #0f172a 或深色背景',
          cssSelector: '.card',
          property: 'backgroundColor',
          regex: /background(-color)?\s*:\s*(#0f172a|rgb\(15,\s*23,\s*42\)|navy|#1e293b)/i
        },
        {
          id: 'check-color',
          description: '設定 color 為 #38bdf8 亮天藍色',
          cssSelector: '.card',
          property: 'color',
          regex: /color\s*:\s*(#38bdf8|rgb\(56,\s*189,\s*248\)|skyblue|cyan)/i
        },
        {
          id: 'check-align',
          description: '設定 text-align 為 center 水平置中',
          cssSelector: '.card',
          property: 'textAlign',
          expectedValue: 'center',
          regex: /text-align\s*:\s*center/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 2 模組：CSS 選擇器與優先權 (Selectors & Specificity)
  // -------------------------------------------------------------
  {
    id: 'css-selectors-specificity',
    title: 'CSS 選擇器與優先權 (Selectors & Specificity)',
    subtitle: '搞懂標籤、Class、ID、偽類與 4 級權重積分對決',
    category: 'selectors',
    categoryName: '第 2 模組：選擇器與優先權',
    difficulty: '入門',
    concept: {
      summary: 'CSS 樣式發生衝突時，誰說了算？關鍵在於「選擇器權重階層 (Specificity: 0, 0, 0, 0)」。ID (100) 狂勝 Class (10)，Class 狂勝標籤 (1)，同分時後者蓋前者，而 !important 則是破壞規則的核彈！',
      metaphor: {
        icon: '⚖️',
        title: '校園點名與武力排行 (Specificity)',
        story: '• 標籤選擇器 (div, p)：喊「所有同學 (1分)」，範圍最廣、威嚴最低。\n• 類別選擇器 (.btn, .badge)：喊「穿校隊球衣的同學 (10分)」，精準且能跨頁面重複使用。\n• ID 選擇器 (#vip-card)：喊「身分證 A123456789 (100分)」，全校獨一無二，權力極大。\n• 行內 style (style="...")：直接在身上刺青 (1000分)。\n• 權重對決時，高分者強勢碾壓低分者；分數平手時，寫在後面的規則勝出！'
      },
      keyPoints: [
        '四位數權重算法 (0, 0, 0, 0)：行內 style (1,0,0,0) > ID (0,1,0,0) > Class/偽類/屬性 (0,0,1,0) > 標籤/偽元素 (0,0,0,1)。',
        '關係選擇器：.card p (後代選擇器，空白分隔)；.card > h2 (直接子代選擇器，大於符號)；h3 + p (相鄰兄弟選擇器)。',
        '狀態偽類：:hover (懸停)、:active (點按中)、:focus (獲得焦點)，權重等同於一個 Class (10分)。',
        '層疊次序 (Cascading)：當兩條規則權重完全相同時，瀏覽器會以「後寫者覆蓋先寫者 (Later rules win)」為依據。'
      ],
      badVsGood: {
        badCode: '/* 爛代碼：遇到衝突暴力亂填 !important */\np {\n  color: #38bdf8 !important;\n}',
        badReason: '!important 破壞了 CSS 層疊的自然法則，未來其他組件想自訂色彩時會陷入死局。',
        goodCode: '/* 正確代碼：提升選擇器精確度或利用 ID / 複合選擇器 */\n.user-card .role {\n  color: #38bdf8;\n}',
        goodReason: '透過合理提升 Class 具體性（如加上父層前綴或 ID），乾淨解決衝突，金手獎標準寫法。'
      },
      mnemonic: '千行百ID十類一標籤，同分後者蓋前者，!important 毀滅天地別亂填！',
      syntaxTable: [
        { property: '.classname', values: '自訂名稱', explanation: 'Class 選擇器 (權重 10，切版主力)' },
        { property: '#idname', values: '唯一名稱', explanation: 'ID 選擇器 (權重 100，具高覆蓋力)' },
        { property: 'element.class', values: '例如 button.primary', explanation: '交集選擇器，權重 1 + 10 = 11' },
        { property: ':hover / :focus', values: '狀態偽類', explanation: '互動狀態選擇器 (權重 10)' }
      ],
      championTip: '切版時「盡量維持低權重」是頂級前端與技能競賽最高心法！全站保持以 Class (.btn, .card) 為主，方便維護且擴充性極高。',
      commonPitfalls: [
        '在 CSS 中忘記加點（寫成 card 而不是 .card），瀏覽器會誤以為你在定義 <card> 標籤！',
        'ID 選擇器前方忘了加井字號（寫成 action-btn 而不是 #action-btn）。'
      ],
      quickToggles: [
        {
          label: '⚔️ ID 覆蓋示範',
          overrideCss: '.user-card { background: #1e293b; padding: 24px; border-radius: 12px; } #action-btn { background-color: #f59e0b; color: #0f172a; padding: 8px 16px; border: none; border-radius: 6px; font-weight: bold; }',
          desc: '展現 ID (100分) 壓制 Class 的覆蓋力'
        },
        {
          label: '✨ 偽類 :hover 懸停',
          overrideCss: '.user-card { background: #1e293b; padding: 24px; border-radius: 12px; } #action-btn:hover { background-color: #fbbf24; cursor: pointer; transform: scale(1.05); }',
          desc: '滑鼠懸停時觸發的偽類動態反饋'
        }
      ]
    },
    teacherCode: {
      explanation: '老師示範：利用標籤選擇器打底、類別選擇器塑造外觀、ID 選擇器高權重覆蓋按鈕底色，並加入 :hover 懸停回饋。',
      html: `<div class="user-card" id="vip-card">
  <span class="badge">特訓徽章</span>
  <h3 class="title">選擇器權重攻防戰</h3>
  <p class="role">金手培訓隊</p>
  <button class="btn" id="action-btn">立即特訓</button>
</div>`,
      css: `/* 1. 標籤選擇器 (權重 1 分) */
p {
  color: #64748b;
  font-size: 14px;
}

/* 2. 類別選擇器 (權重 10 分) */
.user-card {
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #334155;
}

.badge {
  background-color: #38bdf8;
  color: #0f172a;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: bold;
}

.title {
  color: #f8fafc;
  margin: 12px 0 4px 0;
}

/* 3. Class 覆蓋標籤：.role (10分) 覆蓋 p (1分) */
.role {
  color: #94a3b8;
  margin-bottom: 16px;
}

/* 4. 底層按鈕類別 (10分) */
.btn {
  background-color: #334155;
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
}

/* 5. ID 選擇器 (100分) 強勢覆蓋 .btn */
#action-btn {
  background-color: #f59e0b;
  color: #0f172a;
  font-weight: bold;
}

/* 6. 偽類選擇器 :hover */
#action-btn:hover {
  background-color: #fbbf24;
  cursor: pointer;
}`
    },
    challenge: {
      title: '挑戰 2：選擇器權重攻防戰 — 用 ID 與 Class 覆蓋底層樣式',
      targetGoalDescription: '為 .badge 設定背景 #38bdf8 與文字 #0f172a；為 .role 設定文字 #f8fafc (覆蓋 p 標籤)；為 #action-btn (ID 選擇器) 設定背景 #f59e0b 與文字 #0f172a；並加入 #action-btn:hover 懸停背景 #fbbf24。',
      instructions: [
        '選擇器 .badge 設定 background-color: #38bdf8; 與 color: #0f172a;',
        '選擇器 .role 設定 color: #f8fafc;（體會 Class 覆蓋底層標籤 p 樣式）',
        '選擇器 #action-btn 設定 background-color: #f59e0b; 與 color: #0f172a;（體會 ID 100分 壓制 .btn 10分）',
        '偽類選擇器 #action-btn:hover 設定 background-color: #fbbf24;'
      ],
      starterHtml: `<div class="user-card" id="vip-card">
  <span class="badge">特訓徽章</span>
  <h3 class="title">選擇器權重攻防戰</h3>
  <p class="role">金手培訓隊</p>
  <button class="btn" id="action-btn">立即特訓</button>
</div>`,
      starterCss: `/* 底層衝突預設樣式（權重較低） */
p {
  color: #64748b;
}

.btn {
  background-color: #334155;
  color: #94a3b8;
}`,
      solutionCss: `.badge {
  background-color: #38bdf8;
  color: #0f172a;
}

.role {
  color: #f8fafc;
}

#action-btn {
  background-color: #f59e0b;
  color: #0f172a;
}

#action-btn:hover {
  background-color: #fbbf24;
}`,
      hints: [
        'Class 選擇器前面加點（如 .badge、.role）',
        'ID 選擇器前面加井字號（如 #action-btn）',
        '狀態偽類在選擇器後方加上冒號（如 #action-btn:hover）'
      ],
      checks: [
        {
          id: 'check-badge-bg',
          description: '.badge 背景色為 #38bdf8',
          cssSelector: '.badge',
          property: 'backgroundColor',
          regex: /\.badge\s*\{[^}]*background(-color)?\s*:\s*(#38bdf8|rgb\(56,\s*189,\s*248\)|skyblue)/i
        },
        {
          id: 'check-badge-color',
          description: '.badge 文字顏色為 #0f172a',
          cssSelector: '.badge',
          property: 'color',
          regex: /\.badge\s*\{[^}]*color\s*:\s*(#0f172a|rgb\(15,\s*23,\s*42\)|black)/i
        },
        {
          id: 'check-role-color',
          description: '.role 文字顏色為 #f8fafc (Class 覆蓋標籤)',
          cssSelector: '.role',
          property: 'color',
          regex: /\.role\s*\{[^}]*color\s*:\s*(#f8fafc|rgb\(248,\s*250,\s*252\)|white)/i
        },
        {
          id: 'check-btn-id-bg',
          description: '#action-btn ID 選擇器背景色為 #f59e0b (ID 100分覆蓋 .btn)',
          cssSelector: '#action-btn',
          property: 'backgroundColor',
          regex: /#action-btn\s*\{[^}]*background(-color)?\s*:\s*(#f59e0b|rgb\(245,\s*158,\s*11\)|orange)/i
        },
        {
          id: 'check-btn-id-color',
          description: '#action-btn 文字顏色為 #0f172a',
          cssSelector: '#action-btn',
          property: 'color',
          regex: /#action-btn\s*\{[^}]*color\s*:\s*(#0f172a|rgb\(15,\s*23,\s*42\)|black)/i
        },
        {
          id: 'check-btn-hover',
          description: '#action-btn:hover 偽類懸停背景色為 #fbbf24',
          cssSelector: '#action-btn:hover',
          regex: /#action-btn:hover\s*\{[^}]*background(-color)?\s*:\s*(#fbbf24|rgb\(251,\s*191,\s*36\)|gold|yellow)/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 3 模組：盒模型與尺寸單位 (Box Model)
  // -------------------------------------------------------------
  {
    id: 'css-box-model-deep',
    title: 'CSS 盒模型與金手必備 box-sizing',
    subtitle: '網購包裹哲學：商品、氣泡防撞泡棉、紙箱、包裹間距',
    category: 'box-model',
    categoryName: '第 3 模組：盒模型與空間間距',
    difficulty: '入門',
    concept: {
      summary: '網頁所有元素都是長方形盒子！預設模式 (content-box) 加 padding 會讓盒子向外爆開；而比賽必備的 border-box 則保證盒子寬高雷打不動！',
      metaphor: {
        icon: '📦',
        title: '網購包裹防撞比喻',
        story: '• Content（內容物）：你要寄的手機或公仔本身。\n• Padding（內距）：包裹裡塞的透明氣泡防撞泡棉（保護內容物，向內呼吸）。\n• Border（邊框）：最外層厚紙箱的厚度與花紋。\n• Margin（外距）：你的包裹跟隔壁鄰居包裹保持的安全距離（防止黏在一起）。'
      },
      keyPoints: [
        '預設陷阱：width: 200px + padding: 20px ＝ 實際寬度變成 240px（整個版面破版擠破！）。',
        '神級救援：box-sizing: border-box，將 padding 和 border 內縮吸納進原本的寬度中！',
        '全域重設咒語：* { box-sizing: border-box; } 是所有前端工程師開場第一行。'
      ],
      badVsGood: {
        badCode: '/* 忘記加 border-box，寬度算死 */\n.col-6 {\n  width: 50%;\n  padding: 20px;\n  border: 5px solid red;\n}',
        badReason: '50% + 40px padding + 10px border > 50%，兩個並排立刻掉下去破版！',
        goodCode: '/* 選手神仙寫法：尺寸鎖定 */\n* {\n  box-sizing: border-box;\n}\n.col-6 {\n  width: 50%;\n  padding: 20px;\n}',
        goodReason: '寬度嚴格限制在 50%，就算塞大內距也不會溢出，並排永不掉行。'
      },
      mnemonic: '盒模型四層像包裹，padding 防撞 margin 隔，box-sizing 設 border-box，尺寸固定不爆破！',
      syntaxTable: [
        { property: 'box-sizing', values: 'border-box | content-box', explanation: '控制盒子寬高計算規則（永遠設 border-box）' },
        { property: 'padding', values: '10px 20px (上下一組，左右一組)', explanation: '內側安全間距' },
        { property: 'margin', values: '0 auto', explanation: '區塊元素水平自動置中神技' }
      ],
      championTip: '競賽一拿到考卷，第一件事就是在 style.css 最上方寫入 * { box-sizing: border-box; margin: 0; padding: 0; }，能幫你省下 80% 的破版 debug 時間！',
      commonPitfalls: [
        '新手常常想讓盒子內縮一點，卻拼命狂加 margin，結果盒子反而被推擠位移！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：鎖定 box-sizing: border-box，並設定 20px 內距與 2px 科技邊框。',
      html: `<div class="box-demo">
  <h4>精準尺寸盒模型</h4>
  <p>內距 Padding: 20px，寬度依然嚴格鎖定在 300px！</p>
</div>`,
      css: `.box-demo {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid #38bdf8;
  margin: 20px auto;
  background-color: #1e293b;
  color: #f8fafc;
  text-align: center;
  border-radius: 8px;
}`
    },
    challenge: {
      title: '挑戰 3：實作防破版安全盒模型',
      targetGoalDescription: '為 .box 設定 box-sizing: border-box、padding: 24px 與 border: 2px solid #38bdf8。',
      instructions: [
        '為 .box 啟用 box-sizing: border-box;',
        '設定內距 padding: 24px;',
        '設定邊框 border: 2px solid #38bdf8;'
      ],
      starterHtml: `<div class="box">
  <h3>安全防護盒</h3>
  <p>尺寸固定，不再被 padding 撐破！</p>
</div>`,
      starterCss: ``,
      solutionCss: `.box {
  box-sizing: border-box;
  padding: 24px;
  border: 2px solid #38bdf8;
}`,
      hints: [
        '輸入 box-sizing: border-box;',
        '接著輸入 padding: 24px;',
        '最後補上 border: 2px solid #38bdf8;'
      ],
      checks: [
        {
          id: 'check-box-sizing',
          description: '設定 box-sizing: border-box',
          cssSelector: '.box',
          property: 'boxSizing',
          expectedValue: 'border-box',
          regex: /box-sizing\s*:\s*border-box/i
        },
        {
          id: 'check-padding',
          description: '設定 padding: 24px',
          cssSelector: '.box',
          property: 'padding',
          regex: /padding\s*:\s*24px/i
        },
        {
          id: 'check-border',
          description: '設定 border: 2px solid #38bdf8',
          cssSelector: '.box',
          property: 'border',
          regex: /border\s*:\s*2px\s+solid\s+(#38bdf8|rgb\(56,\s*189,\s*248\)|skyblue)/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 4 模組：顯示模式 display (block / inline / inline-block / none)
  // -------------------------------------------------------------
  {
    id: 'css-display-modes',
    title: '元素四大形態：display 顯示模式全解',
    subtitle: '霸道總裁 (Block) vs 社交名媛 (Inline) vs 文武雙全 (Inline-block)',
    category: 'display-position',
    categoryName: '第 4 模組：顯示模式與可見度',
    difficulty: '入門',
    concept: {
      summary: 'HTML 元素預設有其性格：有的霸佔一整行，有的只能隨文字流動。display 是改寫元素物理特性的變形術。',
      metaphor: {
        icon: '🧱',
        title: '霸道總裁與溫柔小鳥',
        story: '• Block（霸道總裁，如 div, p, h1）：就算自己只有 10 公分寬，也一定要獨霸整條街（強制換行），可任意設定寬高。\n• Inline（社交小鳥，如 span, a）：隨文字飛舞並肩作戰，不能設定寬高（你給它設 width: 500px 它完全理都不理你！）。\n• Inline-Block（文武雙全，如 img, button）：既能跟別人排在同一行，又能自訂寬高！'
      },
      keyPoints: [
        'display: block：寬度預設 100%，強制換行，支援全部盒模型屬性。',
        'display: inline：寬高由內容撐開，設定 width / height 無效，上下 margin 無效。',
        'display: none vs visibility: hidden：前者連骨架一起消失（不佔空間）；後者隱形披風（人看不見但位置還在）。'
      ],
      badVsGood: {
        badCode: '/* 致命失誤：對 <a> 狂設寬高卻不起作用 */\na {\n  width: 150px;\n  height: 40px;\n}',
        badReason: '<a> 預設是 inline，根本無視寬高設定，新手會誤以為自己瀏覽器壞掉。',
        goodCode: '/* 選手解法：轉為 inline-block 或 block */\na.btn {\n  display: inline-block;\n  width: 150px;\n  height: 40px;\n}',
        goodReason: '轉換型態後，寬高和上下內距立刻完美生效。'
      },
      mnemonic: 'Block 霸道獨佔行，Inline 隨文寬高停，Inline-block 兩兼顧，none 消失不留形！',
      syntaxTable: [
        { property: 'display', values: 'block | inline | inline-block | none', explanation: '控制元素版面行為' },
        { property: 'visibility', values: 'visible | hidden', explanation: '控制是否看得見（佔據空間保留）' }
      ],
      championTip: '製作按鈕時，如果直接在 <a> 標籤寫 padding 或寬高，千萬記得加上 display: inline-block，否則常常會壓到上下行文字造成災難！',
      commonPitfalls: [
        '新手搞混 display: none（直接從排版樹拔除，不佔位）與 opacity: 0（只是透明，點擊依然觸發）。'
      ]
    },
    teacherCode: {
      explanation: '老師示範：將預設為 inline 的超連結 <a> 轉換為 display: inline-block，自訂寬高與按鈕樣式。',
      html: `<div class="btn-group">
  <a href="#" class="nav-btn">首頁</a>
  <a href="#" class="nav-btn primary">即刻報名</a>
</div>`,
      css: `.btn-group {
  background: #0f172a;
  padding: 20px;
  text-align: center;
}

.nav-btn {
  display: inline-block;
  padding: 10px 24px;
  margin: 0 8px;
  background-color: #334155;
  color: #f8fafc;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.nav-btn.primary {
  background-color: #38bdf8;
  color: #0f172a;
}`
    },
    challenge: {
      title: '挑戰 4：將行內連結改造成可自訂尺寸的按鈕',
      targetGoalDescription: '為 .custom-link 設定 display: inline-block、padding: 12px 24px 與背景 #38bdf8。',
      instructions: [
        '為 .custom-link 設定 display: inline-block;',
        '設定內距 padding: 12px 24px;',
        '設定背景 background-color: #38bdf8;',
        '設定文字顏色 color: #0f172a;'
      ],
      starterHtml: `<div class="wrapper">
  <a href="#" class="custom-link">金手選手專用鈕</a>
</div>`,
      starterCss: ``,
      solutionCss: `.custom-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #38bdf8;
  color: #0f172a;
}`,
      hints: [
        '輸入 display: inline-block;',
        '補上 padding: 12px 24px; 與 background-color: #38bdf8;'
      ],
      checks: [
        {
          id: 'check-display',
          description: '設定 display: inline-block',
          cssSelector: '.custom-link',
          property: 'display',
          expectedValue: 'inline-block',
          regex: /display\s*:\s*inline-block/i
        },
        {
          id: 'check-padding',
          description: '設定 padding: 12px 24px',
          cssSelector: '.custom-link',
          property: 'padding',
          regex: /padding\s*:\s*12px\s+24px/i
        },
        {
          id: 'check-colors',
          description: '設定背景 #38bdf8 與文字 #0f172a',
          cssSelector: '.custom-link',
          property: 'backgroundColor',
          regex: /background(-color)?\s*:\s*(#38bdf8|rgb\(56,\s*189,\s*248\)|skyblue)/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 5 模組：視覺呈現、漸層與現代色彩 (oklch, gradient)
  // -------------------------------------------------------------
  {
    id: 'css-colors-gradients',
    title: '色彩魔法、線性漸層與現代調色盤',
    subtitle: '告別單調色塊，打造 2026 現代科技光澤',
    category: 'colors',
    categoryName: '第 5 模組：視覺呈現與顏色',
    difficulty: '入門',
    concept: {
      summary: '網頁的高級感 70% 來自顏色與光影。從 HEX (#38bdf8) 到線性漸層 linear-gradient()，甚至最新的 oklch() 均勻感知色彩空間。',
      metaphor: {
        icon: '🎨',
        title: '夕陽晚霞漸層術',
        story: '單一顏色就像拿一罐油漆倒下去，平淡無奇；而 linear-gradient 就像天空中的夕陽晚霞，從湛藍色平滑過渡到紫羅蘭色，能讓按鈕與卡片立刻浮現絲綢般的立體未來感！'
      },
      keyPoints: [
        'HEX 色碼：#RRGGBB（例如 #38bdf8，每兩碼代表紅、綠、藍濃度）。',
        'RGBA 透明度：rgba(56, 189, 248, 0.2)，最後一碼 0~1 代表透明度，做毛玻璃必備。',
        '線性漸層：background: linear-gradient(135deg, #1e293b, #0f172a)，角度加雙色。'
      ],
      badVsGood: {
        badCode: '/* 平淡廉價的純亮色 */\nbutton {\n  background: blue;\n  color: white;\n}',
        badReason: '純原色極度刺眼且毫無質感，在競賽視覺評分往往直接拿低分。',
        goodCode: '/* 專業競賽漸層色 */\nbutton {\n  background: linear-gradient(135deg, #0284c7, #2563eb);\n  color: #ffffff;\n}',
        goodReason: '微漸層帶來細膩光影層次，視覺舒適度飆升。'
      },
      mnemonic: '角度起點加終點，linear-gradient 照亮臉，透明 RGBA 疊底圖，科技質感立現前！',
      syntaxTable: [
        { property: 'background', values: 'linear-gradient(135deg, #color1, #color2)', explanation: '繪製角度線性漸層' },
        { property: 'opacity', values: '0 ~ 1', explanation: '整體透明度（連同子文字一起變透明）' }
      ],
      championTip: '不要只會用純黑色 #000000 當底色！改用帶有 5% 藍調的深深藍 #0f172a 或 #0b0f19，整體畫面會顯得非常尊榮大氣。',
      commonPitfalls: [
        '新手常忘記 linear-gradient 必須寫在 background 或 background-image，如果寫成 color: linear-gradient(...) 是無效的！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：運用 135 度科技深藍漸層與半透明邊框打造頂級質感卡片。',
      html: `<div class="gradient-card">
  <h3>科技漸層卡片</h3>
  <p>掌握微光漸層，瞬間提升設計高級感。</p>
</div>`,
      css: `.gradient-card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #f8fafc;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.3);
  text-align: center;
}`
    },
    challenge: {
      title: '挑戰 5：繪製極光漸層按鈕',
      targetGoalDescription: '為 .btn-gradient 設定 linear-gradient(90deg, #38bdf8, #818cf8) 漸層與白色文字。',
      instructions: [
        '為 .btn-gradient 設定 background: linear-gradient(90deg, #38bdf8, #818cf8);',
        '設定文字顏色 color: #ffffff;',
        '設定內距 padding: 12px 28px;',
        '設定 display: inline-block;'
      ],
      starterHtml: `<div class="container">
  <button class="btn-gradient">解鎖特訓資格</button>
</div>`,
      starterCss: ``,
      solutionCss: `.btn-gradient {
  display: inline-block;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  color: #ffffff;
  padding: 12px 28px;
}`,
      hints: [
        '輸入 background: linear-gradient(90deg, #38bdf8, #818cf8);',
        '補上 color: #ffffff; 與 padding: 12px 28px;'
      ],
      checks: [
        {
          id: 'check-gradient',
          description: '設定 linear-gradient 漸層',
          cssSelector: '.btn-gradient',
          property: 'backgroundImage',
          regex: /background(-image)?\s*:\s*linear-gradient\([^)]+\)/i
        },
        {
          id: 'check-color',
          description: '設定 color 為白色 #ffffff',
          cssSelector: '.btn-gradient',
          property: 'color',
          regex: /color\s*:\s*(#ffffff|#fff|white|rgb\(255,\s*255,\s*255\))/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 6 模組：定位與圖層 (Position & z-index)
  // -------------------------------------------------------------
  {
    id: 'css-positioning-master',
    title: 'CSS 定位神功：子絕父相與 z-index 圖層空間',
    subtitle: '孫悟空逃不出如來佛手掌心：absolute 與 relative 的神聖羈絆',
    category: 'display-position',
    categoryName: '第 6 模組：定位與版面佈局',
    difficulty: '進階',
    concept: {
      summary: '網頁默認依順序流動，但要做出「右上角特價徽章」、「固定頂部導航列」或「懸浮視窗」，就必須出動 position 五大武功秘笈。',
      metaphor: {
        icon: '📍',
        title: 'GPS 座標定位與孫悟空傳奇',
        story: '• Relative（原地踏步）：自己雖然位移了，但原本站的坑位誰也不能搶！\n• Absolute（孫悟空）：跳出凡間漂浮在空中；但它需要一個長輩錨點！如果爸爸是 Relative，孫悟空就只能在爸爸肚子裡翻跟斗；如果長輩全都沒設，它就會直接以整個網頁為家！這就是傳說中的「子絕父相」！\n• Fixed（固定視窗）：直接釘在螢幕視窗上，滑鼠滾輪怎麼滾它都不動。\n• z-index（地圖海拔）：數字越大，圖層疊得越高越在上面！'
      },
      keyPoints: [
        '「子絕父相」口訣：子元素設 position: absolute，父容器務必設 position: relative！',
        '四大方向座標：top、right、bottom、left，決定偏移距離。',
        'z-index 唯有搭配定位（非 static）才會起效，預設為 auto。'
      ],
      badVsGood: {
        badCode: '/* 慘劇：子元素設 absolute，父層卻忘記設 relative */\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}',
        badReason: '徽章直接飛到瀏覽器視窗最右上角，完全脫離原本卡片！',
        goodCode: '/* 完美羈絆：子絕父相 */\n.card { position: relative; }\n.card .badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}',
        goodReason: '徽章被嚴格收束在卡片右上角 10px 處，精準無比。'
      },
      mnemonic: '父相子絕不亂飄，top right 座標定好梢，z-index 數字大居上，視窗固定 fixed 牢！',
      syntaxTable: [
        { property: 'position', values: 'static | relative | absolute | fixed | sticky', explanation: '定位模式' },
        { property: 'z-index', values: '整數 (例如 10, 100)', explanation: '圖層前後深度' },
        { property: 'top / right / bottom / left', values: 'px / %', explanation: '偏移錨點距離' }
      ],
      championTip: '競賽切版「角標 Tag」、「關閉按鈕 X」幾乎 100% 使用子絕父相。記住：只要子層用了 absolute，眼睛反射動作就要回頭檢查父層有沒有加上 relative！',
      commonPitfalls: [
        '初學者常以為 z-index 隨處可用，但若該元素是預設的 position: static，寫 z-index: 99999 也是完全不起作用的。'
      ]
    },
    teacherCode: {
      explanation: '老師示範：父層 .card-container 設 relative，子層 .hot-badge 設 absolute 釘在右上角。',
      html: `<div class="card-container">
  <span class="hot-badge">HOT 考點</span>
  <h3>CSS 定位終極技</h3>
  <p>卡片右上角徽章就是最經典的「子絕父相」！</p>
</div>`,
      css: `.card-container {
  position: relative;
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #334155;
  color: white;
}

.hot-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f43f5e;
  color: white;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: bold;
}`
    },
    challenge: {
      title: '挑戰 6：運用「子絕父相」釘選促銷徽章',
      targetGoalDescription: '讓 .product-box 成為定位基準 (relative)，並將 .sale-tag 釘在右上角 top: 10px; right: 10px。',
      instructions: [
        '為 .product-box 設定 position: relative;',
        '為 .sale-tag 設定 position: absolute;',
        '設定 .sale-tag 的 top: 10px; 與 right: 10px;'
      ],
      starterHtml: `<div class="product-box">
  <span class="sale-tag">競賽必考</span>
  <h3>專業電競耳機</h3>
  <p>頂級抗噪，秒殺考場雜音。</p>
</div>`,
      starterCss: ``,
      solutionCss: `.product-box {
  position: relative;
}

.sale-tag {
  position: absolute;
  top: 10px;
  right: 10px;
}`,
      hints: [
        '父層：.product-box { position: relative; }',
        '子層：.sale-tag { position: absolute; top: 10px; right: 10px; }'
      ],
      checks: [
        {
          id: 'check-parent-relative',
          description: '.product-box 設定 position: relative',
          cssSelector: '.product-box',
          property: 'position',
          expectedValue: 'relative',
          regex: /\.product-box\s*\{[^}]*position\s*:\s*relative/i
        },
        {
          id: 'check-child-absolute',
          description: '.sale-tag 設定 position: absolute',
          cssSelector: '.sale-tag',
          property: 'position',
          expectedValue: 'absolute',
          regex: /\.sale-tag\s*\{[^}]*position\s*:\s*absolute/i
        },
        {
          id: 'check-coords',
          description: '.sale-tag 設有 top: 10px 與 right: 10px',
          cssSelector: '.sale-tag',
          property: 'top',
          regex: /top\s*:\s*10px[^}]*right\s*:\s*10px|right\s*:\s*10px[^}]*top\s*:\s*10px/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 7 模組：Flexbox 彈性盒模型 (現代切版之王)
  // -------------------------------------------------------------
  {
    id: 'css-flexbox-superhero',
    title: 'Flexbox 現代排版王牌：一維彈性佈局',
    subtitle: '橫排直排隨心所欲，告別 float 浮動地獄時代',
    category: 'flexbox',
    categoryName: '第 7 模組：Flexbox 與 Grid',
    difficulty: '進階',
    concept: {
      summary: '在過去，前端工程師為了把按鈕排成一排要算百分比算到崩潰；現在只要在父層宣告 display: flex，子元素瞬間自動乖乖並排立正站好！',
      metaphor: {
        icon: '🤸',
        title: '合唱團排隊魔術師',
        story: '把父容器想成舞台指揮家（Flex Container），裡面的小孩是合唱團員（Flex Items）：\n• justify-content（指揮主軸）：大家要往中間擠 (center)？兩端貼緊 (space-between)？還是整齊散開？\n• align-items（指揮交叉軸）：高個子矮個子要頭頂齊平、腳底齊平還是肚臍置中？\n• gap（團員安全社交距離）：不用再算 margin-right，直接給全員均勻間距！'
      },
      keyPoints: [
        '起手式：父層 display: flex，子層立刻自動橫向並排。',
        '主軸分佈 justify-content：center、space-between (兩端對齊，做導航列最愛)。',
        '交叉軸對齊 align-items：center (垂直置中神器！)。',
        '神聖屬性 gap：直接在父層宣告 gap: 16px，不再需要寫 :not(:last-child) 扣 margin！'
      ],
      badVsGood: {
        badCode: '/* 上古時代浮動排版 (易破版且要清除浮動) */\n.col {\n  float: left;\n  width: 33.33%;\n  margin-right: 10px;\n}',
        badReason: '需要手動 clearfix，父層高度坍塌，是新手被扣分的重災區。',
        goodCode: '/* 現代金手必備：Flexbox + gap */\n.row {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}',
        goodReason: '不坍塌、免清除浮動、自適應間距，十秒鐘搞定。'
      },
      mnemonic: '父層宣告 display: flex，justify 主軸 space-between，align 交叉垂直中，gap 間距最省心！',
      syntaxTable: [
        { property: 'display: flex', values: '-', explanation: '啟動彈性盒模型' },
        { property: 'justify-content', values: 'flex-start | center | space-between', explanation: '主軸（預設水平）排列' },
        { property: 'align-items', values: 'stretch | center | flex-start', explanation: '交叉軸（預設垂直）對齊' },
        { property: 'gap', values: '16px / 20px', explanation: '子元素間距（現代必學）' }
      ],
      championTip: '「如何讓一個未知寬高的元素在畫面水平垂直居中？」考官最愛問這題！標準答案秒殺：父層寫 display: flex; justify-content: center; align-items: center; 搞定！',
      commonPitfalls: [
        '新手常把 justify-content 和 align-items 寫在子元素上，記住：決定排隊方式的是「父容器」！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：製作一個兩端分散對齊 (space-between) 且垂直置中的現代導航列。',
      html: `<nav class="navbar">
  <div class="logo">⚡ ChampionCSS</div>
  <div class="nav-links">
    <a href="#">首頁</a>
    <a href="#">課程</a>
    <a href="#">題庫</a>
  </div>
</nav>`,
      css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f172a;
  padding: 16px 24px;
  border-radius: 10px;
  border: 1px solid #1e293b;
}

.logo {
  color: #38bdf8;
  font-weight: bold;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
}`
    },
    challenge: {
      title: '挑戰 7：用 Flexbox 打造水平垂直置中的戰績儀表板',
      targetGoalDescription: '為 .stats-bar 設定 display: flex; justify-content: space-around; align-items: center;。',
      instructions: [
        '為 .stats-bar 設定 display: flex;',
        '設定主軸均勻分散 justify-content: space-around;',
        '設定垂直置中 align-items: center;'
      ],
      starterHtml: `<div class="stats-bar">
  <div class="stat-item">🏆 獎牌數：3</div>
  <div class="stat-item">⭐ 積分：980</div>
  <div class="stat-item">⚡ 排名：第 1 名</div>
</div>`,
      starterCss: ``,
      solutionCss: `.stats-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}`,
      hints: [
        '全部寫在父容器 .stats-bar 內',
        'display: flex; justify-content: space-around; align-items: center;'
      ],
      checks: [
        {
          id: 'check-flex',
          description: '設定 display: flex',
          cssSelector: '.stats-bar',
          property: 'display',
          expectedValue: 'flex',
          regex: /display\s*:\s*flex/i
        },
        {
          id: 'check-justify',
          description: '設定 justify-content: space-around (或 space-between / center)',
          cssSelector: '.stats-bar',
          property: 'justifyContent',
          regex: /justify-content\s*:\s*(space-around|space-between|center)/i
        },
        {
          id: 'check-align',
          description: '設定 align-items: center',
          cssSelector: '.stats-bar',
          property: 'alignItems',
          expectedValue: 'center',
          regex: /align-items\s*:\s*center/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 8 模組：CSS Grid 二維網格排版
  // -------------------------------------------------------------
  {
    id: 'css-grid-layout',
    title: 'CSS Grid 棋盤網格：二維空間排版霸王',
    subtitle: 'Flexbox 管一條線，Grid 管整個二維棋盤面',
    category: 'grid',
    categoryName: '第 8 模組：Flexbox 與 Grid',
    difficulty: '進階',
    concept: {
      summary: '當你要排「九宮格、相簿圖片牆、多欄商品卡片」時，CSS Grid 是比 Flexbox 更加霸道的一鍵排版工具！',
      metaphor: {
        icon: '🏁',
        title: '楚河漢界棋盤劃線術',
        story: '想像你在桌上拿尺畫格子：\n• grid-template-columns: repeat(3, 1fr) ＝「把桌子橫向均分切成 3 條跑道」！\n• 裡面的卡片根本不需要自己算寬度，放進去立刻自動乖乖就位，等寬等高，嚴絲合縫！'
      },
      keyPoints: [
        '一維 vs 二維：Flexbox 擅長單行或單列排列；Grid 擅長同時控制欄 (Columns) 與列 (Rows)。',
        'repeat() 神技：repeat(3, 1fr) ＝ 畫 3 欄，每欄平分 1 等份（fr 代表 fraction 比例單位）。',
        '自適應黑科技：repeat(auto-fit, minmax(200px, 1fr)) ＝ 免寫 Media Query 自動隨螢幕響應斷行！'
      ],
      badVsGood: {
        badCode: '/* 用一堆 div 與 float 算百分比做三欄 */\n.col {\n  width: 31.333%;\n  margin: 1%;\n}',
        badReason: '小數點永遠算不準，螢幕稍微縮放就破版掉到下一行。',
        goodCode: '/* 現代 Grid 三欄：一行搞定 */\n.grid-gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
        goodReason: '精確等分，不管視窗怎麼拉都不會掉行，乾淨俐落。'
      },
      mnemonic: '二維棋盤 display: grid，repeat 三欄 1fr 平分，gap 間距留呼吸，卡片排列整齊齊！',
      syntaxTable: [
        { property: 'display: grid', values: '-', explanation: '啟用二維網格佈局' },
        { property: 'grid-template-columns', values: 'repeat(3, 1fr) | 200px 1fr', explanation: '定義欄位分配' },
        { property: 'gap', values: '20px', explanation: '網格行列間隙' }
      ],
      championTip: '競賽相簿牆或作品集卡片，強烈推薦用 Grid 替代 Flexbox，程式碼量直接少一半，且天然等高！',
      commonPitfalls: [
        '新手容易把 grid-template-columns 打錯成 grid-template-column（漏掉複數 s）。'
      ]
    },
    teacherCode: {
      explanation: '老師示範：用 display: grid 與 repeat(3, 1fr) 快速組裝三欄卡片牆。',
      html: `<div class="card-grid">
  <div class="item">🥇 金手首獎</div>
  <div class="item">🥈 金手貳獎</div>
  <div class="item">🥉 金手參獎</div>
</div>`,
      css: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.item {
  background: #1e293b;
  color: #38bdf8;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #334155;
  text-align: center;
  font-weight: bold;
}`
    },
    challenge: {
      title: '挑戰 8：佈置三等分響應式網格畫廊',
      targetGoalDescription: '為 .gallery 宣告 display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;。',
      instructions: [
        '為 .gallery 設定 display: grid;',
        '設定 grid-template-columns: repeat(3, 1fr);',
        '設定 gap: 16px;'
      ],
      starterHtml: `<div class="gallery">
  <div class="photo">照片 1</div>
  <div class="photo">照片 2</div>
  <div class="photo">照片 3</div>
</div>`,
      starterCss: ``,
      solutionCss: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
      hints: [
        '全部寫在 .gallery 容器裡',
        '記得寫 repeat(3, 1fr)'
      ],
      checks: [
        {
          id: 'check-grid',
          description: '設定 display: grid',
          cssSelector: '.gallery',
          property: 'display',
          expectedValue: 'grid',
          regex: /display\s*:\s*grid/i
        },
        {
          id: 'check-cols',
          description: '設定 grid-template-columns: repeat(3, 1fr)',
          cssSelector: '.gallery',
          property: 'gridTemplateColumns',
          regex: /grid-template-columns\s*:\s*(repeat\(3,\s*1fr\)|1fr\s+1fr\s+1fr)/i
        },
        {
          id: 'check-gap',
          description: '設定 gap: 16px',
          cssSelector: '.gallery',
          property: 'gap',
          regex: /gap\s*:\s*16px/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 9 模組：邊框、圓角與立體陰影 (border-radius, box-shadow)
  // -------------------------------------------------------------
  {
    id: 'css-shadows-radii',
    title: '邊框圓角與立體陰影：讓介面跳出螢幕',
    subtitle: '扁平與立體的一線之隔：box-shadow 與 50% 正圓頭像切法',
    category: 'effects',
    categoryName: '第 9 模組：邊框、圓角與陰影',
    difficulty: '入門',
    concept: {
      summary: '真實世界中物體有厚度與光源陰影。適度的圓角可以讓介面親切柔和，細膩的陰影則能讓卡片產生漂浮於螢幕上空的立體感。',
      metaphor: {
        icon: '🪙',
        title: '懸浮光影投射法',
        story: '• border-radius: 9999px（膠囊按鈕）、border-radius: 50%（正圓頭像）。\n• box-shadow: 0 10px 25px rgba(0,0,0,0.5) ＝ 想像頭頂有一盞日光燈，X偏移 0、Y偏移 10px、羽化模糊 25px，卡片瞬間從桌面上懸浮飄起來！'
      },
      keyPoints: [
        '正圓頭像公式：寬高相等 (如 80px × 80px) + border-radius: 50%。',
        '陰影四參數：box-shadow: [X偏移] [Y偏移] [模糊半徑] [顏色]。',
        '柔和陰影秘訣：模糊半徑要大 (15~30px)，陰影顏色要用半透明 rgba，切忌直接用死黑！'
      ],
      badVsGood: {
        badCode: '/* 難看生硬的陰影 */\n.card {\n  box-shadow: 5px 5px 0px #000000;\n}',
        badReason: '沒有模糊羽化且全黑，看起來像九零年代老式復古框，視覺沈重。',
        goodCode: '/* 現代空氣感浮空陰影 */\n.card {\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);\n  border-radius: 16px;\n}',
        goodReason: '柔和擴散，具有自然光學散景，專業感十足。'
      },
      mnemonic: '寬高相等圓角半，正圓頭像不變形，陰影羽化多一點，立體飄浮空氣感！',
      syntaxTable: [
        { property: 'border-radius', values: '8px | 50% | 99px', explanation: '四角修圓' },
        { property: 'box-shadow', values: '0 8px 24px rgba(0,0,0,0.3)', explanation: '元素外陰影' }
      ],
      championTip: '競賽做出懸浮按鈕時，搭配 :hover { transform: translateY(-2px); box-shadow: ...; }，按鈕就像被磁鐵吸起來一樣生動！',
      commonPitfalls: [
        '新手常在長方形元素上設 border-radius: 50%，結果變成了橢圓形雞蛋，必須寬高相等才是正圓！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：正圓選手頭像搭配懸浮光暈陰影。',
      html: `<div class="avatar-card">
  <div class="avatar">🏅</div>
  <h4>金牌國手候選人</h4>
</div>`,
      css: `.avatar-card {
  background: #1e293b;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  color: white;
}

.avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px auto;
  background: #0284c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border: 3px solid #38bdf8;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
}`
    },
    challenge: {
      title: '挑戰 9：切出正圓頭像與立體懸浮卡片',
      targetGoalDescription: '為 .card 設定 border-radius: 16px 與 box-shadow；為 .user-avatar 設定 border-radius: 50%。',
      instructions: [
        '為 .card 設定 border-radius: 16px;',
        '為 .card 設定 box-shadow: 0 12px 28px rgba(0,0,0,0.4);',
        '為 .user-avatar 設定 border-radius: 50%;'
      ],
      starterHtml: `<div class="card">
  <div class="user-avatar">⭐</div>
  <p>金手獎選手徽章</p>
</div>`,
      starterCss: ``,
      solutionCss: `.card {
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

.user-avatar {
  border-radius: 50%;
}`,
      hints: [
        '卡片圓角：.card { border-radius: 16px; }',
        '正圓公式：.user-avatar { border-radius: 50%; }'
      ],
      checks: [
        {
          id: 'check-card-radius',
          description: '.card 圓角 16px',
          cssSelector: '.card',
          property: 'borderRadius',
          regex: /border-radius\s*:\s*16px/i
        },
        {
          id: 'check-shadow',
          description: '.card 設定 box-shadow 陰影',
          cssSelector: '.card',
          property: 'boxShadow',
          regex: /box-shadow\s*:\s*0\s+12px/i
        },
        {
          id: 'check-avatar-round',
          description: '.user-avatar 圓角為 50%',
          cssSelector: '.user-avatar',
          property: 'borderRadius',
          regex: /border-radius\s*:\s*50%/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 10 模組：變形、過渡與動態特效 (transform, transition)
  // -------------------------------------------------------------
  {
    id: 'css-transitions-animations',
    title: '動態轉場與微互動：transition 與 hover 魔法',
    subtitle: '拒絕瞬間變化的生硬感，給介面德芙巧克力的絲滑過渡',
    category: 'animation',
    categoryName: '第 10 模組：動畫與轉場特效',
    difficulty: '進階',
    concept: {
      summary: '當滑鼠懸停在按鈕上，若顏色一瞬間閃變會顯得粗糙；加上 transition: 0.3s ease，所有數值平滑遞增遞減，使用者體驗直接滿分！',
      metaphor: {
        icon: '🚀',
        title: '慢動作彈簧與火箭懸浮',
        story: '• transition（絲滑潤滑油）：告訴瀏覽器「不要瞬移，請用 0.3 秒優雅走過去」。\n• transform: translateY(-4px)（反重力火箭）：配合 scale(1.05) 稍微放大並往上浮起，讓按鈕看起來就像真的可以被按下去一樣誘人！'
      },
      keyPoints: [
        '三部曲：原狀態宣告 transition: all 0.3s ease；目標狀態在 :hover 宣告變化。',
        'transform: translateY(-4px)：向上浮動，性能極佳（不引發重排 reflow）。',
        'transform: scale(1.05)：等比放大 1.05 倍，做卡片互動最愛。'
      ],
      badVsGood: {
        badCode: '/* 忘記加 transition，畫面卡頓生硬 */\n.btn:hover {\n  background: red;\n  margin-top: -5px;\n}',
        badReason: '顏色瞬間瞬切，且用 margin 動位移會造成頁面重排卡頓。',
        goodCode: '/* 選手滿分寫法：GPU 硬體加速 */\n.btn {\n  transition: all 0.25s ease;\n}\n.btn:hover {\n  transform: translateY(-3px);\n}',
        goodReason: '絲滑柔順，且 transform 走 GPU 渲染，60fps 滿幀流暢。'
      },
      mnemonic: '原態常駐 transition，hover 懸停展神通，transform 浮起 scale 大，絲滑過渡滿分沖！',
      syntaxTable: [
        { property: 'transition', values: 'all 0.3s ease', explanation: '平滑轉場過渡' },
        { property: 'transform', values: 'translateY(-4px) scale(1.05)', explanation: 'GPU 位移與縮放' }
      ],
      championTip: '競賽中所有按鈕、超連結、卡片都務必加上 transition，這體現了前端選手對微互動細節（Micro-interactions）的極致追求。',
      commonPitfalls: [
        '新手常常把 transition 寫在 :hover 裡面，導致滑鼠移開時「打回原形」又變成生硬的瞬切！transition 必須寫在「本體」身上！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：按鈕加入 transition，滑鼠懸浮時上浮 3px 並加深光暈。',
      html: `<div class="interactive-demo">
  <button class="glow-button">懸浮測試看效果 👆</button>
</div>`,
      css: `.interactive-demo {
  text-align: center;
  padding: 30px;
}

.glow-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.glow-button:hover {
  background: #2563eb;
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.5);
}`
    },
    challenge: {
      title: '挑戰 10：打造觸動心弦的懸浮按鈕',
      targetGoalDescription: '為 .hover-btn 設定 transition: all 0.3s ease;，並在 :hover 觸發 transform: translateY(-4px);。',
      instructions: [
        '為 .hover-btn 設定 transition: all 0.3s ease;',
        '設定 .hover-btn:hover { transform: translateY(-4px); }'
      ],
      starterHtml: `<div class="wrapper">
  <button class="hover-btn">點我挑戰</button>
</div>`,
      starterCss: ``,
      solutionCss: `.hover-btn {
  transition: all 0.3s ease;
}

.hover-btn:hover {
  transform: translateY(-4px);
}`,
      hints: [
        'transition 寫在 .hover-btn 本身',
        ':hover 裡面寫 transform: translateY(-4px);'
      ],
      checks: [
        {
          id: 'check-transition',
          description: '.hover-btn 包含 transition',
          cssSelector: '.hover-btn',
          property: 'transition',
          regex: /transition\s*:\s*(all\s+)?0\.3s/i
        },
        {
          id: 'check-hover-transform',
          description: '.hover-btn:hover 包含 transform: translateY(-4px)',
          regex: /\.hover-btn:hover\s*\{[^}]*transform\s*:\s*translateY\(-4px\)/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 11 模組：現代 CSS 與響應式 RWD (Media Queries)
  // -------------------------------------------------------------
  {
    id: 'css-responsive-media-queries',
    title: '響應式網頁設計：Media Queries 跨屏自適應',
    subtitle: '手機、平板、電腦全通吃，一套代碼走天下',
    category: 'competition',
    categoryName: '第 11 模組：現代 CSS 與響應式',
    difficulty: '進階',
    concept: {
      summary: '現代人 70% 用手機瀏覽網頁。利用 @media (max-width: 768px)，當螢幕變小時自動將橫排卡片疊成直排，字體自動微調。',
      metaphor: {
        icon: '📱',
        title: '水隨容器而變形',
        story: '李小龍名言：「Be water, my friend. 水倒入茶杯就變成茶杯的形狀，倒入水壺就變成水壺的形狀。」響應式網頁就是像水一樣，在 27 吋電腦大螢幕展開為四欄並排；在 6 吋手機小螢幕上順暢折疊成單欄直排！'
      },
      keyPoints: [
        '斷點標準 (Breakpoints)：手機 ≤ 640px、平板 ≤ 768px、電腦 ≥ 1024px。',
        '語法：@media (max-width: 768px) { ... } 代表螢幕在 768px 以下時生效。',
        'Flex 轉向神器：在手機版將 flex-direction: column，立刻將橫排轉為直排！'
      ],
      badVsGood: {
        badCode: '/* 寫死固定寬度，手機版必定破版出現水平捲軸 */\n.main-content {\n  width: 1200px;\n}',
        badReason: '在 390px 的 iPhone 上，內容會爆出螢幕 800px，用戶要左右滑動，直接零分。',
        goodCode: '/* 流體寬度 + 最大寬度 */\n.main-content {\n  width: 100%;\n  max-width: 1200px;\n  padding: 0 16px;\n}',
        goodReason: '在手機自適應縮放，在電腦限制最大寬度，兩全其美。'
      },
      mnemonic: '媒體查詢斷點定，max-width 鎖手機，橫排切換 flex-column，任何螢幕都貼心！',
      syntaxTable: [
        { property: '@media (max-width: 768px)', values: '{ ... }', explanation: '平板與手機斷點規則' },
        { property: 'flex-direction', values: 'row | column', explanation: '控制主軸方向（橫排改直排）' }
      ],
      championTip: '競賽閱卷老師會直接把瀏覽器視窗拉大拉小測試。如果出現任何橫向滾動條（Horizontal Scrollbar），扣分非常重！',
      commonPitfalls: [
        '新手忘記在 HTML <head> 加入 <meta name="viewport" content="width=device-width, initial-scale=1.0">，導致手機版直接縮成螞蟻小字。'
      ]
    },
    teacherCode: {
      explanation: '老師示範：電腦版橫排雙欄，在 600px 以下透過 Media Query 自動變為直排。',
      html: `<div class="responsive-box">
  <div class="column">欄位 A</div>
  <div class="column">欄位 B</div>
</div>`,
      css: `.responsive-box {
  display: flex;
  gap: 16px;
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
}

.column {
  flex: 1;
  background: #334155;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 6px;
}

/* 當螢幕小於 600px 時轉為直排 */
@media (max-width: 600px) {
  .responsive-box {
    flex-direction: column;
  }
}`
    },
    challenge: {
      title: '挑戰 11：為導航欄加入手機版斷點',
      targetGoalDescription: '編寫 @media (max-width: 600px)，將 .menu-list 的 flex-direction 改為 column。',
      instructions: [
        '編寫媒體查詢 @media (max-width: 600px) {',
        '在裡面將 .menu-list 的 flex-direction 設為 column;',
        '}'
      ],
      starterHtml: `<div class="menu-list">
  <div class="item">功能 1</div>
  <div class="item">功能 2</div>
</div>`,
      starterCss: ``,
      solutionCss: `@media (max-width: 600px) {
  .menu-list {
    flex-direction: column;
  }
}`,
      hints: [
        '格式如下：',
        '@media (max-width: 600px) {',
        '  .menu-list { flex-direction: column; }',
        '}'
      ],
      checks: [
        {
          id: 'check-media-query',
          description: '包含 @media (max-width: 600px)',
          regex: /@media\s*\(\s*max-width\s*:\s*600px\s*\)/i
        },
        {
          id: 'check-flex-column',
          description: '包含 flex-direction: column',
          regex: /flex-direction\s*:\s*column/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 12 模組：金手獎實戰題庫 (Spinner、卡片與終極置中)
  // -------------------------------------------------------------
  {
    id: 'css-competition-final',
    title: '金手獎終極考題：CSS Spinner 轉圈圈載入動畫',
    subtitle: '不用任何 JavaScript，純 CSS 打造絲滑加載指示器',
    category: 'competition',
    categoryName: '第 12 模組：常見佈局與考場實戰',
    difficulty: '競賽實戰',
    concept: {
      summary: '技能競賽常考「純 CSS 繪製 UI 元件」。Spinner 轉圈圈考驗了正圓 (50%)、透明邊框與 @keyframes 360 度無窮旋轉！',
      metaphor: {
        icon: '🎡',
        title: '摩天輪永動機',
        story: '做一個正圓輪框，四個邊中「三個邊是淺灰色，只有一個邊塗上亮藍色」；接著啟動 @keyframes 永動摩天輪，從 0deg 旋轉到 360deg，視覺上就像是一道流暢的光環在極速奔跑旋轉！'
      },
      keyPoints: [
        '單邊高亮秘訣：border: 4px solid #334155; border-top-color: #38bdf8;。',
        '定義關鍵影格：@keyframes spin { to { transform: rotate(360deg); } }。',
        '無限循環：animation: spin 1s linear infinite;。'
      ],
      badVsGood: {
        badCode: '/* 引入肥大的 gif 動態圖 */\n<img src="loading.gif">',
        badReason: '增加 HTTP 請求且放大容易模糊失真，無法隨時更換顏色。',
        goodCode: '/* 純 CSS 向量向量動畫 */\n.spinner {\n  border: 4px solid #334155;\n  border-top-color: #38bdf8;\n  animation: spin 0.8s linear infinite;\n}',
        goodReason: '零請求、高清向量、尺寸顏色隨意客製，評審一眼驚豔。'
      },
      mnemonic: '正圓四邊留一邊，keyframes 旋轉三百六，linear 勻速 infinite，純 CSS 轉圈圈！',
      syntaxTable: [
        { property: '@keyframes', values: '名稱 { from{} to{} }', explanation: '自訂動畫幀' },
        { property: 'animation', values: '名稱 1s linear infinite', explanation: '綁定動畫與播放次數' }
      ],
      championTip: '競賽常考「頁面加載 Skeleton 骨架屏」或「按鈕點擊後的 Loading 轉圈」，記熟這套四行代碼，在考場上無往不利！',
      commonPitfalls: [
        '動畫時間後方如果忘記加 infinite，轉完一圈就會停住死在原地！'
      ]
    },
    teacherCode: {
      explanation: '老師示範：純 CSS 打造 40px 高速科技藍加載轉圈圈。',
      html: `<div class="loader-box">
  <div class="spinner"></div>
  <p>系統載入中，請稍候...</p>
</div>`,
      css: `.loader-box {
  text-align: center;
  padding: 30px;
  background: #0f172a;
  border-radius: 12px;
  color: #94a3b8;
}

.spinner {
  width: 44px;
  height: 44px;
  margin: 0 auto 16px auto;
  border: 4px solid #334155;
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`
    },
    challenge: {
      title: '挑戰 12：親手實作純 CSS 旋轉加載器 (Spinner)',
      targetGoalDescription: '為 .my-spinner 宣告 border-radius: 50%; 與 animation: spin 1s linear infinite;。',
      instructions: [
        '為 .my-spinner 設定 border-radius: 50%;',
        '設定 animation: spin 1s linear infinite;'
      ],
      starterHtml: `<div class="box">
  <div class="my-spinner"></div>
  <p>即時加載中</p>
</div>`,
      starterCss: ``,
      solutionCss: `.my-spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`,
      hints: [
        '讓它變成正圓：border-radius: 50%;',
        '啟動旋轉動畫：animation: spin 1s linear infinite;'
      ],
      checks: [
        {
          id: 'check-radius',
          description: '設定 border-radius: 50%',
          cssSelector: '.my-spinner',
          property: 'borderRadius',
          regex: /border-radius\s*:\s*50%/i
        },
        {
          id: 'check-animation',
          description: '設定 animation: spin 1s linear infinite',
          cssSelector: '.my-spinner',
          property: 'animation',
          regex: /animation\s*:\s*spin\s+1s\s+linear\s+infinite/i
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // 第 13 模組：畢業綜合考核（一頁式網站設計考題）
  // -------------------------------------------------------------
  {
    id: 'css-capstone-landing-page',
    title: '🏆 畢業總考題：現代極簡一頁式形象網站設計',
    subtitle: '綜合運用盒模型、Flexbox、Grid、定位與響應式打造專業一頁式網站',
    category: 'capstone',
    categoryName: '終極考核：金手獎畢業考題（一頁式網頁設計）',
    difficulty: '畢業考題',
    fooishReferenceUrl: 'https://www.fooish.com/css/',
    concept: {
      summary: '恭喜來到最終畢業考核！在商業專案與金手獎競賽中，80% 的賽題都要求以「一頁式網站 (Landing Page)」作為核心成果。本考題綜合檢驗：Flex 導航、Hero 主視覺定位、Grid 三欄卡片網格、Picsum 圖片適配與 RWD 跨屏斷點！',
      metaphor: {
        icon: '🏛️',
        title: '垂直景觀摩天大樓的一體化建造',
        story: '一頁式網站就像打造一座多功能垂直摩天大樓：\n• 頂層迎賓門廳 (Navbar)：Flexbox 排定 Logo 與導航動線，兩端對齊。\n• 挑高景觀大廳 (Hero Section)：震撼巨幅攝影背景 + 絕對定位 (position: absolute) 懸浮徽章。\n• 藝術展覽長廊 (Features Grid)：CSS Grid 規劃黃金三欄，Picsum 圖片等比覆蓋 (object-fit: cover)。\n• 防震伸縮結構 (RWD)：手機螢幕時切換為單欄直排，各尺寸皆不爆版！'
      },
      keyPoints: [
        '導航列雙端對齊：.navbar 使用 display: flex; justify-content: space-between; align-items: center;',
        '主視覺定位：.hero-banner 設 position: relative;，子元素 .hero-badge 設 position: absolute; 鎖定右上角。',
        '二維等比卡片牆：.cards-grid 使用 display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;',
        '圖片自適應防破版：.card-img 必須宣告 width: 100%; height: 200px; object-fit: cover; 避免失真。',
        'RWD 行動端適配：@media (max-width: 768px) 將 .cards-grid 轉為 grid-template-columns: 1fr;'
      ],
      badVsGood: {
        badCode: '/* 新手寫死固定寬度，圖片撐爆螢幕 */\n.page-wrap { width: 1200px; }\n.card-img { width: 800px; }',
        badReason: '在筆電或手機上直接產生水平捲軸 (橫向破版)，圖片比例被強行拉伸變形。',
        goodCode: '/* 金手獎大師流體架構 + 彈性裁切 + 響應斷點 */\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n.card-img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n@media (max-width: 768px) {\n  .cards-grid { grid-template-columns: 1fr; }\n}',
        goodReason: '任何螢幕尺寸均能等比縮放，圖片以 cover 裁切不變形，手機版自動流暢摺疊為單欄。'
      },
      mnemonic: 'Flex 導航排兩端，Hero 絕配錨右上；Grid 劃出三欄網，圖片 Cover 不走樣；七六八斷點一下，單欄直排最順暢！',
      syntaxTable: [
        { property: 'display: flex', values: 'justify-content: space-between', explanation: '導航欄兩端對齊排版' },
        { property: 'position: absolute', values: 'top: 16px; right: 16px', explanation: '主視覺角標懸浮定位' },
        { property: 'display: grid', values: 'grid-template-columns: repeat(3, 1fr)', explanation: '三欄卡片自適應網格' },
        { property: 'object-fit: cover', values: 'cover', explanation: 'Picsum 假圖等比裁切不失真' },
        { property: '@media (max-width: 768px)', values: '{ ... }', explanation: '行動裝置斷點適配' }
      ],
      championTip: '競賽一頁式網站評審的三大扣分地雷：1. 螢幕縮小出現橫向捲軸（扣大分）；2. 圖片直接被壓扁拉長（沒加 object-fit）；3. 按鈕沒有 transition 過渡回饋。注意這三點就能穩拿高分！',
      commonPitfalls: [
        '忘記在父容器設定 position: relative，導致 position: absolute 的徽章飛到視窗外面。',
        '設定了 img 的 width: 100% 卻忘了設定 object-fit: cover，導致直圖跟橫圖高矮不一破壞卡片水平對齊。',
        '在 @media 內寫錯選擇器或未覆蓋原本的 grid-template-columns。'
      ]
    },
    teacherCode: {
      explanation: '老師示範標準現代一頁式官方形象網站：包含頂部導航、Hero 橫幅主視覺（Picsum 假圖 + 絕對定位徽章）、三欄 Grid 卡片展示區、與 RWD 手機版自適應。',
      html: `<div class="landing-page">
  <!-- 1. 頂部導航列 -->
  <nav class="navbar">
    <div class="nav-logo">
      <span class="logo-icon">🚀</span>
      <span class="logo-text">AURA STUDIO</span>
    </div>
    <div class="nav-links">
      <a href="#about" class="nav-link">關於品牌</a>
      <a href="#projects" class="nav-link">精選作品</a>
      <a href="#stats" class="nav-link">實力數據</a>
      <a href="#contact" class="nav-cta">預約諮詢</a>
    </div>
  </nav>

  <!-- 2. Hero 主視覺區塊 (使用 Picsum 攝影橫幅) -->
  <section class="hero-section" id="about">
    <img src="https://picsum.photos/id/1018/1200/500" alt="Hero Banner" class="hero-bg-img" />
    <div class="hero-overlay"></div>
    <div class="hero-badge">🏆 2026 年度設計金獎</div>
    <div class="hero-content">
      <h1 class="hero-title">極致簡約 • 數位未來</h1>
      <p class="hero-sub">融合前沿美學與極致互動體驗，為頂尖品牌打造過目難忘的一頁式視覺饗宴。</p>
      <div class="hero-actions">
        <a href="#projects" class="btn-primary" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">探索作品集</a>
        <a href="#stats" class="btn-outline" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">觀看數據</a>
      </div>
    </div>
  </section>

  <!-- 3. 特色項目卡片區 (CSS Grid 3欄) -->
  <section class="projects-section" id="projects">
    <div class="section-header">
      <span class="section-tag">PORTFOLIO</span>
      <h2 class="section-title">核心專案展示</h2>
    </div>

    <div class="cards-grid">
      <!-- 卡片 1 -->
      <div class="project-card">
        <div class="card-media">
          <img src="https://picsum.photos/id/20/600/400" alt="專案一" class="card-img" />
          <span class="card-pill">視覺工程</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">極光設計系統</h3>
          <p class="card-desc">運用 CSS Modern 變數與 OKLCH 空間打造高對比色彩層次。</p>
          <div class="card-meta">2026 Q1 • 互動介面</div>
        </div>
      </div>

      <!-- 卡片 2 -->
      <div class="project-card">
        <div class="card-media">
          <img src="https://picsum.photos/id/36/600/400" alt="專案二" class="card-img" />
          <span class="card-pill">電商旗艦</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">脈衝動態平台</h3>
          <p class="card-desc">結合 GPU 加速轉場與 Grid 網格佈局，打造毫秒級流體翻頁。</p>
          <div class="card-meta">2026 Q2 • 響應式商城</div>
        </div>
      </div>

      <!-- 卡片 3 -->
      <div class="project-card">
        <div class="card-media">
          <img src="https://picsum.photos/id/48/600/400" alt="專案三" class="card-img" />
          <span class="card-pill">三維視效</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">星雲數據展館</h3>
          <p class="card-desc">全頁流體自適應，微距與光影陰影層疊，獲選年度優質網站。</p>
          <div class="card-meta">2026 Q3 • 品牌策展</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. 品牌宣言與數據 -->
  <section class="stats-section" id="stats">
    <div class="stat-item">
      <div class="stat-num">99.8%</div>
      <div class="stat-label">客戶滿意度</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">120+</div>
      <div class="stat-label">上線專案</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">0.18s</div>
      <div class="stat-label">首屏渲染耗時</div>
    </div>
  </section>

  <!-- 5. 簡潔頁尾 -->
  <footer class="footer" id="contact">
    <p>© 2026 AURA STUDIO • 金手獎一頁式網頁設計示範</p>
  </footer>
</div>`,
      css: `/* 一頁式形象網站整體容器 */
.landing-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #f1f5f9;
  background-color: #090d16;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #1e293b;
}

/* 錨點滾動定位平滑與高度位移補償 */
#projects, #about, #stats, #contact {
  scroll-margin-top: 80px;
}

/* 1. 導航列：Flex 排版兩端對齊 + 吸頂固定 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  background-color: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid #1e293b;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  color: #38bdf8;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-cta {
  background: #38bdf8;
  color: #090d16;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  transition: transform 0.2s, background-color 0.2s;
}

.nav-cta:hover {
  transform: translateY(-2px);
  background: #7dd3fc;
}

/* 2. Hero 主視覺橫幅：相對定位 + 絕對定位徽章 */
.hero-section {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
  overflow: hidden;
}

.hero-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(9, 13, 22, 0.75) 0%, rgba(9, 13, 22, 0.95) 100%);
  z-index: 2;
}

/* 絕對定位徽章：右上角 */
.hero-badge {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 3;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.5);
  color: #7dd3fc;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 600px;
}

.hero-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.hero-sub {
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-primary {
  background: #38bdf8;
  color: #090d16;
  border: none;
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(56, 189, 248, 0.3);
}

.btn-outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid #475569;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #1e293b;
  border-color: #94a3b8;
}

/* 3. 專案卡片區：CSS Grid 三欄佈局 */
.projects-section {
  padding: 48px 28px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-tag {
  color: #38bdf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.section-title {
  font-size: 24px;
  margin: 6px 0 0 0;
  color: #ffffff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: #38bdf8;
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.5);
}

.card-media {
  position: relative;
  width: 100%;
  height: 180px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid #334155;
  color: #38bdf8;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 18px;
}

.card-title {
  font-size: 16px;
  margin: 0 0 6px 0;
  color: #ffffff;
}

.card-desc {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.card-meta {
  font-size: 11px;
  color: #64748b;
  border-top: 1px solid #1e293b;
  padding-top: 10px;
}

/* 4. 數據統計條 */
.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 32px 24px;
  background: #0b1120;
  border-top: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
  text-align: center;
}

.stat-num {
  font-size: 28px;
  font-weight: 800;
  color: #38bdf8;
  font-family: monospace;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* 5. 頁尾 */
.footer {
  padding: 24px;
  text-align: center;
  color: #64748b;
  font-size: 12px;
}

/* 6. RWD 響應式：手機與平板視窗 (< 768px) */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  .navbar {
    flex-direction: column;
    gap: 12px;
  }
  .hero-title {
    font-size: 24px;
  }
  .stats-section {
    flex-direction: column;
    gap: 20px;
  }
}`
    },
    challenge: {
      title: '終極畢業考題：完成現代風格一頁式設計網站 CSS',
      targetGoalDescription: '為下方的一頁式形象網頁架構編寫核心 CSS，運用 Flexbox、Grid、絕對定位與 Picsum 假圖完成大氣專業的頁面！',
      instructions: [
        '1. 為 .navbar 設定 display: flex; 與 justify-content: space-between; 使 Logo 與選單排在兩端。',
        '2. 為 .hero-banner 設定 position: relative;，並為 .hero-badge 設定 position: absolute; 與 top / right 釘在右上角。',
        '3. 為 .cards-grid 設定 display: grid; 與 grid-template-columns: repeat(3, 1fr); 以及 gap: 20px;',
        '4. 為 .card-img 設定 width: 100%; 與 object-fit: cover; 確保 Picsum 圖片不變形。',
        '5. 撰寫 @media (max-width: 768px) 斷點，讓 .cards-grid 在手機版切換為單欄直排 (grid-template-columns: 1fr;)。'
      ],
      starterHtml: `<div class="site-container">
  <!-- 頂部導航 -->
  <header class="navbar">
    <div class="logo">⚡ STUDIO PICSUM</div>
    <nav class="nav-menu">
      <a href="#hero">首頁</a>
      <a href="#projects">精選作品</a>
      <a href="#contact" class="btn-contact">立即聯絡</a>
    </nav>
  </header>

  <!-- 主視覺區塊 (Hero) -->
  <section class="hero-banner" id="hero">
    <img src="https://picsum.photos/id/1015/1000/400" alt="Hero Banner" class="hero-image" />
    <span class="hero-badge">NEW 2026 RELEASE</span>
    <div class="hero-text">
      <h1>打造非凡的一頁式視覺體驗</h1>
      <p>結合美學與程式碼的金手獎特訓作品</p>
    </div>
  </section>

  <!-- 三欄作品網格 -->
  <section class="gallery-section" id="projects">
    <h2>精選作品展示</h2>
    <div class="cards-grid">
      <div class="card">
        <img src="https://picsum.photos/id/26/500/350" alt="Work 1" class="card-img" />
        <div class="card-info">
          <h3>自然原力</h3>
          <p>高飽和風景光學色彩研究</p>
        </div>
      </div>
      <div class="card">
        <img src="https://picsum.photos/id/32/500/350" alt="Work 2" class="card-img" />
        <div class="card-info">
          <h3>極簡架構</h3>
          <p>純粹的幾何比例與留白美學</p>
        </div>
      </div>
      <div class="card">
        <img src="https://picsum.photos/id/42/500/350" alt="Work 3" class="card-img" />
        <div class="card-info">
          <h3>都會掠影</h3>
          <p>建築線條與街頭光影紀錄</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="site-footer" id="contact">
    <p>© 2026 金手獎 CSS 互動教學特訓教室 • 榮譽結業</p>
  </footer>
</div>`,
      starterCss: `/* 請在此完成畢業考題 CSS：
   1. .navbar 兩端對齊
   2. .hero-banner 與 .hero-badge 定位
   3. .cards-grid 三欄佈局
   4. .card-img 圖片 cover
   5. @media (max-width: 768px) 響應式斷點
*/
`,
      solutionCss: `.site-container {
  background: #0f172a;
  color: #f8fafc;
  font-family: sans-serif;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
}

/* 錨點滾動位置修正 */
#projects, #hero, #contact {
  scroll-margin-top: 20px;
}

/* 1. 導航列兩端對齊 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #1e293b;
  border-radius: 8px;
  margin-bottom: 20px;
}

.logo {
  font-weight: bold;
  color: #38bdf8;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-menu a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 13px;
}

.btn-contact {
  background: #38bdf8;
  color: #0f172a !important;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
}

/* 2. Hero 主視覺與絕對定位徽章 */
.hero-banner {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}

.hero-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.hero-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f59e0b;
  color: #0f172a;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.hero-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(transparent, rgba(15, 23, 42, 0.9));
}

.hero-text h1 {
  font-size: 22px;
  margin: 0 0 4px 0;
}

.hero-text p {
  font-size: 13px;
  color: #cbd5e1;
  margin: 0;
}

/* 3. 三欄 Grid 卡片與 Picsum 假圖 */
.gallery-section h2 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #38bdf8;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: #1e293b;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #334155;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card-info {
  padding: 14px;
}

.card-info h3 {
  font-size: 15px;
  margin: 0 0 6px 0;
}

.card-info p {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

.site-footer {
  text-align: center;
  padding: 24px 0 8px 0;
  color: #64748b;
  font-size: 12px;
}

/* 5. 響應式斷點 */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}`,
      hints: [
        '導航欄兩端對齊：.navbar { display: flex; justify-content: space-between; }',
        '主視覺定位：.hero-banner { position: relative; } 與 .hero-badge { position: absolute; top: 16px; right: 16px; }',
        '三欄等寬網格：.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }',
        '圖片防止變形失真：.card-img { width: 100%; object-fit: cover; }',
        '手機版斷點切換：@media (max-width: 768px) { .cards-grid { grid-template-columns: 1fr; } }'
      ],
      checks: [
        {
          id: 'check-nav-flex',
          description: '導航欄 .navbar 設定 display: flex; 與 justify-content: space-between;',
          cssSelector: '.navbar',
          property: 'display',
          expectedValue: 'flex',
          regex: /display\s*:\s*flex/i
        },
        {
          id: 'check-badge-pos',
          description: '.hero-badge 設定 position: absolute;',
          cssSelector: '.hero-badge',
          property: 'position',
          expectedValue: 'absolute',
          regex: /position\s*:\s*absolute/i
        },
        {
          id: 'check-cards-grid',
          description: '.cards-grid 設定 display: grid; 與 3 欄 (repeat(3, 1fr) 或 1fr 1fr 1fr)',
          cssSelector: '.cards-grid',
          property: 'display',
          expectedValue: 'grid',
          regex: /grid-template-columns\s*:\s*(repeat\(\s*3\s*,\s*1fr\s*\)|1fr\s+1fr\s+1fr)/i
        },
        {
          id: 'check-img-cover',
          description: '.card-img 設定 object-fit: cover;',
          cssSelector: '.card-img',
          property: 'objectFit',
          expectedValue: 'cover',
          regex: /object-fit\s*:\s*cover/i
        },
        {
          id: 'check-rwd-breakpoint',
          description: '包含 @media 斷點並將 .cards-grid 改為 1fr 單欄',
          regex: /@media[^{]+\{[^}]*\.cards-grid[^{]*\{[^}]*grid-template-columns\s*:\s*1fr/is
        }
      ]
    }
  }
];
