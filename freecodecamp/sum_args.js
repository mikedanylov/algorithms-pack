/*

Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, add(2, 3) should return 5, and add(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = add(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.

 */

function add() {
	var args = Array.prototype.slice.call(arguments), i;
	if (args.length === 2 &&
			typeof args[0] === 'number' &&
			typeof args[1] === 'number') {
		if (args[0] && args[1]) { return args[0] + args[1]; }
	}
	else if (args.length === 1 && typeof args[0] === 'number') {
		return function(arg) {
			if (typeof arg === 'number') { return args[0] + arg; }
		};
	}
}

console.log(
	add(2,3)
);

console.log(
	add(2)(3)
);

console.log(
	add("http://bit.ly/IqT6zt")
);

console.log(
	add(2, "3")
);

console.log(
	add(2)([3])
);
