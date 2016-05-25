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
                    console.log("Stack is empty");
                    var mismatchPosition = i + 1;
                    throw new Error("\"" + inputText[i] + "\"" +
                        ' bracket mismatch at position ' + mismatchPosition);
                } else if (isClosingBracket(inputText[i])) {
                    var stackTop = openingBracketsStack.pop();
                    if (!stackTop.match(inputText[i]) && !/[A-Za-z0-9]/.test(inputText[i])) {
                        openingBracketsStack = [];
                        var mismatchPosition = stackTop.position + 2;
                        throw new Error("\"" + stackTop.bracketType + "\"" +
                            ' bracket mismatch at position ' + mismatchPosition);
                    }
                }
            }
        }
        if (openingBracketsStack.length === 0) {
            return 'Brackets match!';
        } else {
            var lastInStack = (openingBracketsStack[openingBracketsStack.length - 1]);
            var mismatchPosition = lastInStack.position + 1;
            throw new Error("\"" + lastInStack.bracketType + "\"" +
                ' bracket mismatch at position ' + mismatchPosition);
        }
    } else {
        return false;
    }
}

// matchBrackets("[]");
// matchBrackets("{}");
// matchBrackets("()");
// matchBrackets("{}[]");
// matchBrackets("{}()");
// matchBrackets("[]()");
// matchBrackets("[][]");
// matchBrackets("[()]");
// matchBrackets("(())");
// matchBrackets("{{}}");
// matchBrackets("{}[]{}");
// matchBrackets("{[]}()");
// matchBrackets("[{{}}]");

// matchBrackets("{");
// matchBrackets("}");
// matchBrackets("[");
// matchBrackets("]");
// matchBrackets("(");
// matchBrackets(")");
// matchBrackets("}()");
// matchBrackets("{[}");
// matchBrackets("[(]");
// matchBrackets("(){[}");
// matchBrackets("{}{}]");

// matchBrackets("ablabla)ihihi(ohoho");
matchBrackets("[very(strong]test)");