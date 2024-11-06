# MongoDB

[RoadMap MongoDB](https://roadmap.sh/mongodb)

## SQL VS NoSQL

## SQL 資料庫

SQL 資料庫又稱為關聯式資料庫，採用固定的結構（schema），資料以表格形式存放，表格由 row 和 column 組成。
SQL 資料庫遵循 ACID 原則（Atomicity, Consistency, Isolation, Durability），確保 transactions 的可靠性。
常見的 SQL 資料庫包括 MySQL、PostgreSQL 等等。

**SQL 資料庫的優點：**

- **預定義的 schema**：適合結構固定的應用程式。
- **ACID transactions**：確保資料一致性和可靠性。
- **支持複雜查詢**：豐富的 SQL 查詢語法能處理複雜的資料關係和聚合操作。
- **擴展性**：通過增加伺服器資源（如記憶體、CPU）進行垂直擴展。

**SQL 資料庫的局限：**

- **結構固定**：更新資料結構較為耗時，甚至可能導致系統停機。
- **擴展困難**：橫向擴展（將資料分片到多個伺服器）較為複雜。
- **不適合層次結構的資料**：需要多個表和 JOIN 操作來模擬樹狀結構。

## NoSQL 資料庫

NoSQL (非關聯式資料庫)，沒有固定的資料結構。資料通常以靈活的半結構格式存放，如 JSON 文件、鍵值對或圖形結構。
常見的 NoSQL 資料庫包括 MongoDB、Cassandra、Redis 和 Couchbase。

**NoSQL 資料庫的優點：**

- **靈活的 schema**：可以輕鬆調整資料結構，不會影響應用程式運行。
- **擴展性**：透過分片（將資料分散到多個伺服器）進行橫向擴展，處理大規模資料更輕鬆。
- **速度快**：設計上能夠更快速地讀取和寫入資料，並且查詢語言通常比較簡單。
- **處理巨量資料能力**：更適合管理大量資料和即時應用程式。
- **支持多樣化資料結構**：不同的 NoSQL 資料庫能應對不同的需求，如文件型、圖型或鍵值存儲。

**NoSQL 資料庫的局限：**

- **查詢能力有限**：某些 NoSQL 資料庫不支持複雜查詢和聚合操作，或者使用特定的查詢語言。
- **一致性較弱**：許多 NoSQL 資料庫遵循 BASE 原則（基本可用、軟狀態、最終一致性），在一致性保障上比 ACID 標準更弱。

我們專注在介紹 MongoDB


## 什麼是 MongoDB ?

MongoDB 是一個開源、基於文件的跨平台 NoSQL 資料庫，提供高效能、高可用性和簡單的擴展能力。
它與傳統的關聯式資料庫不同，採用靈活且無結構的資料模型，使用 BSON（二進位 JSON）格式來儲存資料，能夠輕鬆地處理非結構化的資料，且易於查詢。

## MongoDB 的主要特點

- **Document-oriented**：MongoDB 以類似 JSON 的文件（BSON 格式）來儲存資料，這種資料模型可以靈活表示真實世界的物件結構。
  
- **Scalability**：MongoDB 支持自動擴展，可以通過分片（將資料分散到多個伺服器）來水平擴展，也可以通過增加儲存空間來垂直擴展。

- **Indexing**：MongoDB 支持對文件中的任意屬性建立索引，來提升查詢效能。

- **Replication**：MongoDB 通過複製集提供高可用性，複製集包含主要和次要節點，這些節點保存資料的副本，確保系統穩定性。

- **Aggregation**：MongoDB 提供強大的聚合框架，能執行複雜的資料操作，如轉換、過濾和排序。

- **Support for ad hoc queries**：MongoDB 支持通過字段、範圍和正規表達式來進行靈活的資料查詢。

## 什麼時候使用 MongoDB

需要處理大量資料，並且這些資料可能需要頻繁的讀取和寫入時，MongoDB 是很好的選擇。
它提供高效能，並且可以通過水平擴展（sharding）和複製（replication）來將資料分散到多台伺服器，減輕單一伺服器的負擔。

- **Big Data**：MongoDB 的靈活資料模型和水平擴展能力，非常適合處理大量的非結構化或半結構化資料。

- **Real-time analytics**：MongoDB 的聚合框架和索引功能，可以幫助即時分析和處理資料。

- **Content management**：憑藉其動態結構，MongoDB 能夠處理各種不同類型的內容，非常適合用於內容管理系統。

- **IoT applications**：MongoDB 可以從大量設備和感測器中獲得和儲存資料，特別適用於物聯網場景。

- **Mobile applications**：MongoDB 提供靈活的資料模型，非常適合行動應用多變的需求和不同類型的資料。



#### MongoDB 基礎


## 基本概念名詞

- **集合（Collection）**：一組相關的文件，類似於關聯式資料庫中的表格。

- **文件（Document）**： collection 中的單一記錄，由多個欄位組成，類似於關聯式資料庫中的「一行資料」。然而，與關聯式資料庫不同，MongoDB 的文件沒有強制的結構或 schema。

- **欄位（Field）**：文件中的一個鍵值對，類似於表格中的一個欄位。

- **_id**：每個文件都有一個唯一的 `_id`，MongoDB 會自動生成。

- **索引（Index）**：索引是用來加速常見查詢操作的資料結構。索引將部分資料儲存在一個有序的結構中，
讓 MongoDB 能更快速地搜尋和排序文件，減少掃描的資料量。

- **查詢（Query)**：查詢是用來從資料庫中搜尋資料。它可以根據特定條件從 collection 中獲取指定的文件或部分文件。

- **游標（Cursor）**：游標是一個指向查詢結果 collection 的指標。它讓開發者能夠逐個處理查詢結果中的文件。

- **聚合（Aggregation）**：聚合是對 collection 中儲存的資料進行彙總和轉換的過程。它用來執行複雜的分析操作，或生成資料摘要報告。

- **複製集（Replica Set）**：複製集是指一組 MongoDB 實體，這些實例會維護相同的資料集。這提供了資料冗餘、高可用性，並能在主要節點無法存取時自動切換到次要節點。

- **分片（Sharding）**：分片是一種將資料分散到多台機器上的方法。MongoDB 使用分片來進行水平擴展，將資料集劃分成更小、更易管理的資料塊，稱為「分片」。

## 基本操作

- **插入（Insert）**：插入一筆資料用 `db.collection.insertOne()`，插入多筆資料用 `db.collection.insertMany()`。

- **查詢（Find）**：用 `db.collection.find()` 從 collection 中查詢資料，並用查詢條件來篩選，例如 `{field: value}`。如果只需要查一筆資料，可以用 `db.collection.findOne()`。

- **更新（Update）**：用 `$set` 和 `$unset` 這類更新操作符來更新欄位，使用 `db.collection.updateOne()` 或 `db.collection.updateMany()` 可以更新一筆或多筆資料。

- **刪除（Delete）**：用 `db.collection.deleteOne()` 或 `db.collection.deleteMany()` 來刪除一筆或多筆資料，根據給定的條件。

- **刪除 collection 或資料庫（Drop）**：用 `db.collection.drop()` 刪除 collection ，或用 `db.dropDatabase()` 刪除整個資料庫。

## 索引和聚合

- **索引（Indexes）**：在 collection 的欄位上建立索引（用 `db.collection.createIndex()`），可以加快搜尋速度。如果需要查詢多個欄位，也可以建立複合索引。

- **聚合（Aggregations）**：執行更複雜的資料處理任務，比如篩選、分組、轉換和排序，可以使用像 `$match`、`$group`、`$project` 和 `$sort` 這類聚合操作。

## 資料建模

MongoDB 有靈活的結構，可以用不同的方式來設計資料模型：

- **嵌入文件（Embedded Documents）**：將相關資料放在同一個文件中，適合一對一或一對少數的關係。

- **正規化（Normalization）**：將相關資料分開儲存，並用引用連接，適合一對多或多對多的關係。

- **混合方式（Hybrid Approach）**：結合嵌入文件和正規化，平衡性能和儲存需求。


## MongoDB Atlas 的主要功能和優點

MongoDB Atlas 是一個完全託管的雲端資料庫服務，由 MongoDB 團隊開發並維護。它可以在主要的雲端供應商平台上使用，比如 AWS、Azure 和 Google Cloud Platform。這讓開發者可以輕鬆且高效地部署、管理和擴展他們的 MongoDB 集群


- **資料庫即服務（DBaaS）**：MongoDB Atlas 會處理與資料庫相關的操作，比如備份、監控、擴展和安全性，讓開發者可以專注於應用程式開發，而不需要擔心資料庫的管理工作。

- **全球集群支援**：Atlas 可以讓你建立全球分佈的集群，將資料儲存並複製到多個地區，提升效能、確保高可用性，並減少延遲。

- **安全性**：Atlas 提供內建的安全功能，例如端到端加密、基於角色的存取控制和 IP 白名單，確保你的資料安全，並符合行業標準。

- **效能**：MongoDB Atlas 提供效能監控和優化工具，如效能顧問和索引建議，幫助你保持資料庫的高效運行速度。

- **輕鬆擴展**：使用 Atlas，你可以根據需求輕鬆進行垂直或水平擴展。Atlas 支持自動擴展儲存空間和計算資源，讓你的資料庫能夠自動應對負載變化。

- **資料自動化與整合**：Atlas 容易整合其他服務，比如 BI 工具和無伺服器（serverless）功能。該平台還支持從本地或其他雲端部署輕鬆遷移資料。


## BSON vs JSON
雖然 BSON 和 JSON 之間有關聯，但在 MongoDB 中，它們的用途有所不同：

- **BSON**：MongoDB 使用 BSON 作為內部的二進位格式，以便高效地儲存和搜尋資料，並支援更多的原生資料類型。

- **JSON**：由於 JSON 更易於閱讀且被廣泛使用，它通常用於 MongoDB 和應用程式之間的資料交換。

## BSON

BSON 是一種將類 JSON 文件編碼成二進位的序列化格式，能夠提升儲存效率、資料遍歷速度和編碼/解碼效能而設計

- **二進位編碼**：BSON 使用二進位格式編碼資料，能提供更好的效能，並支援 JSON 不支持的資料類型。

- **支援更多資料類型**：BSON 比 JSON 支援更多類型，比如日期（Date）、二進位資料（Binary）、物件 ID（ObjectId）
和高精度數字（Decimal128）。這讓 MongoDB 文件能夠更準確地表示多樣化的資料。

- **高效的資料走訪**：BSON 編碼時會將每個元素的大小存入，這讓資料走訪更快速，因為可以輕鬆跳過不需要的元素。

## JSON

JSON 是一種輕量且可讀性強的資料表示格式，許多程式語言都能輕鬆解析和生成。它廣泛用於網路上資料的傳輸。以下是 JSON 的一些特點：

- **人類可讀**：JSON 是純文本格式，結構簡單，讓人們容易閱讀和撰寫。

- **跨平台互通性強**：JSON 能夠被許多不同的程式語言輕鬆解析和生成，因此非常適合用於應用程式之間的資料交換。

- **資料類型有限**：JSON 支援的資料類型較少，比如字串、數字、布林值和 null。這意味著像日期或二進位資料這類類型，必須以字串或自定義物件的方式表示。


## 什麼是嵌入文件陣列？

Embedded Documents Arrays 是在需要表示「一對多」或「層次結構」的資料關係時使用的結構。它讓我們可以直接將相關的文件嵌入在主要文件裡，利用陣列的方式來儲存，而不是建立多個 collection 並使用引用來連結資料。

例如，下方的文件包含一個嵌入的地址陣列，儲存了多筆地址資訊：

```json
{
    _id: 1,
    name: 'John Doe',
    addresses: [
        {
            street: '123 Main St',
            city: 'New York',
            zipcode: '10001'
        },
        {
            street: '456 Broadway',
            city: 'Los Angeles',
            zipcode: '90001'
        }
    ]
}
```

## 嵌入文件陣列的優點

1. **讀寫效能高**：因為相關資料存放在同一個文件中，查詢和寫入操作可以一次性完成，不需要多次查詢或更新。
   
2. **資料一致性**：把相關資料存一起，能確保資料的一致性，不需要透過「JOIN」或跨文件的引用來同步更新。
   
3. **可擴充性**：嵌入文件可以一層層嵌套，方便我們表現複雜的資料結構，同時保持結構靈活且效能高。

## 什麼時候應該使用嵌入文件陣列？

- 需要表達一對多的關係
- 嵌入的資料不會無限制成長
- 嵌入的資料與主要文件有關聯性
- 希望改善讀寫效能

不過要注意，MongoDB 每個文件有 16MB 的大小限制，所以如果預期嵌入的資料會隨著時間增加過多，
建議使用獨立的 collection 並採用引用方式來儲存資料。

## 查詢嵌入文件陣列

MongoDB 提供許多陣列查詢運算符號，例如 `$elemMatch`、`$all` 和 `$size`，
讓我們可以很方便地查詢和更新嵌入文件中的資料，也可以透過「點標記法」來指定特定的子文件欄位。

例如，查詢所有地址包含「123 Main St」的使用者，可以這樣撰寫：

```javascript
db.users.find({ 'addresses.street': '123 Main St' });
```

嵌入文件陣列讓 MongoDB 在管理複雜的資料關係時依然能保持高效和靈活。
但使用時需考量資料的增長情況，才能發揮 MongoDB 的彈性和擴展性。


## MongoDB 常見資料型態

在 MongoDB 中，資料是以 BSON 格式儲存，BSON 支援多種資料型態。

1. **ObjectId**
   - ObjectId 是 12 位元的唯一識別碼，用來作為文件的 `_id` 欄位的預設值，確保在 collection 中的每筆文件都有唯一性。

2. **String**
   - 用來儲存文字資料，必須是有效的 UTF-8 編碼字串。
   - 例如：`{ "name": "John Doe" }`

3. **Boolean**
   - 用來儲存布林值，即 `true` 或 `false`。
   - 例如：`{ "isActive": true }`

4. **Integer**
   - 用來儲存整數，MongoDB 支援兩種整數型態：32 位元（int）和 64 位元（long）。
   - 例如：`{ "age": 28 }`

5. **Double**
   - 用來儲存浮點數，即有小數點的數值。
   - 例如：`{ "price": 12.99 }`

6. **Date**
   - 用來儲存日期和時間，以 Unix 時間格式（從 1970 年 1 月 1 日起的毫秒時間戳記）儲存。
   - 例如：`{ "createdAt": ISODate("2019-02-18T19:29:22.381Z") }`

7. **Array**
   - 用來儲存一組值的列表，列表中的值可以是不同的資料型態。
   - 例如：`{ "tags": ["mongodb", "database", "noSQL"] }`

8. **Object**
   - 用來儲存嵌入的文件，即文件中可以包含其他子文件，這是一種方便的資料嵌套方式。
   - 例如：`{ "address": { "street": "123 Main St", "city": "San Francisco", "state": "CA" } }`

9. **Null**
   - 用來儲存空值，表示該欄位沒有值。
   - 例如：`{ "middleName": null }`

10. **Binary Data**
    - 用來儲存二進位資料或位元組陣列。
    - 例如：`{ "data": BinData(0, "c3VyZS4=") }`

11. **Code** (比較特別)
    - 用來儲存 JavaScript 程式碼。
    - 例如：`{ "script": Code("function() { return 'Hello, World!'; }") }`

12. **Regular Expression** (比較特別)
    - 用來儲存正規表達式。
    - 例如：`{ "pattern": /^mongodb/i }`


## MongoDB Code Datatype 


例如可以用 JavaScript 當作是資料型態，可以直接在資料庫內儲存和操作程式碼。
這特別適合需要更高彈性、無法用標準 BSON 資料型態處理的複雜資料結構。

你可以將 JavaScript 程式碼以字串方式直接儲存在 MongoDB 裡，或在 MongoDB 的 `mongo` 指令操作台和伺服器上執行 JavaScript 函數。儲存 JavaScript 的方式有兩種：透過 Code BSON 資料型態
或 `$function` （4.4 版加入的功能）來實做。

## 儲存 JavaScript 範例

用 Code BSON 資料型態來儲存簡單的函數：
```javascript
db.scripts.insert({
  name: 'helloWorld',
  code: new Code("function() { return 'Hello World!'; }"),
});       
```
或者也可以用 `$function` 來計算體積：
```javascript
db.collection.aggregate([
  {               
    $addFields: {
      volume: {
        $function: {
          body: 'function(l, w, h) { return l * w * h; }',
          args: ['$length', '$width', '$height'],
          lang: 'js',
        },
      },
    },
  },
]);
```

### 使用 JavaScript 和 Map-Reduce

MongoDB 的 Map-Reduce 可以使用 JavaScript 函數。
Map-Reduce 是處理大型資料集的方法，它透過「map 函數」逐漸處理文件，再透過「reduce 函數」匯總結果。
使用 JavaScript 可以大大增加 Map-Reduce 的靈活性和表現力。

Map-Reduce 使用 JavaScript 的例子：
```javascript
var map = function () {
  emit(this.category, this.price);
};

var reduce = function (key, values) {
  return Array.sum(values);
};

db.products.mapReduce(map, reduce, { out: 'total_by_category' });
```

### 限制

1. **效能**：相比 BSON 的原生查詢，JavaScript 的執行速度較慢，不適合高效能需求的應用。
2. **並行性**：MongoDB 的 JavaScript 執行是單執行緒，可能導致並行量降低，若多個操作依賴 JavaScript 執行，會有阻塞風險。
3. **安全性**：儲存和執行 JavaScript 有潛在的安全風險，例如可能受到程式碼注入攻擊。務必做好驗證和角色管理來降低風險。


## MongoDB 中的正規表達式

正規表達式用來在文字字串中搜尋特定的模式。正規表達式特別適合處理文字資料，或是在查詢時不要求完全符合的情況下使用。

1. **JavaScript 正規表達式語法**：用 `/pattern/flags`，例如 `/example/i`，其中 `i` 代表忽略大小寫。

2. **BSON 類型的 RegExp**：用 `new RegExp('pattern', 'flags')`，例如 `new RegExp('example', 'i')`。


```javascript
// 找出包含 'NCCU' 的文件，忽略大小寫
var regex = /NCCU/i; // JavaScript 正規語法
var bsonRegex = new RegExp('NCCU', 'i'); // BSON 正規語法
```

## 使用正規表達式進行查詢
使用 `$regex` 或直接使用正規表達式來進行查詢：

```javascript
db.collection.find({ field: /NCCU/i }); // 直接用正規表達式
db.collection.find({ field: { $regex: /NCCU/i } }); // 用 $regex 運算符
```

## 正規表達式的標誌（Flags )
MongoDB 支援多種標誌，可以讓你的比對更靈活：

- `i`：忽略大小寫
- `m`：多行比對
- `x`：忽略模式中的空白和註解
- `s`：允許 `.` 比對所有字元，包括換行符

例如，進行忽略大小寫且多行比對的查詢：

```javascript
db.collection.find({ field: { $regex: /NCCU/im } });
```

## 特殊字元的跳脫
在正規表達式中，有些字元具有特殊意義，如 `.`（比對任意字元）、`*`（比對零或多個重複）。
若要搜尋這些字元的字面意義，要使用反斜線 `\` 跳脫。
```javascript
db.collection.find({ field: /www.google\.com/i }); // 尋找 'www.google.com'
```

## MongoDB 中的 collection 的關鍵特色

Collection 就像是一個容器，用來組織和儲存文件。你可以把它想成關聯式資料庫中的「資料表」，
但和資料表不同的是， collection 不會強制要求固定的結構（schema），所以管理資料更靈活。

- **靈活的結構**： collection 中的文件可以有不同的結構或欄位，這讓你可以儲存無結構或半結構的資料，非常適合變動大的應用。
- **動態性**： collection 可以自動建立，也可以手動建立，文件的增刪對 collection 中的其他文件不會有影響。

## 如何建立 collection

在 MongoDB 中建立 collection 有兩種方式：

1. **隱式建立**：當你直接插入一筆資料到一個不存在的 collection 時，MongoDB 會自動建立這個 collection 。
2. **顯式建立**：用 `db.createCollection(name, options)` 明確地建立 collection ，例如：

   ```javascript
   db.createCollection('users', { capped: true, size: 100000, max: 5000 });
   ```

可以設定 collection 的選項，例如 `capped`（限制 collection ）、大小和最大文件數量。

### 管理 collection 的方法

- **插入文件**：用 `insertOne()` 或 `insertMany()` 插入文件，例如：
  
  ```javascript
  db.users.insertOne({ name: 'John Doe', age: 30, email: 'john@example.com' });
  
  db.users.insertMany([
    { name: 'Jane Doe', age: 28, email: 'jane@example.com' },
    { name: 'Mary Jane', age: 32, email: 'mary@example.com' },
  ]);
  ```

- **查詢文件**：用 `find()` 查詢 collection 中的文件，例如：

  ```javascript
  db.users.find({ age: { $gt: 30 } });
  ```

- **更新文件**：用 `updateOne()`、`updateMany()` 或 `replaceOne()` 更新 collection 中的文件，例如：

  ```javascript
  db.users.updateOne({ name: 'John Doe' }, { $set: { age: 31 } });
  
  db.users.updateMany({ age: { $gt: 30 } }, { $inc: { age: 1 } });
  ```

- **刪除文件**：用 `deleteOne()` 或 `deleteMany()` 刪除文件，例如：

  ```javascript
  db.users.deleteOne({ name: 'John Doe' });
  
  db.users.deleteMany({ age: { $lt: 30 } });
  ```

- **刪除 collection**：要刪除整個 collection ，可以用 `drop()` 方法，例如：

  ```javascript
  db.users.drop();
  ```



### Query Operators

MongoDB 的查詢運算符號可以讓我們更靈活地搜尋和操作集合中的文件。

## 比較運算符號 (Comparison Operators)

比較運算符用於將欄位值與指定值進行比對，常見的包括：

- **$eq**：配對等於指定值的文件。
- **$gt**：配對大於指定值的文件。
- **$gte**：配對大於或等於指定值的文件。
- **$lt**：配對小於指定值的文件。
- **$lte**：配對小於或等於指定值的文件。
- **$ne**：配對不等於指定值的文件。
- **$in**：配對欄位值在指定陣列中的文件。
- **$nin**：配對欄位值不在指定陣列中的文件。

### 邏輯運算符號 (Logical Operators)
邏輯運算符用來組合多個查詢條件，常見的有：

- **$and**：配對所有指定條件都為真的文件。
- **$or**：配對任一指定條件為真的文件。
- **$not**：配對條件不為真的文件。
- **$nor**：配對所有指定條件都不為真的文件。

### 元素運算符號 (Element Operators)
元素運算符專門用於篩選文件中特定的元素，包括：

- **$exists**：配對包含指定欄位的文件。
- **$type**：配對指定欄位的 BSON 類型為指定類型的文件。

### 評估運算符號 (Evaluation Operators)
評估運算符用於對特定欄位和值進行操作，比如正則表達式查詢或檢查陣列大小。常見的有：

- **$expr**：允許在查詢語句中使用聚合運算式。
- **$jsonSchema**：配對符合指定 JSON Schema 的文件。
- **$mod**：配對指定欄位值可以被除數整除並得到指定餘數的文件。
- **$regex**：配對欄位值符合指定正則表達式的文件。
- **$text**：在文件的索引欄位內容上進行全文檢索。
- **$where**：配對滿足指定 JavaScript 表達式的文件。

### 陣列運算符號 (Array Operators)
陣列運算符用於處理包含陣列的文件，常見的包括：

- **$all**：配對陣列欄位包含所有指定值的文件。
- **$elemMatch**：配對陣列欄位至少有一個元素符合指定條件的文件。
- **$size**：配對陣列欄位具有指定元素數量的文件。

### 位元運算符號 (Bitwise Operators)
位元運算符用於對整數值進行位元操作，常見的有：

- **$bitsAllClear**：配對指定欄位所有位元在位元遮罩中都為清除狀態（0）的文件。
- **$bitsAllSet**：配對指定欄位所有位元在位元遮罩中都為設置狀態（1）的文件。
- **$bitsAnyClear**：配對指定欄位任一位元在位元遮罩中為清除狀態（0）的文件。
- **$bitsAnySet**：配對指定欄位任一位元在位元遮罩中為設置狀態（1）的文件。
