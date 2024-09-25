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
// 作法1: 使用 map 會產生新的陣列，然後我們需要額外 sum 變數來儲存總和的值，感覺有點多餘。 這不是最佳的作法。

// 2:使用reduce
function sum2(ary) {
  // 利用reduce來將ary中的每個元素加總
  return ary.reduce((acc, item) => acc + item, 0);
}
// 作法2: 使用 reduce 來將陣列中的每個元素加總。 這是最適合的作法。

// 3:使用reduceRight
function sum3(ary) {
  // 利用reduceRight來將ary中的每個元素加總
  return ary.reduceRight((acc, item) => acc + item);
}
// 作法3: 和 reduce 類似，但是方向式從右到左。 這裡的方向不影響結果，因為加法是可交換的。 但是如果是減法或除法，方向就會影響結果。

// 4:使用filter和reduce
function sum4(ary) {
  // 利用filter來過濾ary中的每個元素，然後利用reduce來將過濾後的元素加總
  return ary.filter((item) => true).reduce((acc, item) => acc + item, 0);
}
// 作法4:這種方式是多餘的，沒有必要先過濾，直接使用 reduce 。

//! 你用了 forEach, map, reduce, reduceRight, filter + reduce 這幾種寫法來做，非常好，那你覺得哪一種比較恰當呢？

//原本的想法:那時候我的想法是，只想列出其他種的可能。
//現在的想法:原來我沒有意識到，當我有好幾個不同的選擇，我選擇的理由是什麼?  我要如何來支持我的選擇?

// 結論: 使用reduce是最適合的作法，reduce用來累加或合併陣列中的每個元素。

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
