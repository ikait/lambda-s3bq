import Google from "googleapis";
import config from "../config.js";
import key from "../service_account.json";


export default class OAuth2Client {
    constructor() {
        this.auth = new Google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ["https://www.googleapis.com/auth/bigquery"],
            null
        );
    }
}