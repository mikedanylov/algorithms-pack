import * as readline from 'readline';

let start = (new Date()).getTime();
let end: any;
let lineNum = 1;
let patternLine: string;
let textLine: string;

export class PatterFinder {
    private pattern: string;
    private text: string;

    public constructor(pattern: string, text: string) {
        this.pattern = pattern;
        this.text = text;
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
        // patterFinder.find();
        // patterFinder.print();

        // measure execution time
        end = (new Date()).getTime();
        console.log('\nTime: ' + ((end - start) / 1000).toString() + ' seconds\n');

        rl.close();
        process.exit(0);
    }

    lineNum++;
});
