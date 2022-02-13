require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const userApi={
  urlAddFavorite:`${url}/api/user/favourite-list`,
  urlGetFavoriteList:`${url}/api/user/favourite-list`,
  urlFavorite:`${url}/api/user/favourite-list`, 
  
}
