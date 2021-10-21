require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const movieApi={
  urlGetMovieType:`${url}/api/movie/type`,
  urlGetMovie:`${url}/api/movie`,
  
}
