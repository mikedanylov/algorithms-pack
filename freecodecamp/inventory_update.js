/*

Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

 */

function inventory(arr1, arr2) {
    var i, j, match = false, result = [];

    while (arr2.length > 0) {
        for (j = 0; j < arr1.length; j++) {
            if (arr1[j][1] === arr2[arr2.length - 1][1]) {
                match = true;
                arr1[j][0] += arr2[arr2.length - 1][0];
                arr2.pop();
                break;
            }
        }
        if (!match) {
            arr1.push(arr2[arr2.length - 1]);
            arr2.pop();
        }
        match = false;
    }

    // sort in alphabetical order
    return arr1.sort(function(a, b) {
      return a[1] > b[1];
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(
    inventory(curInv, newInv)
);
