import { movieApi } from './configUrl'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const postNewUserMovies = async (dataNewUser, token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlPostNewUserMovies, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        arr_id_movie: dataNewUser,

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

export const getAllMovies = async () => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetMovie, {
      crossDomain: true,
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
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

export const getMoviesByGenres = async (arrIdGenre, token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetMoviesByGenres, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        arr_id_type: arrIdGenre,
        number:30
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

export const getMoviesByTypeAPI = async (genreId, callback) => {
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(movieApi.urlGetMovieType + `/${genreId}`, requestOptions)
    .then(response => response.text())
    .then(result =>
      callback(JSON.parse(result))
    )
    .catch(error => {
      callback('error', error);
    })
}