inversions = (function () {

    function mergeSort (array) {

        if (array.length === 1) {
            return array;
        }

        return _merge(
            mergeSort(array.slice(0, array.length / 2)),
            mergeSort(array.slice(array.length / 2))
        );

        function _merge (firstHalf, secondHalf) {
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
        mergeSort: mergeSort
    }
})();

console.log(
    inversions.mergeSort([7, 3, 5, 6, 4, 1, 2])
);
