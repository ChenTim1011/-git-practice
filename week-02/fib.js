// 請在 Node.js 中實作一個函式 fibonacci(n)，該函式返回第 n 個費波納契數。

//用來計算計算次數
let recursiveCount = 0;
let iterativeCount = 0;
let dynamicCount = 0;

// ! 修正 既然 if, else if 都已經有 return 了，還需要 if/else 嗎？ 程式碼是否可以再更精簡一點？

// 法一:遞迴法 需要注意 回傳值、參數、何時要停止、每一步做什麼

function recursiveFib(n) {
  // TODO: implement fibonacci
  recursiveCount++;
  if (n === 0) return 0;
  else if (n === 1) return 1;
  // ! 修正: 這裡不需要else
  return recursiveFib(n - 1) + recursiveFib(n - 2);
}

// 法二:迭代法
function iterativeFib(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  // ! 這裡不需要else
  let first = 0,
    second = 1,
    third;
  for (let i = 2; i <= n; i++) {
    iterativeCount++;
    third = first + second;
    first = second;
    second = third;
  }
  return third;
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
    dynamicCount++;
    let temp = fib[0] + fib[1];
    fib[0] = fib[1];
    fib[1] = temp;
    // 原本的作法: fib[i] = fib[i - 1] + fib[i - 2];  空間複雜度 O(n)
  }
  return fib[1]; // fib[n]
}

//!比較三種方法的效率 做10次平均
let totalTime = 0;
let avgTime = 0;
let times = 10;

// 測試時間 從n=5到n=45測試

for (let n = 5; n <= 45; n += 5) {
  recursiveCount = 0;
  iterativeCount = 0;
  dynamicCount = 0;
  totalTime = 0;

  console.log("n = ", n);

  // test recursiveFib
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    recursiveFib(n);
    const end = performance.now();
    totalTime += end - start;
  }

  avgTime = totalTime / times;
  recursiveCount = recursiveCount / times;
  console.log("recursiveAvgTime =", avgTime.toFixed(5), "(ms)");
  console.log("recursiveCount = ", recursiveCount);

  // test iterativeFib
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    iterativeFib(n);
    const end = performance.now();
    totalTime += end - start;
  }

  avgTime = totalTime / times;
  iterativeCount = iterativeCount / times;
  console.log("iterativeAvgTime = ", avgTime.toFixed(5), "(ms)");
  console.log("iterativeCount = ", iterativeCount);

  // test dynamicFib 測試改良過 空間複雜度O(1)的動態規劃
  totalTime = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    dynamicFib(n);
    const end = performance.now();
    totalTime += end - start;
  }
  avgTime = totalTime / times;
  dynamicCount = dynamicCount / times;
  console.log("dynamicAvgTime = ", avgTime.toFixed(5), "(ms)");
  console.log("dynamicCount = ", dynamicCount);

  console.log("---");
}
