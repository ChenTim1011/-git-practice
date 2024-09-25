// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
// 盡可能使用 javascript 的 array 函式。 push, pop , forEach, map, filter, reduce 等等
export default class Stack {
  // TODO: # 有特別的意思嗎？請以註解回覆。
  // # 代表私有變數，只能在 class 內部使用
  #items;

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素i
  push(element) {
    // TODO
    this.#items.push(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
    // TODO
    if (this.#items.length === 0) {
      return "Stack is empty";
    }
    // ! 精簡程式碼
    return this.#items.pop();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    // TODO
    if (this.#items.length === 0) {
      return "Stack is empty";
    }
    return this.#items[this.#items.length - 1];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    // TODO
    // ! 精簡程式碼
    return this.#items.length === 0;
  }

  // 回傳 stack 中元素的個數
  size() {
    // TODO
    return this.#items.length;
  }

  // 清空 stack
  clear() {
    // TODO
    this.#items = [];
  }

  // 印出 stack 內容
  print() {
    // TODO
    this.#items.forEach((item) => {
      console.log(item);
    });
  }
}
