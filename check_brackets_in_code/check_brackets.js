function Bracket(bracketType, position) {
    this.bracketType = bracketType;
    this.position = position;
}

Bracket.prototype.match = function () {
    if (this.bracketType === '[' && c === ']') {
        return true;
    }
    if (this.bracketType === '{' && c === '}') {
        return true;
    }
    if (this.bracketType === '(' && c === ')') {
        return true;
    }
    return false;
}

process.stdin.setEncoding('utf8');
var openingBracketsStack = []

process.stdin.on('readable', function() {
    var inputText = process.stdin.read();

    if (inputText !== null) {

        #TODO solution goes here


        process.stdout.write(inputText);
        process.exit();
    }
});