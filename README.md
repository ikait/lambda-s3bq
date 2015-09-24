# s3log-collector
This collect S3 logs on AWS Lambda and convert these into json comform to format Google BigQuery specified.

## BigQuery Scheme

```
BucketOwner:STRING,
Bucket:STRING,
Time:TIMESTAMP,
RemoteIP:STRING,
Requester:STRING,
RequestID:STRING,
Operation:STRING,
Key:STRING,
RequestURI:STRING,
HTTPStatus:STRING,
ErrorCode:STRING,
BytesSent:STRING,
ObjectSize:STRING,
TotalTime:STRING,
TurnAroundTime:STRING,
Referrer:STRING,
UserAgent:STRING,
VersionID:STRING
```

It requires given logs to comform to [Server Access Log Format](http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html) of Amazon S3.
