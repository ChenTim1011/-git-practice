[Problems](https://leetcode.com/problems/debounce/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Debounce


### 直覺

**debounce** 函數常用於限制函數執行的頻率。這在以下情況中特別有用：
- 處理輸入事件（例如，搜尋框中的輸入）
- 視窗大小調整
- 防止頻繁的 API 呼叫

通過使用 debounce 函數，我們可以避免不必要的呼叫並提升效能，特別是在處理頻繁觸發的事件時。

### 方法

要實作 debounce 函數，可以遵循以下步驟：

1. **建立 `debounce` 包裝函數**：
   - 定義一個 `debounce` 函數，接受一個函數 `fn` 和延遲時間 `t`。
   - 返回 `fn` 的 debounced 版本。

2. **追蹤計時器**：
   - 使用 `timeoutId` 變數來儲存 `setTimeout` 的參考。
   - 每次呼叫 debounced 函數時，應該：
     - 清除尚未執行的計時器。
     - 設置一個新的計時器，延遲執行 `fn` `t` 毫秒。

3. **執行邏輯**：
   - `setTimeout` 會在延遲時間 `t` 後執行 `fn`，並使用最新的參數。
   - 在每個延遲期間內，只有最新的呼叫才會執行 `fn`，並取消之前的所有呼叫。

---

### 複雜度

- **時間複雜度**：`O(1)`，因為我們僅設置或清除計時器，而不走訪任何輸入。
- **空間複雜度**：`O(1)`，因為我們只儲存一個計時器的參考。

---

### # 程式碼

```javascript
/**
 * @param {Function} fn - 要 debounce 的函數
 * @param {number} t - debounce 的延遲時間（毫秒）
 * @return {Function} - `fn` 的 debounced 版本
 */
var debounce = function(fn, t) {
    let timeoutId; // 計時器的參考

    return function(...args) {
        // 清除任何之前的計時器
        if (timeoutId) clearTimeout(timeoutId);

        // 設置新的計時器，在 t 毫秒後呼叫 fn
        timeoutId = setTimeout(() => {
            fn(...args); // 使用最新的參數執行 fn
        }, t);
    };
};

/**
 * 使用範例：
 * const log = debounce(console.log, 100);
 * log('Hello'); // 取消
 * log('Hello'); // 取消
 * log('Hello'); // 在 t=100ms 時執行
 */
```

---

### # 程式碼解釋

1. **建立 Debounce 函數**：
   - `debounce` 函數接受兩個參數：`fn`（要 debounce 的函數）和 `t`（延遲時間，以毫秒為單位）。

2. **使用 `timeoutId` 追蹤計時器**：
   - 使用 `timeoutId` 來追蹤 `setTimeout`。如果在計時器到期之前發生新的呼叫，會清除現有的計時器，從而重置延遲時間。

3. **設置並執行計時器**：
   - `setTimeout(() => fn(...args), t)` 用於在延遲 `t` 毫秒後執行 `fn` 並使用最新的參數。
   - 每個延遲期間內，只有最後一次呼叫才會執行 `fn`。

---

### 詳細範例解析

讓我們看看一些場景，了解這個 `debounce` 函數如何運作。


#### 範例 1:
```javascript
const dlog = debounce(console.log, 150);

setTimeout(() => dlog(1, 2), 50);    // 在 50ms 時呼叫
setTimeout(() => dlog(3, 4), 300);   // 在 300ms 時呼叫
setTimeout(() => dlog(5, 6), 300);   // 在 300ms 時再次呼叫，取消了前一次
// 預期輸出：
// [200, [1, 2]]（在 200ms 時執行，輸出 [1, 2]）
// [450, [5, 6]]（在 450ms 時執行，輸出 [5, 6]）
```

- **解釋**：
  - 第一次呼叫延遲 150ms 後，於 200ms 執行，輸出 `[1, 2]`。
  - 在 300ms 發生的呼叫因再次呼叫被取消，因此只有最後一次呼叫在 450ms 執行，輸出 `[5, 6]`。


