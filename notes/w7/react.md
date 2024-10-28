被朋友問到 React 的特性，其實我也只有聽過一些專有名詞
像是 Component 、 virtual DOM 、 hook 、 JSX 等等，但沒有很了解，
之前有聽過 React 設計有採用一些 functional programming 的特性，過去沒有接觸過這一塊，
又不知道 為什麼 React 要這樣設計，這部影片是講基本的 React 設計，可以讓我在使用 React 可以更加瞭解它。

[Every React Concept Explained in 12 Minutes](https://www.youtube.com/watch?v=wIyHSOugGGw&ab_channel=CodeBootcamp)

---

### 1. **元件（Components）**
   - **說明**：元件是 React 中的基本構造，相當於應用程式的「樂高積木」。它們將 UI 分解成獨立的可重複使用的模組。每個元件都會返回 JSX（即 Javascript in XML）以算繪特定部分。
   - **使用時機**：當需要重複算繪相同的 UI 元素，或將應用程式分解為可管理的模組時，例如按鈕、輸入框或整個頁面部分。
   - **範例**：
     ```jsx
     function Button({ text }) {
       return <button>{text}</button>;
     }

     function App() {
       return (
         <div>
           <Button text="提交" />
           <Button text="取消" />
         </div>
       );
     }
     ```
     

---

### 2. **JSX 屬性與動態值**
   - **說明**：JSX!=HTML，兩者是完全不同的東西，JSX 是一種語法糖，可以讓 JavaScript 文件中編寫類似 HTML 的語法，需要經過轉換，只是方便我們撰寫。 JSX 支援動態值，可用大括號 `{}` 包裹 JavaScript 表達式來插入變量或運算結果。屬性則使用駝峰命名法（如 `className` 取代 HTML 的 `class`）。
   - **使用時機**：當需要插入動態內容或 JavaScript 表達式時，例如顯示狀態值或計算結果。
   - **範例**：
     ```jsx
     const isActive = true;

     function Button() {
       return <button className={isActive ? "active" : "inactive"}>點我</button>;
     }
     ```

---

### 3. **React Fragment**
   - **說明**：React Fragment 允許在不添加多餘的 HTML 標籤的情況下返回多個元素，減少不必要的 DOM 節點。
   - **使用時機**：當元件需要返回多個根節點但不希望增加不必要的 `<div>` 等包裹元素時。
   - **範例**：
     ```jsx
     function App() {
       return (
         <>
           <h1>標題</h1>
           <p>段落文字</p>
         </>
       );
     }
     ```

---

### 4. **Props**
   - **說明**：Props（屬性）是父元件傳遞給子元件的資料，用來設定子元件的內容或行為。它們相當於元件的「設定」。
   - **使用時機**：當父元件需要傳遞資料或狀態給子元件，讓子元件根據不同的屬性算繪不同內容時。
   - **範例**：
     ```jsx
     function Greeting(props) {
       return <h1>你好，{props.name}!</h1>;
     }

     function App() {
       return (
         <div>
           <Greeting name="小明" />
           <Greeting name="小華" />
         </div>
       );
     }
     ```

---

### 5. **Key 屬性**
   - **說明**：`key` 屬性是 React 用來唯一識別列表中每個元件的標識。這對於追蹤列表變化（如新增、移除或排序）特別重要。
   - **使用時機**：當元件列表需要隨著資料變化而重新算繪時，用於保持每個元素的一致性和辨識性。
   - **範例**：
     ```jsx
     const items = ["蘋果", "香蕉", "橘子"];

     function App() {
       return (
         <ul>
           {items.map((item, index) => (
             <li key={index}>{item}</li>
           ))}
         </ul>
       );
     }
     ```

---

### 6. **算繪與虛擬 DOM**
   - **說明**：React 使用虛擬 DOM 加快算繪速度。虛擬 DOM 是真實 DOM 的輕量級複製，當狀態變化時，React 會更新虛擬 DOM 並比較兩個版本的差異，再應用到真實 DOM。
   - **使用時機**：當應用程式具有頻繁的 UI 更新時，虛擬 DOM 能夠提升性能。
   - **範例**：
     ```jsx
     function Counter() {
       const [count, setCount] = React.useState(0);
       return <button onClick={() => setCount(count + 1)}>計數：{count}</button>;
     }
     ```


---

### 7. **事件處理**
   - **說明**：React 使用合成事件來管理各種事件（如 `onClick`、`onChange` 等），便於跨瀏覽器兼容性並統一管理。
   - **使用時機**：當需要偵聽使用者互動，如點擊、輸入或提交表單等操作時。
   - **範例**：
     ```jsx
     function App() {
       function handleClick() {
         alert("按鈕被點擊了！");
       }
       return <button onClick={handleClick}>點我</button>;
     }
     ```

---

### 8. **狀態（State）**
   - **說明**：State 是元件的內部資料，用來儲存並控制元件的動態行為。
   - **使用時機**：當需要在元件內部保存並更新值時，例如計數器或表單輸入值。
   - **範例**：
     ```jsx
     function Counter() {
       const [count, setCount] = React.useState(0);
       return (
         <div>
           <p>計數：{count}</p>
           <button onClick={() => setCount(count + 1)}>增加</button>
         </div>
       );
     }
     ```
     *說明：每次按下「增加」按鈕，`setCount` 更新計數並觸發重新算繪。*

---

### 9. **受控元件（Controlled Components）**
   - **說明**：受控元件是由 React 狀態完全控制的表單元素，透過 `onChange` 事件和狀態來動態更新。
   - **使用時機**：當需要追蹤表單輸入，確保值是可控並受狀態管理時。
   - **範例**：
     ```jsx
     function TextInput() {
       const [text, setText] = React.useState("");
       return (
         <input
           type="text"
           value={text}
           onChange={(e) => setText(e.target.value)}
         />
       );
     }
     ```
     *說明：輸入框的值由 `text` 狀態控制，隨輸入更新狀態。*

---

### 10. **Hooks（勾子）**
   - **說明**：Hooks 是 React 16.8 引入的特性，用於在函數元件中使用狀態和生命週期功能。
   - **使用時機**：當需要管理狀態（`useState`）、執行副作用（`useEffect`）、或跨元件樹傳遞資料（`useContext`）時。
   - **範例**：
     ```jsx
     function App() {
       const [count, setCount] = React.useState(0);

       React.useEffect(() => {
         console.log(`計數變更為：${count}`);
       }, [count]);

       return <button onClick={() => setCount(count + 1)}>增加計數</button>;
     }
     ```
     *說明：每當 `count` 變化，`useEffect` 會記錄新值。*

---

### 11. **純元件（Pure Component）**
   - **說明**：純元件只依賴輸入（props），輸入不變則輸出不變，避免不必要的重新算繪。
   - **使用時機**：當元件的顯示完全依賴於 props，且不涉及狀態變化時。
   - **範例**：
     ```jsx
     function PureComponent({ name }) {
       return <h1>你好，{name}</h1>;
     }
     ```
     *說明：此元件僅顯示 `name` prop 的內容，不產生副作用。*

---

### 12. **嚴格模式（Strict Mode）**
   - **說明**：嚴格模式幫助開發者識別潛在問題，例如使用過時的 API 或不當的副作用。
   - **使用時機**：在開發時包裹應用程式，檢測並提示可能的潛在錯誤。
   - **範例**：
     ```jsx
     function App() {
       return (
         <React.StrictMode>
           <h1>應用程式標題</h1>
         </React.StrictMode>
       );
     }
     ```

---

### 13. **Effect（副作用）**
   - **說明**：`useEffect` 用來管理非算繪行為（如 API 請求、訂閱、或手動 DOM 操作），可用來處理副作用。
   - **使用時機**：當需要在特定條件變化時觸發額外操作，如請求資料或清理資源。
   - **範例**：
     ```jsx
     function FetchData() {
       const [data, setData] = React.useState(null);

       React.useEffect(() => {
         fetch("https://api.example.com/data")
           .then((response) => response.json())
           .then((data) => setData(data));
       }, []);

       return <div>資料：{data ? JSON.stringify(data) : "載入中..."}</div>;
     }
     ```

---

### 14. **Context（上下文）**
   - **說明**：Context 可讓資料在多層級元件之間傳遞，避免手動傳遞 props。
   - **使用時機**：當資料需要在元件樹多層級使用，如使用者資訊、主題顏色等。
   - **範例**：
     ```jsx
     const UserContext = React.createContext();

     function App() {
       return (
         <UserContext.Provider value="小明">
           <Greeting />
         </UserContext.Provider>
       );
     }

     function Greeting() {
       const user = React.useContext(UserContext);
       return <h1>你好，{user}</h1>;
     }
     ```

---

### 15. **Portal**
   - **說明**：Portal 允許將元件算繪到其他 DOM 節點。
   - **使用時機**：適合 modal 視窗、彈出框等需要在其他 DOM 節點上顯示的元素。
   - **範例**：
     ```jsx
     import ReactDOM from "react-dom";

     function Modal() {
       return ReactDOM.createPortal(
         <div className="modal">這是 modal 視窗</div>,
         document.getElementById("modal-root")
       );
     }
     ```

---

### 16. **Suspense**
   - **說明**：Suspense 為懶加載或異步資料加載時提供載入中的預備顯示。
   - **使用時機**：適用於異步載入的資料或元件。
   - **範例**：
     ```jsx
     const DataComponent = React.lazy(() => import("./DataComponent"));

     function App() {
       return (
         <React.Suspense fallback={<div>載入中...</div>}>
           <DataComponent />
         </React.Suspense>
       );
     }
     ```

---

### 17. **Error Boundaries（錯誤邊界）**
   - **說明**：Error Boundary 捕捉算繪錯誤，提供替代顯示，避免應用程式崩潰。
   - **使用時機**：適合高風險元件或用於捕捉意外錯誤，保證用戶體驗。
   - **範例**：
     ```jsx
     class ErrorBoundary extends React.Component {
       constructor(props) {
         super(props);
         this.state = { hasError: false };
       }

       static getDerivedStateFromError(error) {
         return { hasError: true };
       }

       render() {
         if (this.state.hasError) {
           return <h1>發生錯誤。</h1>;
         }
         return this.props.children;
       }
     }

     function App() {
       return (
         <ErrorBoundary>
           <ProblematicComponent />
         </ErrorBoundary>
       );
     }
     ```

