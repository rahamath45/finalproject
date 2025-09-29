import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { addReview, replyReview } from "../api/trainers.js";

export default function ReviewSection({ trainer,onReviewAdded }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // 🔹 User submits review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addReview(trainer._id, { rating, comment });
      alert("Review submitted!");
      setRating(5);
      setComment("");
       if (onReviewAdded) onReviewAdded(res.data);
      // refresh trainer details
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  // 🔹 Trainer submits response to a review
  const handleResponseSubmit = async (e, reviewid) => {
    e.preventDefault();
    const response = e.target.response.value;
    try {
      await replyReview(trainer._id, reviewid, {response});
      alert("Response added!");
      e.target.reset();
        if (onReviewAdded) onReviewAdded();
       // refresh trainer details
    } catch (err) {
      console.error("Error adding response:", err);
      alert("Failed to add response");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Reviews</h3>

      {/* Review Form (only users can review, not trainers) */}
      {user?.role === "user" && (
        <form
          onSubmit={handleReviewSubmit}
          className="bg-gray-200 rounded-xl p-4 mb-4 space-y-3"
        >
          <div>
            <label className="block mb-1">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-20 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Show Reviews */}
      {trainer.reviews?.length > 0 ? (
        trainer.reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-3 rounded-md mb-3">
            <p className="font-semibold text-yellow-500 flex items-center">⭐ {review.rating}</p>
            <p>{review.comment}</p>

            {review.trainerResponse ? (
              <p className="text-blue-600 mt-2">
                Trainer Response: {review.trainerResponse}
              </p>
            ) : (user?.role === "trainer" && user?.name === trainer?.name &&
                  ( <form
                  onSubmit={(e) => handleResponseSubmit(e, review._id)}
                  className="mt-2 flex"
                >
                  <input
                    type="text"
                    name="response"
                    placeholder="Write a response..."
                    className="flex-1 border rounded p-1 mr-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Send
                  </button>
                </form>
              )

            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
