const API_URL = 'http://localhost/api/users'; // Replace with your actual API URL

interface Credentials {
    username: string;
    password: string;
    type: string;
}

export const login = async (credentials: Credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

export const checkAuth = async () => {
    const response = await fetch(`${API_URL}/check-auth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};