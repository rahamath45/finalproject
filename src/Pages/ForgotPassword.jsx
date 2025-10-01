import  { useState } from "react";
import { forgotpassword } from "../api/auth.js";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
 

  const send = async (e) => {
    e.preventDefault();
    setMsg(""); 
    try {
      const res = await forgotpassword(email);
      setMsg(res.data.message || "Check your email for reset link.");
    } catch (error) {
      console.log(error?.response?.data?.message );
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl mb-4 text-gray-800">Forgot password</h3>
      <form onSubmit={send} className="flex flex-col gap-3 p-2">
        <input value={email} onChange={e => setEmail(e.target.value)} required placeholder="Your email" 
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Send reset link</button>
      </form>
      {msg && <div className="text-green-600 p-2">{msg}</div>}
    </div>
    </div>
  );
}
