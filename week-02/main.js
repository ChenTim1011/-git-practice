// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from "./stack.js";

let stack = new Stack();

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？
//測試1: 初始化應該是為空的
console.log(stack.isEmpty()); // true 測試是否為空

//測試2: 測試空的stack應該印不出來東西
stack.print();

//測試3: 空的stack pop 應該要印出Stack is empty 
console.log(stack.pop()); // Stack is empty 測試pop是否為空

//測試4: 空的stack peek 應該要印出Stack is empty
console.log(stack.peek()); // Stack is empty 測試peek是否為空

//測試5: 測試push是否正確
stack.push(5);
stack.push(8);
stack.push(11);
stack.push(15);
console.log(stack.peek()); // 15 測試peek

//測試6: print是否正確能印出stack裡的元素
stack.print(); // 5, 8,11,15 測試print

//測試7: 測試pop是否正確
console.log(stack.pop()); // 15 測試pop
console.log(stack.peek()); // 11 測試peek

//測試8: 測試size是否正確
console.log(stack.size()); // 3 測試size

//測試9: 測試clear是否正確
stack.clear(); // 測試clear
stack.print();
