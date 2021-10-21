import { authApi } from './configUrl'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const requestRegister = async (username, password, email, callback) => {
    var raw = JSON.stringify({
        username,
        password,
        email
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
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

