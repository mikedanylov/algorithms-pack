function Bracket(bracketType, position) {
    this.bracketType = bracketType;
    this.position = position;
}

Bracket.prototype.match = function (c) {
    if (this.bracketType === '[' && c === ']') {
        return true;
    } else if (this.bracketType === '{' && c === '}') {
        return true;
    } else if (this.bracketType === '(' && c === ')') {
        return true;
    }
    return false;
};

function isOpeningBracket(char) {
    var openingBrackets = ['[', '{', '('];
    return !!(openingBrackets.indexOf(char) !== -1);
}

function isClosingBracket(char) {
    var closingBrackets = [']', '}', ')'];
    return !!(closingBrackets.indexOf(char) !== -1);
}

function matchBrackets(inputText) {
    var openingBracketsStack = [];

    if (inputText) {
        for (var i = 0; i < inputText.length; i++) {
            if (isOpeningBracket(inputText[i])) {
                openingBracketsStack.push(new Bracket(inputText[i], i));
            } else {
                if (openingBracketsStack.length === 0 &&
                    (isOpeningBracket(inputText[i]) || isClosingBracket(inputText[i]))) {
                    return i + 1;
                } else if (isClosingBracket(inputText[i])) {
                    var stackTop = openingBracketsStack.pop();
                    if (!stackTop.match(inputText[i]) && !/^[^\[\{\(\]\}\)]*$/.test(inputText[i])) {
                        return i + 1;
                    }
                }
            }
        }
        if (openingBracketsStack.length === 0) {
            return 'Success';
        } else {
            var lastInStack = openingBracketsStack.pop();
            return lastInStack.position + 1;
        }
    } else {
        return false;
    }
}

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line){
    console.log(matchBrackets(line));
    process.exit();
})
