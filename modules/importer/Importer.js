const CSV = require("csvtojson");
import { EventEmitter } from "events";
import { DirWatcher } from "..";


export class Importer extends EventEmitter {
    constructor(path = null) {
        super();
        this.path = path;
    }

    import(path = null) {
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
        if (this.path !== undefined || this.path !== null) {
            this.emitter = new DirWatcher();
            this.emitter.watch(this.path);
            this.emitter.on("dirwatcher:changed", (data) => {
                let parsedData = [];
                data.forEach(async (filePath, index) => {
                    try {
                        let json = await this.import(filePath);
                        parsedData.push(...JSON.parse(json));
                    } catch (error) {
                        throw new Error(`Parsing CSV failed for file: ${filePath} \n ${error}`);
                    }
                    if (index === data.length - 1) {
                        this.emit("importer:autoimport", JSON.stringify(parsedData));
                    }
                })
            });
        } else {
            throw new Error(`autoImport is not available if you didn't specify path! \n 
            Please, use 'changePath(path)' method to add path and try again`);
        }
    }

    changePath(path) {
        this.path = path;
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