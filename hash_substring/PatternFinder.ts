import * as readline from 'readline';

let start = (new Date()).getTime();
let end: any;
let lineNum = 1;
let patternLine: string;
let textLine: string;

export class PatternFinder {
    private pattern: string;
    private text: string;
    private matches: Array<number> = [];
    private prime: number;
    private x: number;
    private patternHash: number;
    private hashes: {[key:number]: number} = {};

    public constructor(pattern: string, text: string) {
        this.pattern = pattern;
        this.text = text;
        this.prime = 1000000007;
        this.x = 1;
    }

    public find() {
        for (let i = 0; i <= this.text.length - this.pattern.length; i++) {
            if (this.pattern === this.text.substring(i, i + this.pattern.length)) {
                this.matches.push(i);
            }
        }
    }

    public rabinKarpFind() {
        let lastSubstrIndex = this.text.length - this.pattern.length;
        this.patternHash = this.polyHash(this.pattern);
        this.hashes = this.precomputeAllHashes();

        for (let i = 0; i <= lastSubstrIndex; i++) {
            if (this.patternHash !== this.hashes[i]) {
                continue;
            }

            let textSubstring = this.text.substring(i, i + this.pattern.length);
            if (this.pattern === textSubstring) {
                this.matches.push(i);
            }
        }
    }

    private polyHash(pattern: string): number {
        let polySum = 0;

        for (let i = 0; i < pattern.length; i++) {
            polySum += (pattern[i].charCodeAt(0) * Math.pow(this.x, i));
        }

        return polySum % this.prime;
    }

    private precomputeAllHashes(): any {
        let hashes: {[key:number]: number} = {};
        let x = this.x;
        let p = this.prime;
        let pattern = this.pattern;
        let text = this.text;
        let patLen = this.pattern.length;
        let texLen = this.text.length;
        let substring = '';
        let startIndex = this.text.length - this.pattern.length;

        hashes[startIndex] = this.polyHash(
            text.substring(startIndex, startIndex + patLen));
        for (let i = startIndex - 1; i >= 0; i--) {
            substring = text.substring(i, i + patLen);
            hashes[i] = (hashes[i + 1] +
                text[i].charCodeAt(0) - text[i + patLen].charCodeAt(0)) % p;
        }

        return hashes;
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
        let patternFinder = new PatternFinder(patternLine, textLine);
        // patternFinder.find();
        patternFinder.rabinKarpFind();
        
        let matches = patternFinder.getMatches();
        console.log(matches);

        // measure execution time
        end = (new Date()).getTime();
        console.log('\n\nTime: ' + ((end - start) / 1000).toString() + ' seconds\n');

        rl.close();
        process.exit(0);
    }

    lineNum++;
});
