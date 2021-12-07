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

export const getAllMovies = async (token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetMovie, {
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

export const getMoviesByGenres = async (arrIdGenre, token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetMoviesByGenres + `/[${arrIdGenre}]&30`, {
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

export const getMovieAPI = async (idMovie,token) => {
    return new Promise((resolve, reject) => {
      fetch(movieApi.urlGetMovie + `/${idMovie}`, {
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

export const getMovieTypeAPI = async (token) => {
    return new Promise((resolve, reject) => {
      fetch(movieApi.urlGetMovieType, {
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

export const getMoviesByGenreAPI = async (genreId,token) => {
    return new Promise((resolve, reject) => {
      fetch(movieApi.urlGetMovieType + `/${genreId}`, {
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