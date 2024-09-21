## JavaScript 基本語法

整理自學的JavaScript 內容

- **Q1: ECMAScript 和 Javascript關聯是什麼?**

** ECMAScript 是一個標準化的腳本語言規範**，由 ECMA International 制定，用來描述腳本語言的語法和功能規範。
它並不是一個具體的程式語言，而是為像 JavaScript 這樣的腳本語言提供了基礎標準。
因此，JavaScript 的工作方式和功能取決於 ECMAScript 的版本和標準更新。

- **Q2:ES6 是什麼?**

ECMAScript 6 是 ECMAScript 的一個重要版本，於 2015 年發布，帶來了許多對 JavaScript 的重大更新。


- **Q3:JavaScript 基本運作**

JavaScript 是單執行序和同步語言：一次只能處理一個任務，其他任務必須等當前任務完成後才能開始執行。

執行堆疊 (Execution Stack)：JavaScript 的代碼以「後進先出」（LIFO）方式運作，最新加入的任務會最先完成並從堆疊中移除。

JavaScript 編譯器如何處理程式碼的四個主要步驟：

讀取代碼：JavaScript 讀入程式碼進行處理（像顧客點餐）。
剖析代碼：將程式碼轉換為語法樹（確認訂單細節）。
執行代碼：執行程式碼中的指令（準備餐點）。
回收記憶體：自動清理不再使用的記憶體（清理用具，準備下一位顧客）。


- ** [所以說event loop到底是什麼玩意兒？| Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=1460s&ab_channel=JSConf)  **

這個演講主要在討論 JavaScript 的執行機制，特別是 事件迴圈（Event Loop） 的運作方式，以及 非同步處理（Asynchronous Callbacks） 在 JavaScript 中的角色。演講者透過一些有趣的具體的例子和比喻，解釋了 JavaScript 是如何在單執行序的限制下，藉由瀏覽器提供的 Web APIs 以及事件迴圈來處理非同步操作，使得程式能夠在不阻塞使用者介面的情況下執行多個任務。

演講的重點包括：

JavaScript 的單執行序性質：一次只能執行一個任務，所有程式碼片段必須依序進行。
呼叫堆疊（Call Stack） 的運作：當函式被呼叫時會進入堆疊，執行完畢後才會移出。
非同步處理的原理：如何利用瀏覽器的 Web APIs 來進行非同步操作，例如 setTimeout 或 AJAX 請求。
事件迴圈（Event Loop） 的工作原理：當呼叫堆疊清空後，事件迴圈會將回呼佇列中的任務放入堆疊中執行。
阻塞行為與性能問題：解釋阻塞如何影響程式運行，以及如何透過非同步處理來避免 UI 阻塞，確保流暢的使用者體驗。

### 重點整理：

1. **JavaScript 單執行序與同步性**：
   - JavaScript 是單執行序的程式語言，也就是一次只能執行一個任務。所有的程式碼片段都會依序執行，無法同時處理多個任務。

2. **呼叫堆疊（Call Stack）**：
   - 呼叫堆疊是一種 LIFO（後進先出）的資料結構，當一個函式被呼叫時，它會被放入堆疊，當函式完成執行後，會被移出堆疊。

3. **非同步處理（Asynchronous Callbacks）**：
   - 由於 JavaScript 只有單一執行緒，因此為了避免阻塞（blocking），使用非同步處理來進行操作，例如 `setTimeout`。非同步函式不會立即執行，而是等候其他程式碼執行完畢後，透過「事件迴圈」再執行。

4. **Web APIs**：
   - JavaScript 只負責執行程式邏輯，像 `setTimeout`、AJAX 請求等並不屬於 JavaScript 引擎，而是由瀏覽器提供的 Web APIs 處理。這些 Web APIs 在運行後，會將結果放入「回呼佇列」，等呼叫堆疊清空後再透過事件迴圈來執行。

5. **事件迴圈（Event Loop）**：
   - 事件迴圈的主要工作是監控呼叫堆疊和回呼佇列，當堆疊清空後，它會從回呼佇列中取出任務並放入呼叫堆疊執行，這樣就能達到非同步操作。

6. **阻塞行為（Blocking）**：
   - 當程式碼片段需要較長時間執行時，如大量的運算或同步網路請求，會導致瀏覽器無法進行其他操作，這稱為阻塞。避免阻塞的最佳方式是使用非同步方法。

-[視覺化 JavaScript's call stack/event loop/callback queue 運作流程](https://latentflip.com//?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)



- **Q4:為什麼變數需要分成 let 和 var ?**

- let 和 const 的區塊作用域：

let 和 const 在 ES6 中採用「區塊作用域」（block-level scope），即變數只在宣告所在的大括號 {} 內有效，離開該區塊後變數無法存取。

- var 的函數作用域：

var 使用「函數作用域」（function-level scope），變數只在函數內有效。若在大括號內用 var 宣告變數，該變數在大括號外依然存在，會被視為全域變數。

- Hoisting（提升）：

var 宣告會被提升至作用域的最上方，但賦值不會被提升，導致變數在使用前為 undefined。
let 和 const 也會被提升，但會處於「暫時性死區」（TDZ），在宣告前使用會拋出 ReferenceError。

- var 的特殊行為：

var 可以重複宣告，並且可以在變數宣告前使用（因為 hoisting）。
函數也有 hoisting，可以在函數定義前使用該函數。

- IIFE（立即調用函數表達式）：

在 ES6 出現前，人們使用 IIFE 來模擬區塊作用域。這種模式包裹變數並立即執行，避免變數污染全域作用域。


- **Q5:什麼是 Temporal Dead Zone, TDZ ?**

1. Temporal Dead Zone (TDZ) 是 JavaScript 中的一個概念，指的是在變數使用 let 或 const 宣告之前的區域內，
變數無法被使用，即使變數的宣告已經在語法上提升到了作用域的頂端。
目的是避免誤用未初始化的變數：TDZ 幫助開發者避免意外使用尚未初始化的變數，從而提高程式的安全性和可讀性。

- TDZ 的定義與行為：

1. TDZ 的範圍：TDZ 從作用域的開始點（通常是一個區塊 {} 或函式）一直延續到變數的宣告語句位置為止。
在這個區間內，任何對這個變數的存取操作（例如讀取或賦值）都會導致 ReferenceError 錯誤。

2. TDZ 的作用：避免開發者在變數初始化之前意外地使用這些變數。
這和 var 變數的行為不同，var 變數在提升後會被設為 undefined，而 let 和 const 變數在 TDZ 內則無法被存取。




-**Q6:動態型別語言vs靜態型別語言**
動態型別和靜態型別的主要區別在於**變數型別的定義和檢查**方式。

- JavaScript 是動態型別語言，變數的型別是在執行時期動態決定的。
1. 型別變化靈活：變數可以在程序執行過程中改變型別。
2. 不需明確聲明型別：變數可以直接賦值，不需要指定是什麼型別。
3. 型別檢查在執行時進行：型別錯誤可能只會在程式運行到問題程式碼時才會出現錯誤。

- C、Java 等則是靜態型別語言，變數的型別是在**編譯時期**就確定的
1. 型別固定：變數的型別一旦聲明，便無法改變，程式在編譯期就會進行型別檢查。
2. 需要明確聲明型別：在聲明變數時，必須指明該變數的型別（數字、字串、布林等）。
3. 型別錯誤在編譯時檢查：大部分的型別錯誤會在編譯時期被檢測出來，而不是在程式執行時才出現。


-**Q7:弱型別vs強型別**
差異主要在於**如何處理不同型別之間的運算**，以及**是否允許隱式型別轉換**

- JavaScript 是弱型別語言，不同型別的變數之間可以進行運算，並且語言會自動進行隱式的型別轉換，
嘗試將兩者轉換成可以運算的型別。這樣的靈活性提高了開發速度，但也容易導致不可預期的錯誤。

- 強型別語言，不同型別的變數不能直接進行運算，如果嘗試這樣做，語言通常會拋出錯誤，
開發者需要顯式地將一個型別轉換為另一個型別才能進行運算。這樣的型別嚴格性可以避免潛在的錯誤，但也減少了靈活性。

### 顯性轉換（Explicit Conversion）
顯性轉換是指你在程式中**明確地告訴 JavaScript 進行型別轉換**。

#### 數值轉換
常用的數值轉換方式有 `Number()`、`parseInt()` 和 `parseFloat()`，它們會將字串或其他型別顯性轉換為數字。
```javascript
console.log(Number('456'));           // 456
console.log(Number('abc'));           // NaN (無法轉成數字)
console.log(parseInt('78kg'));        // 78  (解析為整數)
console.log(parseFloat('3.14m'));    // 3.14 (解析為浮點數)
```

#### 字串轉換
使用 `String()` 來顯性地將其他型別轉換為字串：
```javascript
console.log(String(789));             // '789'
console.log(String(false));           // 'false'
```

#### 布林值轉換
`Boolean()` 可以將其他型別顯性轉換為布林值，**只有空字串、數字 0、`null`、`undefined` 和 `NaN` 會轉換成 `false`**，其他值都會轉換為 `true`。
```javascript
console.log(Boolean(123));            // true
console.log(Boolean(''));             // false (空字串為 false)
console.log(Boolean(null));           // false
```

---

### 隱性轉換（Implicit Conversion）
隱性轉換是指 JavaScript **自動進行型別轉換**，在某些運算符下會自動將變數轉換為合適的型別。
這種轉換有時不容易察覺，可能會導致預期外的結果。

#### 數字型別轉換
使用一元運算子 `+` 可以將字串轉換為數字。如果字串無法轉換成有效數字，結果會是 `NaN`。
```javascript
console.log(+'42');                   // 42
console.log(typeof (+'42'));          // number
console.log(+'Hello');                // NaN (無法轉換成數字)
```

#### 字串拼接
運算符 `+` 用來拼接字串。如果其中一個運算元是字串，JavaScript 會將其他運算元轉換為字串，並進行拼接。
```javascript
console.log('Hello' + ' World');      // 'Hello World'
console.log('The result is: ' + 42);  // 'The result is: 42'
console.log('5' + 10);                // '510' (數字被轉為字串進行拼接)
```

#### 算術運算
當 `+` 運算符的運算元無法轉為字串或物件時，它被視為算術運算子，將 `true` 轉換為數字 1，`false` 轉換為數字 0。
```javascript
console.log(1 + true);                // 2 (true 轉換為數字 1)
console.log(1 + false);               // 1 (false 轉換為數字 0)
```

#### 特殊物件轉換
物件和陣列會進行隱性轉換，通常轉換為字串 `"[object Object]"` 或空字串。
```javascript
console.log(1 + {});                  // '1[object Object]'
console.log(1 + []);                  // '1' (空陣列轉為空字串)
console.log(1 + [2]);                 // '12' (陣列內的數字被轉換為字串)
```

-**Q8:型別比較**


- **嚴格相等 (`===`)**：要求型別和值都相等，適合開發中使用。
- **寬鬆相等 (`==`)**：會進行隱式型別轉換，但這會導致潛在的錯誤，開發中應謹慎使用。

在 JavaScript 中，**嚴格相等 (`===`)** 和 **寬鬆相等 (`==`)** 的比較方式有明顯差異：

### **嚴格相等 (`===`)**：
- 不會進行型別轉換，要求「**型別和值**」必須完全相同。
- 常用於日常開發，因為它避免了型別轉換帶來的潛在問題。

### **寬鬆相等 (`==`)**：
- 會進行**隱式型別轉換**，如果兩邊的值型別不同，JavaScript 會嘗試將其中一個值轉換為另一個值的型別後進行比較。

### **例子：嚴格相等與寬鬆相等**
```javascript
console.log(1 === '1');  // false，因為數字和字串型別不同
console.log(1 == '1');   // true，JavaScript 將字串 '1' 隱式轉換為數字 1，進而比較值
```

---

### **嚴格比較中的例外情況**：

1. **`undefined` 和 `null` 比較**
   ```javascript
   console.log(undefined === null);  // false，因為型別不同（undefined vs. null）
   ```
   - `undefined` 和 `null` 是不同的型別，因此即使它們都表示「無」，在嚴格相等比較中它們不相等。

2. **物件與陣列的比較**
   ```javascript
   console.log({} === {});      // false，兩個空物件記憶體位置不同
   console.log([] === []);      // false，兩個空陣列記憶體位置不同
   ```
   - 在 JavaScript 中，物件和陣列是**引用型別**，比較的是它們在記憶體中的位置（引用）。即使兩個空物件或陣列內容相同，它們在記憶體中的位置不同，因此比較結果是 `false`。

3. **`new Number(0)` 的比較**
   ```javascript
   console.log(new Number(0) === new Number(0));  // false
   ```
   - `new Number(0)` 創建的是一個**包裝物件**，即使內容是數字 `0`，這些物件也有不同的記憶體位置。每次使用 `new` 關鍵字創建的物件都會分配到新的記憶體位置，因此兩個不同的 `new Number(0)` 比較結果是 `false`。
   
   - 這是因為 `new Number(0)` 不是一個基本數字，而是一個物件，物件的比較基於其記憶體位置，而不是值。

### **物件比較的原理**
- **物件與陣列**：JavaScript 中的物件和陣列是**引用型別**。它們的比較結果基於記憶體位置，而不是實際的內容。因此，即使兩個物件或陣列有相同的內容，因為它們指向不同的記憶體位置，嚴格比較（`===`）結果會是 `false`。

---








___

## 參考資料

-[Javascript](https://javascript.info/)
-[Javascript Book](https://exploringjs.com/js/book/index.html)
-[第 2 天：基本語法和資料類型](https://ithelp.ithome.com.tw/articles/10344132)