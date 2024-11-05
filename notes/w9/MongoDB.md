# MongoDB

[RoadMap MongoDB](https://roadmap.sh/mongodb)

## 什麼是 MongoDB ?

MongoDB 是一個開源、基於文件的跨平台 NoSQL 資料庫，提供高效能、高可用性和簡單的擴展能力。
它與傳統的關聯式資料庫不同，採用靈活且無結構的資料模型，使用 BSON（二進位 JSON）格式來儲存資料，能夠輕鬆地處理非結構化的資料，且易於查詢。

## MongoDB 的主要特點

- **Document-oriented**：MongoDB 以類似 JSON 的文件（BSON 格式）來儲存資料，這種資料模型可以靈活表示真實世界的物件結構。
  
- **Scalability**：MongoDB 支持自動擴展，可以通過分片（將資料分散到多個伺服器）來水平擴展，也可以通過增加儲存空間來垂直擴展。

- **Indexing**：MongoDB 支持對文件中的任意屬性建立索引，來提升查詢效能。

- **Replication**：MongoDB 通過複製集提供高可用性，複製集包含主要和次要節點，這些節點保存資料的副本，確保系統穩定性。

- **Aggregation**：MongoDB 提供強大的聚合框架，能執行複雜的資料操作，如轉換、過濾和排序。

- **Support for ad hoc queries**：MongoDB 支持通過字段、範圍和正則表達式來進行靈活的資料查詢。

## 什麼時候使用 MongoDB

- **Big Data**：MongoDB 的靈活資料模型和水平擴展能力，非常適合處理大量的非結構化或半結構化資料。

- **Real-time analytics**：MongoDB 的聚合框架和索引功能，可以幫助即時分析和處理資料。

- **Content management**：憑藉其動態結構，MongoDB 能夠處理各種不同類型的內容，非常適合用於內容管理系統。

- **IoT applications**：MongoDB 可以從大量設備和感測器中獲得和儲存資料，特別適用於物聯網場景。

- **Mobile applications**：MongoDB 提供靈活的資料模型，非常適合行動應用多變的需求和不同類型的資料。



#### MongoDB 基礎


## 基本概念名詞

- **資料庫（Database）**：用來存放 MongoDB 中的所有集合。
- **集合（Collection）**：一組相關的文件，類似於關聯式資料庫中的表格。
- **文件（Document）**：集合中的單一記錄，以 BSON（類 JSON 的二進位格式）儲存。
- **欄位（Field）**：文件中的一個鍵值對，類似於表格中的一個欄位。
- **_id**：每個文件都有一個唯一的 `_id`，MongoDB 會自動生成。

## 基本操作

- **插入（Insert）**：插入一筆資料用 `db.collection.insertOne()`，插入多筆資料用 `db.collection.insertMany()`。
- **查詢（Find）**：用 `db.collection.find()` 從集合中查詢資料，並用查詢條件來篩選，例如 `{field: value}`。如果只需要查一筆資料，可以用 `db.collection.findOne()`。
- **更新（Update）**：用 `$set` 和 `$unset` 這類更新操作符來更新欄位，使用 `db.collection.updateOne()` 或 `db.collection.updateMany()` 可以更新一筆或多筆資料。
- **刪除（Delete）**：用 `db.collection.deleteOne()` 或 `db.collection.deleteMany()` 來刪除一筆或多筆資料，根據給定的條件。
- **刪除集合或資料庫（Drop）**：用 `db.collection.drop()` 刪除集合，或用 `db.dropDatabase()` 刪除整個資料庫。

## 索引和聚合

- **索引（Indexes）**：在集合的欄位上建立索引（用 `db.collection.createIndex()`），可以加快搜尋速度。如果需要查詢多個欄位，也可以建立複合索引。
- **聚合（Aggregations）**：執行更複雜的資料處理任務，比如篩選、分組、轉換和排序，可以使用像 `$match`、`$group`、`$project` 和 `$sort` 這類聚合操作。

## 資料建模

MongoDB 有靈活的結構，可以用不同的方式來設計資料模型：

- **嵌入文件（Embedded Documents）**：將相關資料放在同一個文件中，適合一對一或一對少數的關係。
- **正規化（Normalization）**：將相關資料分開儲存，並用引用連接，適合一對多或多對多的關係。
- **混合方式（Hybrid Approach）**：結合嵌入文件和正規化，平衡性能和儲存需求。

