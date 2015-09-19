import Fs from "fs";
import Readline from "readline";
import Parser from "./parser.js";

let readStream = Fs.ReadStream("logs");
let readline = Readline.createInterface({"input": readStream, "output": {}});


readline.on("line", line => {
    let parser = new Parser(line);
    console.log(parser.parse().toJSON());
    parser = null;
});
