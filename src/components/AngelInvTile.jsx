import React from 'react';
import { useNavigate } from "react-router-dom";

const AngelInvestorTile = ({ investorObj }) => {

 const navigate = useNavigate();

 const gotoInvestor = () => {
   navigate(`/angelInv?id=${investorObj.id}`);
 };

 return (
   <div
     className="bg-white text-black p-4 m-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
     onClick={gotoInvestor}
   >
     <div>
       <h2 className="text-3xl font-bold pb-3 text-center">{investorObj.name}</h2>
     </div>
     <div>
        <p className="text-center">{investorObj.desc}</p>
     </div>
   </div>
 );
};

export default AngelInvestorTile;
