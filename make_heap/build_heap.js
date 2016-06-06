function Heap(array) {
    if (array && array.length) {
        this.array = array;
        this.swapCount = 0;
        this.buildHeap(array);
    } else {
        throw new Error('Heap: should have Array parameter');
    }
}

Heap.prototype.buildHeap = function (array) {
    this.size = array.length;

    for (var i = parseInt(array.length / 2); i >= 0; i--) {
        this.siftDown(i + 1);
    }
};

Heap.prototype.siftDown = function (index) {
    var maxIndex = index;
    var leftChild = this.leftChild(index);
    var rightChild = this.rightChild(index);
    var arr = this.array;
    var len = this.size;

    if (leftChild <= len && arr[leftChild - 1] < arr[maxIndex - 1]) {
        maxIndex = leftChild;
    }

    if (rightChild <= len && arr[rightChild - 1] < arr[maxIndex - 1]) {
        maxIndex = rightChild;
    }

    if (index !== maxIndex) {
        var tmp = arr[index - 1];

        this.swapCount += 1;
        arr[index - 1] = arr[maxIndex - 1];
        arr[maxIndex - 1] = tmp;
        this.siftDown(maxIndex);
    }
};

Heap.prototype.parent = function (index) {
    return parseInt(index / 2);
};

Heap.prototype.leftChild = function (index) {
    return 2 * index;
};

Heap.prototype.rightChild = function (index) {
    return 2 * index + 1;
};

// var heap = new Heap([5, 4, 3, 2, 1]);
// console.log(heap);
// var heap2 = new Heap([1, 2, 3, 4, 5]);
// console.log(heap2);

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineNum = 1;
var heap;

rl.on('line', function(line){
    if (lineNum !== 1) {
        heap = new Heap(line.split(' '));
        console.log(heap.swapCount);
        process.exit();
    }
    lineNum++;
})