import { createContext, useEffect, useState } from "react";

export const RegisterFormContext = createContext({})

const FormProvider = ({children}) => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: '',
    })

    useEffect(()=>{
        // console.log(data)
    }, [data])
    return (
        <RegisterFormContext.Provider value={{
            data, setData
        }}>
            {children}
        </RegisterFormContext.Provider>
    )
}

export default FormProvider