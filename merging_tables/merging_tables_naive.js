/**
 * var tables = [
 *  {
 *      symlink : -1,   // link to(index of) another table, -1 if no symlink
 *      rows    : 0,    // number of rows in this table, 0 if table is a symlink
 *  },
 *  ...
 * ];
 */
var tables = [];
var nTables = 0;
var nMerges = 0;
var maxRows = 0;

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lineNum = 1;

rl.on('line', function (line) {
    
    // number of tables and number of merge operations
    if (lineNum === 1) {
        // console.log('Line 1: ' + line);

        if (!line || !line.length || !line.split(' ').length > 1) {
            rl.close();
            throw new Error('Undefined number of tables or merge operations');
        }

        nTables = parseInt(line.split(' ')[0]);
        nMerges = parseInt(line.split(' ')[1]);

        // console.log('nTables: ' + nTables);
        // console.log('nMerges: ' + nMerges);
    }

    // number of rows in each tables
    if (lineNum === 2) {
        // console.log('Line 2: ' + line);

        if (!line || !line.length) {
            rl.close();
            throw new Error('Number of rows for each table is not provided');
        }

        var rows = line.split(' ');
        rows.forEach(function (nrows) {
            var nrowsInt = parseInt(nrows);

            if (nrowsInt > maxRows) {
                maxRows = nrowsInt;
            }

            tables.push({
                symlink : -1,
                rows    : nrowsInt
            });
        });

        // console.log('tables: ' + JSON.stringify(tables));
    }

    // the rest of lines are each merge operation description
    if (lineNum > 2) {
        // console.log('Line ' + lineNum + ': ' + line);

        if (!line || !line.length || !line.split(' ').length > 1) {
            rl.close();
            throw new Error('Undefined number of tables or merge operations');
        }

        // get source and destination tables indexes
        var destination = parseInt(line.split(' ')[0]);
        var source = parseInt(line.split(' ')[1]);

        // find a table with data for both source and destination
        // console.log('source: ' + JSON.stringify(source));
        source = traverseLink(source, tables);
        // console.log('source: ' + JSON.stringify(source));

        // console.log('destination: ' + JSON.stringify(destination));
        destination = traverseLink(destination, tables);
        // console.log('destination: ' + JSON.stringify(destination));

        // merge tables
        if (source !== destination) {
            mergeTables(tables, source, destination);   
        }
    }

    if (lineNum > 2) {
        console.log(maxRows);
    }
    lineNum++;

    if (lineNum > nMerges + 2) {
        console.log('All merged!');
        console.log(JSON.stringify(tables));
        rl.close();
        process.exit(0);
    }
});

/**
 * @desc            traverse symlinks and get index of table with actual data
 * @return {Number} index in tables array
 */
function traverseLink (index, tables) {
    var initial = index;

    while (tables[index - 1].symlink >= 0) {
        // console.log(JSON.stringify(tables[index - 1]));
        // console.log('           |');
        // console.log('           v');
        index = tables[index - 1].symlink;
    }

    if (initial !== index) {
        // console.log(JSON.stringify(tables[index - 1]));
    }

    return index;
}

/**
 * @desc                        Merge source table into destination table
 * @param   {Array}             List of all tables
 * @param   {Number}    source  Index of a table to perform merged from
 * @param   {Number}    dest    Index of a table to perform merged to
 * @return  {Array}             Updated list of all tables
 */
function mergeTables (tables, source, dest) {
    tables[dest - 1].rows += tables[source - 1].rows;
    tables[source - 1].rows = 0;
    tables[source - 1].symlink = dest;

    if (tables[dest - 1].rows > maxRows) {
        maxRows = tables[dest - 1].rows;
    }

    return tables;
}