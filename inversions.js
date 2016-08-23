inversions = (function () {

    function sortCount(array) {
        if (array.length === 1) {
            return {
                array: array,
                invCount: 0
            }
        }

        var firstHalfObj = sortCount(array.slice(0, array.length / 2));
        firstHalfObj.array = mergeSort(firstHalfObj.array);

        var secondHalfObj = sortCount(array.slice(array.length / 2));
        secondHalfObj.array = mergeSort(secondHalfObj.array);

        var mergedObj = _mergeCountSplit(firstHalfObj, secondHalfObj);

        return {
            array: mergedObj.array,
            invCount:mergedObj.invCount + firstHalfObj.invCount +
                secondHalfObj.invCount
        }
    }

    function _mergeCountSplit(firstHalfObj, secondHalfObj) {
        var current = 0, i = 0, j = 0;
        var outLength = firstHalfObj.array.length + secondHalfObj.array.length; 
        var output = {
            array: [],
            invCount: 0
        }
        
        while (firstHalfObj.array[i] && secondHalfObj.array[j]) {
            // i = j = current;
            if (firstHalfObj.array[i] < secondHalfObj.array[j]) {
                output.array.push(firstHalfObj.array[i++]);
            } else if (firstHalfObj.array[i] > secondHalfObj.array[j]) {
                output.array.push(secondHalfObj.array[j++]);
                output.invCount += firstHalfObj.array.length - i;
            }
            // current++;
        }
        
        if (firstHalfObj.array[i]) {
            output.array = output.array.concat(firstHalfObj.array.slice(i));
        } else if (secondHalfObj.array[j]) {
            output.array = output.array.concat(secondHalfObj.array.slice(j))
        }

        return output;
    }

    function mergeSort(array) {

        if (array.length === 1) {
            return array;
        }

        return _merge(
            mergeSort(array.slice(0, array.length / 2)),
            mergeSort(array.slice(array.length / 2))
        );

        function _merge(firstHalf, secondHalf) {
            var output = [];
            var j = 0, i = 0;

            for (var k = 0; k < firstHalf.length + secondHalf.length; k++) {
                if (firstHalf[i] < secondHalf[j]) {
                    output.push(firstHalf[i++]);
                } else if (secondHalf[j] < firstHalf[i]) {
                    output.push(secondHalf[j++]);
                } else if (!firstHalf[i] && secondHalf[j]) {
                    output.push(secondHalf[j++]);
                } else if (!secondHalf[j] && firstHalf[i]) {
                    output.push(firstHalf[i++]);
                }
            }

            return output;
        }
    }

    return {
        sortCount: sortCount,
        mergeSort: mergeSort
    }
})();

// console.log(
//     inversions.mergeSort([7, 3, 5, 6, 4, 1, 2])
// );

console.log(
    inversions.sortCount([7, 3, 5, 2, 4, 6, 1])
);
