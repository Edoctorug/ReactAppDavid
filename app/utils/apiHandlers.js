import axios from 'axios'

/**
 * The base api end point.
 */
const API_URL = 'http://172.20.10.5:8000/'


/**
 * Deafult configurations.
 */
const configurations = {
    headers: {
        'content-type': 'application/json',
        'accept': '*/*'
    }
}

/**
 * The function that processes and sets the configurations that we need for a request.
 * @param token The authenticarion token obtained on login or registration.
 */
const setConfig = token =>{
    const config = {
        ...configurations,
        headers: {
            ...headers,
            'Authorization': `Token ${token}`
        }
    }

    return config
}


 /**
 * The function that is responsible for handling get requests to the api end points
 * @param url The route path as spacified in the backend
 * @param token The optional token obtained from the backend after login or registration
 * @returns Promise.
 */
export const get = async(url, token = null) => {
    // Check if the token is passed then set an Authorization header in the request
    if(token){
        const config = setConfig(token)
        return await axios.get(API_URL+url, config)
    }

    // Else just sent an unauthenticated request to free resourse end points.
    return await axios.get(API_URL+url)
}

/**
 * The function responsible for handling all post request to the api handler
 * @param token The optional authenticarion token obtained on login or registration.
 * @param url The absolute route path as specified in the backend
 * @param body The data that is to be passed to api end point for processing.
 * @returns Promise.
 */
export const post = async(url, body, token=null) => {
    const destinationUrl = API_URL+url
    if(token){
        const config = setConfig(token)
        return await axios.post(destinationUrl, body, config)
    }

    return await axios.post(destinationUrl, body)
}
