import  { useEffect, useState } from "react";
import { getAllTrainers } from "../Api/trainers";
import ReviewSection from "../Components/ReviewSection";


export default function Trainers() {
  const [trainers, setTrainers] = useState([]);

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
    
    fetchTrainers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
            <div
            key={trainer._id} 
            className="bg-pink-100 rounded-2xl shadow-xl p-4 flex flex-col items-center hover:scale-105 transition-shadow "
          >
            <h2 className="mt-4 text-4xl font-semibold font-[Righteous]">{trainer.name}</h2>
            <p className="text-gray-600 text-md">{trainer.qualification}</p>
            
          <p className="text-gray-500">{trainer.specialization}</p>
            <p className="text-gray-700 mt-2 text-center">{trainer.introMessage}</p>
             
              <ReviewSection trainer={trainer}  onReviewAdded={fetchTrainers}/>
          </div>
        ))}
        
      </div>
    </div>
  );
}
