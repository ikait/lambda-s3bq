import "core-js";
import Google from "googleapis";
import GcpOAuth2 from "./OAuth2.js";
import config from "../config.js";


export default class BigQuery {
    constructor(tableId=config.gcp.bigQuery.tableId, datasetId=config.gcp.bigQuery.datasetId, projectId=config.gcp.projectId) {
        this.auth = new GcpOAuth2().auth;
        this.tableId = tableId;
        this.datasetId = datasetId;
        this.projectId = projectId;
        this.bigquery = Google.bigquery({
            version: "v2",
            auth: this.auth
        });
    }

    insert(jsonObject, callback=()=>{}) {
        console.log(jsonObject);
        let self = this;
        this.bigquery.tabledata.insertAll({
            "projectId": self.projectId,
            "datasetId": self.datasetId,
            "tableId": self.tableId,
            "resource": {
                "kind": "bigquery#tableDataInsertAllRequest",
                "rows": [
                    {
                        "json": jsonObject
                    }
                ]
            }
        }, (error, result) => {
            if (error) {
                return console.error(error);
            }
            console.log(result);
            callback(result);
        });
    }

    insertAsync(jsonObject) {
        return new Promise((resolve, reject) => {
            console.log(`[insert] BigQuery`);
            console.log(jsonObject);
            let self = this;
            this.bigquery.tabledata.insertAll({
                "projectId": self.projectId,
                "datasetId": self.datasetId,
                "tableId": self.tableId,
                "resource": {
                    "kind": "bigquery#tableDataInsertAllRequest",
                    "rows": [
                        {
                            "json": jsonObject
                        }
                    ]
                }
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            })
        });
    }
}
