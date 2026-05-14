import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from "../redux/theme"
import { FaMoon } from "react-icons/fa"
import { IoSunnySharp } from "react-icons/io5"
import { MdOutlineMailOutline } from 'react-icons/md'
import { TbPassword } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { handleLogin } from '../apiCalls/auth'

const Login = () => {
  const navigate = useNavigate()
  const { currentTheme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [formError, setFormError] = useState({})
  const [istouched, setIsTouched] = useState({ email: false, password: false })

  const validation = (data) => {
    let validatorError = {}
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
    return validatorError
  }

  useEffect(() => {
    const errors = validation(formData)
    setFormError(errors)
  }, [formData, istouched])

  const handleIsTouched = (e) => {
    const { name } = e.target
    setIsTouched({ ...istouched, [name]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsTouched({ email: true, password: true })
    const errors = validation(formData)
    if (Object.keys(errors).length > 0) {
      setFormError(errors)
      return
    }
    setIsLoading(true)
    try {
      const response = await handleLogin(formData)
      if (response.success) {
        localStorage.setItem('token', response.token)
        toast.success(response.message || "Welcome back!")
        navigate("/dashboard")
        return
      }
      toast.error(response?.message || "Login failed")
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={` ${currentTheme}`}>
      <div className='h-screen flex relative theme-text overflow-hidden'>

        <div className='theme-bg-surface h-full w-full transition-colors duration-500 flex md:items-center justify-start px-8 py-25'>
          <div className='container w-11/12 mx-auto'>
            <span className='items-center justify-center'>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Hello!</h1>
              <p className="opacity-70 md:text-xl">Welcome back to Foodable</p>
            </span>
          </div>
        </div>

        <div className='theme-bg-card w-full h-full flex flex-col md:justify-center space-y-3 z-10 absolute top-1/2 md:top-0 md:right-0 md:w-[60%] bottom-0 rounded-t-4xl md:rounded-t-none md:rounded-l-4xl shadow-2xl transition-colors duration-500 md:p-15 p-8'>
          <div className='container w-11/12 mx-auto'>
            <p className='font-semibold text-2xl md:text-3xl md:py-5 opacity-40'>Login</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

              <button type='submit' disabled={isLoading} className='theme-bg-surface py-2 md:py-3 rounded-full w-full my-2 disabled:opacity-50'>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className='w-full text-center mt-2'>
              <p className='font-semibold text-sm text-gray-500'>Don't have an account?
                <Link to='/register' className='text-lg px-2'>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className='theme-bg-surface fixed bottom-6 right-6 z-50 p-3 text-white rounded-full shadow-2xl hover:scale-110 transition-all active:scale-90'
        >
          {currentTheme === "light" ? <FaMoon size={24}/> : <IoSunnySharp size={24}/>}
        </button>

      </div>
    </div>
  )
}

export default Login