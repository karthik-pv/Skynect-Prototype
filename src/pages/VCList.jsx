import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import VCTile from "../components/VCTile";
import { db } from "../firebase"
import { query , collection, getDocs  } from 'firebase/firestore'

const VCList = () => {

    const [VCList , setVCList] = useState([])
    const [filteredVCs , setFilteredVcs] = useState([])
    const [searchPrefix,setSearchPrefix] = useState("")
    const [loading , setLoading] = useState(true)

    const setPrefixandSearch = (prefix) => {
        setSearchPrefix(prefix)
        filterDataByPrefix(prefix)
    }

    const fetchData = async () => { 
        const VCQuery = query(collection(db , "VC"))
        const querySnapshot = await getDocs(VCQuery)
        const VCData = querySnapshot.docs.map(doc => ({
            id: doc.id,
         ...doc.data()
        }))
        VCData.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
        setVCList(VCData)
        setFilteredVcs(VCData)
        setLoading(false)
    }

    const filterDataByPrefix = (prefix) => {
        const filteredData = VCList.filter((doc) => 
          doc.name.toLowerCase().includes(prefix.toLowerCase()) || 
          doc.domain.toLowerCase().includes(prefix.toLowerCase()) || 
          doc.stage.toLowerCase().includes(prefix.toLowerCase())
        );
        setFilteredVcs(filteredData);
      }
    

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div className="bg-black min-h-screen flex flex-col items-center">
            <Header/>  
            <input
                type="text"
                value={searchPrefix}
                onChange={(e) => setPrefixandSearch(e.target.value)}
                placeholder="Search Venture Capitalists"
                className="w-1/3 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
            /> 
            {
                loading ?
                <>
                    <p className="text-white">Loading...</p>
                </> :
                <div className="mt-8 w-full max-w-lg overflow-y-auto items-center" style={{ maxHeight: '450px' }}>
                    <div className="flex flex-col overflow-hidden">
                        <div className="mb-4">
                            {filteredVCs.map((VC)=>(
                                <VCTile VCObj = {VC}/>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default VCList;