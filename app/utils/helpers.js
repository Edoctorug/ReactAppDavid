export const validateEmail = (email='') => {
    if(!email.includes('@') || !email.includes('.') || email.length < 5){
        return {
            error: 'Invalid email address'
        }
    }

    return {email}
}

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

