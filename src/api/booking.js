import api from "./api/index";

// Create a new booking
export const createBooking = (payload) => api.post("/booking", payload);

// Get current user's bookings
export const getMyBookings = () => api.get("/booking/me");

// Reschedule a booking
export const rescheduleBooking = (id, payload) =>
  api.put(`/booking/${id}/reschedule`, payload);

// Cancel a booking
export const cancelBooking = (id) => api.delete(`/booking/${id}`);

export const processPayment = (payload) =>
  api.post("/payment/process-payment", payload); 