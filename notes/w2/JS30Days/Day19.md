[Problems](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Execute Asynchronous Functions in Parallel


### 問題描述
目標是實做一個 `promiseAll` 函數，該函數接受一個包含非同步函數的陣列，並回傳一個新的 Promise。這個 Promise 需要滿足以下兩個條件之一：
1. **成功**：當所有非同步函數都成功執行時，回傳一個包含所有結果的陣列，且結果的順序與原始函數的順序一致。
2. **失敗**：當任何一個非同步函數失敗時，立即拒絕（reject）這個 Promise，並回傳失敗的原因。

### 初始實作的問題
最初的實作如下：

```javascript
var promiseAll = async function(functions) {
    return new Promise((resolve, reject) => {
        let results = [];
        functions.forEach(fn => {
            fn()
            .then(val => results.push(val))
            .catch(reason => reject(reason));
        }));
        resolve(results);
    };
}
```

這段代碼看起來有些問題，主要有以下兩點：

1. **結果順序不保證**：
   - 使用 `results.push(val)` 將結果加入陣列，這樣會導致結果的順序取決於每個 Promise 解決（resolve）的時間，而非原始函數的順序。
   - 在非同步操作中，較快完成的 Promise 會先被加入結果陣列，這可能打亂原本的順序。

2. **提前解析（resolve）**：
   - `resolve(results)` 被放在了 `forEach` 迴圈之外，這意味著在所有 Promise 完成之前，就已經立即解析了結果陣列。這會導致回傳的結果可能是空陣列，因為非同步操作尚未完成。

### 解決方案
為了解決上述問題，需要進行以下修改：

1. **保持結果的順序**：
   - 不要使用 `push`，而是根據函數在陣列中的索引將結果插入到對應的位置。
   - 這樣即使 Promise 的完成順序不同，最終的結果陣列仍然能夠保持與原始函數陣列相同的順序。

2. **追蹤完成的 Promise 數量**：
   - 使用一個計數器 `count` 來追蹤已經完成的 Promise 數量。
   - 每當一個 Promise 被解決，就增加 `count` 的值，並檢查是否所有的 Promise 都已經完成。

3. **延遲解析結果**：
   - 只有當所有的 Promise 都已經成功解決時，才調用 `resolve(results)` 來解析結果陣列。

### 改進後的實作
以下是修正後的 `promiseAll` 函數：

```javascript
/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = async function(functions) {
    return new Promise((resolve, reject) => {
        // 初始化結果陣列，長度與函數陣列相同
        const results = new Array(functions.length);
        let count = 0;

        functions.forEach((fn, i) => {
            fn()
            .then(val => {
                results[i] = val; // 將結果插入到對應的索引位置
                count++; // 增加已完成的 Promise 計數
                if(count === functions.length) resolve(results); // 如果所有 Promise 都完成，解析結果陣列
            })
            .catch(reason => reject(reason)); // 任意一個 Promise 失敗，立即拒絕
        });
    });
};

/**
 * 範例用法
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
```

### 詳細解釋

1. **初始化結果陣列**：
   ```javascript
   const results = new Array(functions.length);
   ```
   - 創建一個與 `functions` 陣列長度相同的空陣列，用於存放每個 Promise 的結果。
   - 這確保了結果的順序與原始函數的順序一致。

2. **設置計數器**：
   ```javascript
   let count = 0;
   ```
   - 用來追蹤已經完成的 Promise 數量。

3. **迭代函數陣列**：
   ```javascript
   functions.forEach((fn, i) => {
       fn()
       .then(val => {
           results[i] = val;
           count++;
           if(count === functions.length) resolve(results);
       })
       .catch(reason => reject(reason));
   });
   ```
   - 對於每一個函數 `fn`，立即調用它並處理回傳的 Promise。
   - **成功（then）**：
     - 將結果 `val` 插入到 `results` 陣列的對應索引 `i` 位置。
     - 增加 `count` 的值。
     - 檢查 `count` 是否等於 `functions.length`，如果是，表示所有 Promise 都已經完成，調用 `resolve(results)` 來解析最終的結果陣列。
   - **失敗（catch）**：
     - 如果任何一個 Promise 失敗，立即調用 `reject(reason)`，並終止整個過程。

### 注意事項
- **順序的重要性**：
  - 使用索引 `i` 來確保結果的順序與原始函數的順序一致，避免因為非同步操作的完成順序不同而導致結果順序錯亂。

- **避免提前解析**：
  - 確保 `resolve(results)` 只有在所有 Promise 都完成後才被調用，防止回傳不完整的結果。

- **錯誤處理**：
  - 一旦有任何一個 Promise 失敗，立即拒絕整個 `promiseAll`，確保錯誤能夠被及時捕捉和處理。

### 測試範例

以下是一個簡單的測試範例，驗證 `promiseAll` 的正確性：

```javascript
const delay = (ms, value, shouldReject = false) => () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (shouldReject) {
            reject(`Error: ${value}`);
        } else {
            resolve(value);
        }
    }, ms);
});

// 所有 Promise 成功
promiseAll([
    delay(300, 'A'),
    delay(200, 'B'),
    delay(100, 'C')
]).then(results => {
    console.log(results); // 輸出: ['A', 'B', 'C']
}).catch(error => {
    console.error(error);
});

// 有一個 Promise 失敗
promiseAll([
    delay(100, 'A'),
    delay(200, 'B', true), // 這個會拒絕
    delay(300, 'C')
]).then(results => {
    console.log(results);
}).catch(error => {
    console.error(error); // 輸出: Error: B
});
```

### 總結
實做 `promiseAll` 的關鍵在於：
- **保持結果的順序**：通過使用索引來插入結果，確保最終陣列的順序與原始函數陣列一致。
- **追蹤完成的 Promise 數量**：使用計數器來確定何時所有 Promise 都已經完成，從而解析最終結果。
- **及時處理錯誤**：一旦有任何一個 Promise 失敗，立即拒絕整個 `promiseAll`，確保錯誤能夠被正確處理。

