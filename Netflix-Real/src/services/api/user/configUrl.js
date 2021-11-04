require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const userApi={
  urlFavorite:`${url}/api/user/favourite-list`, 
}
