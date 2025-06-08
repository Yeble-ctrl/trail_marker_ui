// This module contains fetch functions
// used for fetching data to be displayed
// on the home page.

import * as interfaces from "./interfaces"
import { refreshToken } from "./refresh_token";

// 1. function for fetching user account data
export function fetchUserData(setUser: (value: React.SetStateAction<interfaces.UserDataInterface | undefined>) => void)
{
    fetch(`http://localhost:8000/trail-marker-accounts/users/${localStorage.getItem('username')}/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then((res) => {
        // If response is okay, assign the response data
        // to the user data varible
        if(res.ok) {
            res.json().then((resObj) => {setUser(resObj)});
        }
        // If the response status is 401 then try to refresh
        // the access token
        else if (res.status === 401) {
            refreshToken()
            .then(() => fetchUserData(setUser)) // re-run the fetch function
            // Catch any errors in trying to refresh the token
            .catch((error) => {
                throw error // re-throw the caught error
            });
        }
        // If the reponse is neither okay nor 401, throw a new error
        else {
            throw new Error(`${res.status}, ${res.statusText}`);
        }
    })
    // catch any errors that happened when making the fetch request
    .catch((error) => {
        throw new Error(`An error occurred when fetching user data: ${error.message}`)
    });
}

// 2. function for fetching the user profile data
export function fetchUserProfileData(setUserProfileData: (value: React.SetStateAction<interfaces.UserProfileInterface | undefined>) => void)
{
    fetch(`http://localhost:8000/profiles/profile-details/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then((res) => {
        // If response is okay, assign the response data
        // to the user profile data variable
        if(res.ok) {
            res.json().then((resObj) => {setUserProfileData(resObj)});
        }
        // If the response status is 401 then try to refresh
        // the access token
        else if (res.status === 401) {
            refreshToken()
            .then(() => fetchUserProfileData(setUserProfileData)) // re-run the fetch function
            // Catch any errors in trying to refresh the token
            .catch((error) => {
                throw error // re-throw the caught error
            });
        }
        // If the reponse is neither okay nor 401, throw a new error
        else {
            throw new Error(`${res.status}, ${res.statusText}`);
        }
    })
    // catch any errors that happened when making the fetch request
    .catch((error) => {
        throw new Error(`An error occurred when fetching user profile data: ${error.message}`)
    });
};