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
### 紀錄一下 覺得有趣的 Array 函式

- 1.  at() ES2022
   ```
   const fruits = ["Banana", "Orange", "Apple", "Mango"];
   let fruit = fruits.at(2);
   let fruit = fruits[2];

   ```
   這兩種用法結果相同，但是為什麼要有 at?
   寫 Python 如果要取得陣列最後一個元素習慣使用 array[-1] ， 但是 Javascript 並不是這樣
   **[]** 在 javascript 可以被用來存取陣列或是物件，如果是物件 obj[-1] 意思是取出 key 為 -1 的值**並不是最後一個元素**

- 2.  join()
   連結所有陣列元素變成字串

   ```
   const fruits = ["Banana", "Orange", "Apple", "Mango"];
   fruits.join(" * ");
   console.log(fruits) // Banana * Orange * Apple * Mango

   ```
- 3. pop() 
   可以用來做 stack 的 pop => 移除array最後的元素

- 4. push()
   可以用來做 stack 的 push => 從array後面新增新元素

- 5. shift()
   移除第一個元素，然後移動所有其他的元素到 lower index. 
   ```
   const fruits = ["Banana", "Orange", "Apple", "Mango"];
   fruits.shift();
   console.log(fruits) // fruits = ["Orange", "Apple", "Mango"]
   ```
   shift()會回傳已經移除掉的值

- 6. unshift()
   新增元素第一個元素的位置，然後移動舊的元素
   ```
   const fruits = ["Banana", "Orange", "Apple", "Mango"];
   fruits.unshift("Lemon");
   console.log(fruits) // fruits = ["Lemon","Banana","Orange", "Apple", "Mango"]
   console.log(fruits.unshift("Lemon")) // 6  fruits = ["Lemon","Lemon","Banana","Orange", "Apple", "Mango"]
   ```
   unshift()回傳新的陣列長度

- 7. toSorted() ES2023
    原本就有一個 Sort() 為什麼還要有 toSorted()
    toSorted() 會產生一個新的排序好的陣列，不會改變原有的陣列，但 Sort() 會改變原有的陣列 看你的用途。
   
    toReversed() ES2023 和  Reversed() 也是是否有新的陣列產生，會不會影響到原本陣列。

    - Sort() 在比較數字的字串時 例如 "25" 和 "100" 結果是 "25">"100" ( 因為 "2" > "1" )
    這時候可以使用 Compare function.
    ```
         const points = [40, 100, 1, 5, 25, 10];
         points.sort(function(a, b){return a - b}); // 1,5,10,25,40,100
    ```
   當 sort() 函數比較兩個值時，會將這兩個值傳遞給一個比較函數，並根據比較函數返回的結果進行排序。具體來說，這個排序過程的邏輯如下：
   如果比較函數的返回值是**負數**，那麼第一個值（a）會排在第二個值（b）的前面。
   如果比較函數的返回值是**正數**，那麼第二個值（b）會排在第一個值（a）的前面。
   如果比較函數的返回值是0，這兩個值的相對順序不變（不會交換位置）。
   
   例如 比較 40 和 100：
   調用比較函數 compare(40, 100)。
   計算 40 - 100，結果是 -60，這是一個負數，說明 40 應該排在 100 之前。



- 8. **forEach()**  
   用來對陣列的每個元素執行一次回調函數。
   ```javascript
   const numbers = [1, 2, 3];
   numbers.forEach(value => console.log(value));
   ```

- 9. **map()**  
   生成一個新陣列，將每個元素通過回調函數進行變換，不會修改原陣列。
   ```javascript
   const numbers = [1, 2, 3];
   const doubled = numbers.map(value => value * 2);
   console.log(doubled);  // [2, 4, 6]
   ```

- 10. **filter()**  
   根據條件過濾出符合的元素，生成新陣列。
   ```javascript
   const numbers = [1, 2, 3];
   const even = numbers.filter(value => value % 2 === 0);
   console.log(even);  // [2]
   ```

- 11. **reduce()**  
   將陣列歸約為單一值（累積運算），從左到右執行。
   ```javascript
   const numbers = [1, 2, 3];
   const sum = numbers.reduce((total, value) => total + value, 0);
   console.log(sum);  // 6
   ```

- 12. **some()**  
   檢查陣列中是否至少有一個元素符合條件，返回 `true` 或 `false`。
   ```javascript
   const numbers = [1, 2, 3];
   const hasEven = numbers.some(value => value % 2 === 0);
   console.log(hasEven);  // true
   ```

- 13. **every()**  
   檢查陣列中的所有元素是否都符合條件，返回 `true` 或 `false`。
   ```javascript
   const numbers = [1, 2, 3];
   const allEven = numbers.every(value => value % 2 === 0);
   console.log(allEven);  // false
   ```

- 14. **flatMap()**  
   先對每個元素進行映射，然後展開成一維陣列。
   ```javascript
   const arr = [1, 2, 3];
   const result = arr.flatMap(value => [value, value * 2]);
   console.log(result);  // [1, 2, 2, 4, 3, 6]
   ```

- 15. **Array.from()**  
   將類陣列或可迭代對象轉換為陣列。
   ```javascript
   const str = "hello";
   const arr = Array.from(str);
   console.log(arr);  // ['h', 'e', 'l', 'l', 'o']
   ```

- 16. **entries()**  
   返回陣列中每個鍵/值對的迭代器對象。
   ```javascript
   const fruits = ["Apple", "Banana"];
   const iterator = fruits.entries();
   for (let [index, value] of iterator) {
       console.log(index, value);
   }
   ```
---
### 老師第三周提到的 deep copy


**淺拷貝 (Shallow Copy)**

淺拷貝僅複製物件的第一層屬性，內部巢狀物件仍然指向原始物件的引用。

**例子：**

1. **使用 Object.assign()**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const shallowCopy = Object.assign({}, originalObj);

// 修改第一層屬性
shallowCopy.name = 'Jane'; // 不影響 originalObj.name

// 修改內部物件
shallowCopy.info.age = 25; // 會影響 originalObj.info.age
```

2. **使用展開運算符（Spread Operator）**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const shallowCopy = { ...originalObj };

shallowCopy.name = 'Jane'; // 不影響 originalObj.name
shallowCopy.info.city = 'Los Angeles'; // 會影響 originalObj.info.city
```

---

**深拷貝 (Deep Copy)**

深拷貝會遞迴地複製物件的所有層級，確保新物件與原物件完全獨立。

**例子：**

1. **使用 JSON.stringify() 和 JSON.parse()**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const deepCopy = JSON.parse(JSON.stringify(originalObj));

deepCopy.info.city = 'Los Angeles'; // 不影響 originalObj.info.city
```

*缺點：* 無法處理 `undefined`、`function`、`Symbol`、`Date`、`RegExp` 等類型，且無法處理循環引用。

2. **自定義深拷貝函數**

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloneObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }

  return cloneObj;
}

const originalObj = {
  name: 'John',
  info: { age: 30, city: 'New York' },
  hobbies: ['reading', 'gaming'],
  birthDate: new Date(),
  pattern: /abc/,
};

const deepCopy = deepClone(originalObj);

deepCopy.info.age = 25; // 不影響 originalObj.info.age
deepCopy.hobbies.push('coding'); // 不影響 originalObj.hobbies
deepCopy.birthDate.setFullYear(2000); // 不影響 originalObj.birthDate
deepCopy.pattern = /xyz/; // 不影響 originalObj.pattern
```

3. **使用 Lodash 的 cloneDeep**

```javascript
const _ = require('lodash');

const originalObj = {
  name: 'John',
  info: { age: 30, city: 'New York' },
  hobbies: ['reading', 'gaming'],
};

const deepCopy = _.cloneDeep(originalObj);

deepCopy.info.city = 'Los Angeles'; // 不影響 originalObj.info.city
deepCopy.hobbies.push('coding'); // 不影響 originalObj.hobbies
```

---

**重點整理：**

- **淺拷貝：**
  - 只複製物件的第一層屬性。
  - 內部巢狀物件仍指向原始物件的引用。
  - 適用於無巢狀物件或不需要獨立內部物件的情況。

- **深拷貝：**
  - 遞迴地複製物件的所有層級，完全獨立。
  - 適用於需要完全複製物件，且內部修改不影響原物件。

- **實現深拷貝的方法：**
  1. **JSON.stringify() / JSON.parse()：**
     - 簡單易用，但有類型限制，無法處理特殊類型和循環引用。
  2. **自定義函數：**
     - 可處理特殊類型，需要考慮各種情況，實現較複雜。
  3. **使用第三方庫（如 Lodash）：**
     - 提供可靠的深拷貝功能，能處理多種情況，包括循環引用。

---

**心得：**

在開發中，選擇適當的拷貝方式至關重要。淺拷貝適合簡單的物件結構，但當涉及巢狀物件時，可能導致意想不到的副作用。深拷貝雖然能解決這個問題，但實現方式需要根據具體需求選擇。

使用 `JSON.stringify()` 和 `JSON.parse()` 是一種快速實現深拷貝的方法，但要注意其限制。自定義深拷貝函數可以滿足特定需求，但需要深入了解物件的結構和可能的類型。利用成熟的第三方庫如 Lodash，不僅可以提高開發效率，還能減少潛在的錯誤。

#### 參考資料
- [[JS] 物件淺拷貝(Shallow Copy) 及 深拷貝(Deep Copy)方法](https://medium.com/@ray102467/js-%E7%89%A9%E4%BB%B6%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E5%8F%8A-%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-%E6%96%B9%E6%B3%95-567cdfb6bcb4)

### 展開運算符(Spread Operator)與其餘運算符(Rest Operator) 的用法

**展開運算符（Spread Operator）與其餘運算符（Rest Operator）**

展開運算符和其餘運算符在 JavaScript 中都使用 `...` 表示，但用途和使用情境不同。以下將以其他例子來說明兩者的差異，並整理重點與心得。

---

### **展開運算符（Spread Operator）**

**用法：**

- **解壓縮陣列或可迭代物件**，將其展開成個別元素。
- **在陣列字面值**或**函式呼叫**中使用。
- **屬於淺拷貝**，僅複製第一層，內部巢狀物件仍是引用。

**適用於：**

- **陣列**、**字串**、**Set**、**Map** 等可迭代物件。

**範例：**

1. **合併陣列**

```javascript
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'lettuce'];

const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'lettuce']
```

2. **複製陣列**

```javascript
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

copiedArray.push(4);
console.log(originalArray); // [1, 2, 3]
console.log(copiedArray);   // [1, 2, 3, 4]
```

3. **展開字串**

```javascript
const greeting = 'Hello';
const letters = [...greeting];
console.log(letters); // ['H', 'e', 'l', 'l', 'o']
```

4. **函式參數**

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6
```

**物件展開（Object Spread）**

- **用於物件字面值**中，展開物件的屬性。
- **淺拷貝**，內部巢狀物件仍是引用。

**範例：**

1. **合併物件**

```javascript
const person = { name: 'Alice' };
const details = { age: 25, city: 'Wonderland' };

const fullProfile = { ...person, ...details };
console.log(fullProfile); // { name: 'Alice', age: 25, city: 'Wonderland' }
```

2. **複製物件**

```javascript
const originalObj = { a: 1, b: { c: 2 } };
const copiedObj = { ...originalObj };

copiedObj.a = 10;
copiedObj.b.c = 20;

console.log(originalObj); // { a: 1, b: { c: 20 } }
console.log(copiedObj);   // { a: 10, b: { c: 20 } }
```

---

### **其餘運算符（Rest Operator）**

**用法：**

- **在函式參數定義**和**解構賦值**中使用。
- **收集剩餘的元素**，將其組合成一個陣列。
- **只能使用一次**，且必須位於參數或變數列表的最後。

**適用於：**

- **函式參數**，收集多餘的傳入參數。
- **解構賦值**，將剩餘的值收集起來。

**範例：**

1. **函式其餘參數**

```javascript
function multiply(factor, ...numbers) {
  return numbers.map(number => number * factor);
}

const result = multiply(2, 1, 2, 3);
console.log(result); // [2, 4, 6]
```

2. **解構賦值**

```javascript
const [first, second, ...rest] = [10, 20, 30, 40, 50];

console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]
```

3. **物件解構**

```javascript
const person = { name: 'Bob', age: 30, city: 'New York' };

const { name, ...others } = person;

console.log(name);    // 'Bob'
console.log(others);  // { age: 30, city: 'New York' }
```

4. **函式預設參數與其餘參數**

```javascript
function greet(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

const messages = greet('Hello', 'Alice', 'Bob', 'Charlie');
console.log(messages); // ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']
```

---

### **重點整理**

**展開運算符（Spread Operator）：**

- **用於解壓縮**可迭代物件或物件的屬性。
- **應用情境：**
  - **陣列合併與複製**
  - **函式呼叫**時展開參數
  - **物件合併與複製**
- **特點：**
  - 屬於**淺拷貝**，僅複製第一層。
  - 能夠取代一些傳統方法，如 `Array.prototype.concat()`、`Object.assign()`。

**其餘運算符（Rest Operator）：**

- **用於收集剩餘的參數或屬性**，組合成陣列或物件。
- **應用情境：**
  - **函式參數**，收集多餘的傳入值。
  - **解構賦值**，收集剩餘的值。
- **特點：**
  - **只能使用一次**，且必須位於最後。
  - 提供更靈活的參數處理方式，取代傳統的 `arguments` 物件。

---

### **心得**

- **展開運算符**讓我們可以輕鬆地合併、複製陣列和物件，取代繁瑣的傳統方法。然而，需要注意的是，
展開運算符進行的是**淺拷貝**，對於巢狀物件需要小心處理，以免產生意外的引用關係。

- **其餘運算符**提供了更直觀的方式來處理函式的多餘參數和解構賦值時的剩餘值，改善了程式的可讀性和維護性。
相較於使用 `arguments` 物件，使用其餘運算符可以得到一個真正的陣列，方便使用陣列的方法。





















___

## 參考資料

-[Javascript](https://javascript.info/)
-[Javascript Book](https://exploringjs.com/js/book/index.html)
-[第 2 天：基本語法和資料類型](https://ithelp.ithome.com.tw/articles/10344132)
-[JS array methods](https://www.w3schools.com/js/js_array_methods.asp)