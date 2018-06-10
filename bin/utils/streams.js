// === streams.js ===

const through = require('through2');
const minimist = require('minimist');
const fs = require('fs');
const path = require("path");
const CSV = require("csvtojson");
// import * as through from 'through2';
// import * as minimist from 'minimist';

// const stream = through(write, end);

// The `write` function is called for every buffer of available input:
// Inside the write function, call `this.push()` to produce output data and call `next()` when you're ready to receive the next chunk:

// function write(buffer, encoding, next) {
//     this.push('I got some data: ' + buffer + '\n');
//     next();
// }

// and the `end` function is called when there is no more data:
// and call `done()` to finish the output:

// function end(done) {
//     done();
// }

// process.stdin.pipe(stream).pipe(process.stdout);

const argv = minimist(process.argv.slice(2), {
    string: ['file'],
    alias: {
        a: 'action',
        h: 'help',
        f: 'file'
    },
    stopEarly: true,
    ["--"]: true,
    // unknown: getHelp
});

const Actions = {
    action: runAction,
    help: getHelp
};

// const [method, key, value] = argv['_'];
const file = argv['file'];
const textToTransform = argv['_'].join(' ');



// console.log(argv);

parseArgs();

function runAction(actionName) {
    switch (actionName) {
        case 'outputFile':
            outputFile(file);
            break;
        case 'transformToFile':
            convertToFile(file);
            break;
        case 'transformFromFile':
            convertFromFile(file);
            break;
        case 'transform':
            transform(textToTransform);
            break;
        default:
            process.stdout.write("unknown action name\n");
            break;
    }

}

function parseArgs() {
    if (argv['help']) {
        Actions.help();
        return;
    }
    if (argv['action']) {
        Actions.action(argv['action']);
        return;
    }
    for (let key in argv) {
        if (key !== 'file' && key !== '_' && key !== '--') {
            Actions.help();
            return;
        }
    }
}

// Main actions

function reverse(str) {
    process.stdout.write(str.split("").reverse().join("") + "\n");
}

function transform(str) {
    let string = str !== null ? str : "";
    let stream = through((buffer, encoding, next) => {
            string += buffer;
            next();
        },
        (done) => {
            this.push(string.toUpperCase());
            done();
        });
    // process.stdin.pipe(stream).pipe(process.stdout);
    process.stdout.write(str.toUpperCase() + "\n");
}

function outputFile(filePath) {
    let file = path.resolve(filePath);

    let fd = fs.openSync(file, "r");
    let readStream = fs.createReadStream(null, {fd: fd});
    readStream.pipe(process.stdout);
}

function convertFromFile(filePath) {
    let file = path.resolve(filePath);

    this._parseCSV(file)
        .then(data => {
            process.stdout(data);
        }
)
        .catch(err => consol.warn(err));
}

function convertToFile(filePath) {
    fs.createWriteStream(filePath);
}

function cssBundler(filePath) {

    // not implemented yet
    
}

function _parseCSV(path) {
    return new Promise((resolve, reject) => {
        if (_isCSV(path)) {
            return reject("File should have .csv extension");
        }
        let arr = [];
        CSV()
            .fromFile(path)
            .on('json', (jsonObj) => {
                arr.push(jsonObj);
            })
            .on('done', (error) => {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.stringify(arr));
            })
    })
}

function _isCSV(path) {
    let csvTest = new RegExp(".*\\.csv", "gi");
    return csvTest.test(path);
}

function getHelp() {
    let help = `
    Options:
        -h, --help         print usage information
        -f, --file         path to file
        -a, --action       action type (outputFile, transformToFile, transformFromFile, transform)     
`;
    process.stdout.write(help);
    return true;
}

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
