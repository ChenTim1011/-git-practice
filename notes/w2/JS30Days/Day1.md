[Problems](https://leetcode.com/problems/create-hello-world-function/?envType=study-plan-v2&envId=30-days-of-javascript)

---
## create-hello-world-function

在程式設計中，Closure 是函式與其詞法環境的組合。詞法環境包含了當 Closure 建立時所能作用的變數。

要理解 Closure，首先需要理解詞法範疇（Lexical Scoping）。在 JavaScript 中，函式內部宣告的變數僅在該函式內可存取，而任何內部巢狀的函式也可以存取這些變數。然而，即使外層函式已經回傳，內層函式仍然可以“記住”外層函式中的變數，因為內層函式可以存取外層函式的詞法作用域。

**範例**

```javascript
function outer() {
  const name = "Bob";

  function inner() {
    console.log(`Hello, ${name}!`);
  }

  return inner;
}

const greeting = outer();
greeting(); // 輸出 "Hello, Bob!"
```

**說明：**

在此範例中，`outer` 定義了一個變數 `name` 和一個函式 `inner`。`inner` 被定義在 `outer` 中，因此它可以存取 `outer` 的詞法環境中的 `name`。當 `outer` 被調用並回傳 `inner` 時，Closure 會被建立，並保留對 `name` 的存取權限。即使 `outer` 已經執行完畢，`inner` 仍能存取並使用 `name` 來輸出歡迎詞。

---

**另一個範例**

```javascript
function counter() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  }
}

const increment = counter();
increment(); // 輸出 1
increment(); // 輸出 2
increment(); // 輸出 3
```

**說明：**

在此範例中，`counter` 回傳了一個函式，它可以遞增並輸出變數 `count`。`count` 是定義在 `counter` 內，因此無法在 `counter` 外部直接存取。然而，當 `counter` 回傳內部的函式時，Closure 便保留了對 `count` 的存取權限，這表示每次 `increment` 被調用時，仍然可以存取並修改 `count`。

---

**解答：**

要在 JavaScript 中建立一個回傳另一個始終回傳 `"Hello World"` 的函式，可以使用 "function currying" 的技術。這涉及建立一個函式，該函式回傳另一個函式，且該函式能存取原始函式的變數。

```javascript
function createHelloWorld() {
  const greeting = "Hello World";
  
  return function() {
    return greeting;
  };
}
```

