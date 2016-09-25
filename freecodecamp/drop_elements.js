/*

Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.

Return the rest of the array, otherwise return an empty array.

 */

function drop(arr, func) {
  var i, tmp_arr = arr;
  while (arr.length > 0) {
  	if (func(arr[0])) { return arr; }
  	arr.shift();
  }
  return arr;
}

console.log(
	drop([1, 2, 3, 4], function(n) {return n >= 3;})
);

console.log(
	drop([0, 1, 0, 1], function(n) {return n === 1;})
);

console.log(
	drop([1, 2, 3], function(n) {return n > 0;})
);

console.log(
	drop([1, 2, 3, 4], function(n) {return n > 5;})
);

console.log(
	drop([1, 2, 3, 7, 4], function(n) {return n > 3;})
);

console.log(
	drop([1, 2, 3, 9, 2], function(n) {return n > 2;})
);
