// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from "./stack.js";

let stack = new Stack();

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？
console.log(stack.isEmpty()); // true 測試是否為空

stack.print();

console.log(stack.pop()); // Stack is empty 測試pop是否為空
console.log(stack.peek()); // Stack is empty 測試peek是否為空

stack.push(5);
stack.push(8);
stack.push(11);
stack.push(15);
console.log(stack.peek()); // 15 測試peek
stack.print(); // 5, 8,11,15 測試print
console.log(stack.pop()); // 15 測試pop
console.log(stack.peek()); // 11 測試peek
stack.clear(); // 測試clear
stack.print();
