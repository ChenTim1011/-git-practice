[Problems](https://leetcode.com/problems/interval-cancellation/solutions/5857602/step-by-step-explanation/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## interval-cancellation


1. **呼叫 `fn(...args)`**：
   - 首先，直接呼叫函數 `fn` 並傳遞參數 `args`。這確保了函數在設定間隔計時器之前立即執行一次。

2. **設置間隔計時器**：
   - 使用 `setInterval` 函數設置一個間隔計時器。下方程式碼中的 `setInterval` 將會每隔 `t` 毫秒呼叫一次 `() => fn(...args)`。
   - 注意，`setInterval` 不會在初始時立即呼叫函數，而是在 `t` 毫秒後第一次呼叫。這就是為什麼我們在設置間隔計時器之前先呼叫一次 `fn(...args)` 的原因。

3. **定義取消函數 `cancelFn`**：
   - 現在，我們定義一個名為 `cancelFn` 的函數，當被呼叫時，它會清除先前設置的間隔計時器。
   - 最後，返回 `cancelFn` 函數。

4. **取消機制的運作方式**：
   - 當我們首次定義 `cancellable` 函數時，`cancelFn` 並不會被呼叫。
   - 然而，當有人呼叫 `cancellable` 函數時，`return cancelFn` 這一行會返回並執行 `cancelFn`，從而取消間隔計時器。

5. **實體說明**：
   - 例如，如果我們定義 `var myFunc = cancellable((num) => 1 + num, 13, 100)`，這個間隔計時器將會每隔 100 毫秒重複呼叫 `(num) => 1 + num`，直到 `myFunc()` 被呼叫為止。
   - 當 `myFunc()` 被呼叫時，`cancellable` 函數中的 `return cancelFn` 會被執行，這將導致 `cancelFn` 被呼叫並執行，從而清除間隔計時器。

---

### **程式碼（Code）**

```javascript
var cancellable = function(fn, args, t) {
    // 立即呼叫函數 fn 並傳遞參數 args
    fn(...args);
    
    // 設置一個間隔計時器，每隔 t 毫秒呼叫一次 fn(...args)
    let timer = setInterval(() => fn(...args), t);

    // 定義取消函數 cancelFn，當被呼叫時清除間隔計時器
    let cancelFn = () => clearInterval(timer);
    
    // 回傳取消函數 cancelFn
    return cancelFn;
};
```

