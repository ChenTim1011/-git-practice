[Problems](https://leetcode.com/problems/counter-ii/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---
##  counter-ii


從問題中我們可以解讀出需要三個函式：`increment()`、`decrement()` 和 `reset()`。現在讓我們來探討哪種方法最適合解決這個問題。

---

### 1. 使用傳統函式

傳統函式是使用 `function` 關鍵字定義的，可以是具名函式，或是指派給變數的匿名函式。  
在以下的程式碼中，我們使用 `function` 關鍵字建立了 `increment()`、`decrement()` 和 `reset()` 三個函式。  
每個函式內部會執行相應的操作：

- `increment()`：回傳 `presentCount + 1`
- `decrement()`：回傳 `presentCount - 1`
- `reset()`：將 `presentCount` 重置為初始值 `init`

```javascript
var createCounter = function(init) {
  let presentCount = init;

  function increment() {
    return ++presentCount;
  }

  function decrement() {
    return --presentCount;
  }

  function reset() {
    return (presentCount = init);
  }

  return { increment, decrement, reset };
};
```

**時間與空間複雜度**：O(1)

---

### 2. 使用 Arrow Function

Arrow Function 是 ES6 引入的一種簡短語法，用於定義函式。  
它使用 `=>` 語法來取代 `function` 關鍵字，並且和傳統函式相比，有一些行為上的不同，例如繼承了周圍內容的 `this` 值。  

在此例中，我們使用 Arrow Function 定義 `increment`、`decrement` 和 `reset`，這樣寫法簡潔，並且省略了 `function` 關鍵字：

```javascript
var createCounter = function(init) {
    let presentCount = init;
    return {
        increment: () => ++presentCount,
        decrement: () => --presentCount,
        reset: () => (presentCount = init),
    };
};
```

**時間與空間複雜度**：O(1)

---

### 3. 使用 Class

Class 是一種用於建立具有一組屬性和方法的物件模板。  

在 ES6 中，Class 作為基於 prototype 的繼承模型的一種語法糖，提供了支援繼承、靜態方法與屬性、getter 和 setter 等功能。  
因此，Class 提供了一種更簡潔且組織良好的方式來撰寫物件導向的程式碼。

在以下範例中，`Counter` 是 Class 的名稱。  
- `constructor` 方法是一個特殊的函式，當根據 Class 建立物件時會被調用。
- 它將 `init` 和 `presentCount` 屬性初始化。
- `increment()`、`decrement()` 和 `reset()` 是常規方法，可以用於 `Counter` Class 的實例來取得對應的輸出。  

要基於 Class 建立物件，我們使用 `new` 運算符。  
例如，我們基於 `Counter` Class 建立一個名為 `createCounter` 的物件，並傳入 `init` 值作為 `constructor` 的參數。

```javascript
class Counter {
  constructor(init) {
    this.init = init;
    this.presentCount = init;
  }

  increment() {
    this.presentCount += 1;
    return this.presentCount;
  }

  decrement() {
    this.presentCount -= 1;
    return this.presentCount;
  }

  reset() {
    this.presentCount = this.init;
    return this.presentCount;
  }
}

var createCounter = function(init) {
  return new Counter(init);
};
```

**時間與空間複雜度**：O(1)

---

### 總結：哪種方法較佳？

- **Class**：適合用於創建具有共享行為的物件，特別是當需要使用繼承或共享方法時，可以大幅提升程式碼的可擴展性。
- **傳統函式**：適合重複使用的小段程式碼，當僅需單一用途時也很實用。
- **Arrow Function**：適合短小精簡的函式，尤其是在需要保留 `this` 值時非常有用。

