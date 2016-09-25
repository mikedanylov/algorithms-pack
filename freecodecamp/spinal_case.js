/*

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

 */

function spinalCase(str) {
  str = str.replace(/[\s_]/g, '-');
  str = str.replace(/[a-z](?=[A-Z])/g, function(match) {
    return match + '-';
  });
  return str.toLowerCase();
}

console.log(
  spinalCase('This Is Spinal Tap')
);

console.log(
  spinalCase('thisIsSpinalTap')
);

console.log(
  spinalCase('The_Andy_Griffith_Show')
);

console.log(
  spinalCase('Teletubbies say Eh-oh')
);
