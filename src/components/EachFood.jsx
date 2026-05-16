import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import UpdateMeal from './UpdateMeal'
import { IoClose } from 'react-icons/io5'
import { handleDeleteFood } from '../apiCalls/food'

const EachFood = ({ _id, name, day, mealPeriod }) => {
    const [showUpdate, setShowUpdate] = useState(false)
    const dayName = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const mealTime = ["breakfast", "lunch", "dinner"]


    const handleDelete = async (id) => {
    try {
        const response = await handleDeleteFood(id)
        if (response.success) {
            toast.success(response.message)
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
    }
}
   return (
    <div className='w-50 md:min-w-55 p-3 theme-bg-card theme-lightgray rounded-sm'>
      <div>
        {/* days of the week */}
        <div className='flex justify-between items-center w-full py-2 '> 
            <span className='theme-text font-semibold '>
                <p>{dayName[day]}</p>
            </span>
            {/* add button */}
            {/* <button onClick={()=>handleDelete(_id)} className='text-red-400'>
                <IoClose className='size-7 hover:cursor-pointer'/>
            </button> */}
        </div>

        {/* FOOD CONTENT */}
        <div className='flex theme-bg-surface rounded-md h-30 p-3 justify-between items-center'>
            <span>
                <p className='font-bold theme-text '>
                   {name}
                </p>
            </span>

            <span>
                {/* <button>
                    <FaArrowRight />
                </button> */}
            </span>
        </div>

        <div  className='w-full flex justify-between py-2' >
            <div className='font-medium theme-lightgray px-3 py-1 rounded-full'>
                <p>{mealTime[mealPeriod]}</p>
            </div>
            <button onClick={()=>setShowUpdate(true)} className='bg-gray-900 text-gray-400 font-semibold font-2xl rounded-2xl py-1 px-3'>
                Edit
            </button>
        </div>
      </div>
      

      {showUpdate && (
                <UpdateMeal
                    meal={{ _id, name, day, mealPeriod }}
                    onClose={() => setShowUpdate(false)}
                />
                    )}
    </div>
  )
}

export default EachFood

