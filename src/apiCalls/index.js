import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://foodable-backend-5gpw.onrender.com"
})

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})