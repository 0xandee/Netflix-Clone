import { to_Decrypt } from "../aes256"
import { requestLogin } from "../api/auth"

export const getToken = () => { return localStorage.getItem('access_token') }
export const resetToken = async () => {
    try {
        const response = await requestLogin(to_Decrypt(localStorage.getItem('email')), to_Decrypt(localStorage.getItem('password')))
        console.log("🚀 ~ file: index.js ~ line 8 ~ resetToken ~ response", response)
        if (response.status === 200) {
            const data = await response.json()
            localStorage.setItem('access_token', data.accessToken);
        }
        return localStorage.getItem('access_token')
    }
    catch {
        return localStorage.getItem('access_token')
    }

}
