import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth.js";

export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setErr("Passwords do not match");
    try {
      await resetPassword(token, password);
      nav("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to reset");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl mb-4 text-gray-800">Reset password</h3>
      <form onSubmit={submit} className="flex flex-col gap-3 p-2">
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required 
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="New password"/>
        <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required 
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Confirm password"/>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Reset</button>
      </form>
      {err && <div className="text-red-600">{err}</div>}
    </div>
    </div>
  );
}
