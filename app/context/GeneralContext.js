import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StateContext = createContext({})

const StateProvider = ({ children }) => {

    const [auth, setAuth] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        try {
            AsyncStorage.getItem('auth').then(e=>{
                setAuth(e)
                setLoading(false)
            })
        } catch (error) {
            setError(error)
        }
    }, [])
    
    const saveAuth = async(auth_data) => {
        if(auth_data.token && auth_data.user){
            try {
                await AsyncStorage.setItem('auth', JSON.stringify(auth_data))
            } catch (error) {
                setError(error)
            }

            setAuth(auth_data)
        }
    }

    const deleteAuth = async() => {
        try {
            await AsyncStorage.removeItem('auth')
        } catch (error) {
            setError(error)
        }
        setAuth(null)
    }

    return (
        <StateContext.Provider value={{
            auth, loading, saveAuth, deleteAuth, error
        }}>
            { children }
        </StateContext.Provider>
    )
}

export default StateProvider