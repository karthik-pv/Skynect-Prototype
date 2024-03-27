import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import { useParams ,useLocation , useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc , getDoc , updateDoc , deleteDoc, setDoc} from 'firebase/firestore'
import { useAdminContext } from '../contexts/AdminContext';

const EditVC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const vcID = queryParams.get('id');
  const { isAdmin , setIsAdmin} = useAdminContext()

  const [vcDetails, setVCDetails] = useState({
    name: '',
    domain: '',
    amt: '',
    stage: '',
    desc: '',
    link: '',
    id: '',
  });

  useEffect(() => {
    const fetchVCData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'VC', vcID));
        if (docSnap.exists()) {
          setVCDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching VC data:', error);
      }
    };

    fetchVCData();
  }, [vcID]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db,'VC',vcID),vcDetails)
      alert('VC details updated successfully');
      setVCDetails(
        {
            name: '',
            domain: '',
            amt: '',
            stage: '',
            desc: '',
            link: '',
            id: '',
        }
      )
    } catch (error) {
      console.error('Error updating VC details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'VC', vcDetails.id));
      alert('VC deleted successfully');
    } catch (error) {
      console.error('Error deleting VC:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVCDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(()=>{
    setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
    if(!isAdmin){
        navigate('/home')
    }
  },[])

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Edit VC</h1>
        <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" name="name" value={vcDetails.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Domain:</label>
            <input type="text" name="domain" value={vcDetails.domain} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Amount:</label>
            <input type="text" name="amt" value={vcDetails.amt} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Stage:</label>
            <input type="text" name="stage" value={vcDetails.stage} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea name="desc" value={vcDetails.desc} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Link:</label>
            <input type="url" name="link" value={vcDetails.link} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditVC;
