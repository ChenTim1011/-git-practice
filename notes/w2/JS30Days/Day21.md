[Problems](https://leetcode.com/problems/chunk-array/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Chunk Array

### 題目概述：分割陣列
這題要求將一個陣列分割成固定大小的子陣列。我們可以用很多不同的方法來實現，像是遍歷陣列每個元素逐步加入子陣列，或者使用內建的 `.slice()` 方法一次抓取特定大小的區塊。

以下我們會介紹不同的解法。

---

### 背景知識
#### 1. 陣列元素存取方式
在 JavaScript 中，可以透過方括號 `[]` 或 `.at()` 方法來存取陣列元素。`.at()` 的好處是支援負索引，可以很方便地存取倒數第幾個元素，例如 `arr.at(-1)` 取最後一個元素。

#### 2. 創建與修改陣列
可以使用 `[]` 建立一個陣列，如 `[3, 1, 4]`。對於空陣列，可以寫成 `[]` 或加上明確型別，例如 `const anotherArr: string[] = [];`。JavaScript 的 `.push()` 方法常用於向陣列尾部添加元素。

#### 3. 陣列迭代方式
JavaScript 支援多種陣列迭代方式：
- `for...of`：最常用於遍歷陣列元素。
- `for`：傳統的 `for` 循環可以手動管理索引。
- `.forEach()`：傳入一個回呼函數，支援元素、索引、及整個陣列的訪問。
- `.entries()`：同時返回索引和元素，可以搭配解構賦值來取得鍵值對。

#### 4. 箭頭函數
用箭頭函數可以簡化函數表達式，例如 `(a, b) => a + b`。若想返回物件字面值，需使用括號包住物件，如 `x => ({ x })`。

---

### 解法
1. **使用 Lodash 庫的 _.chunk()**  
   這是最直接的方法，若可以使用 Lodash 的情況下，只需一行代碼：
   ```javascript
   function chunk(arr, size) {
     return _.chunk(arr, size);
   }
   ```

2. **逐個元素處理**  
   手動遍歷每個元素，將其逐步加入目前的子陣列：
   ```javascript
   function chunk(arr, size) {
     const res = [];
     let currentChunk = [];

     for (const element of arr) {
       currentChunk.push(element);

       // 當子陣列達到指定大小時，將其添加至結果並重置
       if (currentChunk.length === size) {
         res.push(currentChunk);
         currentChunk = [];
       }
     }

     // 處理最後一個未滿的子陣列
     if (currentChunk.length > 0) {
       res.push(currentChunk);
     }

     return res;
   }
   ```

3. **流式算法**  
   不需要單獨處理最後一組，讓 `res` 在每個元素處理後始終保持最新狀態：
   ```javascript
   function chunk(arr, size) {
     const res = [];

     for (let i = 0; i < arr.length; ++i) {
       if (i % size === 0) {
         res.push([]);
       }
       res.at(-1).push(arr[i]);
     }

     return res;
   }
   ```

4. **無索引方法**  
   使用 `.at()` 確認最後一個子陣列是否已滿：
   ```javascript
   function chunk(arr, size) {
     const res = [];

     for (const element of arr) {
       if (res.length === 0 || res.at(-1).length === size) {
         res.push([]);
       }
       res.at(-1).push(element);
     }

     return res;
   }
   ```

5. **使用 `.forEach()` 方法**  
   搭配箭頭函數與索引，簡潔地實現分塊：
   ```javascript
   function chunk(arr, size) {
     const res = [];

     arr.forEach((element, index) => {
       if (index % size === 0) {
         res.push([]);
       }
       res.at(-1).push(element);
     });

     return res;
   }
   ```

