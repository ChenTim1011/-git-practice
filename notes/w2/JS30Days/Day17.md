[Problems](https://leetcode.com/problems/cache-with-time-limit/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Cache With Time Limit

```javascript
    var TimeLimitedCache = function() {
        map = new Map();
        var timer;
    };

    TimeLimitedCache.prototype.set = function(key, value, duration) {
        let res = map.has(key);
        if(res) {
            clearTimeout(map.get(key).timer);
        }
        timer = setTimeout(()=>map.delete(key), duration);
        map.set(key, {value: value, timer: timer} );
        return res;
    };

    TimeLimitedCache.prototype.get = function(key) {
        if(map.has(key)) return map.get(key).value;
        return -1;
    };

    TimeLimitedCache.prototype.count = function() {
        return map.size;
}; 
```
---

### 程式碼逐步說明

```javascript
var TimeLimitedCache = function() {
    map = new Map(); // 建立一個新的 Map 來儲存鍵值對及其計時器
    var timer;       // 用來儲存計時器的變數
};
```

- **初始化函數**：
  - 使用 `Map` 來儲存每個鍵值對及其相關的計時器，讓我們可以追蹤每個鍵的到期時間。
  - 定義一個 `timer` 變數，用於暫存每個鍵的計時器，以便後續設置或清除它們。

---

```javascript
TimeLimitedCache.prototype.set = function(key, value, duration) {
    let res = map.has(key); // 檢查 `map` 中是否已存在此鍵
```

- **檢查鍵是否已存在**：
  - 使用 `map.has(key)` 檢查此鍵是否已存在於快取中，並將結果存入 `res`。
  - `res` 為布林值，`true` 表示此鍵已存在且未過期，`false` 表示此鍵不存在或已過期。

---

```javascript
    if(res) {
        clearTimeout(map.get(key).timer); // 若鍵已存在，清除其舊的計時器
    }
```

- **清除舊的計時器**：
  - 如果該鍵已經存在於 `map` 中且尚未過期，則使用 `clearTimeout` 清除舊的計時器，以避免未過期的舊鍵在新設定的時效內被刪除。

---

```javascript
    timer = setTimeout(() => map.delete(key), duration); // 設置新的計時器
    map.set(key, {value: value, timer: timer} ); // 將新值和計時器存入 map 中
    return res; // 返回此鍵是否已存在且未過期
};
```

- **設置新計時器**：
  - 使用 `setTimeout` 設置新的計時器，在 `duration` 毫秒後自動執行 `map.delete(key)` 以刪除過期的鍵。
  - 將新設定的 `value` 和 `timer` 以 `{ value, timer }` 的物件形式儲存到 `map` 中，使得此鍵在新的 `duration` 內有效。
- **返回是否已存在的狀態**：
  - `set` 方法會返回 `res`，指示該鍵在設定之前是否已存在且未過期。

---

```javascript
TimeLimitedCache.prototype.get = function(key) {
    if(map.has(key)) return map.get(key).value; // 若鍵未過期，返回其值
    return -1; // 若鍵不存在或已過期，返回 -1
};
```

- **取得鍵值**：
  - 使用 `map.has(key)` 檢查 `map` 中是否存在該鍵且尚未過期。
  - 如果鍵未過期，使用 `map.get(key).value` 取得其值並返回。
  - 如果鍵不存在或已過期，返回 `-1`。

---

```javascript
TimeLimitedCache.prototype.count = function() {
    return map.size; // 返回 map 的大小，即未過期的鍵數量
};
```

- **計算未過期的鍵數量**：
  - 使用 `map.size` 返回 `map` 的大小，即當前所有未過期的鍵的數量。

---

### 使用範例

```javascript
const timeLimitedCache = new TimeLimitedCache();

console.log(timeLimitedCache.set(1, 42, 1000)); // false，因為該鍵不存在
console.log(timeLimitedCache.get(1));           // 42，因為該鍵尚未過期
console.log(timeLimitedCache.count());          // 1，快取中有一個未過期的鍵

// 等待 1000 毫秒後，該鍵將過期
setTimeout(() => {
    console.log(timeLimitedCache.get(1));       // -1，因為該鍵已過期
    console.log(timeLimitedCache.count());      // 0，快取中無未過期鍵
}, 1500);
```

---

### 總結

1. `set` 方法設置一個具有時效的鍵值對。如果鍵已存在且未過期，則覆蓋原有的值與計時器並返回 `true`；否則返回 `false`。
2. `get` 方法取得未過期的鍵的值，若鍵不存在或已過期則返回 `-1`。
3. `count` 方法返回快取中未過期鍵的總數。
