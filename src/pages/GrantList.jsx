import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import GrantTile from "../components/GrantTile";
import Header from '../components/Header';

const GrantsList = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'grants'));
      const grantData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      grantData.sort((a, b) => {
        const nameA = a.by.toLowerCase();
        const nameB = b.by.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setGrants(grantData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center px-4 py-8">
      <Header />
      <div className="mt-8 w-full max-w-lg overflow-y-auto" style={{ maxHeight: '450px' }}>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-col overflow-hidden">
            {grants.map((grant) => (
              <div key={grant.id} className="mb-4">
                <GrantTile grantObj={grant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GrantsList;
