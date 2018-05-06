import config from "./config";
import { User, Product } from "./models"
import { DirWatcher, Importer } from "./modules";

console.log(config.name);

let firstUser = new User();
let firstProduct = new Product();

let dirEmitter = new DirWatcher();
dirEmitter.watch("./data", 5000);
dirEmitter.on("dirwatcher:changed", (files) => {
    files.forEach((path) => {
        let importer = new Importer();
        importer.import(path).then( result => console.log(result));
    })
});