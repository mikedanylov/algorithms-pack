/*

Consider a sequence u where u is defined as follows:

The number u(0) = 1 is the first one in u.
For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
There are no other numbers in u.
Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...

Task:

Given parameter n the function dblLinear (or dblLinear...) returns the element u(n) of the ordered (with <=) sequence u.

Example:

dblLinear(10) should return 22

 */

function dblLinear(n) {
  
  var main_arr = [],
      tmp_arr = [1],
      new_elem, i;

  while(!main_arr[n]) {
    
    new_elem = tmp_arr[0];
    for (i = 0; i < tmp_arr.length; i++) {
      if (tmp_arr[i] < new_elem && tmp_arr[i]) { new_elem = tmp_arr[i] };
    }
    tmp_arr.indexOf(2 * new_elem + 1) === -1 ? tmp_arr.push(2 * new_elem + 1): undefined;
    tmp_arr.indexOf(3 * new_elem + 1) === -1 ? tmp_arr.push(3 * new_elem + 1): undefined;
    main_arr.push(new_elem);
    tmp_arr.splice(tmp_arr.indexOf(new_elem), 1);
  }
  return main_arr[n];
}

// code still times out on Codewars but I couldn't
// figure out how to get lower than 180ms for all tests
var start = new Date().getTime();

console.log(dblLinear(10)); // 22
console.log(dblLinear(20)); // 57
console.log(dblLinear(30)); // 91
console.log(dblLinear(50)); // 175
console.log(dblLinear(100)); // 447
console.log(dblLinear(500)); // 3355
console.log(dblLinear(1000)); // 8488
console.log(dblLinear(2000)); // 19773
console.log(dblLinear(6000)); // 80914

var end = new Date().getTime();
var time = end - start;
console.log('Execution time: ' + time);