// Perform a search and replace on the sentence using the arguments provided and return the new sentence.
// First argument is the sentence to perform the search and replace on.
// Second argument is the word that you will be replacing (before).
// Third argument is what you will be replacing the second argument with (after).
// NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

function myReplace(str, before, after) {
  
  var arr = str.split(' ');

  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === before) {
      if(/^[A-Z]/.test( arr[i])) {
        arr[i] = after;
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
      } else {
        arr[i] = after;
      }
    }
  }
  str = arr.join(' ');

  return str;
}

console.log(myReplace("Let us go to the store", "store", "mall"));