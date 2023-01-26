
import { useReducer } from "react"


export const useForm = (formData) => {
    return  useReducer((state, action)=>({
        ...state, 
        ...action
    }), 
    formData)
}