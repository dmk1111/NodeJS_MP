import { EventEmitter } from "events";
import { PathLike, readdir, stat } from "fs";
import { promisify } from "util";
import  * as Path  from "path";
const readDirAsync = promisify(readdir);
const statAsync = promisify(stat);

export class DirWatcher extends EventEmitter {

    isFirstChange = true;
    folderChanged = false;
    dirFiles: any[] = [];
    oldFilesChangeTime: Array<FileChangeTime> = [];

    private interval: any;
    private changedFiles: any[] = [];

    constructor() {
        super();
    }

    watch(path: PathLike, delay = 1000) {
        this.interval = setInterval(() => {
            this.checkPath(path);
        }, delay)
    }

    unwatch() {
        clearInterval(this.interval);
    }

    checkPath(path: PathLike) {
        readDirAsync(path)
            .then((files) => {
                this.dirFiles = [...files];
                this.changedFiles = [];
                this.dirFiles.forEach((filePath, findex) => {
                    let absolutePath = Path.resolve(<string>path, filePath);
                    statAsync(absolutePath).then( stats => {
                        let itemPresent = this.oldFilesChangeTime.some(item => item.path === absolutePath);
                        let index = -1;
                        if (itemPresent) {
                            index = this.oldFilesChangeTime.findIndex(item => item.path === absolutePath)
                        }
                        if (this.isFirstChange || !itemPresent) {
                            this.oldFilesChangeTime.push({ path: absolutePath, timeMs: stats.ctimeMs });
                            this.changedFiles.push(absolutePath);
                            this.folderChanged = true;
                        } else if (itemPresent && stats.ctimeMs !== this.oldFilesChangeTime[index].timeMs) {
                            this.oldFilesChangeTime[index].timeMs = stats.ctimeMs;
                            this.changedFiles.push(absolutePath);
                            this.folderChanged = true;
                        }
                        if (findex === this.dirFiles.length - 1) {
                            this._emitChangedEvent();
                        }
                    });
                });
            });
    }

    _emitChangedEvent() {
        if (this.folderChanged) {
            this.emit("dirwatcher:changed", this.changedFiles);
            this.folderChanged = false;
            if (this.isFirstChange) {
                this.isFirstChange = false;
            }
        }
    }
}

// function readDirAsync(path): Promise<any> {
//     return new Promise( (resolve, reject) => {
//         readdir(path, function (err, data) {
//             if (err !== null) {
//                 return reject(err);
//             }
//             resolve(data);
//         });
//     });
// }
//
// function statAsync(path) {
//     return new Promise(function (resolve, reject) {
//         stat(path, function (err, data) {
//             if (err !== null) {
//                 return reject(err);
//             }
//             resolve(data);
//         });
//     });
// }

interface FileChangeTime {
    path: string,
    timeMs: number
}