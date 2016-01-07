/*

Write a function that takes two or more arrays and returns a new array
of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included
in their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order,
but the final array should not be sorted in numerical order.

Check the assertion tests for examples.

 */

function unite(arr1, arr2, arr3) {
  var args = Array.prototype.slice.call(arguments), i, j, new_arr = [];
  for (i = 0; i < args.length; i++) {
  	for (j = 0; j < args[i].length; j++) {
  		if (new_arr.indexOf(args[i][j]) == -1) {
  			new_arr.push(args[i][j]);
  		}
  	}
  }
  return new_arr;
}

console.log(
  unite([1, 3, 2], [5, 2, 1, 4], [2, 1])
);

console.log(
  unite([1, 3, 2], [1, [5]], [2, [4]])
);

console.log(
  unite([1, 2, 3], [5, 2, 1])
);

console.log(
  unite([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])
);
