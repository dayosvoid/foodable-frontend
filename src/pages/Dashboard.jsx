import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme'
import { GiHotMeal, GiMeal } from 'react-icons/gi'
import heroMeal from "../assets/a-plate-full-of-different-types-of-food-png.webp"
import EachFood from '../components/EachFood'

const Dashboard = () => {
    const { currentTheme } = useSelector(state => state.theme);
    const [allFood, setAllFood] = useState([])

    useEffect(()=>{
        
    },[])
  return (
    <div className={`${currentTheme}`}>
      <div className='theme-bg-card'>
        {/* NAV */}
        <nav className='flex justify-between items-center py-5 container w-11/12 mx-auto'>
            {/* LEFT */}
            <div className='theme-text-standout flex  gap-1 theme-text items-center text-xl md:text-2xl font-bold '>
                <span>
                    <GiHotMeal className='md:size-10 size-7 ' />
                </span>
                <h2 >Foodable</h2>
            </div>
            {/* MIDDLE */}
            <div className='hidden justify-between text-gray-400 theme-text md:flex theme-text  text-lg font-semibold'>
                <button>
                    <a href="">Meals</a>
                </button>

                <button>
                    <a href="">Ingredient</a>
                </button>

                <button>
                    <a href="">Recommend</a>
                </button>
            </div>
            {/* RIGHT */}
            <div className='flex items-center'>
                <div>
                    {/* <p>Welcome </p> */}
                </div>
                <div className='w-7 h-7 rounded-full bg-black'>
                    <img src="" alt="" />
                </div>
            </div>
        </nav>

        <div className='w-full border-b-3 theme-lightgray'></div>

        {/* HERO SECTION */}
        <div className='flex containter py-4 w-11/12 mx-auto items-center'>
           <div className='w-full'>
                <h1 className='text-4xl md:text-5xl text-gray-500 font-bold leading-tight mb-4'>
                    Your meals, <span className='theme-text-standout'>planned perfectly.</span>
                </h1>
                <p className='text-gray-500 font-medium text-lg max-w-md mb-8'>
                    Foodable helps you discover recipes, track ingredients, and get personalised meal recommendations — all in one place.
                </p>
           </div>

            <div className='hidden md:flex w-full'>
                <img src={heroMeal} alt="" />
            </div>
        </div>


        {/* MEAL TABLE SECTION */}

      </div>
      <EachFood/>
    </div>
  )
}

export default Dashboard
