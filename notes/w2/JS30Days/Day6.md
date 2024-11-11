[Problems](https://leetcode.com/problems/filter-elements-from-array/description/?envType=study-plan-v2&envId=30-days-of-javascript)


---
##  filter-elements-from-array


這題的目標是自己實作一個「篩選」函式，該函式會接收一個整數陣列 `arr` 和一個函數 `fn`，並回傳一個僅包含符合條件的元素的新陣列 `filteredArr`。我們不使用內建的 `Array.filter` 方法，而是自己手動實作篩選邏輯。

### 問題分析

1. `fn` 函數接收兩個參數：
   - `arr[i]`：`arr` 中的每個元素
   - `i`：`arr` 中每個元素的索引
2. `fn` 函數會根據條件回傳一個「真值」或「假值」：
   - 真值：當 `Boolean(value)` 回傳 `true` 時，該值為真值。
   - 假值：當 `Boolean(value)` 回傳 `false` 時，該值為假值。
3. 如果 `fn(arr[i], i)` 為真值，則將 `arr[i]` 加入新陣列 `filteredArr`；反之則不加入。

### 具體步驟

1. 創建一個空的陣列 `filteredArr` 來儲存符合條件的元素。
2. 使用 `for` 迴圈走訪 `arr` 中的每個元素：
   - 每次迭代中，我們用 `fn(arr[i], i)` 檢查該元素是否符合條件。
   - 若 `fn(arr[i], i)` 為真值，則將該元素 `arr[i]` 加入到 `filteredArr`。
3. 回傳最終的 `filteredArr`。

### 程式碼實作

以下是程式碼實現：

```javascript
function filter(arr, fn) {
    // 初始化一個空的陣列來儲存符合條件的元素
    let filteredArr = [];

    // 走訪 arr 陣列的每個元素
    for (let i = 0; i < arr.length; i++) {
        // 若 fn(arr[i], i) 為真值，則將 arr[i] 加入到 filteredArr 中
        if (fn(arr[i], i)) {
            filteredArr.push(arr[i]);
        }
    }

    // 回傳篩選後的陣列
    return filteredArr;
}
```

### 程式碼解釋

1. `filteredArr`：空陣列，用來儲存符合條件的元素。
2. `for (let i = 0; i < arr.length; i++)`：走訪 `arr` 中的每個元素。
3. `if (fn(arr[i], i))`：呼叫 `fn` 函數，若回傳值為真，則將 `arr[i]` 加入到 `filteredArr`。
4. `filteredArr.push(arr[i])`：將符合條件的 `arr[i]` 加入到 `filteredArr` 中。
5. 最後回傳 `filteredArr`。

### 測試範例解釋

1. **範例 1**
   ```javascript
   const arr = [0, 10, 20, 30];
   const fn = function greaterThan10(n) { return n > 10; }
   console.log(filter(arr, fn)); // 輸出：[20, 30]
   ```
   在這個範例中，只有 20 和 30 大於 10，所以回傳 `[20, 30]`。

2. **範例 2**
   ```javascript
   const arr = [1, 2, 3];
   const fn = function firstIndex(n, i) { return i === 0; }
   console.log(filter(arr, fn)); // 輸出：[1]
   ```
   這裡 `fn` 函數根據索引判斷，只篩選出索引為 0 的元素，因此回傳 `[1]`。

3. **範例 3**
   ```javascript
   const arr = [-2, -1, 0, 1, 2];
   const fn = function plusOne(n) { return n + 1; }
   console.log(filter(arr, fn)); // 輸出：[-2, 0, 1, 2]
   ```
   在這個範例中，`fn` 函數回傳 `n + 1`，所以 `0` 會被過濾掉（因為 `Boolean(0)` 為假），其他值因為結果為真值而保留，因此輸出為 `[-2, 0, 1, 2]`。

### 關鍵點總結

- 我們不使用內建的 `filter` 方法，而是用 `for` 迴圈來手動篩選。
- 函數 `fn` 可以依需求不同而彈性設計。
- 判斷是否保留元素的邏輯依賴 `fn` 的回傳值是否為真。