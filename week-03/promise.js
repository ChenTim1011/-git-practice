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
const doJobPromise = (job, time) => {
  return new Promise((resolve, reject) => {
    doJob(job, time, resolve);
  });
};
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
// 使用 async/await
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
