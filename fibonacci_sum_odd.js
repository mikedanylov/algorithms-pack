/*

Return the sum of all odd Fibonacci numbers up to and including the passed number if it is a Fibonacci number.

The first few numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8, and each subsequent number is the sum of the previous two numbers.

As an example, passing 4 to the function should return 5 because all the odd Fibonacci numbers under 4 are 1, 1, and 3.

 */

function sumFibs(num) {
  
  var nums_arr = [0, 1], i, odd_sum = 1, new_val = 0;
  
  if (num < 2) {
    return num;
  } else {
    for (i = 2; new_val < num; i++) {
      new_val = nums_arr[i - 1] + nums_arr[i - 2];
      nums_arr.push(new_val);
      if (new_val % 2 !== 0 && new_val <= num) {
        odd_sum += new_val;
      }
    }
    return odd_sum;
  }
}

console.log(
  sumFibs(1)
);

console.log(
  sumFibs(4)
);

console.log(
  sumFibs(1000)
);

console.log(
  sumFibs(4000000)
);

console.log(
  sumFibs(75024)
);

console.log(
  sumFibs(75025)
);
