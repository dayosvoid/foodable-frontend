import axios from "axios"

export const axiosInstance = axios.create({
   VITE_API_URL:import.meta.env.BASE_URL
})

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/' // redirect to login
        }
        return Promise.reject(error)
    }
)