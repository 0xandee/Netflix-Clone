import { to_Decrypt } from "../aes256"
import { checkRefreshToken, getAccessToken, requestLogin } from "../api/auth"


export const getToken = () => { return localStorage.getItem('access_token') }
export const requestRefreshToken = async () => {
    try {
      const response = await checkRefreshToken(localStorage.getItem('refresh_token'))
      console.log("🚀 ~ file: index.js ~ line 8 ~ resetRefreshToken ~ response", response)
      return response.status
    }
    catch {
      return 'error'
    }
  
  }

export const requestAccessToken = async () => {
    try {
      const response = await getAccessToken(localStorage.getItem('refresh_token'))
      console.log("🚀 ~ file: index.js ~ line 8 ~ resetAccessToken ~ resetAccessToken", response)
  
      localStorage.setItem('access_token',response.accessToken)
      return response.accessToken
    }
    catch {
      return 'errors'
    }
  
  }
