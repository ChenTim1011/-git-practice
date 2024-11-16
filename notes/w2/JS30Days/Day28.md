[Problems](https://leetcode.com/problems/event-emitter/description/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Event Emitter

```javascript
class EventEmitter {
        
    constructor() {
    // 初始化 events 物件，用於儲存所有事件及其對應的回呼函式
        this.events = {};
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
  subscribe(eventName, callback) {
    // 如果尚未存在此事件名稱，則為該事件名稱建立一個空陣列
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    // 建立事件監聽器物件，包含回呼函式
    const eventListener = { callback };
    
    // 將事件監聽器添加到對應的事件名稱陣列中
    this.events[eventName].push(eventListener);
    
    // 回傳一個物件，包含解除訂閱的功能
    return {
      unsubscribe: () => {
        // 找到該事件監聽器在陣列中的位置
        const index = this.events[eventName].indexOf(eventListener);
        
        // 如果事件監聽器存在於陣列中，則將它移除
        if (index > -1) {
          this.events[eventName].splice(index, 1);
          return undefined;
        }
      }
    };
  }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
  // 發送方法，用於觸發特定事件並傳遞參數給訂閱者
  emit(eventName, args = []) {
    // 取得該事件名稱的所有監聽器
    const eventListeners = this.events[eventName];
    
    // 如果沒有監聽器（即沒有人訂閱該事件），則返回空陣列
    if (!eventListeners) {
      return [];
    }
    
    // 對所有監聽器執行其回呼函式，並傳入參數
    return eventListeners.map((eventListener) => {
      return eventListener.callback(...args);
    });
  }
}

```