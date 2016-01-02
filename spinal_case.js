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
  spinalCase('This IsSpinal_Tap')
);
