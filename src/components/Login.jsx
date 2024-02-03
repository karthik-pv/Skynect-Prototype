import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

const Login = () => {
    return (
        <div className='bg-white text-black m-20 p-5'>
            <span className='text-2xl tracking-widest font-inconsolata font-extrabold'>Login</span>
            <div className='font-inconsolata flex flex-col my-5'>
                <label for='phone'>Phone</label>
                <div className='border border-black flex'>
                    <select>
                        <option defaultChecked>+91</option>
                    </select>
                    <input type='tel' id='phone' pattern="[789][0-9]{9}" className='text-black outline-none py-1 px-2 w-full tracking-widest' />
                </div>
            </div>
            <div className='font-inconsolata flex flex-col'>
                <label for='password'>Password</label>
                <input type='password' id='password' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' />
            </div>
            <div className='my-5'>
                <button className='font-inconsolata flex items-center bg-black text-white border-2 py-1 px-8'>
                    Sign in
                    <MdOutlineKeyboardArrowRight size={25} />
                </button>
            </div>
        </div>
    )
}

export default Login