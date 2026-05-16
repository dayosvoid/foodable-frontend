import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'

const EachFood = ({name,day,mealPeriod}) => {
    const dayName = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const mealTime = ["breakfast", "lunch", "dinner"]

   return (
    <div className='w-50 md:w-70 p-3 theme-bg-card theme-lightgray rounded-sm'>
      <div>
        {/* days of the week */}
        <div className='flex justify-between items-center w-full py-2 '> 
            <span className='theme-text font-semibold '>
                <p>{dayName[day]}</p>
            </span>
            <button className=''>
                <IoIosAdd className='size-7'/>
            </button>
        </div>

        {/* FOOD CONTENT */}
        <div className='flex theme-bg-surface rounded-md h-30 p-3 justify-between items-center'>
            <span>
                <p className='font-bold theme-text '>
                   {name}
                </p>
            </span>

            <span>
                <button>
                    <FaArrowRight />
                </button>
            </span>
        </div>

        <div  className='w-full flex justify-between py-2' >
            <div className='font-medium theme-lightgray px-3 py-1 rounded-full'>
                <p>{mealTime[mealPeriod]}</p>
            </div>
            <button className='bg-gray-900 text-gray-400 font-semibold font-2xl rounded-2xl py-1 px-3'>
                Edit
            </button>
        </div>
      </div>
    </div>
  )
}

export default EachFood

