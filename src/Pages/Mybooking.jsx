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
    try {
      await rescheduleBooking(id, { newDate });
      alert("✅ Booking rescheduled!");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Reschedule failed");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await cancelBooking(id);
      alert("❌ Booking cancelled");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pr-2">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid gap-4 ">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md flex justify-between items-center "
            >
              <div>
                <h3 className="font-bold">{b.class?.title}</h3>
                <p>{b.trainer?.name}</p>
                <p>{new Date(b.date).toLocaleString()}</p>
                <p>Status: {b.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleReschedule(b._id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
