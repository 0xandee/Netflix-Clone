require('dotenv').config();
const url = process.env.REACT_APP_URL;
const tempUrl = 'http://localhost:5000'
export const movieApi = {
  urlGetMovieType: `${url}/api/movie/type`,
  urlGetMovie: `${url}/api/movie`,
  urlPostNewUserMovies: `${url}/api/movie/movie-start`,
  urlGetMoviesByGenres: `${url}/api/movie/movie-some-type`,
  urlGetMoviesByListID: `${url}/api/movie/some-movie`,
  urlGetRecommendedUserMoviesState1: `${tempUrl}/individual/state1/?id_user=`,
  urlGetRecommendedUserMoviesState2: `${tempUrl}/individual/state2/?id_user=`,
  urlGetRecommendedGroupMoviesState1: `${tempUrl}/group/state1/?id_user=`,
  urlGetRecommendedGroupMoviesState2: `${tempUrl}/group/state2/?id_user=`,
  urlAddTimeWatched: `${url}/api/movie/add-time-watcher`,
  urlAddMovieClicked: `${url}/api/movie/is-clicked`,
  urlAddWatchingList: `${url}/api/movie/user-time-watch`,
  urlGetWatchingList: `${url}/api/movie/watching-list`,
  urlDeleteWatchingList: `${url}/api/movie/watching-list`,
  urlIsLike: `${url}/api/movie/is-like`,
  urlAddMovieCountView: `${url}/api/control/add-view-count`,
}
