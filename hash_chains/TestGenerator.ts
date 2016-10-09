/**
 * Created by mikedanylov on 10/8/16.
 */





import * as fs from 'fs';

export class TestGenerator {
    numOps: number;
    ops = ['add', 'del', 'find', 'check'];
    maxWordLength = 2;
    maxHash = 263;
    buckets: number;

    public constructor (numOps: number, numBuckets: number) {
        this.numOps = numOps;
        this.buckets = numBuckets;
    }

    public run(): string {
        let str = '';
        let action;
        let word;
        let hash;

        // line 1: number of buckets
        str += this.buckets.toString() + '\n';

        // line 2: number of operations to perform
        str += this.numOps.toString() + '\n';

        // the rest of the lines are description of operations to perform
        for (let i = 0; i < this.numOps; i++) {
            action = this.randAction();
            word = this.randString();
            hash = this.randHash();

            switch (action) {
                case 'add':
                    str += action + ' ' + word + '\n'; break;
                case 'del':
                    str += action + ' ' + word + '\n'; break;
                case 'find':
                    str += action + ' ' + word + '\n'; break;
                case 'check':
                    str += action + ' ' + hash + '\n'; break;
                default:
                    throw new Error('Invalid action provided');
            }
        }

        return str;
    }

    private randString(): string {
        return Math.random().toString(36).substring(2, this.maxWordLength + 2);
    }

    private randAction(): string {
        return this.ops[Math.floor(Math.random() * this.ops.length)];
    }

    private randHash(): string {
        return (Math.floor(Math.random() * this.buckets)).toString();
    }

    public generateTests (nFiles: number): void {
        for (let i = 0; i < nFiles; i++) {
            let fileNumber = i + 1;
            fs.writeFile('tests/' + fileNumber.toString(),
                this.run(), (err) => {
                    if(err) {
                        return console.log(err);
                    }
                });
        }
    }
}

let args = process.argv.slice(2);
let test = new TestGenerator(100000, 20000);

test.generateTests(parseInt(args[0]));