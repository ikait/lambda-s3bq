# lambda-s3bq

A AWS Lambda function to parse S3 logs, and send them to Google BigQuery.

## How to use

1. Setup BigQuery table where data is put. Its scheme and sample data are in bottom of this page.
1. Edit follows in `./src/config.js`
    * `gcp.projectId`
    * `gcp.bigQuery.datasetId`
    * `gcp.bigQuery.tableId`
    * If you use Lambda function without IAM roles, `aws.accessKeyId` and `aws.secretAccessKey` are also required. Its AWS account should be able to read logs on S3.
1. Install npm locally.  
  ```sh
npm i -S -D
```

1. Create and download service account json from Google Developer Console on your browser.  
  ```sh
open https://console.developers.google.com/project/<project_name>/apiui/credential/serviceaccount
```

1. Rename and move.  
  ```sh
mv <filename_of_json_downloaded> ./src/service_account.json`
```

1. Build and zip files under src dir.
  ```sh
gulp build && gulp zip 
```

1. Create Lambda function, upload `./build.zip`, set your bucket and prefix as eventsource.

### BigQuery

#### Sample Data
```json
{ "BucketOwner": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "Bucket": "test.bucket.com", "Time": 1440000000, "RemoteIP": "1.1.1.1", "Requester": "arn:aws:iam::740000000000:user/test-user", "RequestID": "TEST00000000TEST", "Operation": "REST.PUT.OBJECT", "Key": "test.txt", "RequestURI": "PUT test.bucket.com/test.txt HTTP/1.1", "HTTPStatus": "200", "ErrorCode": "-", "BytesSent": "-", "ObjectSize": "20", "TotalTime": "50", "TurnAroundTime": "25", "Referrer": "-", "UserAgent": "test-agent", "VersionID": "-" }
```

#### Scheme

```json
[
    {
        "name": "BucketOwner",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Bucket",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Time",
        "type": "TIMESTAMP",
        "mode": "REQUIRED"
    },
    {
        "name": "RemoteIP",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Requester",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "RequestID",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Operation",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Key",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "RequestURI",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "HTTPStatus",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "ErrorCode",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "BytesSent",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "ObjectSize",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "TotalTime",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "TurnAroundTime",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "Referrer",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "UserAgent",
        "type": "STRING",
        "mode": "REQUIRED"
    },
    {
        "name": "VersionID",
        "type": "STRING",
        "mode": "REQUIRED"
    }
]
```
