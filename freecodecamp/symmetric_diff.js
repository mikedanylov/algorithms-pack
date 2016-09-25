/*

Create a function that takes two or more arrays and returns an array of the symmetric difference of the provided arrays.

The mathematical term symmetric difference refers to the elements in two sets that are in either the first or second set, but not in both.

 */

function sym(args) {
  var res_arr = [], i, val, index;
  args = Array.prototype.slice.call(arguments);
  for (var k in args) {
  	args[k] = new Set(args[k]);
  }
  for (i = 0; i < args.length; i++) {
  	for (val of args[i].values()) {
  		index = res_arr.indexOf(val);
  		if (index === -1) { res_arr.push(val); }
  		else { res_arr.splice(index, 1); }
  	}
  }
  return res_arr;
}

console.log(
	sym([1, 2, 2, 3], [5, 2, 1, 4], [1, 5])
);

console.log(
	sym([1, 2, 5], [2, 3, 5], [3, 4, 5])
);

console.log(
	sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])
);

console.log(
	sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])
);

console.log(
	sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])
);
