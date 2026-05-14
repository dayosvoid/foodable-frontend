import {axiosInstance} from "./index"

const handleGetAllFood = async()=>{
    const response = axiosInstance("")
    return response.data
}