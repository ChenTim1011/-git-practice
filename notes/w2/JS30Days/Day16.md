[Problems](https://leetcode.com/problems/promise-time-limit/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Promise Time Limit


### **問題總結（Problem Summary）**

給定一個非同步函數 `fn` 和一個以毫秒為單位的時間限制 `t`，我們需要建立一個有時間限制的版本的 `fn` 函數。

這個有時間限制的函數應該與原始函數的行為相同，除了當它的執行時間超過 `t` 毫秒時，應該拒絕並回傳字串 `"Time Limit Exceeded"`。

---

### **直覺（Intuition）**

我們可以結合 `Promise`、`setTimeout` 和 `async/await` 來實作這個有時間限制的函數。通過使用 `setTimeout` 設置超時，我們可以強制執行時間限制，並在超過指定的時間後拒絕該承諾（Promise）。

---

### **方法（Approach）**

1. **建立包裝函數**：該函數接受原始函數 `fn` 和時間限制 `t` 作為參數。
2. **回傳非同步函數**：在包裝函數內，回傳一個非同步函數，該函數可以接收任意數量的參數，並使用展開運算符 `...args` 接收它們。
3. **新建 Promise 處理非同步執行**：在非同步函數內部，建立一個新的 `Promise` 來處理非同步執行。
4. **設置超時計時器**：使用 `setTimeout` 設置一個計時器，計時 `t` 毫秒。如果計時器在承諾被解決（resolved）之前到期，則拒絕承諾並回傳 `"Time Limit Exceeded"`。
5. **呼叫原始函數並等待完成**：使用提供的參數 `...args` 調用原始函數 `fn`，並等待它完成。
6. **成功完成前解決 Promise**：如果原始函數在時間限制之前完成，則將結果傳給 `resolve` 解決該承諾。
7. **回傳 Promise**：從非同步函數中回傳這個 `Promise`，從而實作有時間限制的行為。

---

### **相關概念（Concepts）**

你可以參考本文來深入了解這些概念，包括：

- 非同步函數（Asynchronous functions）
- 承諾（Promises）
- `setTimeout`
- `async/await`

---

### **解決方案（Solutions）**

#### **JavaScript 解決方案**

```javascript
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
  return async function(...args) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject("Time Limit Exceeded");
      }, t);

      fn(...args)
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  };
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
```

---


### **時間與空間複雜度**

- **時間複雜度**：`O(fn)`，即原始函數 `fn` 的時間複雜度。
- **空間複雜度**：`O(1)`，只需固定的空間來存儲計時器 ID。

---

### **真實情境示例（Real life Example）**

```javascript
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 2000);
  });
}

const timeLimitedFetchData = timeLimit(fetchData, 1500);

timeLimitedFetchData().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});
```

---

### **程式碼流程解說**

1. **非同步函數 `fetchData`**：
   - 我們有一個名為 `fetchData` 的非同步函數，用於模擬資料提取，它回傳一個承諾，並在 2000 毫秒後解決該承諾。

2. **建立有限時版本的 `fetchData`**：
   - 使用 `timeLimit` 建立一個 `fetchData` 的時間限制版本，並提供一個 1500 毫秒的時間限制。

3. **呼叫時間限制函數 `timeLimitedFetchData`**：
   - 呼叫 `timeLimitedFetchData` 並且不傳入任何參數。

4. **新建 `Promise` 處理非同步執行**：
   - 在時間限制函數內部，建立了一個新的 `Promise` 來處理非同步執行。

5. **設置計時器**：
   - 使用 `setTimeout` 設置一個 1500 毫秒的計時器。

6. **呼叫原始函數並等待完成**：
   - 調用原始函數 `fetchData` 並等待它完成。

7. **時間限制發生**：
   - 由於原始函數執行時間為 2000 毫秒，超過了 1500 毫秒的時間限制。
   - 計時器到期，並且 `Promise` 被拒絕，回傳字串 `"Time Limit Exceeded"`。

8. **錯誤捕捉**：
   - 錯誤被 `catch` 捕捉，並在控制台中輸出錯誤訊息。

---

### **讓程式碼更簡潔**

可以使用 `finally` 清理計時器，讓程式碼更簡潔。

```typescript
function timeLimit(fn: Fn, t: number): Fn {
  return async function (...args: any[]) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject("Time Limit Exceeded");
      }, t);

      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timeoutId));
    });
  };
}
```

---
