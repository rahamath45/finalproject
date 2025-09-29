import  { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}){
    const [ user,setUser] = useState(()=>{
        try{ return JSON.parse(localStorage.getItem("user"))} catch { return null}
    });
     const [token, setToken] = useState(() => localStorage.getItem("token") || null);
 
      useEffect(()=>{    
                   if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
                   if (user) localStorage.setItem("user", JSON.stringify(user)); else localStorage.removeItem("user");
      },[token,user])

       const register = async (payload) => {
    const res = await authApi.register(payload);
    const { token: t, user: u } = res.data.data;
    setToken(t); setUser(u);
    return res.data;
  };

  const login = async (payload) => {
    const res = await authApi.login(payload);
    const { token: t, user: u } = res.data.data;
    setToken(t); setUser(u);
    return res.data;
  };

  const logout = () => {
    setUser(null); setToken(null);
   
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}