import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAdminContext } from '../contexts/AdminContext';

const EditIncubator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useAdminContext();

  const [incubatorDetails, setIncubatorDetails] = useState({
    name: '',
    link: '',
    id: ''
  });

  useEffect(() => {
    const fetchIncubatorData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const incubatorID = queryParams.get('id');
        const docSnap = await getDoc(doc(db, 'incubators', incubatorID));
        if (docSnap.exists()) {
          setIncubatorDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching Incubator data:', error);
      }
    };

    fetchIncubatorData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'incubators', incubatorDetails.id), incubatorDetails);
      alert('Incubator details updated successfully');
      setIncubatorDetails({
        name: '',
        link: '',
        id: ''
      });
    } catch (error) {
      console.error('Error updating Incubator details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'incubators', incubatorDetails.id));
      alert('Incubator deleted successfully');
    } catch (error) {
      console.error('Error deleting Incubator:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncubatorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
    if (!isAdmin) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Edit Incubator</h1>
        <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" name="name" value={incubatorDetails.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Link:</label>
            <input type="url" name="link" value={incubatorDetails.link} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
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

export default EditIncubator;
