// The DNA strand is missing the pairing element.
// Take each character, get its pair, and return the results as a 2d array.
// Base pairs are a pair of AT and CG.
// Match the missing element to the provided character.
// Return the provided character as the first element in each array.
// For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]

function pair(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    switch (str[i]) {
      case 'A': arr.push(['A', 'T']); break;
      case 'T': arr.push(['T', 'A']); break;
      case 'G': arr.push(['G', 'C']); break;
      case 'C': arr.push(['C', 'G']); break;
    }
  }
  return arr;
}

console.log(pair("GCG"));