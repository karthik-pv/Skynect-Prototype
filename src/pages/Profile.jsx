import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useLocation , useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import FollowUsersList from "../components/FollowUsersList";
import pfpimg from '../assets/empty_pfp.jpg'

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('uid');
    const [user, setUser] = useState({});
    const [followerUserList, setFollowerUserList] = useState([]);
    const [followingUserList, setFollowingUserList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [toggleUserList, setToggleUserList] = useState(false);

    const getDataFromDb = async () => {
        try {
            const q = doc(db, 'skynect',uid);
            const querySnapshot = await getDoc(q);
            const userData = querySnapshot.data()
            if (userData) {
                setUser(userData);
                const followerusers = await fetchUsers(userData.followers);
                setFollowerUserList(followerusers);
                const followingusers = await fetchUsers(userData.following);
                setFollowingUserList(followingusers);
            } else {
                alert('No document found.');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }
    }

    const onFollow = async () => {
        try {
            setUser(prevUser => ({
                ...prevUser,
                followers: [...prevUser.followers, auth.currentUser.uid]
            }));
            const myDocRef = doc(db, 'skynect', auth.currentUser.uid);
            await updateDoc(myDocRef, {
                following: arrayUnion(user.id)
            });
            const otherDocRef = doc(db, 'skynect', user.id);
            await updateDoc(otherDocRef, {
                followers: arrayUnion(auth.currentUser.uid)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const onUnfollow = async () => {
        try {
            setUser(prevUser => ({
                ...prevUser,
                followers: prevUser.followers.filter(id => id !== auth.currentUser.uid)
            }));
            const myDocRef = doc(db, 'skynect', auth.currentUser.uid);
            await updateDoc(myDocRef, {
                following: arrayRemove(user.id)
            });
            const otherDocRef = doc(db,'skynect', user.id);
            await updateDoc(otherDocRef, {
                followers: arrayRemove(auth.currentUser.uid)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onFollowersClick = async () => {
        // if (!followerUserList.length) {
        //     const users = await fetchUsers(user.followers);
        //     setFollowerUserList(users);
        // }
        setUserList(followerUserList);
        setToggleUserList(!toggleUserList);
    };

    const onFollowingClick = async () => {
        // if (!followingUserList.length) {
        //     const users = await fetchUsers(user.following);
        //     setFollowingUserList(users);
        // }
        setUserList(followingUserList);
        setToggleUserList(!toggleUserList);
    };

    const fetchUsers = async (userIds) => {
        const users = [];
        for (const userId of userIds) {
            const userDoc = await getUserDoc(userId);
            users.push(userDoc);
        }
        return users;
    };

    const getUserDoc = async (userId) => {
        const docRef = doc(db, 'skynect', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    };

    const goToEditProfile = () => {
        navigate(`/editprofile?id=${uid}`)
    }


    useEffect(() => {
        getDataFromDb();
    }, [uid]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center py-8 px-4">
            <Header />
            <div className="profile-container flex flex-col justify-center text-center items-center mt-8 w-full max-w-lg">
                <div className="flex flex-row text-center pt-5">
                    <img src={pfpimg} width={200} alt="Profile" className="rounded-full mb-4 object-cover mr-10" />
                    <div className="flex flex-col justify-center">
                        <p className="text-4xl font-bold pb-2">{user.name}</p>
                        <p className="text-2xl font-bold pb-2">{user.startupName}</p>
                        <p className="text-xl">{user.role}</p>
                        <p className="text-xl">{user.phoneCode}-{user.phone}</p>
                        <p className="text-xl">{user.email}</p>
                    </div>
                </div>
                {auth.currentUser && auth.currentUser.uid === user.id && (
                    <div className="p-4">
                        <div className="flex flex-row items-center mb-4">
                            <button className="bg-green-500 py-3 px-6 rounded-full mr-4 text-xl hover:bg-green-600 transition-colors duration-300" onClick={onFollowingClick}>
                                Following - {user.following.length}
                            </button>
                            <button className="bg-green-500 py-3 px-6 rounded-full text-xl hover:bg-green-600 transition-colors duration-300" onClick={onFollowersClick}>
                                Followers - {user.followers.length}
                            </button>
                        </div>
                        {toggleUserList && (
                            <div className="flex justify-center">
                                <FollowUsersList userList={userList} />
                            </div>
                        )}
                    </div>
                )}
                {auth.currentUser && auth.currentUser.uid !== user.id &&
                    <>
                        {console.log(user.followers , auth.currentUser.uid)}
                        {!user.followers?.includes(auth.currentUser.uid) &&
                            <div className="p-4">
                                <button className="bg-green-500 py-3 px-6 rounded-full mr-4 text-xl" onClick={onFollow}>Follow</button>
                            </div>
                        }
                        {user.followers?.includes(auth.currentUser.uid) &&
                            <div className="p-4">
                                <button className="bg-red-500 py-3 px-6 rounded-full mr-4 text-xl" onClick={onUnfollow}>Unfollow</button>
                            </div>
                        }
                    </>
                }
                <div className="mb-4 justify-center">
                    <p className="text-2xl font-bold pb-2">About me</p>
                    <p className="text-lg mb-2">{user.selfOneLine}</p>
                    <p className="text-lg mb-4 font-italic">{user.selfBrief}</p>
                </div>
                <div className="mb-4 justify-center">
                    <p className="text-2xl font-bold pb-2">{user.startupName}</p>
                    <p className="text-lg mb-2">{user.startupOneLine}</p>
                    <p className="text-lg mb-4">{user.startupBrief}</p>
                </div>
                {auth.currentUser && auth.currentUser.uid === user.id &&
                    <div className="p-4">
                    <button className="bg-blue-500 py-3 px-6 rounded-full mr-4 text-xl" onClick={goToEditProfile}>Edit Profile</button>
                </div>
                }
            </div>
            
        </div>
    );
};

export default Profile;