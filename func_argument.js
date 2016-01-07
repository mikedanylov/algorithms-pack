/*

Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

Remember, you can access object properties through either dot notation or [] notation.

 */

function every(collection, pre) {
  for (var i = 0; i < collection.length; i++) {
  	if (!collection[i].hasOwnProperty(pre)) { return false; }
  	else if (!collection[i][pre]) {
  		// console.log(collection[i][pre]);
  		return false;
  	}
  }
  return true;
}

console.log(
	every([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex")
);

console.log(
	every([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex")
);

console.log(
	every([{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age")
);

console.log(
	every([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true}, {"name": "FastFoward", "onBoat": null}], "onBoat")
);

console.log(
	every([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true}, {"name": "FastFoward", "onBoat": null}], "onBoat")
);

console.log(
	every([{"single": ""}, {"single": "double"}], "single")
);

console.log(
	every([{"single": "double"}, {"single": undefined}], "single")
);

console.log(
	every([{"single": "double"}, {"single": NaN}], "single")
);
