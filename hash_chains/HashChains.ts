import * as readline from 'readline';

// let start = (new Date()).getTime();
// let end: any;
let lineNum = 1;
let operations: number;
let buckets: number;

export class HashTable {
    private prime: number;
    private constant: number;
    private buckets: number;
    private table: {[key:string]: string[]} = {};

    public constructor(prime: number, constant: number, buckets: number) {
        this.prime = prime;
        this.constant = constant;
        this.buckets = buckets;
    }

    private encode(word: string): string {
        let hash = word.split('')
            .map((char, index) => {
                return char.charCodeAt(0) * Math.pow(this.constant, index);
            })
            .reduce((prev, cur) => {
                return cur + prev;
            });

        return (((hash % this.prime) + this.prime) % this.prime % this.buckets).toString();
    }

    private has(word: string): boolean {
        let wordHash = this.encode(word);

        if (!this.table[wordHash] || !this.table[wordHash].length) {
            return false;
        }

        return this.table[wordHash].indexOf(word) === -1 ? false : true;
    }

    public add(word: string): void {
        let wordHash = this.encode(word);

        // don't push if word already exists
        if (this.has(word)) {
            return;
        }

        if (!this.table[wordHash] || !this.table[wordHash].length) {
            this.table[wordHash] = [];
        }

        this.table[wordHash].push(word);
    }

    public del(word: string): void {
        let wordHash;

        // no need to delete if word is not in the table
        if (!this.has(word)) {
            return;
        }
        wordHash = this.encode(word);

        this.table[wordHash].splice(this.table[wordHash].indexOf(word), 1);
    }

    public find(word: string): string {
        return this.has(word) ? 'yes' : 'no';
    }

    public check(hashValue: string): string {
        if (!this.table[hashValue] || !this.table[hashValue].length) {
            return '';
        }

        return this.table[hashValue]
            .reverse()
            .join(' ')
            .trim()
    }
}

let hashTable: HashTable;
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


rl.on('line', function (line: string) {
    
    // number of buckets to use for hashing
    if (lineNum === 1) {
        if (!line || !line.length) {
            rl.close();
            throw new Error('Undefined number of buckets');
        }

        buckets = parseInt(line);
        hashTable = new HashTable(1000000007, 263, buckets);
    }

    // number of operations
    if (lineNum === 2) {
        if (!line || !line.length) {
            rl.close();
            throw new Error('Undefined number of operations');
        }

        operations = parseInt(line);
    }

    // the rest of lines are operations on PhoneBook
    if (lineNum > 2) {

        if (!line || !line.length || line.split(' ').length !== 2) {
            rl.close();
            throw new Error('Invalid number of params for operation');
        }

        let action = line.split(' ')[0];

        let value = line.split(' ')[1];

        switch (action) {
            case 'add':
                hashTable.add(value); break;
            case 'del':
                hashTable.del(value); break;
            case 'find':
                console.log(hashTable.find(value)); break;
            case 'check':
                console.log(hashTable.check(value)); break;
            default:
                throw new Error('Invalid operation on PhoneBook');
        }
    }

    lineNum++;

    if (lineNum > operations + 2) {

        // measure execution time
        // end = (new Date()).getTime();
        // console.log('\nTime: ' + ((end - start) / 1000).toString() + ' seconds\n');

        rl.close();
        process.exit(0);
    }
});
