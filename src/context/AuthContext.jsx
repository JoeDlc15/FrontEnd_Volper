import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('customerToken'));
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const fetchProfile = async () => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/customer/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser({ ...data, token });
            } else {
                // Token is invalid or expired
                logout();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [token, backendUrl]);

    const login = async (email, password) => {
        const response = await fetch(`${backendUrl}/api/customer/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('customerToken', data.token);
            setToken(data.token);
            setUser({ ...data.user, token: data.token });
            return { success: true };
        } else {
            return { success: false, error: data.error || 'Error al iniciar sesión' };
        }
    };

    const register = async (name, email, password) => {
        const response = await fetch(`${backendUrl}/api/customer/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('customerToken', data.token);
            setToken(data.token);
            setUser({ ...data.user, token: data.token });
            return { success: true };
        } else {
            return { success: false, error: data.error || 'Error al registrarse' };
        }
    };

    const logout = () => {
        localStorage.removeItem('customerToken');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        refreshProfile: fetchProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
