import React, { useState, useEffect } from "react";
import { db } from '../firebase'
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import Header from "../components/Header";
import { useAdminContext } from "../contexts/AdminContext";
import { useNavigate, useParams , useLocation } from 'react-router-dom'

const EditGrant = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin, setIsAdmin } = useAdminContext();

    const [grantDetails, setGrantDetails] = useState({
        amt: "",
        by: "",
        desc: "",
        eligibility: "",
        link: "",
        id: ""
    });

    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")))
        if (!isAdmin) {
            navigate('/home')
        }
        fetchGrantDetails();
    }, []);

    const fetchGrantDetails = async () => {
        try {
            const queryParams = new URLSearchParams(location.search);
            const grantID = queryParams.get('id');
            const grantDoc = await getDoc(doc(db, 'grants', grantID));
            if (grantDoc.exists()) {
                const grantData = grantDoc.data();
                setGrantDetails({
                    ...grantDetails,
                    ...grantData
                });
            } else {
                console.log("Grant not found");
            }
        } catch (error) {
            console.error("Error fetching grant details:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'grants', grantDetails.id), grantDetails);
            alert("Grant updated");
            setGrantDetails({
                amt: "",
                by: "",
                desc: "",
                eligibility: "",
                link: "",
                id: ""
            })
        } catch (error) {
            console.error("Error updating grant:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'grants', grantDetails.id));
            alert("Grant deleted");
        } catch (error) {
            console.error("Error deleting grant:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGrantDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <Header />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <p className="text-3xl font-bold pb-4 text-center">Edit Grant</p>
                <form onSubmit={handleEditSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="grantAmount" className="block text-gray-700 font-bold mb-2">Amount:</label>
                        <input type="text" id="grantAmount" name="amt" value={grantDetails.amt} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="grantBy" className="block text-gray-700 font-bold mb-2">By:</label>
                        <input type="text" id="grantBy" name="by" value={grantDetails.by} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="grantDesc" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <textarea id="grantDesc" name="desc" value={grantDetails.desc} onChange={handleChange} rows="4" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="grantEligibility" className="block text-gray-700 font-bold mb-2">Eligibility:</label>
                        <textarea id="grantEligibility" name="eligibility" value={grantDetails.eligibility} onChange={handleChange} rows="4" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="grantLink" className="block text-gray-700 font-bold mb-2">Link:</label>
                        <input type="url" id="grantLink" name="link" value={grantDetails.link} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                        <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EditGrant;
