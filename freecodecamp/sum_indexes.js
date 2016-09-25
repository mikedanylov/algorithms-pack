/*

Return the sum of all indices of elements of 'arr' that can be paired with one other element to form a sum that equals the value in the second argument 'arg'. If multiple sums are possible, return the smallest sum. Once an element has been used, it cannot be reused to pair with another.

For example, pairwise([1, 4, 2, 3, 0, 5], 7) should return 11 because 4, 2, 3 and 5 can be paired with each other to equal 7.

pairwise([1, 3, 2, 4], 4) would only equal 1, because only the first two elements can be paired to equal 4, and the first element has an index of 0!

 */

function pairwise(arr, arg) {
	
	var tmp_arr = arr.slice(0), sum = 0, first, i, j;
	
	for (i = 0; i < tmp_arr.length; i++) {
		if (tmp_arr[i] === null) { continue; }
		for (j = i + 1; j < tmp_arr.length; j++) {
			if (tmp_arr[i] + tmp_arr[j] === arg) {
				sum += i + j;
				tmp_arr[j] = null;
				break;
			}
		}
	}
	return sum;
}

console.log(
	pairwise([1,4,2,3,0,5], 7) // 11
);

console.log(
	pairwise([1, 3, 2, 4], 4) // 1
);

console.log(
	pairwise([1, 1, 1], 2) // 1
);

console.log(
	pairwise([0, 0, 0, 0, 1, 1], 1) // 10
);

console.log(
	pairwise([], 100) // 0
);
