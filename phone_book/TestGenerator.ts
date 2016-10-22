import * as fs from 'fs';

export class TestGenerator {
    numOps: number;
    ops = ['add', 'del', 'find'];
    maxPhoneNumber = 100;
    maxNameLength = 15;

    public constructor () {
    }

    public run(numOps: number): string {
        this.numOps = numOps;
        let str = '';
        let action;
        let number;
        let name;

        // line 1: number of operations to perform
        str += this.numOps.toString() + '\n';

        // the rest of the lines are description of operations to perform
        for (let i = 0; i < this.numOps; i++) {
            action = this.randAction();
            number = this.randPhoneNumber();
            name = this.randName();

            switch (action) {
                case 'add':
                    str += action + ' ' + number + ' ' + name + '\n'; break;
                case 'del':
                    str += action + ' ' + number + '\n'; break;
                case 'find':
                    str += action + ' ' + number + '\n'; break;
                default:
                    throw new Error('Invalid action provided');
            }
        }

        return str;
    }

    private randPhoneNumber(): string {
        let phoneNumber = Math.floor(Math.random() * this.maxPhoneNumber + 1);
        return phoneNumber.toString();
    }

    private randName(): string {
        return Math.random().toString(36).substring(2, this.maxNameLength + 2);
    }

    private randAction(): string {
        return this.ops[Math.floor(Math.random() * this.ops.length)];
    }

    public generateTests (nFiles: number, nOperations: number): void {
        for (let i = 0; i < nFiles; i++) {
            let fileNumber = i + 1;
            fs.writeFile('tests/' + fileNumber.toString(),
                this.run(nOperations), (err) => {
                    if(err) {
                        return console.log(err);
                    }
                });
        }
    }
}


let test = new TestGenerator();
test.generateTests(10, 100000);
