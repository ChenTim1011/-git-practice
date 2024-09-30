// 請在 Node.js 中實作一個函式 fibonacci(n)，該函式返回第 n 個費波納契數。

// 嚴格模式
"use strict";

//用來計算計算次數
let recursiveCount = 0;
let tailRecursiveCount = 0;
let iterativeCount = 0;
let dynamicCount = 0;
let dynamicFibMoreSpaceCount = 0;

// ! 修正 既然 if, else if 都已經有 return 了，還需要 if/else 嗎？ 程式碼是否可以再更精簡一點？

// 法一:遞迴法 需要注意 回傳值、參數、何時要停止、每一步做什麼

// function recursiveFib(n) {
// TODO: implement fibonacci
//recursiveCount++;
//   if (n <= 1) return n;

// ! 修正: 這裡不需要else
//   return recursiveFib(n - 1) + recursiveFib(n - 2);
// }

// 法二:遞迴法但是用尾呼叫最佳化(Tail Call Optimization, TCO)
// Tail Call 的概念只要一句話：一個函數的在最後一步是呼叫另外一個函數。
// 如果 Tail Call 自己，又稱為 tail-recursive 尾遞迴，這時候只會存在一個 stack frame
// 正確書寫 Tail Call 的技巧稱作 PTC (Proper Tail Calls，正確的尾調用)。
// 首先，必須要開啟嚴格模式 "use strict"，並在函數最後一步呼叫下一個函式，並且回傳下一個函式的回傳值。

function tailRecursiveFib(n, a = 0, b = 1) {
  // tailRecursiveCount++;
  // 當 n 為 0 時，返回累積結果 a
  if (n === 0) return a;
  // 當 n 為 1 時，返回累積結果 b
  if (n === 1) return b;
  // 遞增累積的結果
  return tailRecursiveFib(n - 1, b, a + b);
}

// 法三:迭代法
function iterativeFib(n) {
  // ! 老師提到不需要在分別處理 n = 0, n = 1 的情況
  if (n <= 1) return n;

  // ! 老師提到這裡不需要else
  // ! 老師提到可以使用 javascript swap 的方式， 不需要使用 temp 的方法
  let first = 0,
    second = 1;
  for (let i = 2; i <= n; i++) {
    //iterativeCount++;
    [first, second] = [second, first + second];
  }
  return second;
}

// 法三:動態規劃
// 我們以空間換取時間，將計算過的值存起來，避免重複計算
// ! 作法 3 動態規劃，有沒有可能連空間都省下來？

// 我忽略了空間複雜度的分析 我使用了陣列去存數字，這裡的空間複雜度是O(n) 。
// 可以模仿作法2: 迭代法，只用三個變數去存數字，這樣空間複雜度就是O(1)。
// 但選擇使用陣列存變數，想要和作法2比較看看。
function dynamicFib(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    //dynamicCount++;
    // ! 老師提到可以使用 javascript swap 的方式， 不需要使用 temp 的方法
    [fib[0], fib[1]] = [fib[1], fib[0] + fib[1]];
    // 原本的作法: fib[i] = fib[i - 1] + fib[i - 2];  空間複雜度 O(n)
  }
  return fib[1];
}

function dynamicFibMoreSpace(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    //dynamicFibMoreSpaceCount++;
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}

//!比較三種方法的效率 做10次平均
let totalTime = 0;
let avgTime = 0;
let times = 10;

// 測試時間 從n=5到n=45測試

for (let n = 2; n <= 2 ** 13; n = n * 2) {
  recursiveCount = 0;
  tailRecursiveCount = 0;
  iterativeCount = 0;
  dynamicCount = 0;
  dynamicFibMoreSpaceCount = 0;
  totalTime = 0;

  console.log("n = ", n);

  // // 1.test recursiveFib
  // for (let i = 0; i < times; i++) {
  //   const start = performance.now();
  //   recursiveFib(n);
  //   const end = performance.now();
  //   totalTime += end - start;
  // }

  // avgTime = totalTime / times;
  // //recursiveCount = recursiveCount / times;
  // console.log("recursiveAvgTime =", avgTime.toFixed(5), "(ms)");
  // //console.log("recursiveCount = ", recursiveCount);

  // 2.test tailRecursiveFib
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    tailRecursiveFib(n);
    const end = performance.now();
    totalTime += end - start;
  }

  avgTime = totalTime / times;
  //tailRecursiveCount = tailRecursiveCount / times;
  console.log("tailRecursiveAvgTime = ", avgTime.toFixed(5), "(ms)");
  //console.log("tailRecursiveCount = ", tailRecursiveCount);

  // 3.test iterativeFib
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    iterativeFib(n);
    const end = performance.now();
    totalTime += end - start;
  }

  avgTime = totalTime / times;
  //iterativeCount = iterativeCount / times;
  console.log("iterativeAvgTime = ", avgTime.toFixed(5), "(ms)");
  //console.log("iterativeCount = ", iterativeCount);

  // 4.test dynamicFib 測試改良過 空間複雜度O(1)的動態規劃
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    dynamicFib(n);
    const end = performance.now();
    totalTime += end - start;
  }
  avgTime = totalTime / times;
  //dynamicCount = dynamicCount / times;
  console.log("dynamicAvgTime = ", avgTime.toFixed(5), "(ms)");
  //console.log("dynamicCount = ", dynamicCount);

  // 5.test dynamicFibMoreSpace 還沒改良過 空間複雜度O(n)的動態規劃
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    dynamicFibMoreSpace(n);
    const end = performance.now();
    totalTime += end - start;
  }
  avgTime = totalTime / times;
  //dynamicCount = dynamicCount / times;
  console.log("dynamicMoreSpaceAvgTime = ", avgTime.toFixed(5), "(ms)");
  //console.log("dynamicCount = ", dynamicCount);

  console.log("---");
}

//! 修改測試實驗，不該放入 count 的部分 原本實驗加入count是為了計算遞迴次數，但是這樣會影響效能測試
/*
  例如 n = 45  
  recursive_avg_time = 50133.40 (ms)
  recursive_count = 3672623805
  如果沒有繼續計算遞迴次數  這樣會比較準確，可以看到時間相差快5倍
  recursiveAvgTime = 10134.95452 (ms)
*/

//! 新增實驗5的部分 原本的作法: fib[i] = fib[i - 1] + fib[i - 2];  空間複雜度 O(n)
//! 新增實驗4  recursion + TCO(tail-call optimization) 這個是尾呼叫最佳化，可以避免遞迴造成的堆疊溢位
//! 新增實驗不比較遞迴部分，剩下四個方法看誰最快　n= 2**1 ~ n= 2**13
// 但當 n=2**14 即使是 TCO 也會遇到 RangeError: Maximum call stack size exceeded
// 參考資料 [Tail Calls] https://ithelp.ithome.com.tw/articles/10197230
