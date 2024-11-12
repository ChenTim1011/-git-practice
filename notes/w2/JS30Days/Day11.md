[Problems](https://leetcode.com/problems/memoize/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## memoize

### 直覺
這個問題要求我們建立一個函式的「記憶化」版本，該函式會將先前計算過的結果進行快取（cache），當相同的輸入再次被呼叫時，會直接返回快取中的結果，而不是重新計算。

### 方法
1. 定義一個名為 `memoize` 的函式，該函式接收一個函式 `fn` 作為參數。
2. 建立一個空物件 `cache` 用於儲存先前計算過的結果。
3. 返回一個新的函式，該函式使用展開語法（spread syntax）來接收任意數量的參數。
4. 使用 `JSON.stringify()` 將參數轉換為字串，以用作 `cache` 物件的鍵（key）。
5. 檢查這個鍵是否已存在於 `cache` 物件中，若存在則返回快取的值。
6. 若不存在，則呼叫原始函式 `fn` 並使用 `apply()` 傳遞參數，然後將計算結果儲存於 `cache` 中。
7. 最後，返回計算的結果。

### 快取
此問題涉及到快取的概念。快取是一種透過儲存計算結果並在相同輸入時返回快取結果來提升程式效能的技術。這樣可以大大減少重複的昂貴運算次數，提升程式的運行效率。

### 記憶化函式
記憶化（Memoization）是一種技術，主要用於優化那些昂貴或有重複計算的函式。通常使用物件或映射來實現快取。當呼叫記憶化函式時，首先檢查該輸入是否已存在於快取中，若存在則直接返回快取值，否則計算結果、存入快取並返回。

### 複雜度分析
- 時間複雜度：記憶化函式的時間複雜度取決於被記憶化的函式本身，可能從 O(1) 到 O(n) 或 O(2^n) 不等。
- 空間複雜度：O(n)，其中 n 是函式唯一輸入的數量。

---

### JavaScript 程式碼
```javascript
/**
 * @param {Function} fn
 */
function memoize(fn) {
    
   const cache = {};
  
   return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result;
    
    return result;
  }
  
}


const memoizedSum = memoize(function(a, b) {
  return a + b;
});

console.log(memoizedSum(2, 3)); // Output: 5
console.log(memoizedSum(2, 3)); // Output: 5
```

.apply 方法：

.apply() 是 JavaScript 函式物件上可用的一種方法。它允許我們用指定的 this 值以及參數陣列來呼叫函式。
使用 apply() 的好處在於，我們可以將所有參數作為一個陣列傳遞，而不是一個一個分別列出。這在動態傳入任意數量的參數時尤其有用。
this 作為第一個參數：

.apply() 的第一個參數是要設置的 this 值。在這段程式碼中，this 被傳入 apply() 是為了讓 fn 保持原始的 this 內容。
在一般情況下，使用 this 來呼叫 fn 並不是必須的（除非 fn 裡面用到 this ），但這樣寫可以保證 this 值的一致性。
args 作為第二個參數：

第二個參數 args 是一個陣列，包含了我們要傳給 fn 的所有參數。
args 是透過展開語法 (...args) 收集到的，因此它是一個動態的參數列表。無論傳入多少參數，它都會被打包成一個陣列。