function largestOfFour(arr) {
  // Return an array consisting of the largest number
  // from each provided sub-array. For simplicity,
  // the provided array will contain exactly 4 sub-arrays.
  var new_arr = [];
  for (var inner_arr in arr) {
    new_arr.push(Math.max.apply(null, arr[inner_arr]));
  }
  return new_arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);