// Write a function that splits an array (first argument)
// into groups the length of size (second argument) and
// returns them as a multidimensional array.

function chunk(arr, size) {
  var new_arr = [], i;
  for (i = 0; i < arr.length; i += size) {
    new_arr.push(arr.slice(i, i + size));
  }
  return new_arr;
}

chunk(["a", "b", "c", "d"], 2);
