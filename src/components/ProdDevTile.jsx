import React from "react";
import { useNavigate } from "react-router-dom";
import pfpimg from "../assets/empty_pfp.jpg";

const ProdDevTile = ({ userObj }) => {
  const navigate = useNavigate();
  const GoToProfile = () => {
    navigate(`/profile?uid=${userObj.id}`);
  };

  return (
    <div
      className="bg-white text-black p-6 m-8 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
      onClick={GoToProfile}
    >
      <div className="flex items-center justify-between">
        <img
          src={pfpimg}
          className="w-20 h-20 rounded-full object-cover"
          alt="Profile"
        />
        <div className="ml-4 text-center">
          <h2 className="text-3xl font-bold">{userObj.name}</h2>
          <p className="text-lg">{userObj.role}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">About Me</h3>
        <p className="text-lg">{userObj.selfOneLine}</p>
      </div>
    </div>
  );
};

export default ProdDevTile;
