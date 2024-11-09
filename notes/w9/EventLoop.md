上課聽到老師分享 nodejs 是如何做到單執行緒又不阻塞的處理很有趣
想了解更多關於 eventloop

參考這一篇文章 (event-loop)[https://javascript.info/event-loop]


### 1. 事件迴圈基本概念
- 事件迴圈是一個無窮迴圈，JavaScript引擎會依序執行佇列中的任務（tasks），完成後進入休眠，等待新任務。
- 常見任務：如`<script src="...">`加載、滑鼠移動、`setTimeout`到期等。

### 2. 任務佇列
- ** macrotask  queue**：包含外部腳本、事件處理（如`click`、`mousemove`）、`setTimeout`等。
- 每次執行一個 macrotask 時，所有 microtask 會立即執行（在渲染前完成）。
- ** microtask  queue**：包含Promise的`.then`回呼、`queue microtask `等。

### 3.  macrotask  queue vs  microtask  queue執行順序
- **執行順序**：JavaScript執行同步程式碼 > 執行所有 microtask  > 執行下一個 macrotask 。
-  microtask 保證在同一 macrotask 執行後馬上完成，避免其他  macrotask  插入，維持程式環境一致性。

### 4. 應用場景
#### (1) 分割CPU密集型任務
- 將大型計算分割為小單位，使用`setTimeout`或`queue microtask `逐步執行，讓JavaScript引擎有時間處理其他UI更新和事件，防止卡頓。

#### (2) 顯示進度
- 分割任務並使用`setTimeout`可在執行期間更新DOM，顯示進度或狀態。

#### (3) 延遲事件處理
- 使用零延遲的`setTimeout`，將操作延後執行，使得其他事件或冒泡行為先完成處理。

### 5. 主要方法
- **`setTimeout(f, 0)`**：加入新 macrotask ，適合分割大型任務。
- **`queue microtask (f)`**：加入 microtask queue，適合在現有 macrotask 結束前快速執行短程程式碼。

### 6. 總結
- 事件迴圈在處理任務時，優先執行 microtask 再處理其他 macrotask 。
- 善用 macrotask  queue與 microtask  queue來達成任務分割與進度顯示，確保效能並提升使用者體驗。