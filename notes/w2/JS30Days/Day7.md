[Problems](https://leetcode.com/problems/array-reduce-transformation/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---
## array-reduce-transformation

`reduce` 函數是一種高階函數，它接收一個陣列、一個 reducer 函數以及一個初始值，並通過將 reducer 函數應用到陣列的每個元素，最終回傳單一的累積值。
  
要實做 `reduce` 函數，我們可以迭代陣列的每個元素，將 reducer 函數應用於當前的累積值和當前元素，然後更新累積值。我們可以使用 `for` 循環、`forEach` 方法或 `for...of` 循環來進行迭代。

複雜度  
時間複雜度：  
`reduce` 函數的時間複雜度是 O(n)，其中 n 是陣列的長度，因為函數對陣列中的每個元素都只走訪一次。

空間複雜度：  
O(1)，因為它只使用了一個變量來儲存累積值。

學習到的內容  
通過實現 `reduce` 函數，我們學會了如何使用高階函數來轉換並合併陣列中的數據。我們還學會了如何使用不同的方法，例如 `for` 循環、`forEach` 方法或 `for...of` 循環，來迭代陣列。

附加資訊：  
`fn` 參數是一個函數，它接收兩個參數：累積值和陣列的當前元素。`fn` 函數的作用是對這兩個值進行特定操作並回傳結果。

JavaScript 程式碼  
```javascript
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
  let val = init;
  for (let i = 0; i < nums.length; i++) {
    val = fn(val, nums[i]);
  }
  return val;
};
```

TypeScript 程式碼  
```typescript
type Reducer<T, U> = (acc: T, curr: U) => T;

function reduce<T, U>(nums: U[], fn: Reducer<T, U>, init: T): T {
  let val: T = init;
  for (let i = 0; i < nums.length; i++) {
    val = fn(val, nums[i]);
  }
  return val;
}
```

使用 `forEach` 迴圈  
```javascript
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
  let val = init;
  nums.forEach(num => {
    val = fn(val, num);
  });
  return val;
};
```

使用 `reduceRight`  
```javascript
function reduceArray(nums, fn, init) {
  return nums.reverse().reduceRight((val, num) => fn(val, num), init);
}
```

使用遞迴  
```javascript
function reduceArray(nums, fn, init) {
  if (nums.length === 0) {
    return init;
  } else {
    const head = nums[0];
    const tail = nums.slice(1);
    const val = fn(init, head);
    return reduceArray(tail, fn, val);
  }
}
```

使用 `for...of` 迴圈  
```javascript
function reduceArray(nums, fn, init) {
  let val = init;
  for (const num of nums) {
    val = fn(val, num);
  }
  return val;
}
```