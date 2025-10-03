import React, { useEffect, useState } from "react";
import { cancelBooking, getMyBookings, rescheduleBooking } from "../api/booking";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    if (!newDate) return;
     alert("⏳ Rescheduling booking...");
    try {
     const res = await rescheduleBooking(id, { newDate });
      alert( res.data?.message || "✅ Booking rescheduled!");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message );
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    alert("⏳ Cancelling booking...");
    try {
      const res =  await cancelBooking(id);
      alert( res.data?.message || "❌ Booking cancelled");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
       <div className="pr-2 bg-[url(./assets/main-bg.jpg)]  h-430">
  <h2 className="text-2xl font-bold mb-6 text-[#fff]">📌 My Bookings</h2>
  {bookings.length === 0 ? (
    <p className="text-gray-500 italic">No bookings found</p>
  ) : (
    <div className="grid gap-6">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="p-6 bg-gradient-to-r from-pink-100 to-rose-100  rounded-2xl shadow-md border border-gray-100 flex justify-between items-center hover:shadow-lg transition duration-300"
        >
          {/* Booking details */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-indigo-700">
              {b.class?.title}
            </h3>
            <p className="text-gray-600">👨‍🏫 {b.trainer?.name}</p>
            <p className="text-gray-600">📅 {new Date(b.date).toLocaleString()}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                b.status === "rescheduled"
                  ? "bg-yellow-100 text-yellow-700"
                  : b.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {b.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleReschedule(b._id)}
              className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition"
            >
              🔄 Reschedule
            </button>
            <button
              onClick={() => handleCancel(b._id)}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
