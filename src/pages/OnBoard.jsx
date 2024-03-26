import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { motion } from 'framer-motion';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc ,setDoc} from 'firebase/firestore';

const OnBoard = () => {

  const navigate = useNavigate();

  const [stage,setStage] = useState(0);

  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: '',
    phoneCode: '',
    phone: '',
    startupName: '',
    startupOneLine: '',
    startupBrief: '',
    role:'',
    selfOneLine:'',
    selfBrief:''
  });

  const onDone = async () => {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, formDetails.email, formDetails.password);
        const uid = userCred.user.uid;
        
        const usersCollectionRef = doc(db, 'skynect', uid);

        await setDoc(usersCollectionRef, {
          name: formDetails.name,
          email: formDetails.email,
          phoneCode: formDetails.phoneCode,
          phone: formDetails.phone,
          startupName: formDetails.startupName,
          startupOneLine: formDetails.startupOneLine,
          startupBrief: formDetails.startupBrief,
          role: formDetails.role,
          selfOneLine: formDetails.selfOneLine,
          selfBrief: formDetails.selfBrief,
          id : uid,
          following : [],
          followers : [],
          admin : false
        });

      navigate('/home');

    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneCode: e.target.phoneCode.value,
      phone: e.target.phone.value
    }));
    setStage(1);
  };

    const handleStartupDetails = (e) => {
        e.preventDefault();
        setFormDetails((prevDetails) => ({
          ...prevDetails,
          startupName: e.target.startupName.value,
          startupOneLine: e.target.startupOneLine.value,
          startupBrief: e.target.startupBrief.value
        }));
        setStage(2);
    }

    const handleSelfDetails = (e) => {
        e.preventDefault();
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            role: e.target.role.value,
            selfOneLine: e.target.selfOneLine.value,
            selfBrief: e.target.selfBrief.value
        }));
        setStage(3);
    }
    

    return (
        <div className='bg-black opacity-100 text-white h-screen flex flex-col items-center justify-center'>
            {
                stage === 0 &&
                <motion.div animate={{ x: -20 }} className='bg-white text-black p-5 w-1/2'>
                        <span className='text-2xl tracking-widest font-extrabold font-inconsolata text-center'>On Boarding</span>
                        <form className='flex flex-col gap-5' onSubmit={handleRegister}>
                            <div className='font-inconsolata flex flex-col'>
                                <label htmlFor='name'>Name</label>
                                <input type='text' name='name' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                            </div>
                            <div className='font-inconsolata flex flex-col'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' name='email' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                            </div>
                            <div className='font-inconsolata flex flex-col'>
                                <label htmlFor='phone'>Phone</label>
                                <div className='border border-black flex'>
                                    <select name='phoneCode'>
                                        <option defaultChecked>+91</option>
                                    </select>
                                    <input type='tel' name='phone' pattern="[0-9]{10}" className='text-black outline-none py-1 px-2 w-full tracking-widest' required />
                                </div>
                            </div>
                            <div className='font-inconsolata flex flex-col'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' name='password' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                            </div>
                            <div>
                                <button className='font-inconsolata flex items-center bg-black text-white py-1 px-8 hover:underline'>
                                    Next
                                    <MdOutlineKeyboardArrowRight size={25} />
                                </button>
                            </div>
                        </form>
                </motion.div>
            }
            {
                stage === 1 &&
                <motion.div animate={{ x: -20 }} className='bg-white text-black p-5 w-1/2'>
                    <form className='flex flex-col gap-5' onSubmit={handleStartupDetails}>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='startupName' className='font-bold'>Name of your Startup</label>
                            <input type='text' name='startupName' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='startupOneLine' className='font-bold'>One line about your Startup</label>
                            <input type='text' name='startupOneLine' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='startupBrief' className='font-bold'>Brief about your Startup</label>
                            <input type='text' name='startupBrief' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div>
                            <button className='font-inconsolata flex items-center bg-black text-white py-1 px-8 hover:underline'>
                                Done
                                <MdOutlineKeyboardArrowRight size={25} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            }
            {
                stage === 2 &&
                    <motion.div animate={{x: -20 }} className='bg-white text-black p-5 w-1/2'>
                    <form className='flex flex-col gap-5' onSubmit={handleSelfDetails}>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='role' className='font-bold'>Your Role in the Startup(in one or two words)</label>
                            <textarea name='role' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='selfOneLine' className='font-bold'>One Line About Yourself</label>
                            <textarea name='selfOneLine' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div className='font-inconsolata flex flex-col'>
                            <label htmlFor='selfBrief' className='font-bold'>Brief About Yourself</label>
                            <textarea name='selfBrief' className='text-black border border-black outline-none py-1 px-2 w-full tracking-widest' required />
                        </div>
                        <div>
                        <button className='font-inconsolata flex items-center bg-black text-white py-1 px-8 hover:underline'>
                            Done
                            <MdOutlineKeyboardArrowRight size={25} />
                        </button>
                    </div>
                    </form>
                </motion.div>
            }
            {
                stage === 3 &&
                    <motion.div animate={{ x: -20 }} className='bg-white text-black p-5 w-1/2'>
                        <button className='font-inconsolata flex items-center bg-black text-white py-1 px-8 hover:underline' onClick={onDone}>
                            Let's Fly Now
                            <MdOutlineKeyboardArrowRight size={25} />
                        </button>
                    </motion.div>
            }
        </div>
    )
}

export default OnBoard;

