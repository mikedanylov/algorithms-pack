function findPositionsInArray(k, arr) {
    var positions = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == k) {
            positions.push(i);
        }
    }
    return positions;
}

function stringToTree(string) {
    var arr = string.split(' ');
    var depth = 1;
    var k = -1;

    // until any element is not negative
    while(Math.max.apply(null, arr) > -1) {
        var b = findPositionsInArray(k, arr);
        // console.log('index of root: ', b);

        if (b.length) {
            k--;
            depth++;
            for (var i = 0; i < arr.length; i++) {
                var tmp = parseInt(arr[i]);
                if (b.indexOf(tmp) !== -1) {
                    arr[i] = k;
                }
            }
        }
    }

    // console.log(arr);
    console.log(depth);
}

stringToTree('4 -1 4 1 1');
stringToTree('-1 0 4 0 3');
stringToTree('9 7 5 5 2 9 9 9 2 -1');
stringToTree('8 8 5 6 7 3 1 6 -1 5');
stringToTree('98 30 92 96 15 78 40 20 24 44 90 82 61 15 28 53 51 19 57 4 37 70 38 21 79 19 48 65 25 76 21 75 45 15 82 64 72 85 65 21 77 55 45 65 29 50 66 74 10 41 73 25 15 18 84 30 50 7 44 36 48 36 52 16 73 97 80 74 48 22 74 9 88 69 89 7 49 7 12 9 95 1 17 80 34 44 99 79 4 -1 61 57 1 81 5 58 36 37 40 40');