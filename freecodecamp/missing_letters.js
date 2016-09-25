/*

Bonfire: Missing letters
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.

 */

function fearNotLetter(str) {
  var i, test_str = 'abcdefghijklmnopqrstuvwxyz';
  if (test_str[0] === str[0]) {
    for (i = 0; i < test_str.length; i++) {
      if (str[i] !== test_str[i]) {
        return test_str[i];
      }
    }
  }
  return undefined;
}

console.log(
  fearNotLetter("abce")
);

console.log(
  fearNotLetter("abcdefghjklmno")
);

console.log(
  fearNotLetter("bcd")
);

console.log(
  fearNotLetter("yz")
);