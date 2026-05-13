import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme";
import { FaLock, FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { MdOutlineMailOutline } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { TbPassword } from 'react-icons/tb';

const Login = () => {
  const { currentTheme } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <div className={currentTheme}>
      {/* Container wrapper with theme transition */}
      <div className='h-screen relative theme-text overflow-hidden'>
        
        {/* Main Background Section */}
        <div className='theme-bg-surface h-full w-full transition-colors duration-500 flex items-cente justify-start px-8 py-10'>
            {/* You can add a logo or illustration here */}
            <span className='items-center justify-center'>
                <h1 className="text-3xl font-bold mb-2">Hello!</h1>
                <p className="opacity-70">Welcome to foodable</p>
            </span>
        </div>
        
        {/* Login Card Section */}
        <div className='theme-bg-card space-y-3 z-10 h-80 w-full fixed top-30 bottom-0 rounded-t-4xl shadow-2xl transition-colors duration-500 p-8'>
            {/* Form inputs would go here */}
            <p className='font-semibold text-2xl opacity-40' >Login</p>

            <form className='flex flex-col gap-4'>
                {/* email */}
                <label htmlFor="" className='text-sm space-y-1'>
                    <p className='text-xm px-2'>Email</p>
                    <span className='outline-2 w-full rounded-full py-1 px-3 flex items-center gap-1'>
                        <span>
                            <MdOutlineMailOutline  className='opacity-60'/>
                        </span>
                        <input type="text" className='outline-none text-16px bg-transparent '/>
                    </span>
                </label>

                {/* password */}
                <label htmlFor="" className='text-sm space-y-1'>
                    <p className='text-xm px-2'>Password</p>
                    <span className='outline-2 w-full rounded-full py-1 px-3 flex items-center gap-1'>
                        <span>
                            <TbPassword className='opacity-60'/>
                        </span>
                        <input type="text" className='outline-none text-16px bg-transparent '/>
                    </span>
                </label>

                <button className='theme-bg-surface py-1.5 rounded-full w-full my-2'>
                    Login
                </button>
            </form>
        </div>

        {/* Floating Theme Toggle Button */}
        <button 
          onClick={() => dispatch(toggleTheme())} 
          className='theme-bg-surface fixed bottom-6 right-6 z-50 p-3 text-white rounded-full shadow-2xl hover:scale-110 transition-all active:scale-90'
        >
          {currentTheme === "light" ? <FaMoon size={24}/> : <IoSunnySharp size={24} /> }
        </button>

      </div>
    </div>
  );
};

export default Login;