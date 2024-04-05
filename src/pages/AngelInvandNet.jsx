import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AngelInvestorTile from "../components/AngelInvTile";
import { db } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";

const AngelInvestorList = () => {
  const [investorList, setInvestorList] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [searchPrefix, setSearchPrefix] = useState("");
  const [loading, setLoading] = useState(true);

  const setPrefixAndSearch = (prefix) => {
    setSearchPrefix(prefix);
    filterDataByPrefix(prefix);
  };

  const fetchData = async () => {
    const investorQuery = query(collection(db, "angelInvestors"));
    const querySnapshot = await getDocs(investorQuery);
    const investorData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    investorData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setInvestorList(investorData);
    setFilteredInvestors(investorData);
    setLoading(false);
  };

  const filterDataByPrefix = (prefix) => {
    // Adjust filtering logic if necessary
    const filteredData = investorList.filter((investor) =>
      investor.name.toLowerCase().includes(prefix.toLowerCase()) ||
      investor.domain.toLowerCase().includes(prefix.toLowerCase()) ||
      investor.stage.toLowerCase().includes(prefix.toLowerCase())
    );
    setFilteredInvestors(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <Header />
      <input
        type="text"
        value={searchPrefix}
        onChange={(e) => setPrefixAndSearch(e.target.value)}
        placeholder="Search Angel Investors"
        className="w-1/3 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
      />
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="mt-8 w-full max-w-lg overflow-y-auto items-center" style={{ maxHeight: "450px" }}>
          <div className="flex flex-col overflow-hidden">
            <div className="mb-4">
              {filteredInvestors.map((investor) => (
                <AngelInvestorTile investorObj={investor} key={investor.id} /> 
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AngelInvestorList;
