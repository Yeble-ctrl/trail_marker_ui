// This function refreshes the access token using the refresh token stored in localStorage.

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
        } else {
            throw(response.statusText);
        }
    } else {
        throw(new Error('No refresh token found'));
    }
}