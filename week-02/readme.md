### A. 環境準備

- 在自已的開發電腦安裝好 NodeJS（或 Deno, Bun, …）
    - https://nodejs.org/en
    - 思考: 安裝哪個版本？為什麼？
- 請在 week-02/readme.md 中描述
    - 安裝的 nodejs 版本
    - (optional) 如果不是安裝 NodeJS，那可以試著說明為什麼？ → 練習回答技術選型問題
    - nvm 與 npm 分別是什麼

___


### 思考: 安裝哪個版本？為什麼？

#### 安裝 Node.js v20.17.0
我覺得應該安裝具有 LTS ( Long-term support ) 的Node.js v20.17.0，我覺得有三個原因
1. 對於軟體來說，定期維護更新很重要，當遇到漏洞或潛在風險能夠即時修補，使軟體具有更好的可靠性。
2. 具有 LTS 版本的軟體，注重軟體品質而不是新功能，新功能可能會有一些錯誤產生，在開發產品可能有導致更多漏洞。
3. 未來在公司開發產品，如果因為安裝軟體而產生漏洞，需要額外成本來除錯，所以選擇 LTS 版本軟體能降低風險。




### (optional) 如果不是安裝 NodeJS，那可以試著說明為什麼？
    
1. 選擇 bun：如果你需要追求啟動速度和運行效能、需要快速的開發者體驗、小型或快速開發專案，bun 會是一個不錯的選擇。
2. 選擇 Node.js：如果正在開發大型應用、需要穩定的生態系統、處理企業級需求，Node.js 是更為成熟和可靠的選擇。
    
### nvm 與 npm 分別是什麼?
    
1. nvm 是 Node.js **版本管理器**，允許你在一台機器上安裝和切換多個不同版本的 Node.js。
   因為每個專案可能依賴於特定版本的 Node.js 或其套件，所以 nvm 是很好用的工具。
2. npm 是 Node.js 的**套件管理工具**，用於管理 JavaScript 和 Node.js 應用中的第三方套件。
   npm 可以讓我們方便安裝、管理和分享開發中使用的各種 JavaScript 函式庫和工具。

### 參考資料
[bun](https://bun.sh/)
[nvm](https://github.com/nvm-sh/nvm)
[npm](https://github.com/npm/cli)
