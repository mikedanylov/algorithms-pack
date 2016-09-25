/*

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string. All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

The provided code transforms the input into an array for you, codeArr. Place the decoded values into the decodedArr array where the provided code will transform it back into a string.

 */

function rot13(encodedStr) {
  
  var codeArr = encodedStr.split(""),
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      decodedArr = [];
  
  for (var letter in codeArr) {
    if (alphabet.indexOf(codeArr[letter]) != -1) {
      decodedArr.push(
        alphabet[(alphabet.indexOf(codeArr[letter]) + 13) % 26]
      );
    } else { decodedArr.push(codeArr[letter]); }
  }
  return decodedArr.join("");
}

console.log(
  rot13("SERR PBQR PNZC")
);

console.log(
  rot13("SERR CVMMN!")
);

console.log(
  rot13("SERR YBIR?")
);

console.log(
  rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.")
);