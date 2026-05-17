import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { IoClose } from 'react-icons/io5'
import { toggleUpdateMealModal } from '../redux/modal'
import { handleGetAllFood, handleUpdateFood } from '../apiCalls/food'

const UpdateMeal = ({ meal, onClose, GetAllFood }) => {
    const { currentTheme } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const [isTouched, setIsTouched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({
        name: meal.name,
        day: meal.day,
        mealPeriod: meal.mealPeriod
    })

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const mealTime = ["Breakfast", "Lunch", "Dinner"]

    const validation = (data) => {
        const validationError = {}
        if (!data.name) validationError.name = "Meal name is required"
        if (data.day === null || data.day === undefined) validationError.day = "Day is required"
        if (data.mealPeriod === null || data.mealPeriod === undefined) validationError.mealPeriod = "Meal period is required"
        return validationError
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsTouched(true)
        const errors = validation(formData)
        if (Object.keys(errors).length > 0) {
            setError(errors)
            return
        }

        setIsLoading(true)
        try {
            const response = await handleUpdateFood(meal._id, {...formData})
            if (response.success) {
                toast.success(response.message)
                 await GetAllFood()
                onClose()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    } // ✅ handleSubmit closed here

    return (
        <div className='fixed inset-0 z-50 h-screen bg-white/40 backdrop-blur-sm w-full flex justify-center items-center'>
            <div className={`${currentTheme} w-70 rounded-2xl`}>
                <form onSubmit={handleSubmit} className='font-semibold rounded-md p-5 md:w-100 outline-none flex flex-col theme-bg-card gap-6'>

                    <div onClick={(e) => { e.stopPropagation(); onClose() }} className='cursor-pointer'>
                        <IoClose className='theme-text-standout size-5'/>
                    </div>

                    <label htmlFor="name" className='relative'>
                        <p className='font-semibold'>Food</p>
                        <span className='border rounded-full w-full px-3 py-1 flex'>
                            <input
                                type="text"
                                className='outline-none bg-transparent w-full'
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value.trimStart()})}
                            />
                        </span>
                        {isTouched && error.name && <p className='text-red-500 text-xs absolute bottom-0 right-0'>{error.name}</p>}
                    </label>

                    <span className='relative w-full'>
                        <select
                            name='day'
                            className='outline-none w-full theme-bg-card theme-text'
                            value={formData.day}
                            onChange={(e) => setFormData({...formData, day: Number(e.target.value)})}
                        >
                            {dayNames.map((day, index) => (
                                <option key={index} value={index}>{day}</option>
                            ))}
                        </select>
                        {isTouched && error.day && <p className='text-red-500 text-xs absolute bottom-0 right-0'>{error.day}</p>}
                    </span>

                    <span className='relative w-full'>
                        <select
                            name='mealPeriod'
                            className='outline-none w-full theme-bg-card theme-text'
                            value={formData.mealPeriod}
                            onChange={(e) => setFormData({...formData, mealPeriod: Number(e.target.value)})}
                        >
                            {mealTime.map((period, index) => (
                                <option key={index} value={index}>{period}</option>
                            ))}
                        </select>
                        {isTouched && error.mealPeriod && <p className='text-red-500 text-xs absolute bottom-0 right-0'>{error.mealPeriod}</p>}
                    </span>

                    <button type='submit' disabled={isLoading} className='theme-bg-surface rounded-full w-40 py-2 self-end'>
                        {isLoading ? "Updating..." : "Update meal"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateMeal