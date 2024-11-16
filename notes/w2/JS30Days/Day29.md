[Problems](https://leetcode.com/problems/array-wrapper/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Array Wrapper

這段程式碼定義了一個 `ArrayWrapper` 類別，它封裝了一個數字陣列並提供了兩個方法：`valueOf` 和 `toString`，用來改寫該類別的運算行為。這樣當我們使用 `+` 操作符或將它轉成字串時，`ArrayWrapper` 會自動使用這些自定義的行為。

### 程式碼詳細說明

#### ArrayWrapper 建構子
```javascript
var ArrayWrapper = function(nums) {
    this.array = nums;
};
```
- **參數 `nums`**：接收一個數字陣列 `nums`。
- **this.array**：將 `nums` 陣列儲存在 `this.array` 中，以便後續方法可以存取該陣列。

### `valueOf` 方法
```javascript
ArrayWrapper.prototype.valueOf = function() {
    return this.array.reduce((pre, cur) => pre + cur, 0);
};
```
- **功能**：`valueOf` 方法被設計為在進行數值運算時自動呼叫，例如在使用 `+` 時。它會將陣列內的所有數字相加並回傳總和。
- **`reduce` 函式**：使用 `reduce` 來迭代陣列的每個元素，`pre` 表示累計和，`cur` 表示當前的數字，最後回傳整個陣列的總和。
- **運作方式**：當 `ArrayWrapper` 實例使用 `+` 時，JavaScript 會自動調用 `valueOf` 方法，進而回傳陣列內所有數字的總和。

#### `toString` 方法
```javascript
ArrayWrapper.prototype.toString = function() {
    return JSON.stringify(this.array);
};
```
- **功能**：`toString` 方法會將 `array` 轉為 JSON 字串格式，以便在需要字串時（如 `String(obj)`）自動呼叫。
- **JSON.stringify**：使用 `JSON.stringify` 將 `this.array` 轉換成字串格式，如 `"[1,2]"`。