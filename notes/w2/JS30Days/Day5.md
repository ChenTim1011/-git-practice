[Problems](https://leetcode.com/problems/apply-transform-over-each-element-in-array/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---
## apply-transform-over-each-element-in-array

**為什麼作為題目設計者會限制使用 Array.map()？**

我可以想到三個原因，解釋為什麼題目設計者會限制我們使用 `Array.map()`：

1. **促進創意思考**  
   限制 `Array.map()` 是為了讓開發者思考替代方案，以不同的方式實現相同的功能，例如使用迴圈、函式或遞迴等方法，從而鼓勵更靈活的問題解決能力。

2. **效能考量**  
   使用 `Array.map()` 並不總是最有效率的解法，尤其是在處理大型陣列時。其他技術，如迴圈或遞迴，有時能提供更高的效能。因此，熟悉多種陣列處理方式會有助於開發者應對不同效能需求的場景。

3. **避免過度簡化**  
   使用 `Array.map()` 會使問題變得過於簡單；限制 `Array.map()` 能增加挑戰性，幫助開發者深入理解陣列操作的基本原理。

---

### 替代方案

#### 1. 使用帶有容器的 for 迴圈

我們可以走訪輸入陣列中的每個元素，並將映射函式應用到每個元素上，將轉換後的值存入一個新陣列中。

```javascript
var map = function(arr, fn) {
  const transformedArr = [];
  for (let i = 0; i < arr.length; i++) {
    transformedArr[i] = fn(arr[i], i);
  }
  return transformedArr;
};
```

**時間與空間複雜度**：O(n)

---

#### 使用沒有容器的 for 迴圈 (又稱為「就地轉換」)

在這種方式下，我們直接修改原始陣列，不使用新容器，將每個元素通過函式轉換後直接存入相同位置。

```javascript
var map = function(arr, fn) {
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = fn(arr[i], i);
    }
    return arr;
};
```

**時間與空間複雜度**：O(n) 和 O(1)

這種方式是一種不好的方法，因為它會改變傳入的資料，可能導致意想不到的問題。舉例來說，假設我們有一個叫 `personsAge` 的陣列，記錄了人們的年齡。假設我們要檢查某人是否滿 18 歲，滿 18 歲的記錄為 `1`，否則記錄為 `0`。如果我們使用這種方式，原始年齡資料會被覆蓋成 `1` 或 `0`，導致無法再次獲取原始年齡資訊。如果我們的應用拓展到其他國家，而其中一個國家的成年標準是 21 歲，那麼我們會面臨資料丟失的問題，需重新獲取年齡資料。

**重要提醒：**「不要隨意更動傳入的資料」。  
註：`Array.map()` 本身不會更動原始陣列。

---

#### 2. 使用 forEach 方法

我們可以使用 `forEach` 方法走訪輸入陣列中的每個元素，並將映射函式應用到每個元素上，再將轉換後的值存入一個新陣列中。

```javascript
var map = function(arr, fn) {
  const transformedArr = [];
  arr.forEach((element, index) => {
    transformedArr[index] = fn(element, index);
  });
  return transformedArr;
};
```

**時間與空間複雜度**：O(n)

---

#### 3. 使用 reduce 方法

我們也可以使用 `reduce` 方法來走訪輸入陣列的每個元素，並將映射函式應用到每個元素上，然後將轉換後的值累加到一個新陣列中。

```javascript
var map = function(arr, fn) {
  return arr.reduce((transformedArr, element, index) => {
    transformedArr[index] = fn(element, index);
    return transformedArr;
  }, []);
};
```

**時間與空間複雜度**：O(n)

---

#### 4. 使用 for...of 迴圈

我們可以使用 `for...of` 迴圈走訪輸入陣列中的每個元素，並將映射函式應用到每個元素上，再將轉換後的值存入一個新陣列中。

```javascript
var map = function(arr, fn) {
  const transformedArr = [];
  let index = 0;
  for (const element of arr) {
    transformedArr[index] = fn(element, index);
    index++;
  }
  return transformedArr;
};
```

**時間與空間複雜度**：O(n)



