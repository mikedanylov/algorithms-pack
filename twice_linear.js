/*

Consider a sequence u where u is defined as follows:

The number u(0) = 1 is the first one in u.
For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
There are no other numbers in u.
Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...

Task:

Given parameter n the function dbl_linear (or dblLinear...) returns the element u(n) of the ordered (with <=) sequence u.

Example:

dbl_linear(10) should return 22

 */

function dbl_linear(n) {
  
  var main_arr = [],
      tmp_arr = [1],
      // tmp_arr = new Array(1000),
      new_elem, y, z;

  while(!main_arr[n]) {

    // console.log('main_arr: ' + main_arr);
    // console.log('tmp_arr: ' + tmp_arr);
    // console.log('new_elem: ' + new_elem);
    
    new_elem = Math.min.apply(null, tmp_arr);
    y = 2 * new_elem + 1;
    if (tmp_arr.indexOf(y) == -1) {
      tmp_arr.push(y);  
    }
    z = 3 * new_elem + 1;
    if (tmp_arr.indexOf(z) == -1) {
      tmp_arr.push(z);
    }

    // console.log('main_arr: ' + main_arr);
    // console.log('tmp_arr: ' + tmp_arr);
    // console.log('new_elem: ' + new_elem);
    
    main_arr.push(new_elem);
    tmp_arr.splice(tmp_arr.indexOf(new_elem), 1);

    // console.log('main_arr: ' + main_arr);
    // console.log('tmp_arr: ' + tmp_arr);
    // console.log('new_elem: ' + new_elem);

    // break;
  }
  return main_arr[n];
}

var start = new Date().getTime();

console.log(dbl_linear(10)); // 22
console.log(dbl_linear(20)); // 57
console.log(dbl_linear(30)); // 91
console.log(dbl_linear(50)); // 175
console.log(dbl_linear(100)); // 447
console.log(dbl_linear(500)); // 3355
console.log(dbl_linear(1000)); // 8488
console.log(dbl_linear(2000)); // 19773
console.log(dbl_linear(6000)); // 80914

var end = new Date().getTime();
var time = end - start;
console.log('Execution time: ' + time);