// Repeat a given string (first argument) n times (second argument).
// Return an empty string if n is a negative number.

function repeat(str, num) {
  new_str = '';
  for (var i = 0; i < num; i++) {
    new_str += str;
  }
  return new_str;
}

repeat("abc", 3);
