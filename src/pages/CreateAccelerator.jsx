import React, { useState , useEffect } from "react";
import { db } from '../firebase'
import { collection , doc , setDoc } from 'firebase/firestore'
import Header from "../components/Header";
import { useAdminContext } from "../contexts/AdminContext";
import { useNavigate } from 'react-router-dom'

const CreateAccelerator = () => {

    const navigate = useNavigate();
    const { isAdmin , setIsAdmin } = useAdminContext();

    const [acceleratorDetails, setAcceleratorDetails] = useState(
        {
            name: "",
            link: ""
        }
    )

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newAccelerator = doc(collection(db , "accelerators"))
        acceleratorDetails.id = newAccelerator.id
        await setDoc(newAccelerator , acceleratorDetails)
        alert("Accelerator added")
        setAcceleratorDetails(
            {
                name: "",
                link: ""
            }
        )
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAcceleratorDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    useEffect(()=>{
        setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")))
        if(!isAdmin){
            navigate('/home')
        }
    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <Header />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <p className="text-3xl font-bold pb-4 text-center">Create Accelerator</p>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="acceleratorName" className="block text-gray-700 font-bold mb-2">Name:</label>
                        <input type="text" id="acceleratorName" name="name" value={acceleratorDetails.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="acceleratorLink" className="block text-gray-700 font-bold mb-2">Link:</label>
                        <input type="url" id="acceleratorLink" name="link" value={acceleratorDetails.link} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAccelerator;
