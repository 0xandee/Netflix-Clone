import { searchApi } from './configUrl'


export const searchMovieByNameApi = async (movieName, token) => {
    return new Promise((resolve, reject) => {
      fetch(searchApi.urlSearch + `/${movieName}`, {
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

