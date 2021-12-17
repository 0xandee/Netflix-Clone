import { SET_MOVIE_TYPES, IS_INFO_POP_UP } from "./constrains"

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

export const setMovieTypes = (movieTypes) => {
  return {
    type: SET_MOVIE_TYPES,
    payload: {
      movieTypes: movieTypes
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
      body: JSON.stringify({ user })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
        } else {
          // localStorage.setItem("token", data.jwt)
          // dispatch(loginUser(data.user))
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
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
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else if (data?.data?.access_token && data?.data?.refresh_token){
              assignTokenObj(data.data.access_token, data.data.refresh_token);
            }
          })
    }
  }

export const userLogout = () => {
  return dispatch => {
    return fetch(`${url}/api/auth/login`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(tokenObj.refresh_token)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
        } else {
          assignTokenObj("", "");
        }
        })
  }
}

const assignTokenObj = (access_token, refresh_token) => {
  tokenObj.access_token = access_token;
  tokenObj.refresh_token = refresh_token;
}
  
export var tokenObj = ({
  access_token: "",
  refresh_token: ""
  })
