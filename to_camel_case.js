/*

Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized.

Examples:

// returns "theStealthWarrior"
toCamelCase("the-stealth-warrior") 

// returns "TheStealthWarrior"
toCamelCase("The_Stealth_Warrior")

 */

function toCamelCase (str) {
  return str.replace(/[-_]\w/g, function(match) {
    return match[1].toUpperCase();
  });
}

console.log(
  toCamelCase("the-stealth-warrior")
);

console.log(
  toCamelCase("The_Stealth_Warrior")
);