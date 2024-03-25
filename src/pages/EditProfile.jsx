import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { db } from '../firebase';
import { doc , getDoc, updateDoc } from 'firebase/firestore'

const EditProfile = () => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('id');
    
    const [formDetails, setFormDetails] = useState({
        name: '',
        email: '',
        password: '',
        phoneCode: '',
        phone: '',
        startupName: '',
        startupOneLine: '',
        startupBrief: '',
        role: '',
        selfOneLine: '',
        selfBrief: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'skynect', uid), formDetails);
            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const query = doc(db , 'skynect' , uid)
                const querySnapshot = await getDoc(query); 
                const userProfile = querySnapshot.data();
                setFormDetails(userProfile); 
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, [uid]);


    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="font-bold">Name:</label>
                        <input type="text" id="name" name="name" value={formDetails.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="font-bold">Email:</label>
                        <input type="email" id="email" name="email" value={formDetails.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneCode" className="font-bold">Phone Code:</label>
                        <input type="text" id="phoneCode" name="phoneCode" value={formDetails.phoneCode} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="font-bold">Phone:</label>
                        <input type="text" id="phone" name="phone" value={formDetails.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startupName" className="font-bold">Startup Name:</label>
                        <input type="text" id="startupName" name="startupName" value={formDetails.startupName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startupOneLine" className="font-bold">Startup One Line:</label>
                        <input type="text" id="startupOneLine" name="startupOneLine" value={formDetails.startupOneLine} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startupBrief" className="font-bold">Startup Brief:</label>
                        <textarea id="startupBrief" name="startupBrief" value={formDetails.startupBrief} onChange={handleChange} className="w-full px-4 py-2 border rounded-md"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="font-bold">Role:</label>
                        <input type="text" id="role" name="role" value={formDetails.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="selfOneLine" className="font-bold">Self One Line:</label>
                        <input type="text" id="selfOneLine" name="selfOneLine" value={formDetails.selfOneLine} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="selfBrief" className="font-bold">Self Brief:</label>
                        <textarea id="selfBrief" name="selfBrief" value={formDetails.selfBrief} onChange={handleChange} className="w-full px-4 py-2 border rounded-md"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
                </form>
            </div>
        </div>
    );
    
};

export default EditProfile;




