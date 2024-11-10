[Problems](https://leetcode.com/problems/to-be-or-not-to-be/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

Write a function expect that helps developers test their code. It should take in any value val and return an object with the following two functions.

toBe(val) accepts another value and returns true if the two values === each other. If they are not equal, it should throw an error "Not Equal".
notToBe(val) accepts another value and returns true if the two values !== each other. If they are equal, it should throw an error "Equal".
 

Example 1:

Input: func = () => expect(5).toBe(5)
Output: {"value": true}
Explanation: 5 === 5 so this expression returns true.
Example 2:

Input: func = () => expect(5).toBe(null)
Output: {"error": "Not Equal"}
Explanation: 5 !== null so this expression throw the error "Not Equal".
Example 3:

Input: func = () => expect(5).notToBe(null)
Output: {"value": true}
Explanation: 5 !== null so this expression returns true.

**方法**

這個問題要求 `expect` 函式能夠支援 `toBe` 和 `notToBe` 方法呼叫（例如 `expect(5).toBe(5);` 應回傳 `true`，而 `expect(5).notToBe(5);` 應拋出 `"Equal"` 的錯誤）。為了實現這一點，我們應該根據呼叫的類型來定義 `expect` 函式的回傳值。可以使用以下的格式來進行設計：

```javascript
return {
    toBe: (parameters) => {
        [進行一些處理]
    },
    notToBe: (parameters) => {
        [進行一些處理]
    }
}
```

以下的解決方案遵循了這種格式，在 `toBe` 和 `notToBe` 中使用了 `if else` 判斷語句。當條件符合錯誤拋出狀況時，拋出錯誤，否則回傳 `true`。

**程式碼**

```javascript
var expect = function(val) {
    return {
        toBe: (val2) => {
            if (val !== val2) throw new Error("Not Equal");
            else return true;
        },
        notToBe: (val2) => {
            if (val === val2) throw new Error("Equal");
            else return true;
        }
    }
};
```

---

**詳細解釋**

1. **外層函式 `expect`**：當 `expect` 函式被呼叫時，它接收一個參數 `val`。`val` 是我們要測試的值，並將其儲存在函式內部以供後續的測試方法使用。

2. **回傳物件**： `expect` 函式回傳一個物件，其中包含 `toBe` 和 `notToBe` 兩個方法。

3. **toBe 方法**：
   - 當 `toBe` 方法被呼叫時，它會接收一個新的參數 `val2`，這是我們希望 `val` 和它進行比較的值。
   - 方法內的 `if else` 條件判斷：
     - 若 `val !== val2`，表示 `val` 與 `val2` 不相等，此時會拋出 `"Not Equal"` 的錯誤。
     - 否則，若兩者相等，則回傳 `true` 表示測試通過。
   - **範例**：呼叫 `expect(5).toBe(4);` 時：
     - `val` 是 `expect` 的參數（所以 `val = 5`），`val2` 是 `toBe` 的參數（所以 `val2 = 4`）。
     - 因為 `val !== val2`（即 `5 != 4`），程式會拋出 `"Not Equal"` 的錯誤。

4. **notToBe 方法**：
   - 當 `notToBe` 方法被呼叫時，同樣會接收一個參數 `val2`。
   - 方法內的 `if else` 條件判斷：
     - 若 `val === val2`，表示 `val` 與 `val2` 相等，此時會拋出 `"Equal"` 的錯誤。
     - 否則，若兩者不相等，則回傳 `true` 表示測試通過。
   - **範例**：呼叫 `expect(5).notToBe(5);` 時：
     - `val` 是 `expect` 的參數（所以 `val = 5`），`val2` 是 `notToBe` 的參數（所以 `val2 = 5`）。
     - 因為 `val === val2`（即 `5 == 5`），程式會拋出 `"Equal"` 的錯誤。

