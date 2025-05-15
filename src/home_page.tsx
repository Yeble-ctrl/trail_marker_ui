import { useEffect, useState } from "react";
import { refreshToken } from "./method_library/refresh_token";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    // function to fetch user data
    const fetchUserData = () => {
        return fetch(`http://localhost:8000/trail-marker-accounts/users/${localStorage.getItem('username')}/`, {
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
                    res.json().then((resObj) => {
                        setUser(JSON.stringify(resObj));
                    });
                } else if (res.status === 401) {
                    // Try to refresh token and retry fetching user data
                    refreshToken()
                        .then(() => {
                            return fetchUserData();
                        })
                        .then((retryRes) => {
                            if (retryRes && retryRes.ok) {
                                retryRes.json().then((resObj) => {
                                    setUser(JSON.stringify(resObj));
                                });
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

    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Welcome {user}</h1>
            <p className="text-gray-500 text-sm">This is your home page</p>
        </div>
    );
}