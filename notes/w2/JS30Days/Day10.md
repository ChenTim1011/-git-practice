[Problems](https://leetcode.com/problems/allow-one-function-call/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## allow-one-function-call

這個問題要求我們回傳一個新函式，這個函式的行為會根據是否已被呼叫過而有所不同。若從未被呼叫過，它應呼叫原始函式並回傳其結果；若已被呼叫過，則應回傳 `undefined`，而不再呼叫原始函式。

### 方法
為了解決這個問題，我們可以回傳一個新函式，這個函式會追蹤它是否已被呼叫過。我們可以使用閉包來儲存一個布林變數，初始設為 `false`。新函式第一次被呼叫時會呼叫原始函式並將結果儲存，然後將布林變數設為 `true`。之後每次呼叫新函式都只會回傳 `undefined`，而不會再呼叫原始函式。

### 複雜度
時間複雜度：
對於回傳的函式而言，無論是第一次或後續呼叫，其時間複雜度皆為 O(1)。這是因為只需檢查 `hasBeenCalled` 標誌並回傳結果或 `undefined`，這些都是常數時間操作。

空間複雜度：
也是 O(1)，因為我們僅使用了常數數量的額外空間來儲存 `hasBeenCalled` 標誌及原始函式的結果。

### 學習要點
這個問題的核心在於使用閉包來儲存函式的狀態。透過這樣做，我們可以追蹤函式是否已被呼叫過並根據狀況回傳不同結果。

---

### JavaScript 程式碼
```javascript
/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {

  let hasBeenCalled = false;
  let result;

  return function(...args) {
    if (!hasBeenCalled) {
      result = fn(...args);
      hasBeenCalled = true;
      return result;
    } else {
      return undefined;
    }
  }

};

let fn = (a,b,c) => (a + b + c);
let onceFn = once(fn);

console.log(onceFn(1,2,3)); // 6
console.log(onceFn(2,3,6)); // undefined
```
---

### 使用閉包與箭頭函式
在此方法中，我們使用箭頭函式來建立回傳的函式，並將 `hasBeenCalled` 標誌和結果儲存在閉包中。透過 `if` 條件判斷函式是否已被呼叫過。

```javascript
function once(fn) {
  let hasBeenCalled = false;
  let result;

  return (...args) => {
    if (!hasBeenCalled) {
      result = fn(...args);
      hasBeenCalled = true;
      return result;
    } else {
      return undefined;
    }
  };
}
```

### 使用類別
在這個方法中，我們定義了一個 `Once` 類別，其 `call` 方法的行為與前述回傳的函式相同。我們使用類別屬性來儲存 `hasBeenCalled` 標誌及結果。

```javascript
class Once {
  hasBeenCalled = false;
  result;

  call(fn, ...args) {
    if (!this.hasBeenCalled) {
      this.result = fn(...args);
      this.hasBeenCalled = true;
      return this.result;
    } else {
      return undefined;
    }
  }
}

function once(fn) {
  const instance = new Once();
  return instance.call.bind(instance, fn);
}
```

### 使用傳統函式與物件
在這個方法中，我們使用傳統函式來創建回傳的函式，而不是使用閉包。我們將 `hasBeenCalled` 標誌和結果儲存在物件中，並作為參數傳遞給回傳的函式。

```javascript
function once(fn) {
  return function(...args) {
    const state = {
      hasBeenCalled: false,
      result: undefined
    };

    if (!state.hasBeenCalled) {
      state.result = fn(...args);
      state.hasBeenCalled = true;
      return state.result;
    } else {
      return undefined;
    }
  };
}
```
