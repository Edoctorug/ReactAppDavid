import axios from 'axios'

const API_URL = 'http://192.168.0.113:8000'

export const login = async(username, password) => {
    console.log({username, password})
    try {
        const res = await axios.post('http://192.168.0.113:8000/auth/login/', {username, password}, {
            headers:{
                "content-type": "application/json",
            }
        })

        console.log(res.data)
    } catch (error) {
        if(error.response){
            console.log(error.response)
        }
        console.log(error.message)
    }
}