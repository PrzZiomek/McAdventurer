"use strict";
const request = require('request');
const OAuth = require('oauth-1.0a');
//const crypto = require('crypto')
/*
// Token request function
export function generateToken() {
    // #1 Initialize OAuth with your HERE OAuth credentials from the credentials file that you downloaded above
    const oauth = OAuth({
        consumer: {
            key: 'qOsCg0ZIQ0RHmxKw-3ik9Q', //Access key
            secret: '5txYweZM6vTFB7z0L-Kwz-MnUDZ6WooqBlaUoP6igv5NXHSLaC-G9J3PDJvZwLtg5aKRmTtzOlDsWU38GIuGCQ', //Secret key
        },
        signature_method: 'HMAC-SHA256',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha256', key)
                .update(base_string)
                .digest('base64')
        },
    });
    // #2 Building the request object.
    const request_data = {
        url: 'https://account.api.here.com/oauth2/token',
        method: 'POST',
        data: { grant_type: 'client_credentials' },
    };
    // #3 Sending the request to get the access token
    request(
        {
            url: request_data.url,
            method: request_data.method,
            form: request_data.data,
            headers: oauth.toHeader(oauth.authorize(request_data)),
        },
        function (error, response, body) {

            if (response.statusCode == 200) {
               const result = JSON.parse(response.body);
                console.log('Token', result);
            }
        }
    );
}

// Calling this function to get the access token

*/ 
//# sourceMappingURL=generateToken.js.map