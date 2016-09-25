// Write a program that will calculate the number of trailing zeros
// in a factorial of a given number.

function mul(x, y) {
  
}

function factorial(param) {
  if(param < 2) { return 1; }
  else {
    return factorial(param - 1) * param;  
  }
}

function zeros(n) {
  var count = 0;
  var fact = factorial(n);
  console.log(typeof(fact));
  while(fact % 10 == 0) {
    console.log(fact);
    count++;
    fact = fact / 10;
  }
  return count;
}

var n = 21;
console.log("Only Factorial: " + factorial(n));
console.log(zeros(n));
