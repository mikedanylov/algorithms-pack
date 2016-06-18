function JobQueue(nThreads, jobsArr) {
    this.jobs = jobsArr;
    this.threads = {
        quantity: nThreads,
        free: [],
        busy: []
    };
    this.tick = 0;
    this.logs = [];

    for (var i = 0; i < nThreads; i++) {
        this.threads.free.push({
            number: i
        });
    }
}

JobQueue.prototype.assignJob = function (jobIndex) {
    var thread = this._popThread('free');

    if (thread) {
        thread.startingTick = this.tick;
        thread.endingTick = this.tick + this.jobs[jobIndex];
        this._pushThread('busy', thread);
    }
};

JobQueue.prototype.releaseThread = function () {
    this._pushThread('free', this._popThread('busy'));
};

JobQueue.prototype._pushThread = function (type, thread) {
    if (type === 'busy') {
        this.threads.busy.push(thread);
        this.logs.push({
            thread: thread.number,
            startTime: this.tick
        });
        this._siftUpBusy(this.threads.busy.length - 1);
    } else if (type === 'free') {
        // thread.index = this.threads.free.length;
        this.threads.free.push(thread);
    }
};

JobQueue.prototype._popThread = function (type) {
    var result;

    if (type === 'busy') {
        result = this.threads.busy[0];

        if (result) {
            this.threads.busy[0] = this.threads.busy[this.threads.busy.length - 1];
            this.threads.busy.pop();
            this._siftDownBusy(0);
        }
    } else if (type === 'free') {
        result = this.threads.free[0];

        if (result) {
            this.threads.free[0] = this.threads.free[this.threads.free.length - 1];
            this.threads.free.pop();
            this._siftDownFree(0);
        }
    }

    return result;
};

JobQueue.prototype._parent = function (i) {
    return parseInt((i + 1) / 2) - 1;
};

JobQueue.prototype._leftChild = function (i) {
    return (i + 1) * 2 - 1;
};

JobQueue.prototype._rightChild = function (i) {
    return (i + 1) * 2;
};

JobQueue.prototype._siftUpBusy = function (index) {
    var queue = this.threads.busy;
    var node = queue[index];
    var parentIndex = this._parent(index);
    var parentNode = queue[parentIndex];

    while (parentNode &&
        (node.endingTick < parentNode.endingTick ||
        (node.endingTick === parentNode.endingTick && node.number < parentNode.number))) {

        var tmp = queue[parentIndex];
        queue[parentIndex] = queue[index];
        queue[index] = tmp;
        index = parentIndex;

        parentIndex = this._parent(index);
        parentNode = queue[parentIndex];
    }
};

JobQueue.prototype._siftDownFree = function (index) {
    var higherPrioIndex = index;
    var leftChildIndex = this._leftChild(index);
    var rightChildIndex = this._rightChild(index);
    var size = this.threads.free.length;
    var queue = this.threads.free;

    if (leftChildIndex < size &&
        queue[leftChildIndex].number < queue[index].number) {
        higherPrioIndex = leftChildIndex;
    }

    if (rightChildIndex < size &&
        queue[rightChildIndex].number < queue[index].number &&
        queue[rightChildIndex].number < queue[leftChildIndex].number) {
        higherPrioIndex = rightChildIndex;
    }

    if (index !== higherPrioIndex) {
        var tmp = queue[index];
        queue[index] = queue[higherPrioIndex];
        queue[higherPrioIndex] = tmp;

        this._siftDownFree(higherPrioIndex);
    }
};

JobQueue.prototype._siftDownBusy = function (index) {
    // index is used only to get child elements
    // the comparison happens against jobEndTime and threadPriotiry

    var nextIndex = index;
    var size = this.threads.busy.length;
    var leftChildIndex = this._leftChild(index);
    var rightChildIndex = this._rightChild(index);
    var currElement = this.threads.busy[index];
    var leftChild = this.threads.busy[leftChildIndex];
    var rightChild = this.threads.busy[rightChildIndex];

    // if child element with this index exists
    // find faster thread index
    // if there is no single faster thread
    // check threads priority
    if (leftChild && leftChild.endingTick < currElement.endingTick) {
        if (rightChild && rightChild.endingTick < leftChild.endingTick) {
            nextIndex = rightChildIndex;
        } else if (rightChild && rightChild.endingTick === leftChild.endingTick) {
            if (leftChild.number < rightChild.number) {
                nextIndex = leftChildIndex;
            } else {
                nextIndex = rightChildIndex;
            }
        }else {
            nextIndex = leftChildIndex;
        }
    }

    if (index !== nextIndex) {
        var tmp = this.threads.busy[index];
        this.threads.busy[index] = this.threads.busy[nextIndex];
        this.threads.busy[nextIndex] = tmp;
        this._siftDownBusy(nextIndex);
    }
};

JobQueue.prototype.incrementTimer = function (inc) {
    this.tick += inc;
};

JobQueue.prototype.isJobCompleted = function () {
    if (this.threads.busy.length) {
        return this.tick === this.threads.busy[0].endingTick;
    }
};

JobQueue.prototype.isBusy = function () {
    return this.threads.busy.length;
};

JobQueue.prototype.isThreadAvailable = function () {
    return this.threads.free.length;
};

JobQueue.prototype.waitNextReady = function () {
    while (this.tick < this.threads.busy[0].endingTick) {
        this.incrementTimer(1);
    }
};

JobQueue.prototype.printLogs = function () {
    this.logs.forEach(function (entry) {
        console.log(entry.thread + ' ' + entry.startTime);
    });
};

JobQueue.prototype.startWork = function () {
    var jobs = this.jobs;
    var queue = this;

    for (var i = 0; i < jobs.length; i++) {

        if (jobs[i] === 0) {
            continue;
        }

        if (queue.isBusy()) {
            queue.waitNextReady();
            while (queue.isJobCompleted()) {
                queue.releaseThread();
            }
        }

        while (queue.isThreadAvailable() && jobs[i]) {
            for (var j = i; j < jobs.length; j++) {
                if (jobs[j] && queue.isThreadAvailable()) {
                    queue.assignJob(j);
                    jobs[j] = 0;
                } else {
                    break;
                }
            }
        }

        queue.incrementTimer(1);
    }
};

// TESTING ########################################################################################

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineNum = 0;
var queue;
var threads;
var jobs;

rl.on('line', function(line){

    if (lineNum === 0) {
        threads = parseInt(line.split(' ')[0]);
    } else {
        jobs = line.split(' ').map(function (job) {
            return parseInt(job);
        });

        queue = new JobQueue(threads, jobs);
        queue.startWork();
        queue.printLogs();

        process.exit();
    }
    lineNum++;
});