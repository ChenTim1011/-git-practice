[Problems](https://leetcode.com/problems/array-reduce-transformation/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Function Composition

### 直覺概念
`compose` 函式接收一組函式陣列，並返回一個新的函式，該函式會將這些函式從右到左依序套用在輸入值上。這個方法在我們需要對輸入數據進行一系列轉換時特別有用。

### 方法解釋
在 `compose` 函式中，首先會檢查輸入的函式陣列是否為空。如果為空，則返回一個只回傳其輸入值的函式。否則，則使用 `reduceRight` 方法，將函式從右到左依序套用。`reduceRight` 被用來確保這些函式是從右到左依序應用。

### 何謂函式組合（Composition）
函式組合（Composition）指的是將兩個或更多的函式結合，形成一個新的函式。當我們組合兩個函式時，就是將一個函式的輸出作為另一個函式的輸入。

例如，假設我們有兩個函式 \( f(x) \) 和 \( g(x) \)，它們的組合表示為 \( (f \circ g)(x) = f(g(x)) \)。這表示我們會先對輸入 \( x \) 套用函式 \( g(x) \)，接著將 \( g(x) \) 的輸出作為 \( f(x) \) 的輸入。

### 複雜度分析
1. **時間複雜度**：O(n)，其中 \( n \) 是輸入陣列中函式的數量。
2. **空間複雜度**：O(n)，因為每一個函式的組合過程都會建立一個新的函式。

### 什麼是 `reduceRight`
`reduceRight` 是 JavaScript 陣列中的一種方法。它的功能與 `reduce` 相似，但它從陣列的右側開始運作而非左側。
- `reduceRight` 接收一個回呼函式作為第一個參數，該函式需要兩個參數：累加器（accumulator）和當前值（current value）。
- 回呼函式會對陣列中的每一個元素（從右至左）依次執行。

範例：
```javascript
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduceRight((prev, curr) => {
  return prev + curr;
});
console.log(sum); // 輸出：15
```
在這個範例中，`reduceRight` 用於計算陣列元素的總和，順序是從右到左。`prev` 代表先前的累計結果，`curr` 則代表當前的元素。

### JavaScript 程式碼
```javascript
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
  if (functions.length === 0) {
    return function(x) { return x; };
  }

  return functions.reduceRight(function(prevFn, nextFn) {
    return function(x) {
      return nextFn(prevFn(x));
    };
  });
};

const fn = compose([x => x + 1, x => 2 * x]);
console.log(fn(4)); // 輸出：9
```

```

### O(1) 空間複雜度解法
以下是另一個具有 O(1) 空間複雜度的解法：

```javascript
var compose = function(functions) {
  if (functions.length === 0) {
    return function(x) { return x; };
  }
  
  return function(x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

const fn = compose([x => x + 1, x => 2 * x]);
console.log(fn(4)); // 輸出：9
```

