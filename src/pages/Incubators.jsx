import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import IncubatorTile from "../components/IncubatorTile";

const Incubators = () => {
  const [incubators, setIncubators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'incubators'));
      const incubatorData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      incubatorData.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setIncubators(incubatorData);
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
            {incubators.map((incubator) => (
              <div key={incubator.id} className="mb-4">
                <IncubatorTile incubatorObj={incubator} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Incubators;
