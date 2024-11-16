[Problems](https://leetcode.com/problems/compact-object/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Compact Object

這段程式碼的目的是過濾掉物件或陣列中不需要的「假值」（例如：`null`、`undefined`、`0`、`""`等），並保留所有的「真值」元素。因為物件或陣列內部可能還包含子物件或子陣列，所以需要透過遞迴來逐層處理每一層。

### 具體步驟說明
#### 步驟 1：檢查 `obj` 是否為 `null`
- `if (obj === null) return null;`
   - 當 `obj` 為 `null` 時，直接回傳 `null`，因為 `null` 本身已經是單一值，無法進一步遞迴處理。

#### 步驟 2：檢查 `obj` 是否為陣列
- `if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);`
   - 使用 `Array.isArray(obj)` 檢查 `obj` 是否為陣列。
   - 若 `obj` 是陣列，先用 `filter(Boolean)` 過濾掉假值。`Boolean` 函數將自動將假值（如 `0`、`null`、`undefined`、`""` 等）轉為 `false`，因此只有真值會保留。
   - 然後，使用 `map(compactObject)` 對過濾後的每個元素再次遞迴調用 `compactObject`，確保陣列中的所有層級都被處理。

#### 步驟 3：檢查 `obj` 是否為物件
- `if (typeof obj !== "object") return obj;`
   - 若 `obj` 既不是 `null` 也不是陣列，而且也不是物件（即不是可遞迴的資料結構），則直接回傳 `obj`，因為它可能是數字、字串等原始類型值，不需要進一步處理。

#### 步驟 4：處理物件
- `const compacted = {};`
   - 若前三個條件都不成立，則表示 `obj` 是物件。此時需要創建一個新的空物件 `compacted` 來存放過濾後的鍵值對。

#### 步驟 5：遞迴處理物件的每個鍵值對
- `for (const key in obj) {`
   - 使用 `for...in` 迴圈走訪 `obj` 的每個鍵。
   - `let value = compactObject(obj[key]);`
     - 對每個鍵的值呼叫 `compactObject`，進行遞迴處理，進一步去除假值。
   - `if (value) compacted[key] = value;`
     - 若處理後的 `value` 是真值，則將此鍵值對添加到 `compacted` 中。
   - 這一步的目的在於只保留具有真值的鍵值對，並刪除那些對應假值的鍵值對。

#### 步驟 6：回傳結果
- `return compacted;`
   - 完成物件的走訪後，回傳過濾後的 `compacted` 物件。

### 完整程式碼
```javascript
var compactObject = function(obj) {
    // 1. 若 obj 為 null，則直接回傳 null
    if (obj === null) return null;
    
    // 2. 若 obj 是陣列，過濾並遞迴處理每個元素
    if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);
    
    // 3. 若 obj 為原始類型，直接回傳
    if (typeof obj !== "object") return obj;

    // 4. 若 obj 是物件，建立空物件 compacted
    const compacted = {};
    
    // 5. 走訪物件中的每個鍵值對，遞迴處理值
    for (const key in obj) {
        let value = compactObject(obj[key]);
        if (value) compacted[key] = value;
    }

    // 6. 回傳 compacted 物件
    return compacted;
};
```
