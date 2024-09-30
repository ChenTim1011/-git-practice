以下內容複製老師作業的部分，練習使用 checklist

## A. 註冊 AWS 帳號

- [x] 註冊 AWS 帳號

- [x] 什麼是 AWS Region, AZ (availability zones)

在 AWS Regions 選單可以看到有不同地區可以選，AWS 服務部署在全球各地的不同地理區域，每個區域都有自己的基礎設施和服務，
來提供不同地區的使用者使用 AWS 的服務。 AZ (availability zones) 是位於同一區域內的多個獨立資料中心。每個 AZ 都有獨立設備，並透過低延遲連接彼此。
好處是可以防止單點故障影響整個區域，當某一點壞掉可以替換成另外一個，提高容錯性。 


- [x] 如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？




1. 如果我是一開始接觸 AWS ，我會考量價格。

根據 [Average Price for AWS Regions](https://cloudprice.net/aws/regions?sortField=__Geography&sortOrder=true) 這個網站 我會選擇用 Asia Pacific (Malaysia) ， 

因為價格較低，適合學生一開始練習，而且馬拉西亞離臺灣地理位置較近，但地理位置和延遲有關但不是絕對。

但到底是什麼原因會導致馬拉西亞價格是其他亞洲國家區域約 0.25 倍 ，有可能是當地基礎設施和營運成本比較低，或是當地的政府補助或稅務優惠，但便宜一定比較好嗎?

便宜的 Region 不一定總是最好的選擇，如果我的專案對延遲和穩定性要求較高時。我需要在成本和性能之間找到一個平衡點。

2. 如果我要建立一個持久的電商專案

除了考慮價格、延遲外，容錯性也值得考慮，涉及到錢的問題就需要認真應對。

如果專案對於容錯性要求高，那我可能需要考慮使用多個 Region 部署，以確保當一個區域發生故障時，其他區域可以持續運行， 另外一個方法是選擇有足夠多 AZ（Availability Zones）的 Region 來加強容錯性。




## B. Callback 練習

- [x] 完成 `callback.js` 的 callback 調用註冊 AWS 帳號

進階:
- [x] 使用 Promise 改善 callback 練習

## C. 建立 Express 專案

1. 建立 Express 專案
    - [x] 建立 `/backend` 資料夾
    - [x] 執行 `npm init`
    - [x] 安裝 express: `npm install express`
    - [x] 觀察 package.json 的變化
    - [x] 觀察 node_modules 目錄

2. 建立 `app.js`
    - [x] 建立 Express 基本應用程式
    - [x] 測試 server 是否正常運行

3. 修改 port number:
    - [x] 研究如何使用環境變數設定 port number

4. 回答問題:
    - [x] package.json 中的 dependencies 與 devDependencies 是什麼？
    - [x] package.json 中的 scripts 區塊怎麼用？
    - [x] 如何用環境變數來設定 port number？
    - [x] 哪些檔案應該上傳到 GitHub？描述決策的要素
    - [x] require 與 import/export 模組引用方式的比較 (CJS vs ESM)

進階:
- [x] localhost 是什麼？
- [x] `curl` 是什麼？如何用 `curl` 測試網路連線？

第三周的學習總結

- 開始接觸 AWS 平台， 了解 Region 和 AZ 概念，並掌握了如何選擇合適的區域。

- 透過 Callback 和 Promise 的練習，學習程式非同步的處理。

- 成功搭建 Express 專案，並運用環境變數動態設定 port。

- 理解 package.json 的 dependencies 與 scripts，學會 CJS 與 ESM 的模組系統差異。

- 學會了使用 curl 測試 HTTP 請求，對伺服器開發有了更實務的體驗。





#### 參考
- [Average Price for AWS Regions](https://cloudprice.net/aws/regions?sortField=__Geography&sortOrder=true)
