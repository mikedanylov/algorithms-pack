function getTreeHeight(str) {
    var arr = str.split(' ').map(function(item) {
        return parseInt(item, 10);
    });
    var heights = [];
    var currDepth = 1;
    var maxDepth = 0;

    // loop over all nodes in the tree
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === -1) {
            heights.push(1);
            continue;
        }

         currDepth = 1;
        // find distance to root for each node
        tmp = i; // node index
        while (tmp !== -1) { // while not a root node
            tmp = arr[tmp];
            if (heights[tmp]) {
                currDepth += heights[tmp];
                if (currDepth > maxDepth) {
                    maxDepth = currDepth;
                }
                break;
            }
            if (tmp !== -1) {
                currDepth++;
            }
            if (currDepth > maxDepth) {
                maxDepth = currDepth;
            }
        }

        // save depth for current element
        heights.push(currDepth);
    }

    return maxDepth;
}

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var lineNum = 1;

rl.on('line', function(line){
    if (lineNum !== 1) {
        console.log(getTreeHeight(line));
        process.exit();
    }
    lineNum++;
})
