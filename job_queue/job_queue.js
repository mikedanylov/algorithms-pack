function JobQueue(nThreads, jobsArr) {
    this.jobs = jobsArr;
    this.threads = {
        quantity: nThreads,
        free: [],
        busy: []
    },
    this.tick = 0;

    for (var i = 0; i < nThreads; i++) {
        this.threads.free.push({
            number: i,
            index: i,
            jobsDone: [] // indexes of jobs done
        });
    }
}

JobQueue.prototype.assignJob = function (jobIndex) {
    var thread = this._popThread('free');

    if (thread) {
        thread.jobsDone.push(jobIndex);
        thread.currentJob = {
            index: jobIndex,
            startingTick: this.tick,
            endingTick: this.tick + this.jobs[jobIndex]
        }

        this._pushThread('busy', thread);
    }
};

JobQueue.prototype.releaseThread = function () {
    this._pushThread('free', this._popThread('busy'));
};

JobQueue.prototype._pushThread = function (type, thread) {
    if (type === 'busy') {
        this.threads.busy.push(thread);

        console.log(thread.number, this.tick);

        this._siftUpBusy(this.threads.busy.length - 1);
    } else if (type === 'free') {
        thread.index = this.threads.free.length;
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
    var nodeEndingTick = this.threads.busy[index].currentJob.endingTick;
    var parentIndex;
    var parentEndingTick;

    while (index > 0 && nodeEndingTick < parentEndingTick) {
        parentIndex = this._parent(index);
        parentEndingTick = this.threads.busy[parentIndex].currentJob.endingTick;

        var tmp = this.threads.busy[parentIndex];
        this.threads.busy[parentIndex] = this.threads.busy[index];
        this.threads.busy[index] = tmp;

        index = parentIndex;
    }
};

JobQueue.prototype._siftDownFree = function (index) {
    var maxIndex = index;
    var leftChildIndex = this._leftChild(index);
    var rightChildIndex = this._rightChild(index);
    var size = this.threads.free.length;
    var queue = this.threads.free;

    if (leftChildIndex < size && queue[leftChildIndex].number < queue[maxIndex].number) {
        maxIndex = leftChildIndex;
    }
    if (rightChildIndex < size && queue[rightChildIndex].number < queue[maxIndex].number) {
        maxIndex = rightChildIndex;
    }

    if (index !== maxIndex) {
        var tmp = queue[index];
        queue[index] = queue[maxIndex];
        queue[maxIndex] = tmp;

        this._siftDownFree(maxIndex);
    }
};

JobQueue.prototype._siftDownBusy = function (index) {
    var maxIndex = index;
    var leftChildIndex = this._leftChild(index);
    var rightChildIndex = this._rightChild(index);
    var size = this.threads.busy.length;
    var queue = this.threads.busy;
    var currEndingTick = queue[maxIndex] ? queue[maxIndex].currentJob.endingTick : null;
    var leftEndingTick = queue[leftChildIndex] ? queue[leftChildIndex].currentJob.endingTick : null;
    var rightEndingTick = queue[rightChildIndex] ? queue[rightChildIndex].currentJob.endingTick : null;

    if (leftChildIndex < size && leftEndingTick < currEndingTick) {
        maxIndex = leftChildIndex;
    }
    if (rightChildIndex < size && rightEndingTick < currEndingTick) {
        maxIndex = rightChildIndex;
    }

    if (index !== maxIndex) {
        var tmp = queue[index];
        queue[index] = queue[maxIndex];
        queue[maxIndex] = tmp;

        this._siftDownBusy(maxIndex);
    }
}

JobQueue.prototype.incrementTimer = function (inc) {
    this.tick += inc;
}

JobQueue.prototype.isJobCompleted = function () {
    if (this.threads.busy.length) {
        return this.tick === this.threads.busy[0].currentJob.endingTick;
    }
}

JobQueue.prototype.isBusy = function () {
    return this.threads.busy.length;
}

JobQueue.prototype.isThreadAvailable = function () {
    return this.threads.free.length;
}

JobQueue.prototype.waitNextReady = function () {
    while (this.tick < this.threads.busy[0].currentJob.endingTick) {
        this.incrementTimer(1);
    }
}

// TESTING ########################################################################################

// var jobs = [1, 2, 3, 4, 5];
// var queue = new JobQueue(2, jobs);

// var jobs = [1, 2, 3, 4, 5, 6, 7, 8];
// var queue = new JobQueue(3, jobs);

// var jobs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// var queue = new JobQueue(4, jobs);

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

    while (queue.isThreadAvailable()) {
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