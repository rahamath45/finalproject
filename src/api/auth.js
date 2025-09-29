import  api from "./index";




export const register = (payload) => api.post("/auth/register",payload);
export const login = (payload) => api.post("/auth/login",payload);
export const forgotpassword = (email) => api.post("/reset/forgot-password",{email});
export const resetPassword = (token,password) => api.post(`/reset/reset-password/${token}`,{ password})