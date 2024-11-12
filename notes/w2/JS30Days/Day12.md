[Problems](https://leetcode.com/problems/add-two-promises/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## add-two-promises

這個函式的目的是將 `promise1` 和 `promise2` 解析出來的數值相加。因為這兩個 promise 最終會解析為一個數字，我們可以提取每個解析後的值，並將它們相加來得到所需的結果。這個函式會返回一個新的 promise，並以該和值解析。

---

## 方法
1. **使用 Async 函式**：由於我們使用了 `await` 來等待非同步操作，因此將 `addTwoPromises` 定義為 `async` 函式。使用 `await` 讓我們可以在每個 promise 解析後暫停執行，並取得它的值。
  
2. **等待 Promise 的解析**：
   - `const result1 = await promise1;` 會等待 `promise1` 解析，並將解析值賦給 `result1`。
   - 同樣地，`const result2 = await promise2;` 會等待 `promise2` 解析，並將它的值賦給 `result2`。
  
3. **返回和值**：取得兩個解析值後，函式返回 `result1 + result2`。因為該函式為 `async`，這個返回值會自動包裝在一個新的 promise 中，並以和值解析。

---


## 程式碼
```javascript
/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    const result1 = await promise1;
    const result2 = await promise2;
    return result1 + result2;
};

/**
 * 使用範例：
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 輸出：4
 */
```
