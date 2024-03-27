import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../contexts/AdminContext';

import { auth } from '../firebase';

const Header = () => {
 
    const navigate = useNavigate();
    const {isAdmin , setIsAdmin} = useAdminContext();

    const goToHomePage = () => {
        navigate('/home')
    }

    const GoToProfile = () =>{
        navigate(`/profile?uid=${auth.currentUser.uid}`)
    }

    const GoToUsers = () => {
        navigate('/users')
    }

    const GoToJargon = () =>{
        navigate('/jargon')
    }

    const GoToDevs = () => {
        navigate('/proddevs')
    }

    const onSignout = () => {
        setIsAdmin(false);
        localStorage.setItem('isAdmin',JSON.stringify(isAdmin));
        auth.signOut().then(()=>{
            navigate('/')
        })
    }

    return (
        <div className='flex flex-col items-center justify-center pb-10 px-2 w-full'>
            <div className='pb-3'>
                <span className='text-white text-6xl tracking-widest font-inconsolata capitalize'>SKYNECT</span>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={goToHomePage}>Home</button>
                        </td>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={GoToProfile}>My Profile</button>
                        </td>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={GoToUsers}>Profiles</button>
                        </td>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={GoToJargon}>Jargon</button>
                        </td>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={GoToDevs}>Devs</button>
                        </td>
                        <td>
                            <button className="text-xl font-bold text-white bg-black py-2 px-4 rounded-md" onClick={onSignout}>Sign Out</button>
                        </td>
                    </tr>
                </table>  
            </div>
        </div>
    )
}

export default Header
