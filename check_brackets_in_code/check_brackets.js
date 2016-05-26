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
                    if (!stackTop.match(inputText[i]) && !/[A-Za-z0-9]/.test(inputText[i])) {
                        return i + 1;
                    }
                }
            }
        }
        if (openingBracketsStack.length === 0) {
            return 'Success';
        } else {
            var lastInStack = (openingBracketsStack[openingBracketsStack.length - 1]);
            return lastInStack.position + 1;
        }
    } else {
        return false;
    }
}

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        var result = matchBrackets(chunk);
        process.stdout.write(String(result) + "\n");
        process.exit();
    }
});
