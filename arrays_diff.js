// Compare two arrays and return a new array with any items
// only found in one of the original arrays.

function filter_arr(arr1, arr2) {
  return arr1.filter( function(elem) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr2.indexOf(elem) === -1) {
        return elem;
      }
    }
  });
}

function diff(arr1, arr2) {
  if (arr1.length === 0) {
    return arr2;
  } else if ( arr2.length === 0) {
    return arr1;
  } else {
    var new_arr = filter_arr(arr1, arr2).concat(filter_arr(arr2, arr1));
    return new_arr;
  }
}

console.log(diff([1, 2, 3, 5], [1, 2, 3, 4, 5]));
