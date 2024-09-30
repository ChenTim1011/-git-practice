//doJob 函式不能修改
function doJob(job, time, cb) {
  setTimeout(() => {
    // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
    let now = new Date();
    cb(`完成工作 ${job} at ${now.toISOString()}`);
  }, time);
}

// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);
// write your code here
// 以下是使用範例
// call+back => 做完我再叫你的函式，可以被放進函式參數放進去其他參數
// 原本使用 setTimeout 是非同步，但是動作順序不是我想要的。
// 我有很多個doJob，但是我想要他們按照我想要的順序執行 => 使用 callback

doJob("刷牙", 1000, function (data) {
  console.log(data);
  doJob("吃早餐", 3000, function (data) {
    console.log(data);
    doJob("寫功課", 1000, function (data) {
      console.log(data);
      doJob("吃午餐", 2000, function (data) {
        console.log(data);
      });
    });
  });
});
// 發現有一個問題，如果doJob越來越多，會有很多層的callback，這樣的寫法會造成callback hell
// callback hell 的問題是，程式碼會變得很難閱讀，也很難維護，不方便錯誤處理。
// 我們可以使用 promise 來解決這個問題

/*
開始工作的時間是 19:07:20，1 秒後完成刷牙，再 3 秒後完成吃早餐，再 1 秒後完成寫功課，再 2 秒後完成吃午餐
期望輸出
開始工作 at 2024-09-25T19:07:20.167Z
完成工作 刷牙 at 2024-09-25T19:07:21.196Z
完成工作 吃早餐 at 2024-09-25T19:07:24.198Z
完成工作 寫功課 at 2024-09-25T19:07:25.199Z
完成工作 吃午餐 at 2024-09-25T19:07:27.199Z
*/
