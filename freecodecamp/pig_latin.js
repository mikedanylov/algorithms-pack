// Translate the provided string to pig latin.
// Pig Latin takes the first consonant (or consonant cluster) of
// an English word, moves it to the end of the word and suffixes an "ay".
// If a word begins with a vowel you just add "way" to the end.

function translate(str) {
  
  var consonants = '',
      new_str = '';
  
  if ((/^[aeiou]$/i).test(str[0])){
    str += 'way';
    return str;
  }

  for (var i = 0; i < str.length; i++) {
    if ((/^[aeiou]$/i).test(str[i])) {
      new_str = str.slice(i) + consonants + 'ay';
      return new_str;
    }
    consonants += str[i];
  }
}

console.log(translate("consonant"));
