import {axiosInstance} from "./index"

export const handleGetAllFood = async () => {
    const response = await axiosInstance.get('/api/foodable/food/getAll')
    return response.data
}

export const handleCreateFood = async({name,day,mealPeriod}) =>{
 const response = await axiosInstance.post("/api/foodable/food/create",{name,day,mealPeriod})
 return response.data
}