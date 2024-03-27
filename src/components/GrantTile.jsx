import React from "react";
import { useNavigate } from "react-router-dom";

const GrantTile = ({ grantObj }) => {
  const navigate = useNavigate();

  const goToGrant = () => {
    navigate(`/grant?id=${grantObj.id}`);
  };

  return (
    <div
      className="bg-white text-black p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
      onClick={goToGrant}
    >
      <div>
        <h2 className="text-xl font-bold">Amount: <span className="font-normal pl-5">{grantObj.amt}</span></h2>
        <p className="text-lg font-bold">Grant By: <span className="font-normal pl-5">{grantObj.by}</span></p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Eligibility:</h3>
        <p className="text-base">{grantObj.eligibility}</p>
      </div>
    </div>
  );
};

export default GrantTile;
