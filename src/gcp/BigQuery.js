import "core-js";
import Google from "googleapis";
import GcpOAuth2 from "./OAuth2.js";
import config from "../config.js";


export default class BigQuery {
    constructor() {
        this.auth = new GcpOAuth2().auth;
        this.bigquery = Google.bigquery({
            version: "v2",
            auth: this.auth
        });
    }

    insert(jsonObject, callback=()=>{}) {
        console.log(jsonObject);
        this.bigquery.tabledata.insertAll({
            "projectId": config.gcp.projectId,
            "datasetId": config.gcp.bigQuery.datasetId,
            "tableId": config.gcp.bigQuery.tableId,
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
            this.bigquery.tabledata.insertAll({
                "projectId": config.gcp.projectId,
                "datasetId": config.gcp.bigQuery.datasetId,
                "tableId": config.gcp.bigQuery.tableId,
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
