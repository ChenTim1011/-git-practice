[Problems](https://leetcode.com/problems/timeout-cancellation/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## timeout-cancellation


**動機（Motive）**：在特定時間後回傳一個函數，僅在您沒有調用其他函數的情況下。如果我們調用了其他函數，則第一個函數根本不應該被調用！

**先決條件（Pre-Requisites）**：

- 熟悉回呼函數（callback functions）
- 剩餘參數（Rest parameter）
- `clearTimeout` 和 `setTimeout` 方法

**您可能會問的問題**：為什麼我需要使用 `clearTimeout` 和 `setTimeout`？

在 JavaScript 中，控制流程和任務的執行是相當關鍵的。以下的兩個問題（帶有延遲的可取消函數執行）和（間隔取消）涉及了一個非常非常重要的概念，請耐心閱讀 😊！

通過使用這些方法，我們可以輕鬆地控制程式碼的時機和執行，我們可以延遲或取消它們。

**好的，我明白它們很重要，但我在哪裡會用到它們呢？🤔**

它們在以下場景中被廣泛使用，例如：

- 動畫（Animation）
- 事件處理（Event Handling）
- 排程（Scheduling）
- 非同步程式（Async Programming）

**您可能會問的其他問題**：

嗯……我以為我理解它們，結果發現我只知道語法。

沒關係，我會完整地解釋，不用擔心！

讓我們從 `setTimeout` 方法開始：

- 這個函數接受兩個參數：一個回呼函數和一個以毫秒為單位的延遲值。回呼函數代表我們希望在延遲後執行的程式碼。
- 當我們調用 `setTimeout`，它會註冊回呼函數並啟動一個計時器。指定的延遲後，JavaScript 引擎會將回呼函數添加到事件隊列中。
- 如果您不知道什麼是事件佇列，事件隊列是一種資料結構，用於存儲由 JavaScript 運行時處理的任務。當調用棧（call stack）為空時（所有同步程式碼已經完成執行），運行時會從事件隊列中選擇下一個任務並執行它。
- 通過使用 `setTimeout`，我們在程式碼中引入了非同步行為。這意味著在延遲倒計時期間，JavaScript 引擎可以繼續執行其他程式碼，而不需要等待 `setTimeout` 的回呼被調用，這 **非常重要**。

**但為什麼我們要使用 `clearTimeout`？**

因為我們需要在延遲結束前取消預定的執行。我們已經知道 `setTimeout` 回傳一個稱為超時 ID（timeout ID）的唯一標識符，對嗎？

`clearTimeout` 是另一個內建函數，用於取消先前使用 `setTimeout` 設置的超時。通過傳遞超時 ID 給 `clearTimeout`，我們可以防止回呼函數的執行並停止計時器。

**還不確定嗎？讓我們問自己，如果不在程式碼中使用 `clearTimeout`，會發生什麼？!!**

結合使用 `clearTimeout` 和 `setTimeout` 為我們提供了控制預定函數執行的能力。當我們使用 `setTimeout` 設置一個超時時，該函數內的程式碼會在指定的延遲後運行。然而，通過使用 `clearTimeout`，我們可以在延遲結束前取消預定的函數執行，這正是我們在這裡想要做的。

簡而言之，`clearTimeout` 允許你說，「嘿，等等！暫時不要執行那個函數！」它讓你有能力暫停或取消預定的執行，在需要動態控制的情況下提供更順暢和更具回應性的使用者體驗。

**結論（CONCLUSION）：**

沒有 `clearTimeout`，你將無法停止或取消預定函數的執行。它將無論任何後續邏輯或條件如何都會執行。通過使用 `clearTimeout`，你有能力管理和調整程式碼的時機，確保它按你需要的方式運行。

**方法（Approach）：**

1. **程式碼概述**：
    - 該程式碼定義了一個名為 `cancellable` 的函數，接受三個參數：`fn`（一個函數）、`args`（一個參數陣列）和 `t`（以毫秒為單位的時間延遲）。
    - 在 `cancellable` 函數內，定義了一個嵌套函數 `cancelFn`。該函數負責取消預定的函數執行。
    - `cancelFn` 函數調用 `clearTimeout` 並傳遞計時器標識符來取消預定的函數執行。
    - 使用 `setTimeout` 安排在指定的時間延遲 `t` 毫秒後執行一個函數。
    - `setTimeout` 回傳一個計時器標識符，存儲在 `timer` 變量中。
    - 使用展開運算符（spread operator）`...args` 將參數陣列傳遞給函數 `fn`，以執行預定的函數。
    - 最後，`cancellable` 函數回傳 `cancelFn` 函數，允許你在需要時調用它來取消預定的函數執行。

2. **初學者可能會問的問題**：為什麼要在頂部定義 `cancelFn`？

    - 定義 `cancelFn` 函數在頂部的目的是確保它在 `cancellable` 函數的作用域內是可存取的。這讓我們可以將 `cancelFn` 函數作為函數結果的一部分回傳，使其在 `cancellable` 函數外部可用。這是一個良好的實踐，應在頂部定義函數。

**最終結論（FINAL CONCLUSION）：**

使用 `clearTimeout` 和 `setTimeout` 的概念提供了一種強大的機制，用於在 JavaScript 中安排和取消函數的執行。通過利用 `clearTimeout`，當不再需要時，你可以防止預定的函數運行，從而在管理非同步任務時提供更多的控制和靈活性。這個概念在你希望延遲程式碼執行或安排未來執行的任務時特別有用。有效地理解和利用 `clearTimeout` 和 `setTimeout` 可以大大提高你的 JavaScript 程式的效率和回應性。



---

### **程式碼（Code）**

```javascript
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
const cancellable = function(fn, args, t) {
    // cancelFn 函數
    const cancelFn = function (){
        clearTimeout(timer);
    };
    const timer = setTimeout(()=>{
        fn(...args);
    }, t);
    return cancelFn;
};


/**
 * const result = []
 *
 * const fn = (x) => x * 5
 * const args = [2], t = 20, cancelT = 50
 *
 * const log = (...argsArr) => {
 *     result.push(fn(...argsArr))
 * }
 *      
 * const cancel = cancellable(fn, args, t);
 *          
 * setTimeout(() => {
 *    cancel()
 *    console.log(result) // [{"time":20,"returned":10}]
 * }, cancelT);
 */
```
