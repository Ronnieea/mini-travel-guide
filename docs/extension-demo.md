# AI 規範擴充驗證：新增札幌

## 目標
證明同一套 `AGENTS.md` 能引導 AI 以既有結構新增城市，而不用重新開發 HTML 頁面。

## 事先建立的網站
東京、京都、大阪三座城市共用 `city.html`，資料集中於 `data/cities.json`。

## 擴充指令範例
> 請先閱讀 AGENTS.md，依照專案規範新增「札幌」城市。不要新增城市專屬 HTML 頁面，保留所有原有城市，完成後檢查資料格式、首頁列表、搜尋、北海道分類與詳細頁。

## 擴充後預期成果
- `data/cities.json` 多出 `id: "sapporo"` 的完整物件。
- 首頁自動出現札幌卡片。
- 北海道篩選可顯示札幌。
- `city.html?id=sapporo` 顯示 3 個景點、3 項美食、交通及提醒。
- 既有東京、京都、大阪仍正常運作。

## 本交付版本的實際狀態
目前交付的 JSON **已包含札幌**，作為完成後的展示狀態。這份文件提供可重現的測試流程，**不是聲稱已經由另一個 AI 獨立閱讀規範並完成擴充的證據**。

## 建議正式展示方式
1. 建立 Git commit A：暫時只保留東京、京都、大阪的 JSON 資料（不更動其他程式）。
2. 讓新的 AI 工作階段讀取 `AGENTS.md`，貼上上方擴充指令。
3. 檢查 AI 修改內容，執行 `python3 scripts/validate.py`。
4. 於瀏覽器測試首頁、搜尋、北海道篩選與札幌詳細頁。
5. 建立 Git commit B，保留 diff 與前後截圖。
6. 在此文件補上 commit 連結、測試結果、前後截圖；未執行的項目不可標示通過。

## 實測證據（待填）
- Commit A：待填
- AI 使用工具／模型：待填
- AI 指令與回覆紀錄：待填
- Commit B：待填
- JSON 驗證：待執行
- 瀏覽器驗證：待執行
- GitHub Pages 網址：待填

## 福岡擴充紀錄（2026-11-16）

- 在既有四座城市後附加 `fukuoka`；以修改前資料逐一比對，原有四筆資料與順序不變。
- 新增 `kyushu`／九州：同步更新首頁篩選、AGENTS.md 與驗證程式的地區對照。
- 沿用 `tokyo` 主題及共用城市模板，未新增 HTML、CSS 或 JavaScript。
- 首頁連結：`city.html?id=fukuoka`。內容包含大濠公園、櫛田神社、福岡塔及三項美食、交通與提醒。

內容參考官方資料：[大濠公園](https://www.japan.travel/en/spot/2260/)、[櫛田神社](https://www.crossroadfukuoka.jp/en/articles/kushidashrine)、[福岡塔交通與周邊地圖](https://www.fukuokatower.co.jp/img/guide/pamphlet/momochimap.pdf)、[福岡市美食介紹](https://www.gofukuoka.jp/en/articles/detail/ca4bdbee-091c-44b6-b106-cdbd9e4fec62)、[水炊雞肉鍋介紹](https://www.gofukuoka.jp/articles/detail/0a353180-21ca-49fe-ad44-e87e618c6d30)、[機場地下鐵](https://www.fukuoka-airport.jp/en/access/subway.html)。未新增精確營業時間、票價或班次。

### 本次驗證結果

- 已嘗試 `python3 scripts/validate.py`；因系統缺少 Xcode Command Line Tools，Python 無法啟動，退出碼為 1。**既有驗證程式未完成，不列為通過。**
- 瀏覽器替代資料檢查通過：JSON 陣列、唯一 ID、完整欄位與型別、地區對照、CSS 主題、每城三個景點及三項美食。
- 瀏覽器程式化 DOM 事件檢查通過：五座城市的中英文名稱、景點名稱與美食搜尋；全部／關東／關西／北海道／九州篩選與 aria-pressed 狀態；福岡卡片連結導覽。
- 五座城市詳情頁、未知 ID 提示、首頁與所有詳情頁的 1280／768／375px 無水平溢出檢查通過；首頁分別維持三／二／一欄。
- 本機 HTML、CSS、JS、JSON 資源回應 HTTP 200，檢查期間無主控台錯誤。
- 真實鍵盤與滑鼠操作未完成驗證：本次瀏覽器自動化按鍵未觸發預期動作，滑鼠操作逾時；以上互動結果來自 DOM 事件，不當作真實鍵盤操作通過。
- GitHub Pages 正式環境驗證未執行；本次僅完成本機檢查。
