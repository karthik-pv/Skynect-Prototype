import React , { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../contexts/AdminContext";

const IncubatorTile = ({ incubatorObj }) => {
  const navigate = useNavigate();
  const { isAdmin , setIsAdmin} = useAdminContext()
  const goToEditIncubator = () => {
    navigate(`/editincubator?id=${incubatorObj.id}`);
  };

  useEffect(()=> {
    const setPrivileges = async() => {
        await setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    }
    setPrivileges()
  },[])

  return (
    <div className="bg-white text-black p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
      <a href={incubatorObj.link} target="_blank">
        <h2 className="text-xl font-bold text-center">{incubatorObj.name}</h2>
      </a>
      {isAdmin&&
      <button
        onClick={goToEditIncubator}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Edit
      </button>
      }
    </div>
  );
};

export default IncubatorTile;
