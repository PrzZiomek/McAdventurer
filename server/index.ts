//import express from "express";
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const request = require('request')
const OAuth = require('oauth-1.0a')
const crypto = require('crypto')
//import crypto from "crypto";

// Token request function
export function generateToken() {
    const oauth = OAuth({
        consumer: {
            key: 'qOsCg0ZIQ0RHmxKw-3ik9Q', 
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
    const request_data = {
        url: 'https://account.api.here.com/oauth2/token',
        method: 'POST',
        data: { grant_type: 'client_credentials' },
    };
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

generateToken();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next();
})



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});