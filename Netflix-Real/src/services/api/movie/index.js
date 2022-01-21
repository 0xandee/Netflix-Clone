import { movieApi } from './configUrl'

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

export const getRecommUserMoviesState1 = async (idUser) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetRecommendedUserMoviesState1 + idUser, {
      crossDomain: true,
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'

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

export const getRecommUserMoviesState2 = async (idUser) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetRecommendedUserMoviesState2 + idUser, {
      crossDomain: true,
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'

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

export const getRecommGroupMoviesState1 = async (idUser) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetRecommendedGroupMoviesState1 + idUser, {
      crossDomain: true,
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'

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

export const getMoviesByGenres = async (arrIdGenre, token, number) => {
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
        number
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

export const getMoviesByListID = async (arrIdMovies, token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetMoviesByListID, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        arr_id_movie: arrIdMovies

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

export const getMovieAPI = async (idMovie, token) => {
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

export const getMoviesByGenreAPI = async (genreId, token) => {
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

export const updateTimeWatched = async (id_movie, value_watched, token,) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlAddTimeWatched, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        id_movie,
        value: value_watched
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

export const addWatchingList = async (id_movie, value_watched, token,) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlAddWatchingList, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        id_movie,
        value: value_watched
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

export const updateMovieClicked = async (id_movie, token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlAddMovieClicked, {
      crossDomain: true,
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        id_movie,
        value: 1
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

export const getWatchingList = async (token) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetWatchingList, {
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