import * as readline from 'readline';
import {PhoneBook} from './PhoneBook';

let start = (new Date()).getTime();
let end;
let lineNum = 1;
let operations: number;

let phoneBook = new PhoneBook();
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


rl.on('line', function (line) {
    
    // number of operations on PhoneBook
    if (lineNum === 1) {
        if (!line || !line.length) {
            rl.close();
            throw new Error('Undefined number of operations on PhoneBook');
        }

        operations = parseInt(line);
    }

    // the rest of lines are operations on PhoneBook
    if (lineNum > 1) {

        if (!line || !line.length || line.split(' ').length < 2) {
            rl.close();
            throw new Error('Invalid number of params for operation on PhoneBook');
        }

        let action = line.split(' ')[0];
        let phoneNumber = line.split(' ')[1];
        let contactName;

        if (line.split(' ')[2]) {
            contactName = line.split(' ')[2];
        }

        switch (action) {
            case 'add':
                phoneBook.addContact(phoneNumber, contactName); break;
            case 'del':
                phoneBook.deleteContact(phoneNumber); break;
            case 'find':
                console.log(phoneBook.findContact(phoneNumber)); break;
            default:
                throw new Error('Invalid operation on PhoneBook');
        }
    }

    lineNum++;

    if (lineNum > operations + 1) {

        // measure execution time
        end = (new Date()).getTime();
        console.log('\nTime: ' + ((end - start) / 1000).toString() + ' seconds\n');

        rl.close();
        process.exit(0);
    }
});
