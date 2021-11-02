import { userApi } from './configUrl'

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var myHeaderWithAuthorization = new Headers();
// myHeaderWithAuthorization.append("Content-Type", "application/json");
// myHeaderWithAuthorization.append("Authorization", "Bearer " + localStorage.getItem('access_token'));

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