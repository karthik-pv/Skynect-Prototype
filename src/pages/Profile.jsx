import React from "react";
import { useState, useEffect } from "react";
import { collection , getDocs , query , where , doc , updateDoc , arrayUnion, arrayRemove } from 'firebase/firestore';
import { db , auth } from '../firebase';
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import pfpimg from '../assets/empty_pfp.jpg'

const Profile = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const  uid = queryParams.get('uid')
    const [user , setUser] = useState({})

    const getDataFromDb = async () => {
        try {
            const q = query(collection(db,'skynect'), where('id', '==', uid));
            const querySnapshot = await getDocs(q);
        
            if (!querySnapshot.empty) {
              const documentData = querySnapshot.docs[0].data();
              setUser(documentData)
            } else {
              alert('no doc');
            }
          } catch (error) {
            console.error('Error getting document:', error);
            return null;
          }
    }

    const onFollow = async() => {
        try {
            const docRef = doc(db,'skynect',user.id);
            await updateDoc(docRef, {
                followers: arrayUnion(auth.currentUser.uid)
            })
            const myDocRef = doc(db,'skynect',auth.currentUser.uid)
            await updateDoc(myDocRef, {
                following: arrayUnion(user.id)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const onUnfollow = async() => {
        try{
            const docRef = doc(db,'skynect',user.id);
            await updateDoc(docRef, {
                followers: arrayRemove(auth.currentUser.uid)
            })
            const myDocRef = doc(db,'skynect',auth.currentUser.uid)
            await updateDoc(myDocRef, {
                following: arrayRemove(user.id)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getDataFromDb()
    },[])

    return (
        <div className="bg-black opacity-100 text-white min-h-screen flex flex-col items-center pattern-hive-white/15 px-20">
        <Header />
        <div className="profile-container flex flex-col justify-center text-center items-center mt-15 w-1/2">
            <div className="flex flex-row text-center pt-5">
                <img
                src={pfpimg}
                width ={200}
                alt="Profile"
                className="rounded-full mb-4 object-cover mr-10"
                />
                <div className="flex flex-col justify-center">
                <p className="text-4xl font-bold pb-5">{user.name}</p>
                <p className="text-4xl font-bold pb-5">{user.startupName}</p>
                <p className="txt-3xl">{user.role}</p>
                </div>
            </div>
            {auth.currentUser && auth.currentUser.uid === user.id &&
            <>
                <div className="p-10">
                    <button className="bg-green-500 p-5 rounded-full mr-10 text-2xl">Following - {user.following.length}</button>
                    <button className="bg-green-500 p-5 rounded-full text-2xl">Followers - {user.followers.length}</button>
                </div>
            </>}
            {auth.currentUser && auth.currentUser.uid !== user.id &&
            <>
                {
                    !user.followers?.includes(auth.currentUser.uid) &&
                    <div className="p-10">
                        <button className="bg-green-500 p-5 rounded-full mr-10 text-2xl" onClick={onFollow}>Follow</button>
                    </div>
                }
                 {
                    user.followers?.includes(auth.currentUser.uid) &&
                    <div className="p-10">
                        <button className="bg-red-500 p-5 rounded-full mr-10 text-2xl" onClick={onUnfollow}>Unfollow</button>
                    </div>
                }
            </>
            }
            <div className="mb-4 justify-center"> 
            <p className="text-4xl font-bold pb-5">About me</p>
            <p className="text-lg mb-4">{user.selfOneLine}</p>
            <p className="text-lg mb-4 font-italic">{user.selfBrief}</p>
            </div>

            <div className="mb-4 justify-center">
            <p className="text-4xl font-bold pb-5">{user.startupName}</p>
            <p className="text-lg mb-4">{user.startupOneLine}</p>
            <p className="text-lg mb-4">{user.startupBrief}</p>
            </div>
        </div>
        </div>
  );
};

export default Profile;
