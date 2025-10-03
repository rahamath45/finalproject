
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../api/booking";


export default function CreateBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(location.state?.date || "");
  const [paymentDone, setPaymentDone] = useState(false); // flag for payment

  // Update flag if navigated from PaymentPage
  useEffect(() => {
    if (location.state?.paymentDone) {
      setPaymentDone(true);
    }
  }, [location.state]);

  if (!location.state) {
    return <p>No class selected for booking</p>;
  }

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!paymentDone) {
      alert("⚠️ Please complete payment first!");
      return;
    }

    try {
      await createBooking({ classId: location.state.classId, date });
      alert("✅ Booking created successfully!");
      navigate("/bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-[url(./assets/image(ansari).jpg)]  h-200">
    <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Booking</h2>
      <p className="mb-2">Class: <strong>{location.state.classTitle}</strong></p>

      <form className="space-y-4">
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

        <button
          type="button"
          onClick={() =>
            navigate("/payment", {
              state: {
                ...location.state, // keep class info
                date,
                amount: 5000,
              },
            })
          }
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
        >
          {paymentDone ? "Payment Done ✅" : "Payment"}
        </button>

        <button
          type="submit"
          onClick={handleConfirmBooking}
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
    </div>
  );
}
