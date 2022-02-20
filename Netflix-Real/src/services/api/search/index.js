import { searchApi } from './configUrl'
import { requestAccessToken, requestRefreshToken } from '../../function';
import { requestLogout } from '../auth';
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
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const request_token_status = await requestRefreshToken();
    if (request_token_status === 200) {
      const access_token = await requestAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return instance(originalRequest);
    }
    else if (request_token_status === 401) {
      // const dispatch = useDispatch()
      // dispatch(handleLogout())
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

export const searchMovieByNameApi = async (movieName) => {
    return new Promise((resolve, reject) => {
      instance.get(searchApi.urlSearch + `/${movieName}`)
        .then(response => {  
          resolve(response)
        })
        .catch(error => {
          return reject(error)
        });
    })
}

