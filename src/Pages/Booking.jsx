
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default function CreateBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(state?.date || "");

  if (!state) {
    return <p>No class selected for booking</p>;
  }


  return (
    <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Create Booking</h2>
      <p className="mb-2">Class: <strong>{state.classTitle}</strong></p>

      <form  className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Select Date</span>
          <input
            type="date"
            value={date ? new Date(date).toISOString().split("T")[0] : ""}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border rounded-lg p-2"
            required
          />
        </label>
         <button type="button" onClick={() => navigate("/payment", {
           state: {
        classId: state.classId,
        classTitle: state.classTitle,
        date,
        amount: 5000, 
      },
    })
}
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg">
          Payment
        </button>
      </form>
    </div>
  );
}






