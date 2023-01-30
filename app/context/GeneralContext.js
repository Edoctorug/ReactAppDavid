import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = createContext({})

const StateProvider = ({ children }) => {

    const [auth, setAuth] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        AsyncStorage.getItem('auth').then(e=>{
            setAuth(e)
            setLoading(false)
        })
    }, [])
    
    useEffect(()=>{
        if(!loading){
            console.log(auth)
        }
    },[loading])

    return (
        <Context.Provider value={{
            auth, loading
        }}>
            { children }
        </Context.Provider>
    )
}

export default StateProvider