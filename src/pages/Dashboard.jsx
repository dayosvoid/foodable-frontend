import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme'
import { GiHotMeal, GiMeal } from 'react-icons/gi'
import heroMeal from "../assets/a-plate-full-of-different-types-of-food-png.webp"
import EachFood from '../components/EachFood'
import { handleGetAllFood } from '../apiCalls/food'
import { toast } from 'sonner'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {
    const [isLoading, setIsLoading]=useState(false)
    const { currentTheme } = useSelector(state => state.theme);
    const [allFood, setAllFood] = useState([])

    const GetAllFood = async()=>{
        try {
            setIsLoading(true)
            const response = await handleGetAllFood()
            if(response.success){
                toast.success(response.message)
                console.log(response.allMeals)
                setAllFood(response.allMeals)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            setIsLoading(false)
        } finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        GetAllFood()
    },[])
  return (
    <div className={`${currentTheme}`}>
      <div className='theme-bg-card'>
        {/* NAV */}
        <nav className='flex justify-between items-center py-5 container w-11/12 mx-auto'>
            {/* LEFT */}
            <div className='theme-text-standout flex-1 flex  gap-1 theme-text items-center text-xl md:text-2xl font-bold '>
                <span>
                    <GiHotMeal className='md:size-10 size-7 ' />
                </span>
                <h2 >Foodable</h2>
            </div>
            {/* MIDDLE */}
            <div className='hidden px-10 w-full justify-between text-gray-400 theme-text md:flex theme-text  text-lg font-semibold'>
                <button>
                    <a href="">Meals</a>
                </button>

                <button>
                    <a href="">Ingredient</a>
                </button>

                <button>
                    <a href="">Recommend</a>
                </button>

                <button>
                    <a href="">Add Meal</a>
                </button>
            </div>
            {/* RIGHT */}
            <div className='flex flex-1 items-center justify-end'>
                <div>
                    {/* <p>Welcome </p> */}
                </div>
                <div className='w-7 h-7 rounded-full bg-black'>
                    {/* <img src="*" alt="" /> */}
                </div>
            </div>
        </nav>

        <div className='w-full border-b-3 theme-lightgray'></div>

        {/* HERO SECTION */}
        <div className='flex containter justify-center py-4 w-11/12 mx-auto items-center'>
           <div className='flex-1'>
                <h1 className='text-4xl md:text-5xl text-gray-500 font-bold leading-tight mb-4'>
                    Your meals, <span className='theme-text-standout'>planned perfectly.</span>
                </h1>
                <p className='text-gray-500 font-medium text-lg max-w-md mb-8'>
                    Foodable helps you discover recipes, track ingredients, and get personalised meal recommendations — all in one place.
                </p>
           </div>

            <div className='hidden md:flex flex-1 justify-center'>
                <img src={heroMeal} alt="" />
            </div>
        </div>


        {/* MEAL TABLE SECTION */}

      </div>

        <div className='md:h-80 h-100 py-5 overflow-y-auto theme-bg-surface '>
            <div className='container w-11/12 mx-auto gap-3 grid md:grid-cols-3 place-items-center justify-items-center'>
                    {isLoading ? (
                    <div className='col-span-3 flex justify-center items-center w-full'>
                        <BarLoader className=''/>
                    </div>
                ) : allFood.length === 0 ? (
                    <p className='col-span-3 text-center text-gray-400 py-4'>No meals yet</p>
                ) : (
                    allFood.map((food) => <EachFood key={food._id} {...food} />)
                )}
            </div>
        </div>
    </div>
  )
}

export default Dashboard
