# s3log-collector
This collect S3 logs on AWS Lambda and convert these into json comform to format Google BigQuery specified.

## BigQuery Scheme

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

It requires given logs to comform to [Server Access Log Format](http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html) of Amazon S3.
