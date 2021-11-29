import { authApi } from './configUrl'

var requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");

export const requestRegister = async (dataRegister, callback) => {
    // var raw = JSON.stringify({
    //     email: dataRegister.email,
    //     password: dataRegister.password,
    //     gender: dataRegister.gender.value,
    //     dob: dataRegister.dob,
    //     role: 1,
    //     country: dataRegister.country.value
    // });
    // var requestOptions = {
    //     method: 'POST',
    //     headers: requestHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // console.log("🚀 ~ file: index.js ~ line 23 ~ requestRegister ~ requestOptions", requestOptions)

    // await fetch(authApi.urlRegister, requestOptions)
    //     .then(response => response.text())
    //     .then(result =>
    //         callback(JSON.parse(result))
    //     )
    //     .catch(error => {
    //         callback('error', error)
    //     })
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
                // console.log("🚀 ~ file: index.js ~ line 47 ~ returnnewPromise ~ response", response)
                //     if (!response.ok) return reject(response.ok)
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
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
        .catch(error =>
            callback('error', error)
        )
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