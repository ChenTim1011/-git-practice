// 請在 Node.js 中實作一個函式 fibonacci(n)，該函式返回第 n 個費波納契數。

// 法一:遞迴法 需要注意 回傳值、參數、何時要停止、每一步做什麼
function recursive_fib(n) {
  // TODO: implement fibonacci
  if (n === 0) return 0;
  else if (n === 1) return 1;
  else return recursive_fib(n - 1) + recursive_fib(n - 2);
}

// 法二:迭代法
function iterative_fib(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  else {
    let a = 0,
      b = 1,
      c;
    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }
    return c;
  }
}

// 法三:動態規劃
// 我們以空間換取時間，將計算過的值存起來，避免重複計算
function dynamic_fib(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}

//比較三種方法的效率 做10次平均
let recursive_time = 0;
let iterative_time = 0;
let dynamic_time = 0;
let times = 10;

//從n=10到n=50測試

for (let n = 10; n <= 100; n += 5) {
  console.log("n = ", n);

  console.time("recursive_fib");
  for (let i = 0; i < times; i++) {
    recursive_fib(n);
  }

  console.timeEnd("recursive_fib");

  console.time("iterative_fib");
  for (let i = 0; i < times; i++) {
    iterative_fib(n);
  }

  console.timeEnd("iterative_fib");

  console.time("dynamic_fib");
  for (let i = 0; i < times; i++) {
    dynamic_fib(n);
  }

  console.timeEnd("dynamic_fib");
}
