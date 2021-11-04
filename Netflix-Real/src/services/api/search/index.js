import { searchApi } from './configUrl'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const searchMovieByNameApi = async (movieName, callback) => {
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(searchApi.urlSearch + `/${movieName}`, requestOptions)
    .then(response => response.text())
    .then(result =>
      callback(JSON.parse(result))
    )
    .catch(error => {
      callback('error', error);
    })
}

