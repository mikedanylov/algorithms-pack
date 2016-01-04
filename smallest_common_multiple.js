/*

Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

 */

function gcd(a, b) {
  while (a != b) {
    a > b ? a = a - b : b = b - a;
  }
  return a;
}

function lcm (a, b) {
  return a * b / gcd(a, b);
}

function smallestCommons(arr) {
  
  var min, max, res, i;
  min = arr[0] < arr[1] ? arr[0] : arr[1];
  max = arr[0] > arr[1] ? arr[0] : arr[1];
  res = max;

  for (i = max; i > min; i--) {
    res = lcm(res, i - 1);
  }
  return res;
}

console.log(
  smallestCommons([1, 5])
);

console.log(
  smallestCommons([13, 1])
);
