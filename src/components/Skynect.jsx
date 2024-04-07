import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Link, useLocation } from 'react-router-dom'

const Skynect = () => {

    const location = useLocation()

    return (
        <div className='flex flex-col items-center justify-center m-10 w-1/2 gap-10'>
            <div className='flex flex-col items-center justify-center'>
                <span className='text-6xl tracking-widest font-inconsolata capitalize'>SKYNECT</span>
                <div>
                    <TypeAnimation
                        sequence={[
                            'Be Limitless',
                            1000,
                            'Be Connected',
                            1000,
                            'Be Skynect',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '2em', fontFamily: 'Inconsolata', fontWeight: 'lighter' }}
                        repeat={Infinity}
                    />
                </div>
            </div>
            <div>
                {
                    location.pathname === '/onboard' ?
                        <Link to='/'>
                            <button className='font-inconsolata flex items-center bg-black text-white border-2 py-1 px-8 hover:bg-white hover:text-black'>
                                Login
                                <MdOutlineKeyboardArrowRight size={25} />
                            </button>
                        </Link>
                        :
                        <Link to='/onboard'>
                            <button className='font-inconsolata flex items-center bg-black text-white border-2 py-1 px-8 hover:bg-white hover:text-black'>
                                Register
                                <MdOutlineKeyboardArrowRight size={25} />
                            </button>
                        </Link>
                }
            </div>
        </div>
    )
}

export default Skynect