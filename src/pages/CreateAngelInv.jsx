import React, { useEffect, useState } from "react";
import { db } from '../firebase'
import { collection , doc , setDoc } from 'firebase/firestore'
import Header from "../components/Header";
import { useAdminContext } from "../contexts/AdminContext";
import { useNavigate } from 'react-router-dom'

const CreateAngelInvestor = () => {

  const navigate = useNavigate();
  const { isAdmin , setIsAdmin } = useAdminContext();

  const [investorDetails, setInvestorDetails] = useState(
    {
      name: "",
      domain: "",
      amt:"",
      stage: "",
      desc: "",
      link: "",
      id: ""
    }
  )

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newInvestor = doc(collection(db, "angelInvestors")); 
    investorDetails.id = newInvestor.id;
    await setDoc(newInvestor, investorDetails);
    alert("Angel Investor Added")
    setInvestorDetails({
      name: "",
      domain: "",
      amt:"",
      stage: "",
      desc: "",
      link: "",
      id: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestorDetails((prevDetails) => ({
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
        <p className="text-3xl font-bold pb-4 text-center">Create Angel Investor</p>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="investorName" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" id="investorName" name="name" value={investorDetails.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label htmlFor="investorDomain" className="block text-gray-700 font-bold mb-2">Domain:</label>
            <input type="text" id="investorDomain" name="domain" value={investorDetails.domain} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label htmlFor="amt" className="block text-gray-700 font-bold mb-2">Amt:</label>
            <input type="text" id="amt" name="amt" value={investorDetails.amt} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label htmlFor="investorInterest" className="block text-gray-700 font-bold mb-2">Stage:</label>
            <input type="text" id="investorInterest" name="stage" value={investorDetails.stage} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label htmlFor="investorDesc" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="investorDesc" name="desc" value={investorDetails.desc} onChange={handleChange} rows="4" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="investorLink" className="block text-gray-700 font-bold mb-2">Link:</label>
            <input type="url" id="investorLink" name="link" value={investorDetails.link} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
</div>
<div className="flex items-center justify-between">
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
</div>
</form>
</div>
</div>
)
}

export default CreateAngelInvestor;
