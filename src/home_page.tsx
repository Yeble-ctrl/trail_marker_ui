import { useEffect, useState } from "react";
import { refreshToken } from "./method_library/refresh_token";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    // user data interface
    interface UserDataInterface{
        username: string
        first_name: string
        last_name: string
        email: string
    }

    // user profile data interface
    interface UserProfileInterface{
        id: string
        dateOfBirth: string
        gender: string
        userDescription: string
        profilePicture: string
    }

    // some pretty useful constants :)
    const [user, setUser] = useState<UserDataInterface>();
    const [userProfile, setUserProfile] = useState<UserProfileInterface>();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    // function to fetch user data
    const fetchUserData = () => {
        return fetch(`http://localhost:8000/trail-marker-accounts/users/${username}/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    };

    const fetchUserProfile = () => {
        return fetch(`http://localhost:8000/profiles/profile-details/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    };    

    useEffect(() => {
        fetchUserData()
            .then((res) => {
                if (res.ok) {
                    res.json().then((resObj) => {setUser(resObj)});
                } else if (res.status === 401) {
                    // Try to refresh token and retry fetching user data
                    refreshToken()
                        .then(() => {
                            return fetchUserData();
                        })
                        .then((retryRes) => {
                            if (retryRes && retryRes.ok) {
                                retryRes.json().then((resObj) => {setUser(resObj)});
                            } else {
                                navigate('/login_page');
                            }
                        })
                        // Catch any errors in trying to refresh the token
                        .catch((error) => {
                            alert("Error refreshing token: " + error.message);
                            navigate('/login_page');
                        });
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch((error) => {
                alert("Error getting user data: " + error.message);
                navigate('/login_page');
            });
        
        // fetch the user profile data
        fetchUserProfile()
            .then((res) => {
                if (res.ok) {
                    res.json().then((resObj) => {setUserProfile(resObj)});
                } else if (res.status === 401) {
                    // Try to refresh token and retry fetching user data
                    refreshToken()
                        .then(() => {
                            return fetchUserData();
                        })
                        .then((retryRes) => {
                            if (retryRes && retryRes.ok) {
                                retryRes.json().then((resObj) => {setUserProfile(resObj)});
                            } else {
                                navigate('/login_page');
                            }
                        })
                        .catch((error) => {
                            alert("Error refreshing token: " + error.message);
                            navigate('/login_page');
                        });
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch((error) => {
                alert("Error getting user data: " + error.message);
                navigate('/login_page');
            });
    }, []);
console.log(user, userProfile)
    return (
        <body className="flex flex-col font-grotesk h-full bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <div className="flex flex-row">

                {/* Profile picture goes here */}
                <img src={userProfile?.profilePicture || ''} alt="profile picture" className="w-28 h-28" />

                {/* User first name, last name and short descrption*/}
                <div className="flex flex-col">
                    <h1></h1>
                </div>
            </div>
            <div className="flex flex-row">
                <button className="rounded-md bg-purple-600 p-2 w-auto">About</button>
                <button className="rounded-md bg-purple-600 p-2 w-auto">Blog</button>
                <button className="rounded-md bg-purple-600 p-2 w-auto">Edit</button>
            </div>
        </body>
    );
}