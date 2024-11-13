[Problems](https://leetcode.com/problems/sleep/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## sleep

要實作 `sleep` 函式，我們需要讓它在指定的毫秒數（`millis`）後解決（resolve）一個 Promise。這意味著我們可以利用 JavaScript 中的 `setTimeout`，它允許我們設定一段延遲，然後執行某個回呼函式。這裡會使用 `Promise` 和 `setTimeout` 的結合來實現「延遲」的效果。

### 實作步驟

1. **定義 `sleep` 函式**：
   - 函式會接收一個數字 `millis`，表示要延遲的時間，以毫秒為單位。
   
2. **建立一個 Promise**：
   - Promise 的概念是它能處理非同步操作，並允許在特定時間之後執行回呼。
   - 我們希望 `sleep` 函式能在指定的毫秒數之後「解決」Promise，所以這裡使用 Promise 來達成目標。
   
3. **使用 `setTimeout`**：
   - `setTimeout` 函式允許我們設定一個延遲時間，時間結束後會執行回呼函式。
   - 當 `setTimeout` 的延遲時間過去後，我們會執行 `resolve()`，讓 Promise 的狀態變為「已解決」，並完成 `sleep` 函式的等待時間。

4. **`await` 等待 Promise**：
   - 因為 `sleep` 是個 `async` 函式，所以在使用時可以透過 `await` 來等待其完成。這會讓程式碼暫停，直到指定的延遲時間過去。

### 實作程式碼

```javascript
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}
```

### 程式碼解釋

1. `async function sleep(millis)`：
   - 定義一個非同步函式 `sleep`，接收 `millis` 作為延遲的毫秒數。
   
2. `return new Promise((resolve) => { ... })`：
   - 回傳一個 Promise，這個 Promise 包含了延遲的邏輯。
   - `Promise` 的建構函式接收一個回呼函式，該回呼函式接收 `resolve` 和 `reject` 兩個參數。我們只需要用到 `resolve`，因為這個 Promise 不需要錯誤處理。

3. `setTimeout(resolve, millis)`：
   - `setTimeout` 函式接收兩個參數：一個回呼函式和延遲時間（毫秒）。
   - 在這裡，我們將 `resolve` 作為回呼傳給 `setTimeout`，讓 `setTimeout` 在 `millis` 毫秒後自動執行 `resolve`，從而將 Promise 狀態設為「已解決」。
