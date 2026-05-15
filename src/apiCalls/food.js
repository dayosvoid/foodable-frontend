import {axiosInstance} from "./index"

export const handleGetAllFood = async () => {
    const response = await axiosInstance.get('/api/foodable/food/getAll')
    return response.data
}