import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createBooking, processPayment } from "../api/booking";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  if (!state) {
    return <p>No booking details found</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);

      // 1️⃣ Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Send payment to backend
      const res = await processPayment({
        token: paymentMethod.id,
        amount: state.amount * 100, // cents
        bookingId: state.classId,
      });

      if (res.data.success) {
        // 3️⃣ On success → create booking
        await createBooking({ classId: state.classId, date: state.date });
        alert("✅ Payment + Booking successful!");
        navigate("/bookings");
      } else {
        alert("❌ Payment failed, booking not created");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 p-6">
      <h2 className="text-2xl font-bold mb-6">
        Complete Payment for {state.classTitle}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4"
      >
        <CardElement className="p-3 border rounded-lg" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
        >
          {loading ? "Processing..." : `Pay $${state.amount}`}
        </button>
      </form>
    </div>
  );
}
