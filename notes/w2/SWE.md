
老師上課提到了專案管理：瀑布式 vs Scrum，讓我想要理解軟體工程思想是如何影響寫程式的?
我對於軟體工程的思想和架構很有趣，想到我了解這一部分的內容。

參考資料:
(軟體工程背後的思想是如何影響寫程式的)[https://www.youtube.com/watch?v=hioFw9byJno]

### 軟體工程的興趣與探索方向

軟體工程深深吸引我的地方在於它結合創意與邏輯的無限可能性。相較於其他工程領域，軟體工程的特點是不受物理世界的物質限制，不像是土木工程師蓋房子需要準備 磚塊、水泥或鋼筋等等建材，軟體工程師可以純粹用創意來設計軟體。然而，這種自由也帶來了挑戰，因為軟體開發中需要處理複雜系統的耦合性，從功能模組的相互依賴，到人與人之間合作的溝通，再到過去與未來版本的兼容性。這種複雜性讓軟體工程是一種挑戰，激發了我想要學習如何設計更高效、更穩定的架構，學習如何取得在解耦與性能的平衡，並且提升自身技術深度，我希望可以跟著李允中教授學習，能成為一名厲害的軟體工程師，能夠了解軟體如何有系統的建立，我現在還有非常多不足的地方要去學習，例如現在寫程式缺乏對於未來的考量，只想到快速寫程式可以動就好，但如何設計一個未來才好維護和合作架構，可以降低團隊溝通成本，並且解決實際問題，是我的目標，可以透過軟體來將想法化為現實!


### 1. **軟體開發挑戰**

- **人月神話啟示**：
    - 開發過程的自由度實際有限，例如 OS/360 開發過程失控。
    - 增加人力並不等於提升效率，甚至可能導致更多問題。
- **責任與歷史包袱**：
    - 系統需向下兼容，軟體版本號往往基於歷史更新。
    - 過去的 Bug 隱藏複雜性，重構時需考慮未來包袱。
    - 理解業務邏輯，避免設計與執行出現落差。

### 2. **軟體複雜性與解耦**

- **複雜性的本質**：
    - 功能模組之間的耦合性與分層設計。
    - 開發中的溝通與 Bug 修復，隨著參與人數指數型增加。
    - 系統更新需考慮過去遺留問題與未來需求。
- **解耦方法**：
    - 高內聚低耦合：模組化設計、函數與變量的作用域劃分，降低功能與功能之間的耦合。
    - 分層化設計：如作業系統、TCP/IP 協議，可以降低人與人之間的耦合。
    - 設計模式：MVC、SOLID 原則，幫助劃清責任邊界，可以降低過去與未來的耦合。
    - 領域驅動設計（DDD）：挑出核心不變的業務驅動，確保業務邏輯穩定。

### 3. **性能與複雜度的平衡**

- **性能取捨**：用性能換取降低複雜度的可能性。
- **分層與效率**：分層設計可降低複雜度，但開發效率可能下降。

### 4. **開發模式與流程**

- **敏捷開發**：
    - 快速迭代，應對短期需求並驗證市場反應。
    - 簡化從需求到實作的過程，提高適應變化的能力。
- **瀑布式開發模型**：
    - 適用於需求穩定的情況，但可能難以應對需求變化。
- **開源文化**：
    - 鼓勵參與後端相關開源專案，學習解決問題的實踐方法。
    - 強調合作、持續改進，沒有銀彈可以解決所有問題。

### 5. **軟體設計哲學**

- **模組化與分層化**：
    - 系統的每層需為下一層提供穩定支撐。
    - 分層過多可能降低開發效率，但提升系統穩定性。
- **微服務架構**：
    - 業務模組化設計，確保功能之間的獨立性與可維護性。
- **穩定性與不確定性**：
    - 系統如單細胞生物，可能處於不穩定但充滿可能性的狀態。

### 6. **未來探索方向**

- **業務理解與技術結合**：強化業務知識，將業務需求轉化為穩定的技術方案。
- **開源貢獻與學習**：通過參與後端相關開源專案，了解實際問題與解決策略。
- **持續學習與實踐**：探索不同的設計模式與解耦方法，優化系統設計與開發流程。