/*

Return the sum of all odd Fibonacci numbers up to and including the passed number if it is a Fibonacci number.

The first few numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8, and each subsequent number is the sum of the previous two numbers.

As an example, passing 4 to the function should return 5 because all the odd Fibonacci numbers under 4 are 1, 1, and 3.

 */

function sumFibs(num) {
  
  var nums_arr = [0, 1], i, odd_sum = 1;
  
  if (num < 2) {
    return num;
  } else {
    for (i = 2; i <= num; i++) {
      nums_arr.push(nums_arr[i - 1] + nums_arr[i - 2]);
      if ((nums_arr[i - 1] + nums_arr[i - 2]) % 2 !== 0) {
        odd_sum += nums_arr[i - 1] + nums_arr[i - 2];
      }
    }
    // console.log(nums_arr);
    return odd_sum;
  }
}

console.log(
  sumFibs(1)
);

console.log(
  sumFibs(2)
);

console.log(
  sumFibs(10)
);

console.log(
  sumFibs(77) // max int
);
