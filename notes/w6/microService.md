最近一直聽到微服務的名詞到底是什麼呢?

老師好幾組專案中都有提到想切成微服務，那老師會問
為什麼需要微服務？專案規模或是其他理由？
目前的專案規劃預計要切成哪些獨立的服務出來？
服務彼此之間的通訊要怎麼做？

---

**微服務架構（Microservices）**，是一種將應用程式結構化為兩個或更多服務的架構風格，其特性包括：

- **可獨立部署（Independently deployable）**
- **鬆散耦合（Loosely coupled）**

服務通常會按照業務能力來組織。每個服務通常由一個小型團隊單獨負責。

### 特別解釋
- **可獨立部署（Independently deployable）**：每個服務可以在不影響其他服務的情況下進行獨立的開發、測試和部署。由於每個服務都是分開管理的，當某個服務需要修改或更新時，可以單獨進行部署而不會干擾其他服務，這樣一來，整體系統的靈活性和維護效率都大大提升。

- **鬆散耦合（Loosely coupled）**：鬆散耦合是指服務之間的依賴性低。每個服務運行時不依賴其他服務的內部實做，服務之間的連接是統一的，通常透過 API 進行互動。這樣的設計可以讓一個服務的變動不會直接影響到其他服務，便於服務的獨立維護和擴展。



### 參考資料
[microservices.io](https://microservices.io/)