今天學弟問我 typescript 和 javascript 的差別是什麼?
原本我只知道弱型別和強型別的差別，查了一下才知道原來還有其他更多的差別?

### 什麼是 TypeScript？

- TypeScript 是一種由 Microsoft 開發的開源程式語言，是 JavaScript 的 superset ，添加了靜態類型檢查和其他功能（如 Interfaces、Generics、Enums）。它讓 JavaScript 更具結構化，適合大型專案開發。

### TypeScript 的用途
1. 靜態類型檢查：在編譯時檢測變數類型錯誤，避免運行時出錯。
2. 更好的程式碼提示：提供豐富的程式碼提示和自動完成功能，提升開發效率。
3. 提高可讀性與維護性：類型註解提供更多內容資訊，使團隊合作和程式碼理解更容易。
4. 安全重構：靜態類型檢查減少重構程式碼時的錯誤風險。
5. 跨平台支持：編譯為標準 JavaScript，在不同平台上執行。

### TypeScript 與 JavaScript 的區別
1. 類型系統：JavaScript 是動態類型，而 TypeScript 是靜態類型，變數的類型在宣告時已確定。
2. 編譯器：TypeScript 需要編譯成 JavaScript，而 JavaScript 可直接執行。
3. 物件導向支持：TypeScript 支持 interface、class，讓物件導向設計更直觀。
#### TypeScript 的優點與缺點
- 優點：
1. 靜態類型檢查：減少運行時錯誤，提升可靠性。
2. 程式碼提示：強化的程式碼提示，提高開發速度和準確性。
3. 可維護性與重構：類型註解和檢查讓重構代碼更安全。
4. 大型專案支持：模組化設計使其更適合大型專案。
- 缺點：
1. 學習曲線：對熟悉 JavaScript 的開發者來說，需要時間適應類型系統。
2. 編譯時間：TypeScript 編譯需要時間，對大型專案可能有影響。
3. 程式碼量增加：類型註解使代碼更長。

#### 參考資料
[Typescript](https://tw.alphacamp.co/blog/typescript)