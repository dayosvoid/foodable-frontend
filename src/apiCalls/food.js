import {axiosInstance} from "./index"

export const handleGetAllFood = async () => {
    const response = await axiosInstance.get('/api/foodable/food/getAll')
    return response.data
}

export const handleCreateFood = async({name,day,mealPeriod}) =>{
 const response = await axiosInstance.post("/api/foodable/food/create",{name,day,mealPeriod})
 return response.data
}

export const handleUpdateFood = async (id, data) => {
    const response = await axiosInstance.patch(`/api/foodable/food/update/${id}`, data)
    return response.data
}

export const handleDeleteFood =async(id)=>{
    const response = await axiosInstance.patch(`/api/foodable/food/delete/${id}`, data)
    return response.data
}