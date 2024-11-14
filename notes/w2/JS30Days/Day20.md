[Problems](https://leetcode.com/problems/is-object-empty/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Is Object Empty

這題主要是判斷一個輸入值是否為「空的」，而空的定義因類型而異，特別是對物件和陣列。我們可以利用 `isEmpty()` 函數來實做這個功能。


```javascript
/**
 * @param {Object|Array} input
 * @return {boolean}
 */
function isEmpty(input) {
  // 檢查是否為物件
  if (typeof input === 'object' && !Array.isArray(input)) {
    // 物件為空的判斷：若 `Object.keys()` 回傳的鍵數量為 0，則代表物件為空
    return Object.keys(input).length === 0;
  }
  
  // 檢查是否為陣列
  if (Array.isArray(input)) {
    // 陣列為空的判斷：若 `input.length` 為 0，則代表陣列為空
    return input.length === 0;
  }
  
  // 對於其他資料類型，一律回傳 false，因為它們不屬於「空」的範疇
  return false;
}
```

### 2. 測試範例
以下是一些測試範例，讓我們看看這個函數在不同情況下的輸出結果。

- **空物件**：
  ```javascript
  console.log(isEmpty({})); // Output: true
  ```
  因為物件是空的，所以回傳 `true`。

- **非空物件**：
  ```javascript
  console.log(isEmpty({ "key": "value" })); // Output: false
  ```
  這個物件有一個屬性，並非空的，因此回傳 `false`。

- **空陣列**：
  ```javascript
  console.log(isEmpty([])); // Output: true
  ```
  陣列中沒有任何元素，所以回傳 `true`。

- **非空陣列**：
  ```javascript
  console.log(isEmpty([1, 2, 3])); // Output: false
  ```
  這個陣列有元素，因此回傳 `false`。

- **空字串**：
  ```javascript
  console.log(isEmpty('')); // Output: false
  ```
  雖然字串是空的，但我們並未將字串納入「空」的判斷範疇，所以回傳 `false`。

- **非空字串**：
  ```javascript
  console.log(isEmpty('Hello')); // Output: false
  ```
  字串有內容，因此回傳 `false`。

- **數字**：
  ```javascript
  console.log(isEmpty(0)); // Output: false
  ```
  數字 `0` 並不被視為空，回傳 `false`。

- **布林值**：
  ```javascript
  console.log(isEmpty(false)); // Output: false
  ```
  布林值也不被視為空，回傳 `false`。

### 總結
`isEmpty()` 函數主要檢查物件和陣列是否為空，若是空物件或空陣列則回傳 `true`，否則回傳 `false`。對於其他類型的輸入，例如字串、數字、布林值，則一律回傳 `false`，因為它們不符合「空」的定義。