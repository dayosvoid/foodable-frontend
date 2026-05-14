import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'

const EachFood = () => {
   return (
    <div className='w-50 p-3 theme-bg-card'>
      <div>
        {/* days of the week */}
        <div className='flex justify-between p  p-2 '> 
            <span className='theme-text font-semibold '>
                <p>Monday</p>
            </span>
            <button>
                <IoIosAdd />
            </button>
        </div>

        {/* FOOD CONTENT */}
        <div className='flex bg-amber-200 rounded-md h-30 p-3 justify-between items-center'>
            <span>
                <p className='font-medium theme-text '>
                    jo;;of rice and chicken
                </p>
            </span>

            <span>
                <button>
                    <FaArrowRight />
                </button>
            </span>
        </div>

        <div  className='w-full flex justify-end py-2' >
            <button className='bg-gray-900 text-gray-400 font-semibold font-2xl rounded-2xl py-1 px-3'>
                Edit
            </button>
        </div>
      </div>
    </div>
  )
}

export default EachFood

