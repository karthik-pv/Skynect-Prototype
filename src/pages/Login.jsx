import React, { useEffect } from 'react'
import Skynect from '../components/Skynect'
import { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth , db } from '../firebase'
import { doc , getDoc } from 'firebase/firestore'
import { useAdminContext } from '../contexts/AdminContext';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { isAdmin , setIsAdmin } = useAdminContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in');
            console.log(userCredential);
            const q = doc(db , 'skynect' , auth.currentUser.uid)
            const querySnapshot = await getDoc(q)
            alert(querySnapshot.data().admin)
            const isAdminUser = querySnapshot.data().admin;
            await setIsAdmin(isAdminUser); // Update isAdmin state
            await localStorage.setItem("isAdmin", JSON.stringify(isAdminUser)); // Set localStorage item
            navigate('/home');
        } 
        catch (error) {
            alert(error.message)
            setError(error.message);
        }
    };

    useEffect(()=>{
        alert('If using on phone , please use in horizontal mode');
    },[])

    return (
        <div className='bg-black opacity-100 text-white min-h-screen flex items-center flex-col justify-center px-8'>
            <Skynect />
            <div className='bg-white text-black mt-8 p-5 rounded-lg mx-auto max-w-md'>
                <span className='text-2xl tracking-widest font-inconsolata font-extrabold text-center block mb-5'>Login</span>
                <div className='font-inconsolata flex flex-col mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={email} className='text-black border border-black outline-none py-1 px-2' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='font-inconsolata flex flex-col mb-5'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={password} className='text-black border border-black outline-none py-1 px-2' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='text-center'>
                    <button className='font-inconsolata flex items-center bg-black text-white border-2 py-1 px-4 rounded-lg' onClick={handleLogin}>
                        Sign in
                        <MdOutlineKeyboardArrowRight size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
