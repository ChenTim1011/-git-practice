[Problems](https://leetcode.com/problems/array-prototype-last/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Array Prototype Last

`Array.prototype.last()` 方法的設計目的是回傳陣列的最後一個元素，如果陣列為空則回傳 -1。
這在您需要快速存取陣列的最後一個元素，且不想要額外處理空陣列的情況下會非常有用。
  
**實作 1：**
```javascript
Array.prototype.last = function() {
  if (this.length === 0) {
    return -1;
  } else {
    return this[this.length - 1];
  }
};
```
在這個實作中，我們使用了一個簡單的 if/else 條件來檢查輸入陣列的長度是否為零。如果是零，則回傳 -1；否則，使用 `this.length - 1` 索引回傳陣列的最後一個元素。這種方法簡單易懂，但可能沒有其他實作那麼簡潔。

**實作 2：**
```javascript
Array.prototype.last = function() {
  return this.length ? this[this.length - 1] : -1;
};
```
在這個實作中，我們使用了三元運算符來檢查輸入陣列的長度是否為真（非零）。如果為真，則使用 `this.length - 1` 索引回傳陣列的最後一個元素；否則回傳 -1。這種方法比前一種更為簡潔，對熟悉三元運算符的開發人員來說可能更易於閱讀。

**實作 3：**
```javascript
Array.prototype.last = function() {
  return this.length ? this.slice(-1)[0] : -1;
};
```
在這個實作中，我們使用 `Array.prototype.slice()` 方法來創建一個僅包含輸入陣列最後一個元素的新陣列。通過傳遞負索引 `-1` 給 `slice()` 方法，我們取得一個只包含最後一個元素的新陣列，然後使用 `[0]` 索引來回傳此新陣列的唯一元素。如果輸入陣列長度為零，則回傳 -1。此方法比前一種更為簡潔，並且可能稍微更優化，因為它避免了直接索引輸入陣列。

整體來看，這三種實作都達成了相同的目標：回傳陣列的最後一個元素或當陣列為空時回傳 -1，但它們使用了稍微不同的方式來實現。第二和第三種實作更為簡潔，並且可能比第一種稍微更優化，但三者皆為有效且正確的實作。