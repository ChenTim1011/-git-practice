// 請在 Node.js 中實作一個函式 fibonacci(n)，該函式返回第 n 個費波納契數。

//用來計算計算次數
let recursive_count = 0;
let iterative_count = 0;
let dynamic_count = 0;

// ! 修正 既然 if, else if 都已經有 return 了，還需要 if/else 嗎？ 程式碼是否可以再更精簡一點？

// 法一:遞迴法 需要注意 回傳值、參數、何時要停止、每一步做什麼

function recursive_fib(n) {
  // TODO: implement fibonacci
  recursive_count++;
  if (n === 0) return 0;
  else if (n === 1) return 1;
  // ! 修正: 這裡不需要else
  return recursive_fib(n - 1) + recursive_fib(n - 2);
}

// 法二:迭代法
function iterative_fib(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  // ! 這裡不需要else
  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    iterative_count++;
    c = a + b;
    a = b;
    b = c;
  }
  return c;
}

// 法三:動態規劃
// 我們以空間換取時間，將計算過的值存起來，避免重複計算
// ! 作法 3 動態規劃，有沒有可能連空間都省下來？

// 我忽略了空間複雜度的分析 我使用了陣列去存數字，這裡的空間複雜度是O(n) 。
// 可以模仿作法2: 迭代法，只用三個變數去存數字，這樣空間複雜度就是O(1)。
// 但選擇使用陣列存變數，想要和作法2比較看看。
function dynamic_fib(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    dynamic_count++;
    let temp = fib[0] + fib[1];
    fib[0] = fib[1];
    fib[1] = temp;
    // 原本的作法: fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[1]; // fib[n]
}

//!比較三種方法的效率 做10次平均
let total_time = 0;
let avg_time = 0;
let times = 10;

// 測試時間 從n=5到n=45測試

for (let n = 5; n <= 45; n += 5) {
  recursive_count = 0;
  iterative_count = 0;
  dynamic_count = 0;
  total_time = 0;

  console.log("n = ", n);

  // test recursive_fib
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    recursive_fib(n);
    const end = performance.now();
    total_time += end - start;
  }

  avg_time = total_time / times;
  recursive_count = recursive_count / times;
  console.log("recursive_avg_time =", avg_time.toFixed(5), "(ms)");
  console.log("recursive_count = ", recursive_count);

  // test iterative_fib
  total_time = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    iterative_fib(n);
    const end = performance.now();
    total_time += end - start;
  }

  avg_time = total_time / times;
  iterative_count = iterative_count / times;
  console.log("iterative_avg_time = ", avg_time.toFixed(5), "(ms)");
  console.log("iterative_count = ", iterative_count);

  // test dynamic_fib 測試改良過 空間複雜度O(1)的動態規劃
  total_time = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    dynamic_fib(n);
    const end = performance.now();
    total_time += end - start;
  }
  avg_time = total_time / times;
  dynamic_count = dynamic_count / times;
  console.log("dynamic_avg_time = ", avg_time.toFixed(5), "(ms)");
  console.log("dynamic_count = ", dynamic_count);

  console.log("---");
}
