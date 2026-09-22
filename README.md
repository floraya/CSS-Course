# CSS 互動教學特訓教室 (CSS Interactive Mastery Studio)

依據經典 CSS 教學大綱與技職競賽標準精心打造的互動式 CSS 學習平台。專為初學者與網頁設計金手獎競賽選手設計，結合「**老師概念拆解**」、「**互動視覺圖鑑**」、「**學生動手實戰**」與「**多設備一頁式網站畢業總考題**」，引導學習者零負擔掌握現代 CSS 核心技術。

---

## 🌟 核心特色

### 1. 雙視角切換學習系統
- **👨‍🏫 老師教學示範 (Teacher Demo Mode)**：
  - 深度解析 CSS 核心語法與運作原理解析。
  - 重點整理條列卡片（屬性作用、金手獎選手口訣、常見地雷提醒）。
  - 各單元專屬的**動態互動輔助圖鑑**（盒模型動態解析尺規、優先權比重天平、Flexbox 軸向操縱台等）。
  - 完整標準示範代碼與即時渲染成果。
- **🧑‍🎓 學生動手練習 (Student Practice Mode)**：
  - 各章節獨立實戰挑戰與目標指引。
  - 內建編輯器（支援 Tab 縮排、即時熱重載、重設代碼、查看參考答案）。
  - 自動化代碼檢驗機制，符合條件即觸發彩色紙花慶祝特效。
  - 本地作答進度自動持久化（`localStorage`）。

### 2. 全方位「展開看整體頁面」檢視系統 (`FullPagePreviewModal`)
在老師示範與學生成果預覽視窗頂部，皆提供「**展開看整體頁面**」按鈕，具備強大檢視功能：
- **👁️ 即時預覽模式**：
  - **滿版 (100%)**：全螢幕瀏覽整體頁面流暢度與滾動效果。
  - **電腦版 (1200px)**：檢驗多欄佈局與寬螢幕排版。
  - **平板版 (768px)**：驗證 `@media (max-width: 768px)` 斷點與自適應流式網格。
  - **手機版 (390px)**：檢視行動裝置單欄排列與觸控友善體驗。
- **📄 HTML 結構分頁 (`index.html`)**：完整 HTML5 語意化骨架展開，含行號索引、語法標色與一鍵複製。
- **🎨 CSS 樣式分頁 (`style.css`)**：完整 CSS3 樣式表展開，含選擇器標色、行號索引與一鍵複製。
- **⚡ 雙欄對照模式 (Split View)**：左側操作即時預覽，右側同步對照 HTML / CSS 代碼。
- **🔗 平滑錨點滾動定位**：支援 `scroll-behavior: smooth` 與吸頂導航列高度補償（`scroll-margin-top: 80px`），點擊「精選作品」、「實力數據」等導航項目可精準平滑跳轉至該區塊。

---

## 📚 課程地圖 (Curriculum Modules)

| 單元 | 課程主題 | 核心知識點與學習目標 |
| :--- | :--- | :--- |
| **01** | **CSS 入門與語法基礎** | 選擇器、屬性與值架構，顏色、字型大小與內距基礎控制 |
| **02** | **CSS 選擇器與優先權** | 標籤 (1)、Class (10)、ID (100)、偽類 (`:hover`)、優先權天平與 `!important` 破壞神 |
| **03** | **盒模型與邊框尺寸** | Content, Padding, Border, Margin 與 `box-sizing: border-box` 防破版核心觀念 |
| **04** | **文字排版與色彩美學** | `font-family`, `line-height`, `letter-spacing`, 文字陰影與高對比現代配色哲學 |
| **05** | **Display 顯示模式** | `block`、`inline`、`inline-block` 與 `none` 特性差異與選單排列實作 |
| **06** | **Flexbox 彈性盒版面** | 主軸 (`justify-content`)、交叉軸 (`align-items`)、換行 (`flex-wrap`) 與間距 (`gap`) |
| **07** | **CSS Grid 網格佈局** | 二維排版、`grid-template-columns`、`1fr` 彈性分欄、自適應卡片牆 |
| **08** | **定位系統與圖層堆疊** | `static`, `relative`, `absolute`, `fixed`, `sticky` 與 `z-index` 圖層堆疊上下文 |
| **09** | **轉場與動態特效** | `transition`, `transform` (縮放、旋轉、平移) 與 `:hover` 互動微反饋 |
| **10** | **現代極簡一頁式形象網站** | **畢業總考題 (Capstone Project)**：完整商業級形象官網、Hero 主視覺橫幅、特色專案網格、吸頂導航列、數據統計列、全響應式斷點與平滑錨點跳轉 |

---

## 🛠️ 技術架構 (Tech Stack)

- **核心框架**：[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **建置工具**：[Vite](https://vitejs.dev/)
- **樣式引擎**：[Tailwind CSS v4](https://tailwindcss.com/)
- **動態特效**：[Motion (Framer Motion)](https://motion.dev/)
- **慶祝粒子**：[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **圖示庫**：[Lucide React](https://lucide.dev/)

---

## 🚀 快速上手 (Getting Started)

### 系統需求
- [Node.js](https://nodejs.org/) (建議 v18 以上版本)
- npm, pnpm 或 yarn

### 安裝步驟
1. 複製專案庫並進入根目錄：
   ```bash
   git clone <repository-url>
   cd css-learning-platform
   ```

2. 安裝相依套件：
   ```bash
   npm install
   ```

3. 啟動本機開發伺服器：
   ```bash
   npm run dev
   ```
   伺服器預設運行於：`http://localhost:3000`

4. 執行 TypeScript 型別檢查：
   ```bash
   npm run lint
   ```

5. 建置生產環境版本：
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages 部署設定步驟 (免白畫面最佳解法)

由於本專案採用 **Vite + React + TypeScript** 架構，瀏覽器無法直接執行未編譯的 `.tsx` 原始碼；且 GitHub Pages 部署在專案子路徑（如 `/CSS-Course/`），因此需要注意以下兩點：

### ✅ 已為您完成的架構與程式碼修正：
1. **`vite.config.ts` 已設定 `base: './'`**：
   - 打包後的靜態資源自動使用自適應相對路徑，徹底解決在 GitHub Pages 子路徑 (`/CSS-Course/`) 下資源 404 的問題。
2. **已配置 `.github/workflows/static.yml`（GitHub Pages 官方標準建置發布流程）**：
   - 每次 Push 到 `main` 分支時，GitHub Actions 會自動在雲端執行 `npm install --legacy-peer-deps` 與 `npm run build`，並將打包完成的 `dist/` 靜態檔案發布至 GitHub Pages。
   - 移除了 `cache: 'npm'` 限制，避免因為缺少 lock 檔案而報錯中斷。
3. **加入 `.nojekyll` 與 `public/.nojekyll`**：
   - 防止 GitHub Pages 預設的 Jekyll 引擎忽略或過濾必要資源檔。
4. **加入 `public/404.html`**：
   - 支援 SPA 單頁應用程式路由重定向。

### ⚙️ 您在 GitHub 儲存庫上的操作步驟（直接更新 `static.yml`）：
如果您在 GitHub 上已建立了 `.github/workflows/static.yml`，請至 GitHub 儲存庫：
1. 進入檔案：`.github/workflows/static.yml`。
2. 點擊右上角鉛筆圖示（**Edit this file**）。
3. 將裡面的內容替換為以下內容：
```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
4. 點擊右上方綠色 **Commit changes** 儲存。
5. （建議）若倉庫中還有舊的 `.github/workflows/jekyll-gh-pages.yml`，可點進該檔案並點選垃圾桶圖示刪除，避免舊任務衝突。
6. 前往 **Actions** 頁籤，等待任務跑完（顯示綠色打勾）。
7. 開啟 [https://floraya.github.io/CSS-Course/](https://floraya.github.io/CSS-Course/)（請按 `Ctrl + F5` 強制重新整理），網站即可完美呈現！

---

## 📁 專案目錄結構 (Project Structure)

```text
├── public/                 # 靜態資源檔案
├── src/
│   ├── components/         # 核心組件目錄
│   │   ├── Header.tsx              # 頂部導航列與模式切換
│   │   ├── Sidebar.tsx             # 模組章節導覽與進度條
│   │   ├── TeacherTeachingView.tsx # 老師教學示範視窗
│   │   ├── StudentLearningView.tsx # 學生動手實戰視窗
│   │   └── FullPagePreviewModal.tsx# 全螢幕整體頁面檢視器 (含 RWD 與 HTML/CSS Tab)
│   ├── data/
│   │   └── lessons.ts      # 10 大章節完整教學內容、題目與參考答案
│   ├── types/
│   │   └── lesson.ts       # 課程與章節資料型別定義
│   ├── App.tsx             # 應用程式主入口與狀態控制
│   ├── index.css           # 全域樣式與 Tailwind CSS 載入
│   └── main.tsx            # React DOM 掛載點
├── metadata.json           # 平台元資料配置
├── package.json            # 專案相依性與指令設定
├── tsconfig.json           # TypeScript 編譯配置
├── vite.config.ts          # Vite 建置配置
└── README.md               # 專案說明文件
```

---

## 💡 教學與自學建議

1. **先觀摩再實作**：建議先在「老師教學示範」中體驗動態圖鑑，了解屬性在不同數值下的即時變化。
2. **切換動手做**：切換至「學生動手練習」，閱讀任務提示後親自編寫 CSS。
3. **善用全螢幕檢視**：在完成「畢業考題：現代極簡一頁式形象網站」時，務必點擊「**展開看整體頁面**」，切換電腦版、平板與手機版，並在 HTML 與 CSS 分頁中對照排版結構。
4. **驗收與重設**：若代碼編寫有誤，可隨時點擊「重設代碼」或「參考答案」，一步步扎實打好網頁排版底子。

---

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。歡迎用於教學、自學與各類競賽培訓！
