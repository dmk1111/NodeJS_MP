import config from "../config";
import { User, Product } from "./models";
import { DirWatcher, Importer } from "./modules/index";

console.log(config.name);

let firstUser = new User();
let firstProduct = new Product();

let dirEmitter = new DirWatcher();

dirEmitter.watch("./bin/data", 5000);

dirEmitter.on("dirwatcher:changed", (files: any[]) => {
    files.forEach((path) => {
        let importer = new Importer();
        importer.import(path).then( (result: string) => {
            console.log("======= START OF FILE =====");
            console.log(JSON.parse(result));
            console.log("======= END OF FILE =======");
        })
            .catch(err => console.log(err));
    });
});


let autoImporter = new Importer("./bin/data");

try {
    autoImporter.autoImport();
    autoImporter.on("importer:autoimport", (data) => {
        console.log("======= START OF AUTOIMPORT =====");
        console.log(JSON.parse(data));
        console.log("======= END OF AUTOIMPORT =====");
    });
} catch (err) {
    console.log(err);
}