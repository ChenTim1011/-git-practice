[Problems](https://leetcode.com/problems/return-length-of-arguments-passed/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## return-length-of-arguments-passed


這篇文章深入介紹了 JavaScript 中使用函式的不同方法，並涵蓋了兩種解決特定 LeetCode 題目的策略：使用展開參數（rest parameters）及 `arguments` 物件。以下是詳細的翻譯和解釋：

---

### 簡介
解決此問題的兩種主要方法：

1. 使用展開參數（rest parameters）
2. 使用 `arguments` 物件

根據 LeetCode 提供的函式簽名，它已經聲明了展開參數，因此我們可能更偏向使用展開參數的解法，雖然兩種方法都可以解決問題。

函式的名稱實際上可以省略！以下是合法的程式碼：

```javascript
(function (name) {
  console.log("Hello, " + name + "!");
});
```

這段程式碼用括號包起來，因為它是一個函式表達式（function expression），而非函式宣告（function declaration），名稱的缺失會讓解析器感到困惑。

不過，儘管這段程式碼可以執行，實際上並不實用。它創建了一個新的匿名函式物件，並立即丟棄，因為我們沒有任何方式可以引用它來執行。

若我們想要引用這個函式，但堅持不給它命名，也可以將它賦值給變數，這樣也不需要括號：

```javascript
const greet = function (name) {
  console.log("Hello, " + name + "!");
};
```

LeetCode 喜歡使用這種方式來定義純 JavaScript 函式模板，但它使用 `var` 關鍵字，這是一個不好的範例，因為 `var` 已幾乎被淘汰。`var` 是函式作用域，而現代程式碼庫通常使用 `const` 和 `let`，這樣的變數是區塊作用域（block-scoped）。我猜測 `var` 的行為無法更改或移除是為了向後相容，但在新代碼中完全沒有理由使用它。

💡 **小提示**：你可以修改 LeetCode 提供的程式碼，只要修改後的程式碼仍然符合 LeetCode 預期的介面即可。替換函式宣告語法是小改動，我會在純 JavaScript 解法中去掉 `var`。

### 展開參數（Rest Parameters）
如果我們希望撰寫一個接受可變數量參數的函式，可以使用展開參數。展開參數在函式參數的最後聲明，使用 `...` 作為前綴，這樣可以將傳入函式的其餘參數封裝為一個 JavaScript 陣列。

已知 LeetCode 提供的程式碼中已經使用了展開參數，因此我們不需要再次宣告，只需直接使用它。

#### 陣列長度
展開參數會變成一個 JavaScript 陣列，我們可以使用 `length` 屬性來檢查陣列的大小，不需要像函式一樣調用，直接讀取屬性即可：`foo.length`。

---

### `arguments` 物件
如果使用 `arguments` 物件，我們就不需要宣告展開參數：

```javascript
function printArguments() {
  console.log(arguments);
}
```

這也展示了 JavaScript 函式的另一個重要特性：即使函式宣告的參數不匹配，仍然可以傳入額外的參數。例：`greet("World", "Universe")`，雖然在目前的實現中只有 `World` 被使用。

有趣的是，`arguments` 物件不是 JavaScript 陣列，但使用上類似。它是一個「類陣列物件」，如果要讓它變成完整的陣列，可以用 `Array.from`。不過，在現代程式碼中使用展開參數更為推薦。

---

### 型別註解（Type Annotations）
雖然題目是 JavaScript，但建議使用 TypeScript。TypeScript 為 JavaScript 加入了型別註解，使程式碼更具「編譯時」的安全性。LeetCode 的 TypeScript 模板有點複雜，我們可以直接將參數設為 `unknown` 型別，表示不知道類型。

例如，在 TypeScript 中可以將 `greet` 函式標註如下：

```typescript
function greet(name: string): void {
  console.log("Hello, " + name + "!");
}
```

LeetCode 的 TypeScript 模板過於複雜，對此問題而言，將參數設為 `unknown` 是足夠的。

---

### 解法
#### 使用展開參數
以下是純 JavaScript 版本：

```javascript
/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
function argumentsLength(...args) {
  return args.length;
}
```

TypeScript 解法：

```typescript
function argumentsLength(...args: readonly unknown[]): number {
  return args.length;
}
```

#### 使用 `arguments`
在這個解法中，省略了展開參數：

```javascript
/**
 * @return {number}
 */
function argumentsLength() {
  return arguments.length;
}
```

TypeScript 版：

```typescript
function argumentsLength(..._args: readonly unknown[]): number {
  return arguments.length;
}
```

有趣的是，`arguments` 在箭頭函式中無法使用。箭頭函式沒有自己的 `arguments` 綁定：

```javascript
const argumentsLength = function () {
  return arguments.length;
};
```

### 答案
- **`function foo() {}` 和 `const foo = function() {}` 有什麼不同？**
  在 `const` 宣告中，函式是匿名的；此外，`const` 的函式無法重新賦值。

- **若將陣列的 `length` 屬性設為其他值會怎樣？**
  若新長度小於原長度，會丟棄多餘的元素；若大於原長度，則會填充空位。

- **在箭頭函式中使用 `arguments` 會如何？**
  如果在全域範圍內定義箭頭函式，會引發 `ReferenceError`。