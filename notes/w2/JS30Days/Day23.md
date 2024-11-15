[Problems](https://leetcode.com/problems/group-by/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Group By

方法：
我們透過擴展 Array 的原型來定義 `groupBy` 方法，這樣任何陣列都可以直接呼叫此方法。

要對元素進行分組，我們需要遍歷陣列中的每個項目。一種方式是使用 `reduce` 函數，它可以讓我們在遍歷陣列的同時累積結果。

為了對元素分組，我們需要一個辨識哪些元素屬於同一組的方式，這就是提供的函數 `fn` 的作用。該函數以元素作為輸入並回傳一個值，該值將作為分組的鍵。

在遍歷每個元素時，我們需要檢查當前鍵的分組是否已經存在。如果不存在，則創建一個空陣列來保存該組的元素。然後，將當前元素推入相應的分組陣列中。

當所有元素都處理完後，我們回傳包含分組元素的物件。物件中的每個鍵代表一組，與之相關聯的值是包含該組中元素的陣列。

程式碼解釋：
```javascript
Array.prototype.groupBy = function(fn) {
  return this.reduce((grouped, item) => {
    const key = fn(item); // 使用提供的函數取得分組鍵
    if (!grouped[key]) { // 若該鍵不存在於分組物件中，則創建一個新陣列
      grouped[key] = [];
    }
    grouped[key].push(item); // 將當前元素加入到對應鍵的陣列中
    return grouped; // 回傳更新後的分組物件，供下一次迭代使用
  }, {});
};
```

**範例使用：**
```javascript
[1, 2, 3].groupBy(String); // 結果為 {"1": [1], "2": [2], "3": [3]}
```

程式碼解釋：
```javascript
Array.prototype.groupBy = function(fn) {
    let group = {};
    this.forEach((item) => {
        let key = fn(item);
        if(!group[key]) group[key]=[];
        group[key].push(item);
    })
    return group;
};
```

