require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const searchApi={
  urlSearch:`${url}/api/control/search`, 
}
