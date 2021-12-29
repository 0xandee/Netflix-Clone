import { userApi } from './configUrl'


export const favMoviePost = (movieID, token) => {
  return new Promise((resolve, reject) => {
    fetch(`${userApi.urlAddFavorite}` + `/${movieID}`, {
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

