import axios from 'axios'

const API_URL = 'http://192.168.0.114:8000/'

export const login = async(username, password) => {
    const data = {
        email_or_username: username,
        password
    }
    try {
        const res = await axios.post(`${API_URL}auth/login/`, data)
        
        return res.data
    } catch (error) {
        if(error.response){
            throw new Error(`Login failed, ${JSON.stringify(error.response.data)}`)
        }
        console.log(error.message)
    }
}