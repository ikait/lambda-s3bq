import "core-js";
import Google from "googleapis";
import GcpOAuth2 from "./OAuth2.js";
import config from "../config.js";
import LogCollector from "../LogCollector.js";


export default class BigQuery extends LogCollector {

    /**
     * @param bucket
     * @param key
     * @param tableId
     * @param datasetId
     * @param projectId
     */
    constructor(bucket, key,
                tableId=config.gcp.bigQuery.tableId,
                datasetId=config.gcp.bigQuery.datasetId,
                projectId=config.gcp.projectId) {
        super(bucket, key);
        this.auth = new GcpOAuth2().auth;
        this.tableId = tableId;
        this.datasetId = datasetId;
        this.projectId = projectId;
        this.bigquery = Google.bigquery({
            version: "v2",
            auth: this.auth
        });

        if (config.gcp.bigQuery.decideTableIdFromBucketName) {
            this.tableId = bucket.replace(/\./g, "_");
        }
    }

    /**
     * Insert json string given to BigQuery.
     *
     * @param parser Parser
     * @returns {Promise}
     */
    insertAsync(parser) {
        let self = this;
        return parser.parseAsync().then(parsedParser => {
            let jsonString = parsedParser.toJSON();

            return new Promise((resolve, reject) => self.bigquery.tabledata.insertAll({
                "projectId": self.projectId,
                "datasetId": self.datasetId,
                "tableId":   self.tableId,
                "resource": {
                    "kind": "bigquery#tableDataInsertAllRequest",
                    "rows": [
                        {
                            "json": jsonString
                        }
                    ]
                }
            }, (error, result) => error ? reject(error) : resolve(result)));
        });
    }
}
