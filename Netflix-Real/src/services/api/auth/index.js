import { requestAccessToken, requestRefreshToken } from '../../function';
import { authApi } from './configUrl'
const axios = require('axios');
const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const request_token_status = await requestRefreshToken();
        if (request_token_status === 200) {
            const access_token = await requestAccessToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return instance(originalRequest);
        }
        else if (request_token_status === 401) {
            
            await requestLogout(localStorage.getItem('refresh_token'))
            localStorage.clear()
            document.location.href = '/signin'
        }
        else if (request_token_status === 500) {
            document.location.href = '/maintenance'
        }

        return instance(originalRequest);
    }
    return Promise.reject(error);
});

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
        instance.put(authApi.urlProfile
            , {
                crossDomain: true,
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                },
            }
        )
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const requestChangePass = async (oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        instance.put(authApi.urlChangePassword,
            // crossDomain: true,
            // method: "PUT",
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': "Bearer " + token,
            // },
            // body: JSON.stringify(
            {
                oldPassword,
                newPassword
            }
        )
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
    })
}

export const requestUpdateProfile = async (data) => {
    return new Promise((resolve, reject) => {
        instance.put(authApi.urlProfile,
            // {
            // crossDomain: true,
            // method: "PUT",
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': "Bearer " + token,
            // },
            // body: JSON.stringify(
            {
                gender: data.gender,
                email: data.email,
                dob: data.dob,
                country: data.country,
            }
        )
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

export const checkRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlCheckRefreshToken, {
            crossDomain: true,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        })
            .then(async response => {
                resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const getAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlRefreshAccessToken, {
            crossDomain: true,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) return reject(response.ok)
                resolve(data)
            })
            .catch(error => {
                return reject(error)
            });
    })
}
// 0: mobile, 1: tablet, 2: desktop
export const detectDevice = async (value, token) => {
    return new Promise((resolve, reject) => {
        fetch(authApi.urlDetectDevice + `/${value}`, {
            crossDomain: true,
            method: "POST",
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
