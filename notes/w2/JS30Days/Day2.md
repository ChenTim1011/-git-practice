[Problems](https://leetcode.com/problems/counter/?envType=study-plan-v2&envId=30-days-of-javascript)

---

Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

 

Example 1:

Input: 
n = 10 
["call","call","call"]
Output: [10,11,12]
Explanation: 
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.
Example 2:

Input: 
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.
 

Constraints:

-1000 <= n <= 1000
0 <= calls.length <= 1000
calls[i] === "call"

**概述**

這個問題旨在介紹 Closure。在 JavaScript 中，函式會引用相同範疇以及所有外部範疇中宣告的變數。這些範疇被稱為函式的詞法環境。函式和它的環境的組合稱為 Closure。

**Closure 範例**

在 JavaScript 中，你可以在一個函式內宣告另一個函式並將其回傳。內部函式可以存取在其上方宣告的任何變數。

```javascript
function createAdder(a) {
  return function add(b) {
    const sum = a + b;
    return sum;
  }
}
const addTo2 = createAdder(2);
addTo2(5); // 7
```

內部函式 `add` 可以存取 `a`。這允許外部函式作為生成新函式的「工廠」，每個函式都有不同的行為。

**Closure 與 Class 的差異**

你可能注意到在上面的範例中，`createAdder` 與 class 的建構函式非常相似。

```javascript
class Adder {
  constructor(a) {
     this.a = a;
  }

  add(b) {
    const sum = this.a + b;
    return sum;
  }
}
const addTo2 = new Adder(2);
addTo2.add(5); // 7
```

除了語法上的差異，這兩段程式碼的基本用途相同。它們都允許你在「建構函式」中傳入一些狀態，並提供「方法」來存取該狀態。

一個主要差異是 Closure 允許真正的封裝。在 class 範例中，你無法阻止寫入 `addTo2.a = 3` 並破壞其預期行為。然而，在 Closure 範例中，理論上是不可能直接存取 `a` 的。注意，從 2022 年起，class 已可透過 `#` 前綴語法實現真正的封裝。

另一個差異在於函式的記憶體儲存方式。如果你建立了許多 class 實體，每個實體都儲存了一個對 prototype 物件的單一引用，所有方法都儲存在該 prototype 物件中。相反地，對於 Closure，所有的「方法」都會被生成並且在每次外部函式被調用時，「複製」一份儲存在記憶體中。因此，在有許多方法的情況下，class 可能更加有效率。

與 Java 等語言不同，你會經常看到使用函式而非 class 的程式碼。不過，由於 JavaScript 是多範式語言，選擇取決於所處的特定專案。

---

**方法 1：先遞增再回傳**

我們宣告一個變數 `currentCount`，並將它設為 `n - 1`。接著在 `counter` 函式內部，遞增 `currentCount` 並回傳該值。注意，由於 `currentCount` 是可變動的，所以應使用 `let` 而非 `const` 宣告。

**實作**

```javascript
function counter(n) {
  let currentCount = n - 1;
  return function() {
    currentCount++;
    return currentCount;
  };
}
```

---

**方法 2：後置遞增語法**

JavaScript 提供了便捷的語法，可以在回傳值之後再進行遞增。這使我們可以避免先將變數設為 `n - 1`。

**實作**

```javascript
function counter(n) {
  return function() {
    return n++;
  };
}
```

---

**方法 3：前置遞減和遞增語法**

JavaScript 也有語法允許先遞增值然後再回傳。因為遞增會在回傳前執行，我們必須首先像方法 1 一樣，先遞減該值。

**實作**

```javascript
function counter(n) {
  n--;
  return function() {
    return ++n;
  };
}
```

---

**方法 4：使用後置遞增語法及箭頭函式**

我們可以使用箭頭函式和隱式回傳來減少方法 2 中的程式碼量。

**實作**

```javascript
const counter = (n) => () => n++;
``` 

這些不同的方法提供了多種方式來實現計數器，每種方法都有不同的實現細節與效果。