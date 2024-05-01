import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import { useAdminContext } from '../contexts/AdminContext';

const AngelInvestorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [investor, setInvestor] = useState({});
  const { isAdmin, setIsAdmin } = useAdminContext();

  const getDataFromDb = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const investorID = queryParams.get('id');
      const docRef = doc(db, 'angelInvestors', investorID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInvestor(docSnap.data());
      } else {
        alert("No document found");
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };

  const goToEditInvestor = () => {
    navigate(`/editAngelInv?id=${investor.id}`);
  };

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
    getDataFromDb();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-8 py-12">
      <Header />
      <div className="bg-gray-200 text-black rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Angel Investor Details</h1>
        <div className="mb-8">
          <h2 className="text-2xl mb-2 font-bold">Name:</h2>
          <p className="text-lg">{investor.name}</p>
        </div>
        <div>
          <h2 className="text-2xl mb-2 font-bold">Email:</h2>
          <p className="text-lg">{investor.email}</p>
        </div>
        <div className="mt-8 mb-8 items-center">
          <a href={investor.link} target='_blank'>
            <button className="bg-green-500 py-3 px-6 rounded-full text-xl hover:bg-green-600 transition-colors duration-300">
              Take me to Investor Page
            </button>
          </a>
        </div>
        <div>
          <h2 className="text-2xl mb-2 font-bold">Description:</h2>
          <p className="text-lg">{investor.desc}</p>
        </div>
      </div>
      {isAdmin && (
        <button onClick={goToEditInvestor} className="bg-blue-500 py-3 px-6 rounded-full text-xl hover:bg-blue-600 transition-colors duration-300 m-5">
          Edit
        </button>
      )}
    </div>
  );
};

export default AngelInvestorPage;
