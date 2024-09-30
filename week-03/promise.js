//前期提要:在callback.js中，我們使用callback來解決非同步問題，
//但是如果doJob越來越多，會有很多層的callback，這樣的寫法會造成callback hell，我們可以使用promise來解決這個問題。

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
// doJob("刷牙", 1000, function (data) {
//   console.log(data);
//   doJob("吃早餐", 3000, function (data) {
//     console.log(data);
//     doJob("寫功課", 1000, function (data) {
//       console.log(data);
//       doJob("吃午餐", 2000, function (data) {
//         console.log(data);
//       });
//     });
//   });
// });

//使用promise
//promise有三種狀態:pending(進行中)、resolved(已成功)、rejected(已失敗)
const doJobPromise = (job, time) => {
  return new Promise((resolve, reject) => {
    //doJob 函數完成後，會呼叫 resolve 函數
    doJob(job, time, resolve);
  });
};
//pending -> resolved　會觸發then，doJob 函數完成後，透過 then 串接多個非同步函式
doJobPromise("刷牙", 1000)
  .then((data) => {
    console.log(data);
    return doJobPromise("吃早餐", 3000);
  })
  .then((data) => {
    console.log(data);
    return doJobPromise("寫功課", 1000);
  })
  .then((data) => {
    console.log(data);
    return doJobPromise("吃午餐", 2000);
  })
  .then((data) => {
    console.log(data);
  });

// 有沒有更簡潔的寫法呢？
// 使用 async/await 建立在 Promise 之上，讓我們可以更簡潔的處理非同步的問題。
// async 讓函式回傳值包在一個 Promise 物件中，可以使用 then 來取得回傳值
// await 用於等待一個 Promise 物件，只能在 async 函式中使用 (註記:如果是 Top-level await 可以在模組頂層使用 await )
// 使用 await 程式會先暫停，等到 await 的 Promise 完成，才會繼續執行

// async function doAllJobs() {
//   let data = await doJobPromise("刷牙", 1000);
//   console.log(data);
//   data = await doJobPromise("吃早餐", 3000);
//   console.log(data);
//   data = await doJobPromise("寫功課", 1000);
//   console.log(data);
//   data = await doJobPromise("吃午餐", 2000);
//   console.log(data);
// }

// doAllJobs();

// promise 和 await 的差別
// Promise 則需要使用 then 和 catch 方法來處理結果和錯誤，語法比較冗長，程式碼流程比較不連貫。
// async/await 可以使非同步程式碼看起來更像同步程式碼，更容易閱讀和理解。

// 參考資料  https://www.explainthis.io/zh-hant/swe/async-await
