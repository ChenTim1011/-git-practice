### 老師第三周提到的 deep copy


**淺拷貝 (Shallow Copy)**

淺拷貝僅複製物件的第一層屬性，內部巢狀物件仍然指向原始物件的引用。

**例子：**

1. **使用 Object.assign()**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const shallowCopy = Object.assign({}, originalObj);

// 修改第一層屬性
shallowCopy.name = 'Jane'; // 不影響 originalObj.name

// 修改內部物件
shallowCopy.info.age = 25; // 會影響 originalObj.info.age
```

2. **使用展開運算符（Spread Operator）**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const shallowCopy = { ...originalObj };

shallowCopy.name = 'Jane'; // 不影響 originalObj.name
shallowCopy.info.city = 'Los Angeles'; // 會影響 originalObj.info.city
```

---

**深拷貝 (Deep Copy)**

深拷貝會遞迴地複製物件的所有層級，確保新物件與原物件完全獨立。

**例子：**

1. **使用 JSON.stringify() 和 JSON.parse()**

```javascript
const originalObj = { name: 'John', info: { age: 30, city: 'New York' } };
const deepCopy = JSON.parse(JSON.stringify(originalObj));

deepCopy.info.city = 'Los Angeles'; // 不影響 originalObj.info.city
```

*缺點：* 無法處理 `undefined`、`function`、`Symbol`、`Date`、`RegExp` 等類型，且無法處理循環引用。

2. **自定義深拷貝函數**

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloneObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }

  return cloneObj;
}

const originalObj = {
  name: 'John',
  info: { age: 30, city: 'New York' },
  hobbies: ['reading', 'gaming'],
  birthDate: new Date(),
  pattern: /abc/,
};

const deepCopy = deepClone(originalObj);

deepCopy.info.age = 25; // 不影響 originalObj.info.age
deepCopy.hobbies.push('coding'); // 不影響 originalObj.hobbies
deepCopy.birthDate.setFullYear(2000); // 不影響 originalObj.birthDate
deepCopy.pattern = /xyz/; // 不影響 originalObj.pattern
```

3. **使用 Lodash 的 cloneDeep**

```javascript
const _ = require('lodash');

const originalObj = {
  name: 'John',
  info: { age: 30, city: 'New York' },
  hobbies: ['reading', 'gaming'],
};

const deepCopy = _.cloneDeep(originalObj);

deepCopy.info.city = 'Los Angeles'; // 不影響 originalObj.info.city
deepCopy.hobbies.push('coding'); // 不影響 originalObj.hobbies
```

---

**重點整理：**

- **淺拷貝：**
  - 只複製物件的第一層屬性。
  - 內部巢狀物件仍指向原始物件的引用。
  - 適用於無巢狀物件或不需要獨立內部物件的情況。

- **深拷貝：**
  - 遞迴地複製物件的所有層級，完全獨立。
  - 適用於需要完全複製物件，且內部修改不影響原物件。

- **實現深拷貝的方法：**
  1. **JSON.stringify() / JSON.parse()：**
     - 簡單易用，但有類型限制，無法處理特殊類型和循環引用。
  2. **自定義函數：**
     - 可處理特殊類型，需要考慮各種情況，實現較複雜。
  3. **使用第三方庫（如 Lodash）：**
     - 提供可靠的深拷貝功能，能處理多種情況，包括循環引用。

---

**心得：**

在開發中，選擇適當的拷貝方式至關重要。淺拷貝適合簡單的物件結構，但當涉及巢狀物件時，可能導致意想不到的副作用。深拷貝雖然能解決這個問題，但實現方式需要根據具體需求選擇。

使用 `JSON.stringify()` 和 `JSON.parse()` 是一種快速實現深拷貝的方法，但要注意其限制。自定義深拷貝函數可以滿足特定需求，但需要深入了解物件的結構和可能的類型。利用成熟的第三方庫如 Lodash，不僅可以提高開發效率，還能減少潛在的錯誤。

#### 參考資料
- [[JS] 物件淺拷貝(Shallow Copy) 及 深拷貝(Deep Copy)方法](https://medium.com/@ray102467/js-%E7%89%A9%E4%BB%B6%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E5%8F%8A-%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-%E6%96%B9%E6%B3%95-567cdfb6bcb4)

### 展開運算符(Spread Operator)與其餘運算符(Rest Operator) 的用法

**展開運算符（Spread Operator）與其餘運算符（Rest Operator）**

展開運算符和其餘運算符在 JavaScript 中都使用 `...` 表示，但用途和使用情境不同。以下將以其他例子來說明兩者的差異，並整理重點與心得。

---

### **展開運算符（Spread Operator）**

**用法：**

- **解壓縮陣列或可迭代物件**，將其展開成個別元素。
- **在陣列字面值**或**函式呼叫**中使用。
- **屬於淺拷貝**，僅複製第一層，內部巢狀物件仍是引用。

**適用於：**

- **陣列**、**字串**、**Set**、**Map** 等可迭代物件。

**範例：**

1. **合併陣列**

```javascript
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'lettuce'];

const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'lettuce']
```

2. **複製陣列**

```javascript
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

copiedArray.push(4);
console.log(originalArray); // [1, 2, 3]
console.log(copiedArray);   // [1, 2, 3, 4]
```

3. **展開字串**

```javascript
const greeting = 'Hello';
const letters = [...greeting];
console.log(letters); // ['H', 'e', 'l', 'l', 'o']
```

4. **函式參數**

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6
```

**物件展開（Object Spread）**

- **用於物件字面值**中，展開物件的屬性。
- **淺拷貝**，內部巢狀物件仍是引用。

**範例：**

1. **合併物件**

```javascript
const person = { name: 'Alice' };
const details = { age: 25, city: 'Wonderland' };

const fullProfile = { ...person, ...details };
console.log(fullProfile); // { name: 'Alice', age: 25, city: 'Wonderland' }
```

2. **複製物件**

```javascript
const originalObj = { a: 1, b: { c: 2 } };
const copiedObj = { ...originalObj };

copiedObj.a = 10;
copiedObj.b.c = 20;

console.log(originalObj); // { a: 1, b: { c: 20 } }
console.log(copiedObj);   // { a: 10, b: { c: 20 } }
```

---

### **其餘運算符（Rest Operator）**

**用法：**

- **在函式參數定義**和**解構賦值**中使用。
- **收集剩餘的元素**，將其組合成一個陣列。
- **只能使用一次**，且必須位於參數或變數列表的最後。

**適用於：**

- **函式參數**，收集多餘的傳入參數。
- **解構賦值**，將剩餘的值收集起來。

**範例：**

1. **函式其餘參數**

```javascript
function multiply(factor, ...numbers) {
  return numbers.map(number => number * factor);
}

const result = multiply(2, 1, 2, 3);
console.log(result); // [2, 4, 6]
```

2. **解構賦值**

```javascript
const [first, second, ...rest] = [10, 20, 30, 40, 50];

console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]
```

3. **物件解構**

```javascript
const person = { name: 'Bob', age: 30, city: 'New York' };

const { name, ...others } = person;

console.log(name);    // 'Bob'
console.log(others);  // { age: 30, city: 'New York' }
```

4. **函式預設參數與其餘參數**

```javascript
function greet(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

const messages = greet('Hello', 'Alice', 'Bob', 'Charlie');
console.log(messages); // ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']
```

---

### **重點整理**

**展開運算符（Spread Operator）：**

- **用於解壓縮**可迭代物件或物件的屬性。
- **應用情境：**
  - **陣列合併與複製**
  - **函式呼叫**時展開參數
  - **物件合併與複製**
- **特點：**
  - 屬於**淺拷貝**，僅複製第一層。
  - 能夠取代一些傳統方法，如 `Array.prototype.concat()`、`Object.assign()`。

**其餘運算符（Rest Operator）：**

- **用於收集剩餘的參數或屬性**，組合成陣列或物件。
- **應用情境：**
  - **函式參數**，收集多餘的傳入值。
  - **解構賦值**，收集剩餘的值。
- **特點：**
  - **只能使用一次**，且必須位於最後。
  - 提供更靈活的參數處理方式，取代傳統的 `arguments` 物件。

---

### **心得**

- **展開運算符**讓我們可以輕鬆地合併、複製陣列和物件，取代繁瑣的傳統方法。然而，需要注意的是，
展開運算符進行的是**淺拷貝**，對於巢狀物件需要小心處理，以免產生意外的引用關係。

- **其餘運算符**提供了更直觀的方式來處理函式的多餘參數和解構賦值時的剩餘值，改善了程式的可讀性和維護性。
相較於使用 `arguments` 物件，使用其餘運算符可以得到一個真正的陣列，方便使用陣列的方法。