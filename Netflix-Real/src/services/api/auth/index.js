import { authApi } from './configUrl'

var requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");

export const requestRegister = async (dataRegister) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlRegister, {
            crossDomain: true,
            method: "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: dataRegister.email,
                password: dataRegister.password,
                gender: dataRegister.gender.value,
                dob: dataRegister.dob,
                role: 1,
                country: dataRegister.country.value
            })
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const requestLogin = async (username, password) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlLogin, {
            crossDomain: true,
            method: "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email : username,
                password
            })
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
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
        .then(response =>
            response.text()
        )
        .then(result =>
        (
            callback(JSON.parse(result)))
        )
        .catch(error =>
            callback('error', error)
        )
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
        .then(response =>
            response.text()
        )
        .then(result =>
            callback(JSON.parse(result))
        )

        .catch(error =>
            callback('error', error)
        )
}