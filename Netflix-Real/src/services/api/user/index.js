import { userApi } from './configUrl'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const favMoviePost = movieID => {
  return dispatch => {
    return fetch(`${userApi.urlAddFavorite}` + `/${movieID}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {}
      else {
        console.log("data.message", data.message);
        console.log("Bearer " + localStorage.getItem('access_token'));
      }
      })
    }
  }


export const getUserFavoriteList = async (access_token, callback) => {
  myHeaders.append("Authorization", "Bearer "+ access_token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(userApi.urlFavorite, requestOptions)
    .then(response => response.text())
    .then(result =>
      callback(JSON.parse(result))
    )
    .catch(error => {
      callback('error', error);
    })
}

