require('dotenv').config();
const url = process.env.REACT_APP_URL;

export const authApi = {
  urlRegister: `${url}/api/auth/register`,
  urlLogin: `${url}/api/auth/login`,
  urlLogout: `${url}/api/auth/logout`,
  urlCheckRefreshToken: `${url}/api/auth/refresh-token`,
  urlRefreshAccessToken: `${url}/api/auth/access-token`,
  urlChangePassword: `${url}/api/auth/change-pass`,
  urlForgotPassword: `${url}/api/auth/forgot-pass`,
  urlLogoutAllUser: `${url}/api/auth/logout-all-user`,
  urlVerifyEmail: `${url}/api/auth/verify-email`,
  urlProfile: `${url}/api/auth/profile`,
  urlDetectDevice:`${url}/api/control/count-device`,
}
