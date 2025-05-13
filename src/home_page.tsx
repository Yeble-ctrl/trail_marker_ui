import { useEffect, useState } from "react";

export default function HomePage(){
    const [user, setUser] = useState('');
    useEffect(() => {
        /* make an API call to get the user data */
        const getUser = fetch( 'http://localhost:8000/trail-marker-accounts/users/yewo/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        getUser.then((res) => {
            // if the response is okay, get the user data and store it.
            if(res.ok){ 
                res.json().then((resObj) => {
                    setUser(JSON.stringify(resObj));
                })
            }
            // if the response is not okay, 
            else{
                alert("Error getting user data: " + res.statusText);
            }
        }).catch((error) => {
            console.log(localStorage.getItem('access_token'));
            alert("Error getting user data: " + error.message)
        })
    }, [])
    return(
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Welcome {user}</h1>
            <p className="text-gray-500 text-sm">This is your home page</p>
        </div>
    );
}