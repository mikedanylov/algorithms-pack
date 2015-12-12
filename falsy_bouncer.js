// Remove all falsy values from an array.
// Falsy values in javascript are false, null, 0, "", undefined, and NaN.

function bouncer(arr) {
  var new_arr = [];
  arr.forEach(function(elem) {
    if (elem) {
      new_arr.push(elem);
    }
  });
  return new_arr;
}

bouncer([7, "ate", "", false, 9]);
