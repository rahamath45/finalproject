import api from "./index";

// Create a new booking
export const createBooking = async (payload) => {
  const res = await api.post("/booking", payload);
  return res.data; // return the actual booking data
};


// Get current user's bookings
export const getMyBookings = () => api.get("/booking/me");

// Reschedule a booking
export const rescheduleBooking = (id, payload) =>
  api.put(`/booking/${id}/reschedule`, payload);

// Cancel a booking
export const cancelBooking = (id) => api.delete(`/booking/${id}`);

export const processPayment = (payload) =>
  api.post("/payments/process-payment", {
    token: payload.token,      // paymentMethod.id from frontend
    amount: payload.amount,    // amount in cents
    bookingId: payload.bookingId,
  });

