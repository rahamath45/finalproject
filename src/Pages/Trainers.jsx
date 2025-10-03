import  { useEffect, useState } from "react";
import { getAllTrainers } from "../api/trainers";
import ReviewSection from "../Components/ReviewSection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

const fetchTrainers = async () => {
      try {
        const res = await getAllTrainers();
        console.log ( "the resukt",res)
        setTrainers(res.data.trainers);
      } catch (err) {
        console.error("Error fetching trainers:", err);
      }
    };
     useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    
   if(user) fetchTrainers();
  }, [user]);

  return (
       <div className="container mx-auto px-4 py-8 bg-[url(./assets/main-bg.jpg)]  h-430">
  <h1 className="text-4xl font-bold mb-10 text-center text-gray-900 tracking-wide">
    Meet Our Trainers
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {trainers.map((trainer) => (
      <div
        key={trainer._id}
        className="bg-rose-100 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 p-6 flex flex-col items-center"
      >
        {/* Trainer Photo */}
        {trainer.photo && (
          <img
            src={`https://finalprojct-b.onrender.com/uploads/${trainer.photo.replace(/\\/g, "/")}`}
            alt={trainer.name}
            className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-pink-200"
          />
        )}

        {/* Trainer Info */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 font-[Righteous]">
          {trainer.name}
        </h2>
        <p className="text-gray-600 text-sm">{trainer.qualification}</p>
        <p className="text-pink-600 text-sm font-medium">{trainer.specialization}</p>
        <p className="text-gray-700 mt-2 text-center text-base italic">
          “{trainer.introMessage}”
        </p>

        {/* Trainer Video */}
        {trainer.introVideo && (
          <video
            src={`https://finalprojct-b.onrender.com/uploads/${trainer.introVideo.replace(/\\/g, "/")}`}
            controls
            className="w-full max-h-56 rounded-xl shadow-md mt-4"
          />
        )}

        {/* Review Section */}
        <div className="w-full mt-4">
          <ReviewSection trainer={trainer} onReviewAdded={fetchTrainers} />
        </div>

        {/* Update Button */}
        <button
          onClick={() => navigate(`/trainers/update/${trainer._id}`)}
          className="mt-5 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          Update Profile
        </button>
      </div>
    ))}
  </div>
</div>

  );
}
