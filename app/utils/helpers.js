import * as ImagePicker from 'expo-image-picker';
import { post } from './apiHandlers'

/**
 * The function that validates the email, checking for '@' and '.'
 * @param { string } email 
 * @returns valid email or error
 */
export const validateEmail = (email) => {
    if(!email.includes('@') || !email.includes('.') || email.length < 5){
        return {
            error: 'Invalid email address'
        }
    }

    return {email}
}

/**
 * The function that validates the password and checks if the two passwords matched.
 * @param { string } password1 
 * @param { string } password2
 * @returns valid password or error
 */
export const validatedPassword = (password1='', password2='') => {
    if(password1.length < 6){
        return {
            error: 'Too short password'
        }
    }
    if(password1 !== password2){
        return {
            error: "Passwords don't match"
        }
    }

    return {
        password: password2
    }
}

/**
 * This function helps in picking the image from the device library.
 * We first import the module
 * @param success A function to be run when the image is successifully selected.
 * @param fail A function to be run when the image is not selected.
 * 
 */
export const pickImageAsync = async (success, fail) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: 'All'
    });

    if (!result.canceled) {
      success(result.assets[0])
    } else {
      fail('You did not select any image.');
    }
};

export const uploadImage = (file) => {
    const formData = new FormData

    if(!file){ return null }

    formData.append('lisence', {
      name: file.fileName || 'image.png',
      type: file.type,
      uri: file.uri
    })

    return formData
  }

/**
 * The function that is responsible for handling the login functinality.
 * @param username
 * @param password
 */
export const login = async(username, password) => {
    // convert the data in the format required by the API end point.
    const data = {
        email_or_username: username,
        password
    }
    try {
        const res = await post('auth/login/', data)
        
        return res.data
    } catch (error) {
        if(error.response){
            throw new Error(`Login failed, ${JSON.stringify(error.response.data)}`)
        }
        console.log(error.message)
    }
}


/**
 * The function that is responsible for handling the user registration functinality.
 * @param data
 */
export const register = async(data) => {
    try {
        const res = await post('auth/signup/', data, null, 'multipart/form-data')
        
        return res.data
    } catch (error) {
        if(error.response){
            console.log(`Registration failed, ${JSON.stringify(error.response.data)}`)
        }
        console.log('Error ', error.message)
    }
}



