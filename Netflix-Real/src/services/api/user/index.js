import { userApi } from './configUrl'
 const axios = require('axios');


export const favMoviePost = (movieID, token) => {
  return new Promise((resolve, reject) => {
    // fetch(`${userApi.urlAddFavorite}` + `/${movieID}`, {
    //   crossDomain: true,
    //   method: "POST",
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer " + token,
    //   },
    // })
    axios({
      method: 'post',
      url:`${userApi.urlAddFavorite}` + `/${movieID}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
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


export const getUserFavoriteList = async (token) => {
  return new Promise((resolve, reject) => {
    fetch(userApi.urlFavorite, {
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

