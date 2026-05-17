import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateFood } from '../apiCalls/food';
import { toast } from 'sonner';
import { IoClose } from 'react-icons/io5';
import { toggleCreateMealModal } from '../redux/modal';


const CreateMeal = ({GetAllFood}) => {
    const { currentTheme } = useSelector(state => state.theme);
    const dispatch = useDispatch()
    const [isTouched, setIsTouched] = useState(false)
    const [formData, setFormData] = useState({name:"",day:null, mealPeriod:null})
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState({})
    

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const mealTime = ["Breakfast","Lunch","Dinner"]

    const validation = (data)=>{
        const validationError = {}
        if(data.name ===""){
            validationError.name = "meal name is required"
        }
        if(!data.day && data.day !== 0){
            validationError.day = "Day is required"
        }
        if(!data.mealPeriod && data.mealPeriod !== 0 ){
            validationError.mealPeriod= "meal period is required"
        }
        return validationError
    }

    useEffect(()=>{
        const errors = validation(formData)
        setError(errors)
    },[formData,isTouched])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        setIsTouched(true)
        const errors = validation(formData)
        setError(errors)
        if (Object.keys(errors).length > 0) {
        setError(errors)
        return }

        setIsLoading(true)
        try {
            const response = await handleCreateFood({...formData})
            if(response.success){
                dispatch(toggleCreateMealModal(false))
                await GetAllFood()
                toast.success(response.message)
                setIsLoading(false)
                setError({})
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }finally{
            setIsLoading(false)
            setFormData({name:"",day:null, mealPeriod:null})
        }
    }

  return (
    <div className='fixed inset-0 z-50 h-screen  bg-white/40 backdrop-blur-sm w-full flex justify-center items-center'>
            <div className={`${currentTheme} w-70 rounded-2xl `}>
                
                <form onSubmit={handleSubmit} className=' font-semibold text-4 rounded-md p-5 md:w-100 outline-none theme-lightgray flex flex-col theme-bg-card gap-6'>

                <div onClick={()=>dispatch(toggleCreateMealModal())} className=''>
                    <IoClose className='theme-text-standout size-5' />
                </div>

                    <label htmlFor="name" className='relative'>
                        <p className='font-semibold'>Food</p>
                        <span className='border rounded-full w-full px-3 py-1'>
                            <input
                            className='text-4 outline-none'
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value.trimStart()})}
                            />
                        </span>
                        {isTouched && error.name && <p className='text-red-500 text-xs absolute buttom-0 right-0'>{error.name}</p>}
                    </label>

                    <span className='relative w-full'>
                        <select name='day' className='theme-lightgray outline-none relative w-full' onChange={(e) => setFormData({...formData, day: Number(e.target.value)})}>
                            <option className='text-gray-500' value="">Select day</option>
                            {dayNames.map((day, index) => (
                                <option key={index} value={index}>{day}</option>
                            ))}
                        </select>
                    {isTouched && error.day && <p className='text-red-500 text-xs absolute  buttom-0 right-0'>{error.day}</p>}

                    </span>
                   <span className='relative w-full'>
                    <select className='theme-lightgray outline-none w-full' name='mealPeriod' onChange={(e) => setFormData({...formData, mealPeriod: Number(e.target.value)})}>
                        <option className='text-gray-500' value="">Select meal period</option>
                        {mealTime.map((period, index) => (
                            <option key={index} value={index}>{period}</option>
                        ))}
                    </select>
                    {isTouched && error.mealPeriod && <p className='text-red-500 text-xs absolute  buttom-0 right-0'>{error.mealPeriod}</p>}

                   </span>
                    <button type='submit' disabled={isLoading} className='theme-bg-surface rounded-full  w-40 py-2 self-end'>
                        {isLoading ? "Adding..." : "Add meal"}
                    </button>
                </form>
            </div>
        </div>
  )
}

export default CreateMeal
