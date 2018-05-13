// === streams.js ===

import * as through from 'through2';
// const minimist = require('minimist');
import * as minimist from 'minimist';

const stream = through(write, end);

// The `write` function is called for every buffer of available input:
// Inside the write function, call `this.push()` to produce output data and call `next()` when you're ready to receive the next chunk:

function write (buffer, encoding, next) {
    this.push('I got some data: ' + buffer + '\n');
    next();
}

// and the `end` function is called when there is no more data:
// and call `done()` to finish the output:

function end (done) {
    done();
}

process.stdin.pipe(stream).pipe(process.stdout);

const argv = minimist(process.argv.slice(2), {
    default: {

    },
    alias: {

    }
});

const [method, key, value] = argv['_'];

// Main actions to be called

function reverse(str) { /* ... */ }
function transform(str) { /* ... */ }
function outputFile(filePath) { /* ... */ }
function convertFromFile(filePath) { /* ... */ }
function convertToFile(filePath) { /* ... */ }


/*
 *
 * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION ****
 *
 */



// === Terminal ===

// ./streams.js --action=outputFile --file=users.csv
//     ./streams.js --action=transformToFile --file=users.csv
//     ./streams.js --action=transform textToTransform
//     ./streams.js -a outputFile -f users.csv
//     ./streams.js --help
//     ./streams.js -h
