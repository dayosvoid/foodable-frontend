import axios from "axios"
import {axiosInstance} from "./index"

export const handleRegister = async (userData) => {
    const response = await axiosInstance.post("/api/foodable/user/register", userData)
    return response.data
}

export const handleLogin = async(userData)=>{
        const response = await axiosInstance.post("/api/foodable/user/login",userData)
        return response.data
}