function titleCase(str) {
  // lowercase the whole string first
  // then replace any non-whitespace char (\S) with its capitalized copy
  // which is the begining of a string (^)
  // or right after a whitespace char (\s)
  // alternative regex: /\b./g
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function(letter) {
    return letter.toUpperCase();
  });
}

var str = titleCase("I'm a little tea pot");
console.log(str);
