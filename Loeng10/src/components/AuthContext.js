import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const contextLogin = (token) => {
        localStorage.setItem('token', token);
        setUser(jwtDecode(token));
    };

    const contextLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, setUser, contextLogin, contextLogout}}>
            { children }
        </AuthContext.Provider>
    )
};

export default AuthProvider;
