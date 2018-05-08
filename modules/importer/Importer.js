const CSV = require("csvtojson");
import { EventEmitter } from "events";

// TODO: parse only CSV files, update _parseCSV logic, fix subtasks

export class Importer extends EventEmitter {
    constructor(emitter) {
        super();
        this.emitter = emitter;
    }

    import(path) {
        return new Promise((resolve, reject) => {
            this._parseCSV(path)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    importSync(path, callback) {
        this._parseCSV(path)
            .then(data => callback(null, data))
            .catch(error => callback(error));
    }

    autoImport() {
        if (this.emitter !== undefined) {
            this.emitter.on("dirwatcher:changed", (data) => this.emit("importer:autoimport", data));
        }
    }

    _parseCSV(path) {
        return new Promise((resolve, reject) => {
            if (!this._isCSV(path)) {
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

    _isCSV(path) {
        let csvTest = new RegExp(".*\\.csv", "gi");
        return csvTest.test(path);
    }
}