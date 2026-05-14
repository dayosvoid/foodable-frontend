import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { MdOutlineMailOutline } from 'react-icons/md';
import { TbPassword } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { handleRegister } from '../apiCalls/auth';


const RegisterPage = () => {
    const navigate = useNavigate()
    const { currentTheme } = useSelector(state => state.theme);
    const dispatch = useDispatch();

//    form validation
const [isLoading, setIsLoading] = useState(false)
   const [formData, setFormData] = useState({name:"", email:"",password:"",confirmPassword:""})
   const [formError, setFormError]= useState("")
   const [istouched,setIsTouched] = useState({name:false,email:false,password:false, confirmPassword:false})

   const validation = (data) => {
  let validatorError = {}

  if (!data.name) {
    validatorError.name = "Name is required"
  }

  if (!data.email) {
    validatorError.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    validatorError.email = "Enter a valid email"
  }

  if (!data.password) {
    validatorError.password = "Password is required"
  } else if (data.password.length < 6) {
    validatorError.password = "Password must be at least 6 characters"
  }

  if (!data.confirmPassword) {
    validatorError.confirmPassword = "Please confirm your password"
  } else if (data.password !== data.confirmPassword) {
    validatorError.confirmPassword = "Passwords do not match"
  }

  return validatorError
}


 useEffect(()=>{
    const errors = validation(formData)
    setFormError(errors)
 },[formData,istouched])


 const handleIsTouched = (e)=>{
    const {name} = e.target
    setIsTouched({...istouched,[name]:true})
 }

 const handleSubmit = async(e) => {
  e.preventDefault()
  setIsTouched({name:true, email:true, password:true, confirmPassword:true})
  const errors = validation(formData)
  if (Object.keys(errors).length > 0) {
    setFormError(errors)
    return
  }

  const { confirmPassword, ...dataToSend } = formData
  // proceed with API call
  setIsLoading(true)
  try {
     const response = await handleRegister({...dataToSend})
     if(response.success){
        toast.success("Welcome to Foodable!")
        navigate("/")
        return
    }
    const message = response?.message || "Registration failed"
    console.log(message)
    toast.error(message)
} catch (error) {
    const message = error.response?.data?.message || "Registration failed"
    toast.error(message)
} finally {
    setIsLoading(false)
}}


   return (
            <div className={` ${currentTheme}`}>
                {/* Container wrapper with theme transition */}
                <div className='h-screen flex relative theme-text overflow-hidden'>
                    
                    {/* Main Background Section */}
                    <div className='theme-bg-surface h-full w-full transition-colors duration-500 flex md:items-center justify-start px-8 py-25'>
                        <div className='container w-11/12 mx-auto'>
                            {/* You can add a logo or illustration here */}
                            <span className='items-center justify-center'>
                                <h1 className="text-3xl md:text-5xl  font-bold mb-2">Hey!</h1>
                                <p className="opacity-70 md:text-xl">Welcome to Foodable</p>
                            </span>

                        </div>
                    </div>
                    
                    {/* Login Card Section */}
                    <div className='theme-bg-card h-full w-full flex flex-col md:justify-center space-y-3 z-10 absolute top-60 md:top-0 md:right-0 md:w-[60%] bottom-0 rounded-t-4xl md:rounded-t-none md:rounded-l-4xl shadow-2xl transition-colors duration-500 md:p-15 p-8'>

                    <div className='container w-11/12 mx-auto'>
                        {/* Form inputs would go here */}
                            <p className='font-semibold text-2xl md:py-4 opacity-40' >Sign Up</p>
            
                            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                {/* name */}
                                <label htmlFor="" className='text-sm space-y-1 relative'>
                                    <p className='text-xm px-2'>Name</p>
                                    <span className='outline-2 w-full  rounded-full py-1 px-3 flex items-center gap-1'>
                                        <span>
                                            <MdOutlineMailOutline  className='opacity-60'/>
                                        </span>
                                        <input type="text" name='name' value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} onBlur={handleIsTouched} className='outline-none text-16px bg-transparent '/>
                                        {istouched.name && formError.name && (
                                                <p className='text-red-500 text-xs px-2 font-semibold absolute left-0 top-full text-nowrap'>{formError.name}</p>
                                        )}
                                    </span>
                                </label>
                                {/* email */}
                                <label htmlFor="" className='text-sm space-y-1 relative'>
                                    <p className='text-xm px-2'>Email</p>
                                    <span className='outline-2 w-full rounded-full py-1 px-3 flex items-center gap-1'>
                                        <span>
                                            <MdOutlineMailOutline  className='opacity-60'/>
                                        </span>
                                        <input type="text" name='email' value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} onBlur={handleIsTouched} className='outline-none text-16px bg-transparent '/>
                                        {istouched.email && formError.email && (
                                                <p className='text-red-500 text-xs px-2 font-semibold absolute left-0 top-full text-nowrap'>{formError.email}</p>
                                        )}
                                    </span>
                                </label>
            
                                {/* password */}
                                <label htmlFor="" className='text-sm space-y-1 relative'>
                                    <p className='text-xm px-2'>Password</p>
                                    <span className='outline-2 w-full rounded-full py-1 px-3 flex items-center gap-1'>
                                        <span>
                                            <TbPassword className='opacity-60'/>
                                        </span>
                                        <input type="text" name='password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} onBlur={handleIsTouched} className='outline-none text-16px bg-transparent '/>
                                        {istouched.password && formError.password && (
                                            <p className='text-red-500 text-xs px-2 font-semibold absolute left-0 top-full text-nowrap'>{formError.password}</p>
                                        )}
                                    </span>
                                </label>
                                
            
                                {/* Comfirm password */}
                                <label htmlFor="" className='text-sm space-y-1 relative'>
                                    <p className='text-xm px-2'>Confirm Password</p>
                                    <span className='outline-2 w-full rounded-full py-1 px-3 flex items-center gap-1'>
                                        <span>
                                            <TbPassword className='opacity-60'/>
                                        </span>
                                        <input type="text" name='confirmPassword' value={formData.confirmPassword} onChange={(e)=>setFormData({...formData, confirmPassword:e.target.value})} onBlur={handleIsTouched} className='outline-none text-16px bg-transparent '/>
                                            {istouched.confirmPassword && formError.confirmPassword && (
                                                <p className='text-red-500 text-xs px-2 font-semibold absolute left-0 top-full text-nowrap'>{formError.confirmPassword}</p>
                                            )}
                                    </span>
                                </label>
                                {/* submittion button */}
                                <button type='submit' disabled={isLoading} className='theme-bg-surface py-2 md:py-3 rounded-full w-full my-2'>
                                    {isLoading ? "Signing up..." : "Sign Up"}
                                </button>
                            </form>
                        </div>
        
                        <div  className='w-full'>
                            <span  className='w-full text-center'>
                                <p className='font-semibold text-sm text-gray-500'>You already have an account?<Link to={"/"} className='text-lg px-2'>Login</Link></p>
                            </span>
                        </div>
                    </div>
        
                    {/* Floating Theme Toggle Button */}
                    <button 
                    onClick={() => dispatch(toggleTheme())} 
                    className='theme-bg-surface fixed bottom-6 right-6 z-50 p-3 text-white rounded-full shadow-2xl hover:scale-110 transition-all active:scale-90'
                    >
                    {currentTheme === "light" ? <FaMoon size={24}/> : <IoSunnySharp size={24} /> }
                    </button>
        
                </div>
     
     
             {/* desktop view */}
     
         </div>
   );
 };

export default RegisterPage
