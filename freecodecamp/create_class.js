/*

Fill in the object constructor with the methods specified in the tests.

Those methods are getFirstName(), getLastName(), getFullName(), setFirstName(first), setLastName(last), and setFullName(firstAndLast).

All functions that take an argument have an arity of 1, and the argument will be a string.

These methods must be the only available means for interacting with the object.

 */

var Person = function(firstAndLast) {

  var firstName = firstAndLast.split(' ')[0];
  var lastName = firstAndLast.split(' ')[1];

  this.getFirstName = function() { return firstName; };
	this.getLastName = function() { return lastName; };
	this.getFullName = function() { return firstName + ' ' + lastName; };
	this.setFirstName = function(first) {firstName = first; };
	this.setLastName = function(last) { lastName = last; };
	this.setFullName = function(full) {
		firstName = full.split(' ')[0];
		lastName = full.split(' ')[1];
	};
};

var bob = new Person('Bob Ross');

console.log(
	Object.keys(bob).length
);

console.log(
	bob
);

console.log(
	bob.getFullName()
);

console.log(
	bob instanceof Person
);




