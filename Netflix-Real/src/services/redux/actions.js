import { IS_INFO_POP_UP } from "./constrains"

require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const showPopUpInfo = (isPopUp) => {
    return {
        type: IS_INFO_POP_UP,
        payload: {
            isPopUp: isPopUp
        }
    }
}

export const userPostFetch = user => {
    return dispatch => {
      return fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }

  export const userLoginFetch = user => {
    return dispatch => {
      return fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
  
  const loginUser = userObj => ({
      type: 'LOGIN_USER',
      payload: userObj
  })