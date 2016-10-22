import * as fs from 'fs';

export class TestGenerator {
    private maxTextLength: number;
    private maxPatternLength: number;
    private letters = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    public constructor (maxPattern: number, maxText: number) {
        this.maxPatternLength = maxPattern;
        this.maxTextLength = maxText;
    }

    public run(): string {
        return this.randString(this.maxPatternLength) + '\n' +
                this.randString(this.maxTextLength) + '\n';
    }

    private randString(maxLength: number): string {
        let result = '';
        let randIndex: number;

        for (let i = 0; i < maxLength; i++) {
            randIndex = Math.floor(Math.random() * this.letters.length);
            result += this.letters[randIndex];
        }

        return result;
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

if (!args || args.length < 3) {
    console.log('Not enough parameters. Expected 3, got ' + args.length.toString() + '\n');
    throw new Error('Not enough parameters');
}

let test = new TestGenerator(parseInt(args[0]), parseInt(args[1]));
test.generateTests(parseInt(args[2]));
