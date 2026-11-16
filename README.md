# Mini Travel Guide｜日本城市旅遊指南

以 HTML、CSS、JavaScript 和 JSON 製作的靜態旅遊指南網站。**本專案的重點是 `AGENTS.md`：讓 AI 按照同一套規則持續新增城市，而非每次重做一個頁面。**

## 功能
- 城市卡片列表、城市名稱／景點／美食搜尋
- 關東、關西、北海道、九州地區篩選
- 共用城市詳細介紹模板：景點、美食、交通、提醒
- 響應式網頁；可使用 GitHub Pages 部署

## 視覺設計
採用奶油白、苔綠與陶土橘的旅行手帳風格，首頁以純 CSS 富士山明信片搭配城市編號卡片，詳細頁沿用相同配色與版面語言。桌面、平板與手機分別顯示三、二、一欄城市卡片；提供鍵盤焦點、跳至城市選集連結與即時篩選結果數量，並尊重減少動態效果的系統設定。

重新設計後已透過瀏覽器檢查 JSON 結構、中英文／景點／美食搜尋、空結果、四個地區按鈕的鍵盤操作、全部城市詳細頁與未知 ID，以及 1280、768、375px 的首頁和詳細頁溢出情況，皆通過。本機檢查未出現瀏覽器程式錯誤；GitHub Pages 正式環境仍需部署後確認。

## 開啟方式
此網站透過 `fetch()` 讀取 JSON，**不可直接雙擊 `index.html` 使用 `file://` 開啟**。

```bash
cd mini-travel-guide
python3 -m http.server 8000
```

開啟 `http://localhost:8000/`。或在 VS Code 使用 Live Server。

## 專案結構
```text
mini-travel-guide/
├── AGENTS.md
├── README.md
├── index.html
├── city.html
├── css/style.css
├── js/main.js
├── js/city.js
├── data/cities.json
└── docs/extension-demo.md
```

## GitHub Pages 部署
1. 在 GitHub 建立公開 repository，例如 `mini-travel-guide`。
2. 將本專案所有檔案推送到 repository 的 `main` 分支。
3. 進入 **Settings → Pages → Build and deployment**，選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/(root)**，按 Save。
4. 等候部署完成，造訪 `https://<你的帳號>.github.io/mini-travel-guide/`。
5. 驗證首頁、搜尋、篩選及 `city.html?id=sapporo` 可正常開啟。

## AI 擴充示範
閱讀 [`AGENTS.md`](AGENTS.md) 後，要求 AI「新增一座城市，遵守現有 JSON schema，並確認搜尋、分類和城市詳細頁可用」。AI 應只需新增資料（必要時新增地區／主題規則），不應複製 HTML 頁面。

見 [`docs/extension-demo.md`](docs/extension-demo.md) 的驗證步驟與待補實測證據。

## 技術限制與聲明
不使用後端、資料庫、登入或付費 API。網站內容僅供旅遊靈感參考，景點營業資訊與交通時刻請以官方最新公告為準。插畫使用 emoji 與 CSS 漸層，無需第三方圖片授權。
# mini-travel-guide
