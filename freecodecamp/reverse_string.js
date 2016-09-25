function reverseString(str) {
  new_str = '';
  for (var i = 0; i < str.length; i++){
    new_str += str[str.length - i - 1];
  }
  return new_str;
}

reverseString("hello");