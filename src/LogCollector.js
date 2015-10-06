import "core-js";
import config from "./config.js";


export default class LogCollector {

    /**
     * @returns {LogCollector}
     */
    constructor(bucket, key) {
        this.bucket = bucket;
        this.key = key;
        return this;
    }

    /**
     * Insert data async
     *
     * @param parser Parser
     * @returns {Promise}
     */
    insertAsync(parser) {
        return parser.parseAsync();
    }
}
