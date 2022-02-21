import { requestAccessToken, requestRefreshToken } from '../../function';
import { requestLogout } from '../auth';
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
        'Authorization': `Bearer ${token}`,
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
  
  if (error.response.status == 401) {
    originalRequest._retry = true;
    const request_token_status = await requestRefreshToken();
    if (request_token_status === 200) {
      const access_token = await requestAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return instance(originalRequest);
    }
    else if (request_token_status == 401) {
      
      await requestLogout(localStorage.getItem('refresh_token'))
      localStorage.clear()
      document.location.href = '/signin'
    }
    else if (request_token_status === 500) {
      document.location.href = '/maintenance'
    }

    return instance(originalRequest);
  }
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const request_token_status = await requestRefreshToken();
    if (request_token_status === 200) {
      const access_token = await requestAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return instance(originalRequest);
    }
    else if (request_token_status === 401) {
      
      await requestLogout(localStorage.getItem('refresh_token'))
      localStorage.clear()
      document.location.href = '/signin'
    }
    else if (request_token_status === 500) {
      document.location.href = '/maintenance'
    }

    return instance(originalRequest);
  }
  else if(error.response.status === 500){
    document.location.reload(true)
  }
  return Promise.reject(error);
});


export const postNewUserMovies = async (dataNewUser, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: movieApi.urlPostNewUserMovies,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      data: {
        arr_id_movie: dataNewUser,

      }
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
    fetch(movieApi.urlGetRecommendedUserMoviesState1 + idUser + `&n_movie=100`, {
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
    fetch(movieApi.urlGetRecommendedUserMoviesState2 + idUser + `&n_movie=100&id_movie=${idMovie}&filter=genre`, {
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
    fetch(movieApi.urlGetRecommendedGroupMoviesState1 + idUser + `&n_movie=100`, {
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

export const getRecommGroupMoviesState2 = async (idUser, idMovie) => {
  return new Promise((resolve, reject) => {
    fetch(movieApi.urlGetRecommendedGroupMoviesState2 + idUser + `&n_movie=100&id_movie=${idMovie}`, {
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

export const getAllMovies = async () => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetMovie)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const getMoviesByGenres = async (arrIdGenre, number, token) => {
  return new Promise((resolve, reject) => {
    
    axios({
      method: 'post',
      url: movieApi.urlGetMoviesByGenres,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      data: {
        arr_id_type: arrIdGenre,
        number
      }
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
    axios({
      method: 'post',
      url: movieApi.urlGetMoviesByListID,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      data: {
        arr_id_movie: arrIdMovies,
      }
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const getMovieAPI = async (idMovie) => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetMovie + `/${idMovie}`)
      .then(response => {

        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const getMovieTypeAPI = async () => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetMovieType)
      .then(response => {
        resolve(response)
      })
      .catch(error => {

        return reject(error)
      });
  })
}

export const getMoviesByGenreAPI = async (genreId) => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetMovieType + `/${genreId}`)
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
    instance.post(movieApi.urlAddTimeWatched, {
      id_movie,
      value: value_watched
    }
    )
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const addWatchingList = async (id_movie, value_watched) => {
  return new Promise((resolve, reject) => {
    instance.post(movieApi.urlAddWatchingList, {
      id_movie,
      value: value_watched
    }
    )
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const updateMovieClicked = async (id_movie) => {
  return new Promise((resolve, reject) => {
    instance.post(movieApi.urlAddMovieClicked, {
      id_movie,
      value: 1
    }
    )
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

export const getWatchingList = async () => {
  return new Promise((resolve, reject) => {
    instance.get(movieApi.urlGetWatchingList
    )
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}


export const deleteWatchingList = async (idMovie) => {
  return new Promise((resolve, reject) => {
    instance.delete(movieApi.urlDeleteWatchingList + `/${idMovie}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}

//0: Dislike, 1: Like
export const isLikeOrDislike = async (idMovie, value) => {
  return new Promise((resolve, reject) => {
    instance.post(movieApi.urlIsLike, {
      idMovie,
      value: value
    }
    )
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}


export const updateMovieView = async (idMovie) => {
  return new Promise((resolve, reject) => {
    instance.post(movieApi.urlAddMovieCountView + `/${idMovie}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        return reject(error)
      });
  })
}
