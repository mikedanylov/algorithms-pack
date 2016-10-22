import * as readline from 'readline';

let start = (new Date()).getTime();
let end: any;
let lineNum = 1;
let patternLine: string;
let textLine: string;

export class PatterFinder {
    private pattern: string;
    private text: string;
    private matches: Array<number> = [];

    public constructor(pattern: string, text: string) {
        this.pattern = pattern;
        this.text = text;
    }

    public find() {
        for (let i = 0; i <= this.text.length - this.pattern.length; i++) {
            if (this.pattern === this.text.substring(i, i + this.pattern.length)) {
                this.matches.push(i);
            }
        }
    }

    public getMatches(): string {
        return this.matches.join(' ').trim();
    }
}

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line: string) {
    
    // first line is a pattern string
    if (lineNum === 1) {
        if (!line || !line.length) {
            rl.close();
            throw new Error('Invalid pattern parameter');
        }

        patternLine = line;
    }

    // second line is a text string
    if (lineNum === 2) {
        if (!line || !line.length) {
            rl.close();
            throw new Error('Invalid text parameter');
        }

        textLine = line;

        //find pattern in text
        let patterFinder = new PatterFinder(patternLine, textLine);
        patterFinder.find();
        console.log(patterFinder.getMatches());

        // measure execution time
        end = (new Date()).getTime();
        console.log('\nTime: ' + ((end - start) / 1000).toString() + ' seconds\n');

        rl.close();
        process.exit(0);
    }

    lineNum++;
});
