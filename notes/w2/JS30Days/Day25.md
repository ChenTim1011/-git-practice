[Problems](https://leetcode.com/problems/join-two-arrays-by-id/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Join Two Arrays by ID

當然！我來整理這段程式碼的完整教學，幫助您了解如何根據 `id` 合併兩個陣列 `arr1` 和 `arr2`，並以 JavaScript 實做此需求。

### 問題描述

給定兩個陣列 `arr1` 和 `arr2`，每個陣列中的物件都有一個唯一的 `id` 欄位。目的是生成一個新陣列 `joinedArray`，按以下規則合併兩個陣列中的物件：

1. **唯一 `id`**：新陣列中的每個 `id` 都是唯一的。
2. **值覆蓋規則**：如果 `arr1` 和 `arr2` 都有相同 `id` 的物件，則 `arr2` 中的屬性值覆蓋 `arr1` 的。
3. **排序**：結果按照 `id` 升序排序。

### 解決方案

我們可以利用 JavaScript 中的 `concat` 方法合併兩個陣列，並使用物件來處理 `id` 為鍵的合併邏輯。以下是完整的程式碼及步驟說明：

### 程式碼

```javascript
var join = function(arr1, arr2) {
    // 合併兩個陣列
    let items = arr1.concat(arr2);
    // 初始化一個空物件，用來儲存合併後的結果
    let result = {};

    // 走訪合併後的陣列
    for (const obj of items) {
        // 如果 result 中沒有當前物件的 id，則直接存入
        if (!result[obj.id]) {
            result[obj.id] = obj;
            continue;
        }
        // 如果 result 中已經有相同 id 的物件，使用展開運算符合併，覆蓋 arr1 的值
        result[obj.id] = { ...result[obj.id], ...obj };
    }

    // 使用 Object.values 轉換為陣列並回傳，會自動按數字 id 排序
    return Object.values(result);
};
```

### 步驟解析

1. **合併陣列**：
   - 使用 `arr1.concat(arr2)` 將 `arr1` 和 `arr2` 連接成一個新陣列 `items`。
   - 這個新陣列包含了 `arr1` 和 `arr2` 中的所有物件。

2. **初始化 `result`**：
   - 建立一個空的 `result` 物件，用來儲存合併後的結果。
   - `result` 的每個鍵（key）是物件的 `id`，而值（value）是物件本身。

3. **走訪 `items` 陣列**：
   - 使用 `for...of` 迴圈走訪 `items` 中的每個物件 `obj`。
   - 如果 `result` 中還沒有該 `id` 的物件，則直接把 `obj` 加入 `result` 中。
   - 如果 `result` 中已經存在相同的 `id`，則合併物件（`result[obj.id]` 和 `obj`），並讓 `obj` 的屬性值覆蓋原有的屬性值。這是透過展開運算符 `{...result[obj.id], ...obj}` 來實作的。

4. **回傳結果陣列**：
   - 使用 `Object.values(result)` 將 `result` 中的值（每個物件）轉換成陣列並回傳。
   - 由於 `result` 的鍵是數字 `id`，`Object.values` 回傳的陣列會自動按照 `id` 的數字順序排序，因此不需要額外的排序步驟。

