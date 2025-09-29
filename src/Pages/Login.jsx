import  { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg,setMsg] = useState("");

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setMsg(res.message);
      nav("/");
    } catch (error) {
      console.log(error?.response?.data?.message || "Login failed");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl mb-4 text-gray-800">Login</h2>
       {msg && <p className="mt-3">{msg}</p>}
      <form onSubmit={submit} className="flex flex-col gap-3 p-2">
        <input name="email" onChange={handle} value={form.email} required placeholder="Email" 
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
        <input name="password" onChange={handle} value={form.password} required type="password" placeholder="Password" 
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
      </form>
      <div className="mt-3 text-sm">
        <a href="/forgot" className="text-indigo-600">Forgot password?</a>
      </div> 
    </div>
    </div> 
  );
}
