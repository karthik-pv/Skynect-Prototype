import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import { useAdminContext } from "../contexts/AdminContext";

const Home = () => {

    const { isAdmin , setIsAdmin } = useAdminContext();

    useEffect(()=> {
        const setPrivileges = async() => {
            await setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
        }
        setPrivileges()
    },[])

    return(
        <div className="bg-black text-white min-h-screen flex flex-col items-center py-8 px-4">
            <Header />
            {isAdmin &&
                <div className="mt-3 flex flex-row gap-4">
                    <Link to="/creategrant" className="bg-blue-500 text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        Add Grants
                    </Link>
                    <Link to="/createvc" className="bg-blue-500 text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        Add VC's
                    </Link>
                    <Link to="/createincubator" className="bg-blue-500 text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        Add Incubators
                    </Link>
                    <Link to="/createaccelerator" className="bg-blue-500 text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        Add Accelerators
                    </Link> 
                    <Link to="/createAngelInv" className="bg-blue-500 text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        Add Angel Investors
                    </Link>
                </div>
            }
            <div className="mt-8 flex flex-col gap-4">
                <Link to="/grantlist" className="bg-white text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Grants
                </Link>
                <Link to="/incubators" className="bg-white text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Incubators
                </Link>
                <Link to="/accelerators" className="bg-white text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Accelerators
                </Link>
                <Link to="/vclist" className="bg-white text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Venture Capitalists
                </Link>
                <Link to="/angelInvList" className="bg-white text-black text-2xl text-center font-bold p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Angel Investors
                </Link>
            </div>
        </div>
    )
}

export default Home;
