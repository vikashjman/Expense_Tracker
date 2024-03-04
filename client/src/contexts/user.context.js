import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Create the context provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : null;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};