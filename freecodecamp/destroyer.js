// You will be provided with an initial array (the first argument in the destroyer function),
// followed by one or more arguments. Remove all elements from the initial array
// that are of the same value as these arguments.

function destroyer(arr) {
  var filtered, i, args = Array.prototype.slice.call(arguments, 1);
  filtered = arr.filter(function(elem) {
    for (i = 0; i < args.length; i++) {
      if (elem === args[i]) {
        return false;
      }
    }
    return true;
  });
  return filtered;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
