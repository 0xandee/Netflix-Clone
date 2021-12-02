require('dotenv').config();
//const url = process.env.REACT_APP_URL;
const url = 'http://localhost:9999';
export const movieApi={
  urlGetMovieType:`${url}/api/movie/type`,
  urlGetMovie:`${url}/api/movie`,
  urlPostNewUserMovies:`${url}/api/movie/movie-start`,
  urlGetMoviesByGenres:`${url}/api/movie/movie-start-type`,
}
