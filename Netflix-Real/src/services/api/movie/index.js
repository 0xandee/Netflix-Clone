import { movieApi } from './configUrl'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const getMovieAPI = async (idMovie, callback) => {

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(movieApi.urlGetMovie + `/${idMovie}`, requestOptions)
    .then(response => response.text())
    .then(result =>
      callback(JSON.parse(result))
    )
    .catch(error => {
      callback('error', error);
    })
}

export const getMovieTypeAPI = async (callback) => {

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(movieApi.urlGetMovieType, requestOptions)
    .then(response => response.text())
    .then(result =>
      callback(JSON.parse(result))
    )
    .catch(error => {
      callback('error', error);
    })
}
