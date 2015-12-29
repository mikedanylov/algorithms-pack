// Write an algorithm that takes an array and moves all of the zeros
// to the end, preserving the order of the other elements.

function moveZeros(arr) {
  var zeros_arr = [],
      new_arr = [],
      i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      new_arr.push(arr[i]);
    } else {
      zeros_arr.push(arr[i]);
    }
  }
  new_arr = new_arr.concat(zeros_arr);
  return new_arr;
}
console.log(
moveZeros([false,1,0,1,2,0,1,3,"a"])
); // returns[false,1,1,2,1,3,"a",0,0]