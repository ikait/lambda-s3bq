import Fs from "fs";
import Readline from "readline";
import Moment from "moment";

let readStream = Fs.ReadStream("logs");
let readline = Readline.createInterface({"input": readStream, "output": {}});

const DELIMITER = " ";

readline.on("line", line => {

    let part = [];
    let data = {};
    let restString = line;
    let closeCharacter = DELIMITER;

    Analyze: while (true) {

        // if restString doesn't include DELIMITER " ", it's a final token
        if (!restString.includes(DELIMITER)) {
            part.push(restString);
            break Analyze;
        }

        let closeAt = restString.indexOf(closeCharacter);
        part.push(restString.slice(closeCharacter.length - 1, closeAt));

        restString = restString.slice(closeAt + closeCharacter.length);
        if (restString[0] === "[") {
            closeCharacter = "] ";
        } else if (restString[0] === "\"") {
            closeCharacter = "\" ";
        } else {
            closeCharacter = DELIMITER;
        }
    }


    // insert
    data.BucketOwner = part[0];
    data.Bucket      = part[1];
    data.Datetime    = part[2];
    data.RemoteIP    = part[3];
    data.Requester   = part[4];
    data.RequestID   = part[5];
    data.Operation   = part[6];
    data.Key         = part[7];
    data.RequestURI  = part[8];
    data.HTTPStatus  = part[9];
    data.ErrorCode   = part[10];
    data.BytesSent   = part[11];
    data.ObjectSize  = part[12];
    data.TotalTime   = part[13];
    data.TurnAroundTime = part[14];
    data.Referrer    = part[15];
    data.UserAgent   = part[16];
    data.VersionID   = part[17];


    // format
    data.date = Moment(data.date, "DD/MMM/YYYY:HH:mm:ss ZZ").unix();


    console.log(JSON.stringify(data, null, 4));
});
