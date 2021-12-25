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

export const verifyEmail = async (email) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlVerifyEmail + `/${email}`, {
            crossDomain: true,
            method: "GET",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const requestForgotPassword = async (email) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlForgotPassword + `/${email}`, {
            crossDomain: true,
            method: "GET",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const getProfile = async (token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlProfile, {
            crossDomain: true,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const requestChangePass = async (oldPassword, newPassword, token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlChangePassword, {
            crossDomain: true,
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
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

export const requestUpdateProfile = async (data, token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlProfile, {
            crossDomain: true,
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify({
                gender: data.gender,
                email: data.email,
                dob: data.dob,
                country: data.country,
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

export const requestLogin = async (username, password) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlLogin, {
            crossDomain: true,
            method: "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: username,
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

export const requestLogout = async (refresh_token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlLogout, {
            crossDomain: true,
            method: "DELETE",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: refresh_token
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