// 請以 JavaScript 的 array 函式完成 sum 函式，也就是程式碼中不可以出現 for, while 等迴圈程式。
// 使用 forEach, map, filter, reduce 等函式來完成 sum 函式。
// ary: number array
function sum(ary) {
  // TODO: sum all elements in ary
  let sum = 0;
  // 利用forEach來將ary中的每個元素加總
  ary.forEach((item) => {
    sum += item;
  });
  return sum;
}

//(optional) 挑戰題: 有幾種寫法？至少4種
// 1:使用map
function sum1(ary) {
  let sum = 0;
  // 利用map來將ary中的每個元素加總
  ary.map((item) => {
    sum += item;
  });
  return sum;
}

// 2:使用reduce
function sum2(ary) {
  // 利用reduce來將ary中的每個元素加總
  return ary.reduce((acc, item) => acc + item, 0);
}

// 3:使用reduceRight
function sum3(ary) {
  // 利用reduceRight來將ary中的每個元素加總
  return ary.reduceRight((acc, item) => acc + item);
}

// 4:使用filter和reduce
function sum4(ary) {
  // 利用filter來過濾ary中的每個元素，然後利用reduce來將過濾後的元素加總
  return ary.filter((item) => true).reduce((acc, item) => acc + item, 0);
}

console.log(sum([1, 5, 3, 2])); // 11
console.log(sum1([1, 5, 3, 2])); // 11
console.log(sum2([1, 5, 3, 2])); // 11
console.log(sum3([1, 5, 3, 2])); // 11
console.log(sum4([1, 5, 3, 2])); // 11

//(optional) 挑戰題: 如果 `sum` 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
// 使用Array from和reduce
function sum5(n) {
  if (n === 1) return 1;
  else {
    // 利用Array.from來建立一個長度為n的陣列，然後利用reduce來將陣列中的每個元素加總
    return Array.from({ length: n }, (v, i) => i + 1).reduce(
      (acc, item) => acc + item,
      0
    );
  }
}
console.log(sum5(5)); // 15

//參考: JavaScript Array 陣列操作方法大全 ( 含 ES6 ) https://www.oxxostudio.tw/articles/201908/js-array.html#array_push
//參考: Array from https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from
