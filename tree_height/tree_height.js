function findPositionsInArray(k, arr) {
    var positions = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == k) {
            positions.push(i);
        }
    }
    return positions;
}

function treeHeight(string) {
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

    return depth;
}

// process.stdin.setEncoding('utf8');

// var line = 1;

// process.stdin.on('readable', function () {
//     var chunk = process.stdin.read();
//     if (chunk !== null && line !== 1) {
//         var result = treeHeight(chunk);
//         process.stdout.write(String(result) + "\n");
//         process.exit();
//     }
//     line++;
// });

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var lineNum = 1;

rl.on('line', function(line){
    if (lineNum !== 1) {
        console.log(treeHeight(line));
        process.exit();
    }
    lineNum++;
})
