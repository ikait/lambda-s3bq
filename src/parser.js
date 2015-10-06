import Moment from "moment";

const DELIMITER = " ";


export default class Parser {

    constructor(line) {
        this.line = line;
    }

    /**
     * Mapping parts
     *
     * @param parts
     * @returns {{}}
     * @private
     */
    _mapping(parts) {
        let data = {};
        data.BucketOwner = parts[0];
        data.Bucket      = parts[1];
        data.Time        = parts[2];
        data.RemoteIP    = parts[3];
        data.Requester   = parts[4];
        data.RequestID   = parts[5];
        data.Operation   = parts[6];
        data.Key         = parts[7];
        data.RequestURI  = parts[8];
        data.HTTPStatus  = parts[9];
        data.ErrorCode   = parts[10];
        data.BytesSent   = parts[11];
        data.ObjectSize  = parts[12];
        data.TotalTime   = parts[13];
        data.TurnAroundTime = parts[14];
        data.Referrer    = parts[15];
        data.UserAgent   = parts[16];
        data.VersionID   = parts[17];
        return data;
    }

    /**
     * Set Time to unixtime
     *
     * @param data
     * @returns {*}
     * @private
     */
    _format(data) {

        data.Time = Moment(data.Time, "DD/MMM/YYYY:HH:mm:ss Z").utc().unix();

        return data;
    }

    /**
     * Parse async
     *
     * @returns {Promise}, Parser(self)
     */
    parseAsync() {
        let self = this;
        return new Promise(resolve => {
            resolve(self.parse())
        });
    }

    /**
     * Parse and return self
     *
     * @returns {Parser}
     */
    parse() {
        let parts = [];
        let restString = this.line;
        let closeCharacter = DELIMITER;

        Analyze: while (true) {

            // if restString doesn't include DELIMITER " ", it's a final token
            if (!restString.includes(DELIMITER)) {
                parts.push(restString);
                break Analyze;
            }

            let closeAt = restString.indexOf(closeCharacter);
            parts.push(restString.slice(closeCharacter.length - 1, closeAt));

            restString = restString.slice(closeAt + closeCharacter.length);
            if (restString[0] === "[") {
                closeCharacter = "] ";
            } else if (restString[0] === "\"") {
                closeCharacter = "\" ";
            } else {
                closeCharacter = DELIMITER;
            }
        }

        this.data = this._format(this._mapping(parts));
        return this;
    }

    /**
     * Get json string
     *
     * @returns string
     */
    toJSON() {
        return JSON.stringify(this.data);
    }
}










