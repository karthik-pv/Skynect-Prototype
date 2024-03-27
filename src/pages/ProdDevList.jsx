import React, { useState, useEffect } from "react";
import { collection, getDocs , where , query} from 'firebase/firestore';
import { db, auth } from '../firebase';
import Header from '../components/Header';
import ProdDevTile from "../components/ProdDevTile";

const UserList = () => {
  const currentUser = auth.currentUser;
  const [allUsers , setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPrefix, setSearchPrefix] = useState('');

  const setPrefixandSearch = (prefix) => {
    setSearchPrefix(prefix);
    filterDataByPrefix(prefix);
  }

  const fetchData = async() => {
    try{
      const q = query(collection(db, 'skynect'), where('type', '==' , 'productdev'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setAllUsers(data)
      setFilteredUsers(data)
      setLoading(false)
    }
    catch(error){
      console.log(error)
    }
  }

  const filterDataByPrefix = (prefix) => {
    const filteredData = allUsers.filter((doc) => 
      doc.name.toLowerCase().includes(prefix.toLowerCase()) || 
      doc.role.toLowerCase().includes(prefix.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }

  useEffect(() => {
    if(allUsers.length===0){
      fetchData();
    }
  });

  return (
    <div className="bg-black min-h-screen flex flex-col items-center px-4 py-8">
      <Header />
      <div className="mt-2 w-full max-w-lg">
        <input
          type="text"
          value={searchPrefix}
          onChange={(e) => setPrefixandSearch(e.target.value)}
          placeholder="Search Skynect Users"
          className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>
      <div className="mt-8 w-full max-w-lg overflow-y-auto" style={{maxHeight : 400}}>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <ul className="w-full">
            {filteredUsers.map((doc) => (
              currentUser.uid !== doc.id && (
                <li key={doc.id} className="mb-4">
                  <ProdDevTile userObj={doc} />
                </li>
              )
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserList;
