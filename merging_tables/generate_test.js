var NUM_TABLES = {
    min: 1,
    max: 1000
}
var NUM_MERGES = {
    min: NUM_TABLES.min,
    max: NUM_TABLES.max
}
var NUM_ROWS = {
    min: NUM_TABLES.min - 1,
    max: NUM_TABLES.max / 10
}
var SOURCE = {
    min: NUM_TABLES.min,
    max: NUM_TABLES.max
}
var DEST = {
    min: NUM_TABLES.min,
    max: NUM_TABLES.max
}

var fs = require('fs');

fs.writeFile("tests/03", generateTest(), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

function generateTest () {
    var str = '';

    // line 1: number of tables and number of merge operations
    str += NUM_TABLES.max + ' ' + NUM_MERGES.max + '\n';

    // line 2: number of rows in each table
    for (var i = 0; i < NUM_TABLES.max; i++) {
        str += parseInt(Math.random() * (NUM_ROWS.max - NUM_ROWS.min) + NUM_ROWS.min) + ' ';
    }

    str.trim();
    str += '\n';

    // rest of the lines are desccriptions of each merge operation
    for (var i = 0; i < NUM_MERGES.max; i++) {
        str += parseInt(Math.random() * (SOURCE.max - SOURCE.min) + SOURCE.min) + ' ';
        str += parseInt(Math.random() * (DEST.max - DEST.min) + DEST.min) + '\n';
    }

    // console.log(str);
    return str;
}