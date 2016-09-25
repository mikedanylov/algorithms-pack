/*

Bonfire: Boo who
Check if a value is classified as a boolean primitive. Return true or false.

Boolean primitives are true and false.

 */

function boo(bool) {
  return typeof(bool) == 'boolean';
}

console.log(
  boo(null)
);

console.log(
  boo(true)
);

console.log(
  boo(false)
);

console.log(
  boo([1, 2, 3])
);

console.log(
  boo({ "a": 1 })
);

console.log(
  boo(1)
);

console.log(
  boo(NaN)
);

console.log(
  boo("a")
);

console.log(
  boo("true")
);
