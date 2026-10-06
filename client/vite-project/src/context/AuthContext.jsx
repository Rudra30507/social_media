import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../axiosCalls/axios";

// 1. Context create karo aur export karo
export const AuthContext = createContext();

// 2. Provider component banao
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchuser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
