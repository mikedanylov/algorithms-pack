function getTreeHeight(str) {
    var arr = str.split(' ').map(function(item) {
        return parseInt(item, 10);
    });
    var heights = [];
    var currDepth = 1;
    var maxDepth = 0;

    // loop over all nodes in the tree
    for (var i = 0; i < arr.length; i++) {
        currDepth = 1;

        // find distance to root for each node
        indexValueLink = i; // node index
        while (indexValueLink !== -1) { // while not a root node

            if ((indexValueLink = arr[indexValueLink]) === -1) {
                break;
            }

            if (heights[indexValueLink]) { // use cached node depth
                currDepth += heights[indexValueLink];
                indexValueLink = -1; // root is reached
            } else {
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
