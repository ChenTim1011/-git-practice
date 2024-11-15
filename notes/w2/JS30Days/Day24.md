[Problems](https://leetcode.com/problems/sort-by/?envType=study-plan-v2&envId=30-days-of-javascript)

---

## Sort By

var sortBy = function(arr, fn) {
    return arr.sort((a,b) => fn(a) - fn(b));
};