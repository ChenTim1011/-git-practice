今天開會有組員問什麼是 Restful API? 我也很好奇這種 API 和一般 API 的差別在哪?

Restful （Representational State Transfer） 是 一種規範 API 撰寫方法的原則，可以避免一些一般 API 設計會造成的問題。
一般 API 設計可能因為不同程式設計師撰寫風格差異，例如 api/addUser 和 api/createUser 差別。
雖然設計較為自由，但失去了 RESTful API 的規範化結構，因此在擴展性和標準化上可能略有不足，
造成 API 設計和使用上的麻煩，所以我們可以遵守 Restful API 的原則，避免以上的問題。 

RESTful API 是資源導向的，使用 HTTP 方法來定義不同的操作，比如 GET、POST、PUT 和 DELETE，並且路徑會直接映射到具體的資源
例如:

    GET /users （取得所有使用者）
    GET /users/:id （根據 ID 取得使用者）
    POST /users （建立使用者）
    PUT /users/:id （更新使用者）
    DELETE /users/:id （刪除使用者）

一般 API 通常會把每個操作直接表示為 API 動作名稱，可能會忽略 HTTP 方法的語義，所有請求都可能是 POST，並透過不同的路徑名稱表示不同的操作。

以下是更多關於 Restful API 的原則

1. 使用 HTTP 方法
RESTful API 主要透過 HTTP 方法來定義操作，並依照資源狀態的改變進行對應的操作。每個方法對應不同的操作：



    GET：從伺服器讀取資源。用於讀取資料，不應該改變伺服器上的狀態。
    
    POST：在伺服器建立資源。用來新增資料。
    
    PUT：更新整個資源。通常用於修改現有資源。
    
    PATCH：部分更新資源。只更新資源的部分內容。
    
    DELETE：刪除資源。

    例子：
    
    GET /users：獲取所有使用者。
    
    GET /users/1：獲取 ID 為 1 的使用者。
    
    POST /users：新增一個新使用者。
    
    PUT /users/1：更新 ID 為 1 的使用者訊息。

    DELETE /users/1：刪除 ID 為 1 的使用者。

2. 資源（Resources）應用 URL
    在 RESTful API 中，資源應以 URL 路徑來表示，並且應該是名詞形式。URL 應反映資源本身，而非操作動作。常見的做法是使用複數名詞來表示資源集合。

    例子：
    /users：表示使用者資源的集合。
    /users/1：表示 ID 為 1 的單一使用者資源。

3. 狀態碼（HTTP Status Codes）

    應該正確使用 HTTP 狀態碼來回應請求結果，這樣客戶端可以根據狀態碼了解請求是否成功或失敗：

    200 OK：請求成功，並返回所需的資源。

    201 Created：資源創建成功。
    
    204 No Content：請求成功，但無需返回任何內容（例
    如，DELETE 成功時）。
    
    400 Bad Request：客戶端發送的請求無效（例如，參數錯誤）。
    
    401 Unauthorized：需要驗證身份才能執行操作。
    
    403 Forbidden：伺服器理解請求但拒絕執行（通常是權限問題）。
    
    404 Not Found：請求的資源不存在。
    
        500 Internal Server Error：伺服器內部錯誤。

4. 無狀態（Statelessness）

    RESTful API 應遵循無狀態原則，每個請求都是獨立的，伺服器不會在請求之間保存客戶端的任何狀態訊息。所有需要的訊息應該由客戶端在每個請求中提供（例如認證憑證）。

5. 正確處理錯誤

    API 應明確返回錯誤訊息和 HTTP 狀態碼，並且錯誤回應應包含有助於解釋錯誤的資訊。

6. 使用 JSON 

    通常，RESTful API 返回的資料格式應為 JSON（因為 JSON 是輕量且易於解析的格式）。

7. 遵循一致的命名規範

    API 的 URL 應該保持一致性，具備可讀性和可預測性。以下是一些命名規範的要點：

    使用 小寫字母，並以連字符（-）分隔詞彙（不使用駝峰或下劃線）。

    避免動詞，應該使用名詞來代表資源。

    使用複數名詞來代表資源集合（例如 /users，而不是 /user）。


    例子：

    /users：使用者集合

    /users/1：單個使用者

    /products/123/reviews：產品的評論集合
