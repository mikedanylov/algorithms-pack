/*

Sum all the prime numbers up to and including the provided number.

A prime number is defined as having only two divisors, 1 and itself. For example, 2 is a prime number because it's only divisible by 1 and 2. 1 isn't a prime number, because it's only divisible by itself.

The provided number may not be a prime.

*/

function sumPrimes(num) {
  var primes_sum = 0, i, j;
  if (num == 1) { return 1 }
  for (i = 2; i <= num; i++) {
    primes_sum += i;
    for (j = 2; j < i; j++) {
      if (i % j == 0) {
        primes_sum -= i;
        break;
      }
    }
  }
  return primes_sum;
}

console.log(
  sumPrimes(1)
);

console.log(
  sumPrimes(10)
);

console.log(
  sumPrimes(977)
);