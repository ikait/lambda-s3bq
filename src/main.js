import "core-js";
import Parser from "./Parser.js";
import BigQuery from "./gcp/BigQuery.js";
import S3 from "./aws/S3.js";

import config from "./config.js";


export function handler(event, context) {
    let bucket = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;

    let [s3, bq] = [new S3(), new BigQuery(bucket, key)];


    s3.get(key, bucket).then(data =>
        Promise.all(data.toString().split(/\r\n|\r|\n/).slice(0, -1).map(line =>
            bq.insertAsync(new Parser(line)))))
        .catch(error =>
            context.fail(error))
        .then(msg =>
            context.succeed(msg));
}

