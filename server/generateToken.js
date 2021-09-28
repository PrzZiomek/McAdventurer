"use strict";
exports.__esModule = true;
exports.generateToken = void 0;
var request = require('request');
var OAuth = require('oauth-1.0a');
//const crypto = require('crypto')
var crypto_1 = require("crypto");
// Token request function
function generateToken() {
    // #1 Initialize OAuth with your HERE OAuth credentials from the credentials file that you downloaded above
    var oauth = OAuth({
        consumer: {
            key: 'qOsCg0ZIQ0RHmxKw-3ik9Q',
            secret: '5txYweZM6vTFB7z0L-Kwz-MnUDZ6WooqBlaUoP6igv5NXHSLaC-G9J3PDJvZwLtg5aKRmTtzOlDsWU38GIuGCQ'
        },
        signature_method: 'HMAC-SHA256',
        hash_function: function (base_string, key) {
            return crypto_1["default"]
                .createHmac('sha256', key)
                .update(base_string)
                .digest('base64');
        }
    });
    // #2 Building the request object.
    var request_data = {
        url: 'https://account.api.here.com/oauth2/token',
        method: 'POST',
        data: { grant_type: 'client_credentials' }
    };
    // #3 Sending the request to get the access token
    request({
        url: request_data.url,
        method: request_data.method,
        form: request_data.data,
        headers: oauth.toHeader(oauth.authorize(request_data))
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            var result = JSON.parse(response.body);
            console.log('Token', result);
        }
    });
}
exports.generateToken = generateToken;
// Calling this function to get the access token
