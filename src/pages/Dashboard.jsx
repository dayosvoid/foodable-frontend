import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme'
import { GiHotMeal, GiMeal } from 'react-icons/gi'
import heroMeal from "../assets/a-plate-full-of-different-types-of-food-png.webp"
import EachFood from '../components/EachFood'
import { handleGetAllFood } from '../apiCalls/food'
import { toast } from 'sonner'
import { BarLoader } from 'react-spinners'
import CreateMeal from '../components/CreateMeal'
import { toggleCreateMealModal } from '../redux/modal'
import { CiMenuFries } from 'react-icons/ci'
import { IoClose, IoSunnySharp } from 'react-icons/io5'
import Ingredient from '../components/Ingredient'
import Footer from '../components/Footer'
import { FaMoon } from 'react-icons/fa'
import { removeFood, updateAllFood } from '../redux/food'

const Dashboard = () => {
    const mealsRef = useRef(null)
    const ingredientsRef = useRef(null)

    const handleScroll = (ref) => {
    setMenuOpen(false)
    setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100) // wait for menu to close before scrolling
}


    const [menuOpen,setMenuOpen] = useState(false)
    const [isLoading, setIsLoading]=useState(false)
    const { currentTheme } = useSelector(state => state.theme);
    // const [allFood, setAllFood] = useState([])

    const dispatch = useDispatch()
    const {allFood} = useSelector(state => state.food)
    const {createMealModal}= useSelector(state => state.modal)
    

    const GetAllFood = async()=>{
        try {
            setIsLoading(true)
            const response = await handleGetAllFood()
            if(response.success){
                // toast.success(response.message)
                dispatch(updateAllFood(response.allMeals))
                // dispatch(removeFood(response.allMeals))
                // setAllFood(response.allMeals)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        GetAllFood()
    },[])

    // mobile addMeal function
    const mobileAddMeal =()=>{
        setMenuOpen(false)
        dispatch(toggleCreateMealModal())
    }

    useEffect(() => {
    if (createMealModal || menuOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }

    return () => {
        document.body.style.overflow = 'unset'
    }
}, [createMealModal, menuOpen])
  return (
    <div className={`${currentTheme}`}>
      <div className='theme-bg-card'>
        {/* NAV */}
        <nav className='flex justify-between items-center py-5 container w-11/12 mx-auto'>
            {/* LEFT */}
            <div className='theme-text-standout md:w-50 lg:w-80 flex  gap-1 theme-text items-center text-xl md:text-2xl font-bold '>
                <span>
                    <GiHotMeal className='md:size-10 size-7 ' />
                </span>
                <h2 >Foodable</h2>
            </div>
            {/* MIDDLE */}
            <div className='hidden flex-1 justify-between text-gray-400 theme-text md:flex theme-text  text-lg font-semibold'>
                <button  onClick={() => mealsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'  })}>
                Your meals
                </button>

                {/* <button>
                    <a href="">Ingredient</a>
                </button> */}

                <button onClick={() => ingredientsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'  })}>
                    Ingredients
                </button>

                <button type='button' onClick={()=>dispatch(toggleCreateMealModal())}>
                    Add Meal
                </button>
            </div >
            {/* RIGHT */}
            <div onClick={()=>setMenuOpen(!menuOpen)}  className='theme-text-standout md:hidden'>
                {!menuOpen?<CiMenuFries className='size-5'/> :<IoClose className='theme-text-standout size-5' />  }

            </div>

             
            {/* <div className='flex flex-1 items-center justify-end'>
                <div>
                    <p>Welcome </p>
                </div>
                <div className='w-7 h-7 rounded-full bg-black'>
                    <img src="*" alt="" />
                </div>
            </div> */}
        </nav>

        <div className='w-full justify-end border-b-3 theme-lightgray'></div>


       {/* mobile menu */}

            {
                menuOpen && <div className='flex flex-col w-full theme-lightgray font-semibold gap-8 py-5 px-2 inset-0 z-50 h-screen fixed top-17 bg-black/50 backdrop-blur-md'>
                    <button onClick={()=>handleScroll(mealsRef)} className='text-start'>Your meals</button>
                    <button onClick={()=>handleScroll(ingredientsRef)} className='text-start'>Ingredients</button>
                    <button onClick={()=>mobileAddMeal()} className='text-start'>Add Meal</button>
            </div>
            }

                {
                    createMealModal &&  <CreateMeal GetAllFood={GetAllFood}/>
                }
       


        {/* HERO SECTION */}
        <div className='flex containter gap-5 justify-center py-4 w-11/12 mx-auto items-center'>
           <div className=''>
                <h1 className='text-4xl md:text-5xl text-gray-500 font-bold leading-tight mb-4'>
                    Your meals, <span className='theme-text-standout'>planned perfectly.</span>
                </h1>
                <p className='text-gray-500 font-medium text-lg max-w-md mb-8'>
                    Foodable helps you build-keep a weekly meal routine, track ingredients, and get personalised meal recommendations — all in one place.
                </p>
           </div>

            <div className='hidden md:flex justify-center'>
                <img src={heroMeal} alt="" />
            </div>
        </div>


        {/* MEAL TABLE SECTION */}

      </div>

        <div ref={mealsRef} className='h-80 md:min-h-100 py-5  overflow-y-auto theme-bg-surface '>
            <div className='container w-11/12 mx-auto gap-3 grid md:grid-cols-3 sm:grid-cols-2 space-x-0.5 place-items-center justify-items-center'>
                    {isLoading ? (
                    <div className='col-span-3 flex justify-center h-80 items-center w-full'>
                        <BarLoader className=''/>
                    </div>
                ) : allFood.length === 0 ? (
                    <p className='col-span-3 text-center text-gray-400 py-4'>No meals yet</p>
                ) : (
                    allFood.map((food) => <EachFood GetAllFood={GetAllFood} key={food._id} {...food} />)
                )}
            </div>
        </div>

        {/* Monthly Ingredient */}
        <Ingredient ref={ingredientsRef}/>
        <Footer/>

        <button
                  onClick={() => dispatch(toggleTheme())}
                  className='theme-bg-surface fixed bottom-6 right-6 z-50 p-3 text-white rounded-full shadow-2xl hover:scale-110 transition-all active:scale-90'
                >
                  {currentTheme === "light" ? <FaMoon size={24}/> : <IoSunnySharp size={24}/>}
            </button>
    </div>
  )
}

export default Dashboard
