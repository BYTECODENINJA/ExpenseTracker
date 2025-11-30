import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};
