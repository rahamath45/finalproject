import  { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await register(form);
      setMsg(res.message);
      if (form.role === "trainer") nav("/trainers/");
      else nav("/login");
    } catch (error) {
      console.log(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Join as a User or Trainer
        </p>
        {msg && <p className="mt-3">{msg}</p>}
      <form onSubmit={submit} className="flex flex-col gap-3 p-2">
        <input name="name" value={form.name} onChange={handle} required placeholder="Full name" 
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
        <input name="email" value={form.email} onChange={handle} required type="email" placeholder="Email" 
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
        <input name="password" value={form.password} onChange={handle} required type="password" placeholder="Password" 
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "/>
        <select name="role" value={form.role} onChange={handle} 
          className="w-full px-4 py-2 border rounded-lg  outline-none">
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
        </select>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
    </div>
  );
}
