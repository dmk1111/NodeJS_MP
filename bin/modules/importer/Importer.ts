const CSV = require("csvtojson");
import { EventEmitter } from "events";
import { DirWatcher } from "../";


export class Importer extends EventEmitter {

    private path: string;
    private emitter: DirWatcher;

    constructor(path: string | any = null) {
        super();
        this.path = path;
        this.emitter = new DirWatcher();
    }

    import(path: string | any = null): Promise<string> {
        return new Promise((resolve, reject) => {
            this._parseCSV(path)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    importSync(path: string, callback: Function) {
        this._parseCSV(path)
            .then(data => callback(null, data))
            .catch(error => callback(error));
    }

    autoImport() {
        if (this.path !== undefined || this.path !== null) {
            this.emitter.watch(this.path);
            this.emitter.on("dirwatcher:changed", (data) => {
                let parsedData: any[] = [];
                data.forEach(async (filePath: string, index: number) => {
                    try {
                        let json = await this.import(filePath);
                        parsedData.push(...JSON.parse(json));
                    } catch (error) {
                        console.warn(`Parsing CSV failed for file: ${filePath} \n ${error}`);
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

    changePath(path: string) {
        this.path = path;
    }

    _parseCSV(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this._isCSV(path)) {
                return reject("File should have .csv extension");
            }
            let arr: any[] = [];
            CSV()
                .fromFile(path)
                .on('json', (jsonObj: any) => {
                    arr.push(jsonObj);
                })
                .on('done', (error: any) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(JSON.stringify(arr));
                })
        })
    }

    _isCSV(path: string) {
        let csvTest = new RegExp(".*\\.csv", "gi");
        return csvTest.test(path);
    }
}