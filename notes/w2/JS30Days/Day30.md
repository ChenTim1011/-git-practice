[Problems](https://leetcode.com/problems/calculator-with-method-chaining/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Calculator with Method Chaining

這段程式碼定義了一個 `Calculator` 類別，用來執行數學計算操作。該類別包含多個方法，如加法、減法、乘法、除法、次方等。每個方法操作 `result` 值，並在操作後回傳 `this` 物件本身。

### 程式碼詳細說明

#### 建構子 `constructor`
```javascript
constructor(value) {
    this.result = value;
}
```
- **參數 `value`**：用來設定計算器的初始值。
- **`this.result`**：將初始值儲存在 `result` 中，以便後續的計算可以基於該值進行。

#### `add` 方法
```javascript
add(value) {
    this.result += value;
    return this;
}
```
- **功能**：將 `value` 加到 `result` 上。
- **回傳 `this`**：這裡回傳 `this`（即 `Calculator` 本身）允許我們連續調用多個方法，這種方法稱為**方法鏈（method chaining）**。

#### `subtract` 方法
```javascript
subtract(value) {
    this.result -= value;
    return this;
}
```
- **功能**：從 `result` 中減去 `value`。
- **回傳 `this`**：允許後續連續調用方法。

#### `multiply` 方法
```javascript
multiply(value) {
    this.result *= value;
    return this;
}
```
- **功能**：將 `result` 乘以 `value`。
- **回傳 `this`**：讓方法可以被鏈式調用。

#### `divide` 方法
```javascript
divide(value) {
    if (value === 0) {
        throw new Error('Division by zero is not allowed');
    }
    this.result /= value;
    return this;
}
```
- **功能**：將 `result` 除以 `value`。如果 `value` 是 `0`，會拋出錯誤，避免除以零。
- **回傳 `this`**：允許方法鏈。

#### `power` 方法
```javascript
power(value) { 
    this.result = Math.pow(this.result, value);
    return this;
}
```
- **功能**：將 `result` 提升到 `value` 的次方。
- **回傳 `this`**：方法鏈的支持。

#### `getResult` 方法
```javascript
getResult() {
    return this.result;       
}
```
- **功能**：回傳目前 `result` 的值，作為計算結果。

### 為什麼要 `return this`？
每個操作方法（如 `add`、`subtract` 等）都回傳 `this` 是為了實做方法鏈式調用（method chaining）。這樣可以直接在同一行上連續調用多個方法，讓程式碼更加簡潔。例如：

```javascript
const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(3).divide(4).getResult();
console.log(result); // 6
```

在這裡，`calc.add(5)` 回傳 `calc` 自身，允許我們立即再調用 `multiply(2)`，依此類推。這種方法鏈式調用讓程式碼更簡潔且具可讀性。