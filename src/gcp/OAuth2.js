import Google from "googleapis";
import config from "../config.js";


export default class OAuth2Client {
    constructor() {
        this.auth = new Google.auth.OAuth2(config.gcp.clientId, config.gcp.clientSecret, config.gcp.redirectUrl);
        this.auth.setCredentials({
            access_token: config.gcp.accessToken,
            refresh_token: config.gcp.refreshToken
        });
    }
}