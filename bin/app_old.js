import config from "./config/index";
import { User, Product } from "./models/index"
import { DirWatcher, Importer } from "./modules/index";

console.log(config.name);

let firstUser = new User();
let firstProduct = new Product();

let dirEmitter = new DirWatcher();

dirEmitter.watch("./data", 5000);

dirEmitter.on("dirwatcher:changed", (files) => {
    files.forEach((path) => {
        let importer = new Importer();
        importer.import(path).then( result => {
            console.log("======= START OF FILE =====");
            console.log(JSON.parse(result));
            console.log("======= END OF FILE =======");
        });
    });
});


let autoImporter = new Importer("./data");

autoImporter.autoImport();
autoImporter.on("importer:autoimport", (data) => {
    console.log("======= START OF AUTOIMPORT =====");
    console.log(JSON.parse(data));
    console.log("======= END OF AUTOIMPORT =====");
});