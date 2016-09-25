/*

Construct a function that, when given a string containing an expression
in infix notation, will return an identical expression in postfix notation.

The operators used will be +, -, *, /, and ^ with standard precedence rules
and left-associativity of all operators but ^.

The operands will be single-digit integers between 0 and 9, inclusive.

Parentheses may be included in the input, and are guaranteed to be
in correct pairs.

toPostfix("2+7*5"); // Should return "275*+"
toPostfix("3*3/(7+1)"); // Should return "33*71+/"
toPostfix("5+(6-2)*9+3^(7-1)"); // Should return "562-9*+371-^+"
You may read more about postfix notation, also called Reverse Polish notation,
here: http://en.wikipedia.org/wiki/Reverse_Polish_notation

 */

function precedence(operator){
  if (operator == '*' || operator == '/') { return 40; }
  else if (operator == '+' || operator == '-') { return 20; }
  else if ( operator == '^') { return 60; }
}

function is_operator (token) {
  return token.match(/[\/\*\+\-\^]/);
}

function associativity (operator) {
  if (operator == '+' ||
      operator == '-' ||
      operator == '*' ||
      operator == '/') {
    return 'left';
  } else if (operator == '^') {
    return 'right';
  }
}

function toPostfix (infix) {
  var operator_stack = [], postfix = [], token;
  infix = infix.split('');

  while (infix.length > 0) {// search the string until the end of the string
    // console.log('operator_stack: ' + operator_stack);
    // console.log('postfix: ' + postfix);
    token = infix.shift();

    if (!isNaN(parseInt(token, 10))) {
      postfix.push(token);
    } else if (is_operator(token)) {
      while (operator_stack.length != 0 &&
            ((associativity(token) == 'left' &&
              precedence(token) <= precedence(operator_stack[operator_stack.length - 1])) ||
            (associativity(token) == 'right' &&
              precedence(token) < operator_stack[operator_stack.length - 1])
            )) {
        postfix.push(operator_stack.pop());
      }
      operator_stack.push(token);
    } else if (token == '(') {
      operator_stack.push(token);
    } else if (token == ')') {
      while (operator_stack[operator_stack.length - 1] != '(' &&
            operator_stack.length > 0) {
        postfix.push(operator_stack.pop());
      }
      var left_parenthesis = operator_stack.pop();
      if (left_parenthesis != '(') {
        console.log("ERROR! Mismatching parentheses!");
      }
    }
  }

  while (operator_stack.length > 0) {
    postfix.push(operator_stack.pop());
  }

  return postfix.join('');
}


console.log(
  toPostfix("2+7*5")
);

console.log(
  toPostfix("3*3/(7+1)")
);

console.log(
  toPostfix("5+6-2)*9+3^(7-1)") // "562-9*+371-^+"
);

console.log(
  toPostfix("(5-4-1)+9/5/2-7/1/7")
);
