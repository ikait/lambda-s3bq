import "core-js";
import AWS from "./index.js";


export default class Elasticsearch extends LogCollector {
    constructor(bucket, key) {
        super(bucket, key);
    }

    insertAsync(parser) {
        let self = this;
        return parser.parseAsync().then(parsedParser => {
            let jsonString = parsedParser.toJSON();

        });
    }
}