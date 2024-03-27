import React, { useEffect, useState } from "react";
import { db } from '../firebase'
import { collection , doc , setDoc } from 'firebase/firestore'
import Header from "../components/Header";
import { useAdminContext } from "../contexts/AdminContext";
import { useNavigate } from 'react-router-dom'

const CreateVC = () => {

    const navigate = useNavigate();
    const { isAdmin , setIsAdmin } = useAdminContext();

    const [vcDetails, setVCDetails] = useState(
        {
            name: "",
            domain: "",
            amt: "",
            stage: "",
            desc: "",
            link: "",
            id: ""
        }
    )

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newVC = doc(collection(db, "VC"));
        vcDetails.id = newVC.id;
        await setDoc(newVC, vcDetails);
        alert("VC Added")
        setVCDetails({
            name: "",
            domain: "",
            amt: "",
            stage: "",
            desc: "",
            link: "",
            id: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVCDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    useEffect(()=>{
        setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
        if(!isAdmin){
            navigate('/home')
        }
    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <Header />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <p className="text-3xl font-bold pb-4 text-center">Create VC</p>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="vcName" className="block text-gray-700 font-bold mb-2">Name:</label>
                        <input type="text" id="vcName" name="name" value={vcDetails.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vcDomain" className="block text-gray-700 font-bold mb-2">Domain:</label>
                        <input type="text" id="vcDomain" name="domain" value={vcDetails.domain} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vcAmt" className="block text-gray-700 font-bold mb-2">Amount:</label>
                        <input type="text" id="vcAmt" name="amt" value={vcDetails.amt} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vcStage" className="block text-gray-700 font-bold mb-2">Stage:</label>
                        <input type="text" id="vcStage" name="stage" value={vcDetails.stage} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vcDesc" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <textarea id="vcDesc" name="desc" value={vcDetails.desc} onChange={handleChange} rows="4" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vcLink" className="block text-gray-700 font-bold mb-2">Link:</label>
                        <input type="url" id="vcLink" name="link" value={vcDetails.link} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVC;
