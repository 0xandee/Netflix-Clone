import { userApi } from './configUrl'



export const getUserFavoriteList = async (access_token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + access_token);
  
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

