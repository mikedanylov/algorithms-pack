function findLongestWord(str) {
  var str_arr = str.split(' ');
  var max_len = 0;
  for (var elem in str_arr) {
    if (str_arr[elem].length > max_len) {
      max_len = str_arr[elem].length;
    }
  }
  return max_len;
}

findLongestWord("The quick brown fox jumped over the lazy dog");
