import { resetToken } from '../../function';
import { movieApi } from './configUrl'
const axios = require('axios');
const instance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = { 
        'Authorization':  `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  console.log("🚀 ~ file: index.js ~ line 28 ~ instance.interceptors.response.use ~ originalRequest", originalRequest)
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await resetToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return instance(originalRequest);
  }
  return Promise.reject(error);
});

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

export const getRecommUserMoviesState2 = async (idUser, idMovie) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetRecommendedUserMoviesState2 + idUser + `&id_movie=${idMovie}`, {
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
    instance.get(movieApi.urlGetMovieType
      //   , {

      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': "Bearer " + token,
      //   },
      // }
    )
      .then(response => {
        console.log("🚀 ~ file: index.js ~ line 240 ~ returnnewPromise ~ response", response)
        resolve(response)
      })
      .catch(error => {
        console.log("🚀 ~ file: index.js ~ line 224 ~ returnnewPromise ~ error", error)
        return reject(error)
      });
  })
}

export const getMoviesByGenreAPI = async (genreId, token) => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetMovieType + `/${genreId}`
    // , {
    //   crossDomain: true,
    //   method: "GET",
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer " + token,
    //   },
    // }
    )
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

