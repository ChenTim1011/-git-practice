### 任務清單

- [x] **1. 建立 `/backend` 資料夾**
- [x] **2. 執行 `npm init` 初始化專案**
- [x] **3. 安裝 Express**
  - 執行 `npm install express`
  - 觀察 `package.json` 的變化
  - 觀察 `node_modules` 裡面有什麼

- 為什麼 npm 要這樣設計?
  
每個專案要使用的函式庫，都直接安裝在他的資料夾底下

那一大堆函式庫，哪個是你專案需要的? 如果有多個 Project ，可能用到不同版本的同一個函式庫，除了不好管理外，如果只能存在一個版本的套件，可能會把其他覆蓋掉。

1. 什麼是 package.json？
   
package.json 是一個 JSON 檔案，位於 Node.js 專案的根目錄，用於管理專案依賴套件和執行腳本的基礎。
它包含了專案的 metadata ，例如專案名稱、版本、描述、程式進入點、腳本、作者、依賴套件等等。 

觀察 package.json 的變化， 輸入 npm init 後根據終端機給的提示輸入要求內容，package.json 會有以下內容

```json
{
"name": "backend",
"version": "1.0.0",
"description": "Testing",
"main": "index.js", 
"scripts": {
  "start": "node --env-file=.env app.js"
},
"author": "TimChen",
"license": "ISC"
}
```


- 輸入 npm install express  package.json 的變化 多了我們裝的套件

```json
  "dependencies": {
    "express": "^4.21.0"
  }
```

2. 觀察 node_modules 裡面有什麼?


裡面有很多套件，每個套件有些有套件歷史，說明不同版本更改了哪些東西，index.js 主要程式的內容，
還有 package.json 依賴了哪些其他的套件，readme 說明套件的功能，還有 License 說明套件是使用哪一個 License 和規範等等。 

#### 補充 package-lock.json 到底是什麼?
package-lock.json 檔案會在每次 npm 修改 node_modules 樹狀結構或 package.json 檔案時自動產生。
它精確地描述了產生的樹狀結構，以便後續安裝能夠產生相同的樹狀結構，無論中間依賴項如何更新。

- [x] **4. 建立 `app.js` 檔案**
- [x] **5. 執行 `node app.js` 啟動伺服器**

- [x] **6. 測試伺服器是否成功運作**
  - 以瀏覽器開啟 [http://localhost:3000/](http://localhost:3000/)
  - 或使用指令 `curl http://localhost:3000/` 測試

- [x] **7. 使用環境變數設定 `port`**
  - 研究「環境變數」
  - 修改 `app.js`，使 `port` 可以透過環境變數設定，而不是寫死在程式碼中

- [x] **8. 確認哪些檔案應該被放上 GitHub Repo**
  - 考慮並設定 `.gitignore`，避免將不必要的檔案上傳

---

#### 在 `backend/readme.md` 中回答以下問題：

- [x] **1. `package.json` 中的 `dependencies` 與 `devDependencies` 分別是什麼**

dependencies 列出了專案在正式環境中運行的必要依賴項。

devDependencies 列出了專案開發過程中所需的依賴套件，例如測試框架、程式碼檢查工具等，這些依賴項不會被安裝到正式環境中。

- [x] **2. `package.json` 中的 `scripts` 這個區塊怎麼用？**

當專案龐大輸入指令可能很繁雜，有 scripts 幫助我們執行腳本指令，scripts 幫助我們自動化任務、簡化常用命令，也可以執行不同階段的腳本命令。
```json
"start": "node app.js"  
```
在終端機輸入 npm start 就可以啟動
- [x] **3. 如何使用環境變數設定 `port`？**
- 在 app.js 同資料夾新增.env (不可以上傳到 github ， 請用 gitignore )
- 在 .env 檔裡面 PORT=3000
- app.js 透過 process.env.PORT 取得 PORT
- 啟動程式指令 node --env-file=.env app.js
- 也可以在 package.json 裡面設定
```json
  "scripts": {
    "start": "node --env-file=.env app.js"
  },
```
- 終端機輸入 npm start 就可以啟動!

- [x] **4. 哪些檔案應該被放上 GitHub Repo？決策的要素是什麼？**

我決策的要素有三個，考量安全性、容量、必要性
- 安全性: 帳號密碼、 API key 、 環境變數 等機密資訊不可以上傳。 
- 容量: pdf、影音內容、投影片等，不要把 github repo 當成雲端硬碟。
- 必要性: 舉例像是 node_modules 沒有必要上傳，因為只需要 package.json 就知道所需套件，npm install 就可以把套件給裝起來。

- [x] **5. `require` 和 `import/export` 的差異是什麼？（CJS vs ESM），這兩者分別怎麼用？**

上禮拜的作業用到 import ，一個做法是檔名變成.mjs，另外一種做法 package.json 中加上"type": "module"
這樣 .js　會被當成 ESM 。 簡單分類的話檔名 .mjs 是 ESM ， 檔名 .cjs 是 CommonJS
ESM 使用 import 和 export 
```
import pkg from 'pkg-esm';
```

CJS 使用 require 函數來導入 module ，並使用 module. exports 或 exports 對象來定義導出的內容。

```
const pkg = require('pkg-commonjs');
```

ESM 和 CJS 是不相容的 module 系統，即不能直接在 ES6 module 和 CommonJS module 之間進行導入和導出，如果想要同時支援兩種模組可以用 conditional exports
```json
  "exports": {
    "import": "./index-module.mjs",
    "default": "./index-require.cjs"
  },

```
ESM 要引入 CommonJS 模組的話，最有保障的方式是使用 createRequire：
```
// file.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('pkg-commonjs');
```
---

#### 進階題：

- [x] **1. `localhost` 是什麼？**

localhost 是電腦的主機名稱，可以在網站或應用程式發佈之前，在本機進行測試。
當您在瀏覽器的網址列中輸入 localhost 時，域名伺服器 (DNS) 會將其轉換為 IP 位址 127.0.0.1。
IP 位址 127.0.0.1 被保留用於電腦上的本機伺服器。 您永遠不會找到其他以 127 開頭的 IP 位址。
localhost 是一種協定，後面通常會加上一個 port 。 例如作業 app.js 中設定的 port 為 3000，則可以使用 localhost:3000 或 127.0.0.1:3000 在本機存取該應用程式。

- [x] **2. `curl` 是什麼？如何使用 `curl` 測試網路連線？常用參數有哪些？**

curl 是 client + URL ，是一個命令列工具，用於透過 URL 與伺服器交換資料。
可以讓我們從終端機發送各種 HTTP 請求，例如 GET、POST、PUT 和 DELETE，以及其他協定等等

- 使用 cURL 測試網路連線
  
1. 嘗試連線到特定網站或伺服器：
您可以使用 cURL 命令嘗試連線到一個已知的網站或伺服器，例如 google.com。如果連線成功，cURL 會返回該網站的 HTML 內容，否則會返回錯誤訊息。
```bash
curl www.google.com 
```
3. 檢查 HTTP 狀態碼：
使用 -I 選項請求伺服器返回 HTTP 標頭，並檢查狀態碼是否為 200 OK，表示連線成功。
```bash
curl -I www.google.com
```
4. 測量連線時間：
您可以使用 -w 選項顯示 cURL 的執行時間統計資料，從而判斷網路連線的品質。
```
curl -o /dev/null -s -w %{time_connect} www.google.com
```

- 常用的參數

1. -X [HTTP 方法] ： 指定要使用的 HTTP 方法，例如 GET、POST、PUT、DELETE 等等，預設使用 GET 方法。
2. -H [標頭] ： 新增一個 HTTP 標頭到請求中。例如，可以使用這個選項設定 Content-Type 標頭，指定請求資料的格式。
3. -d [資料] ： 指定要發送到伺服器的資料。例如，可以使用這個選項在 POST 請求中發送表單資料或 JSON 資料。
4. -o [檔案名稱] ： 指定要儲存下載檔案的名稱。如果省略這個選項，cURL 會將檔案內容輸出到終端機，或者使用伺服器提供的預設檔案名稱。
5. -I ： 只請求伺服器返回 HTTP 標頭，而不下載檔案內容。可以用於檢查伺服器的狀態、檔案大小等等。
6. -s ： 不顯示進度條和其他資訊，僅輸出伺服器的回應。
7. -w [格式] ： 指定要輸出的 cURL 執行時間統計資料的格式


#### 參考資料
- [ESM與CJS](https://vocus.cc/article/649cc0e0fd89780001a7d34d)
- [ NPM Install ](https://ithelp.ithome.com.tw/articles/10191783)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [package.json](https://github.com/npm/package-json/blob/main/package.json)
- [localhost](https://www.freecodecamp.org/news/what-is-localhost/)
- [curl](https://blog.hubspot.com/website/curl-command)
