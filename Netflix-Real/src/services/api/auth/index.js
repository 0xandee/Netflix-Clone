import { json } from 'express';
import { authApi } from './configUrl'

var requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append("Accept", "application/json");

export const requestRegister = async (username, password, email, callback) => {
    var raw = JSON.stringify({
        username,
        password,
        email
    });
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch(authApi.urlRegister, requestOptions)
        .then(response => response.text())
        .then(result =>
            callback(JSON.parse(result))
        )
        .catch(error => {
            callback('error', error);
        })
}

export const requestLogin = async (username, password, callback) => {
    var rawBody = JSON.stringify({
        username,
        password
    });
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: rawBody,
        redirect: 'follow'
    };

    await fetch(authApi.urlLogin, requestOptions)
        .then(response => response.text())
        .then(result =>
            callback(JSON.parse(result))
        )
        .catch(error => {
            callback('error', error);
        })
}

export const requestLogout = async (refresh_token, callback) => {

    var rawBody = JSON.stringify({
        refresh_token
    });
    var requestOptions = {
        method: 'DELETE',
        headers: requestHeaders,
        body: rawBody,
        redirect: 'follow'
    };

    await fetch(authApi.urlLogout, requestOptions)
        .then(response => {
            response.text()
        })
        .then(result =>
        (
            callback(JSON.parse(result)))
        )
        .catch(error => {
            callback('error', error);
        })
}

export const requestRefreshToken = async (refresh_token, callback) => {


    var rawBody = JSON.stringify({
        refresh_token
    });
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: rawBody,
        redirect: 'follow'
    };

    await fetch(authApi.urlRefreshToken, requestOptions)
        .then(response => {           
        console.log("🚀 ~ file: index.js ~ line 93 ~ requestRefreshToken ~ response", response)
            response.text()
        })
        .then(result => {
        console.log("🚀 ~ file: index.js ~ line 96 ~ requestRefreshToken ~ result", JSON.parse(result))
            callback(JSON.parse(result))
        })

        .catch(error => {
        console.log("🚀 ~ file: index.js ~ line 101 ~ requestRefreshToken ~ error", error)
            callback('error', error);
        })
}