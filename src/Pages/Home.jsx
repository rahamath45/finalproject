
import { Link } from "react-router-dom";

export default function Home() {
  return (
      <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition">
        <h2 className="text-5xl font-[righteous] text-gray-800">Welcome</h2>
        <p className="text-lg  text-gray-600 mb-3 pl-2">Find trainers and book classes.</p>
        <Link to="/trainers" className="text-indigo-600 font-medium hover:underline pl-2">Find trainers</Link>
      </div>
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition">
        <h3 className="text-2xl font-bold text-gray-800">Browse classes</h3>
         <p className="text-gray-600 mb-3">Explore our training sessions.</p>
        <Link to="/classes" className="text-pink-600 font-medium hover:underline">Explore classes</Link>
      </div>
    </div>
    <img src="https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     alt="Fitness Class" className="w-full h-134 object-cover rounded-lg mt-4"/>
    </div>
  );
}
 