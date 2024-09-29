## A. 註冊 AWS 帳號

- [x] 註冊 AWS 帳號

- [x] 什麼是 AWS Region, AZ (availability zones)

在 AWS Regions 選單可以看到有不同地區可以選，AWS 服務部署在全球各地的不同地理區域，每個區域都有自己的基礎設施和服務，
來提供不同地區的使用者使用 AWS 的服務。 AZ (availability zones) 是位於同一區域內的多個獨立資料中心。每個 AZ 都有獨立設備，並透過低延遲連接彼此。
好處是可以防止單點故障影響整個區域，當某一點壞掉可以替換成另外一個，提高容錯性。 

- [x] 如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？

我會考量價格和速度。
我會選擇用 Asia Pacific (Malaysia) ， 因為馬拉西亞的平均價格是較低，而且馬拉西亞離臺灣地理位置較近，延遲比較低。

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






#### 參考
- [Average Price for AWS Regions](https://cloudprice.net/aws/regions?sortField=__Geography&sortOrder=true)
