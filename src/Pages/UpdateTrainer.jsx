import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrainer, updateTrainer } from "../api/trainers";

export default function UpdateTrainer() {
  const { id } = useParams(); // from route like /trainers/:id/edit
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [expertise, setExpertise] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [introMessage, setIntroMessage] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [introVideoFile, setIntroVideoFile] = useState(null);
  const [introVideoPreview, setIntroVideoPreview] = useState("");
  const navigate = useNavigate()

  // fetch trainer data on mount
 const fetchTrainer = async () => {
      try {
        const res = await getTrainer(id);
        const t = res.data;
        setName(t.name);
        setQualification(t.qualification);
        setExpertise(t.expertise);
        setSpecialization(t.specialization);
        setIntroMessage(t.introMessage);
          if (t.photo) {
          setPhotoPreview(`${import.meta.env.VITE_BASE_URL}/uploads/${t.photo.replace(/\\/g, "/")}`);
        }
        if (t.introVideo) {
          setIntroVideoPreview(`${import.meta.env.VITE_BASE_URL}/uploads/${t.introVideo.replace(/\\/g, "/")}`);
        }
      } catch (err) {
        console.error("Failed to fetch trainer", err);
      }
    };

  useEffect(() => {
   
    fetchTrainer();
  }, [id]);

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("qualification", qualification);
    formData.append("expertise", expertise);
    formData.append("specialization", specialization);
    formData.append("introMessage", introMessage);
    if (photoFile) formData.append("photo", photoFile);
    if (introVideoFile) formData.append("introVideo", introVideoFile);

    try {
      const res = await updateTrainer(id, formData);
      alert("Trainer updated successfully!");
      fetchTrainer(); // 🔹 trainer list refresh pannunga
      navigate("/trainers");  
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update trainer");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-purple-100 shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Update Trainer
      </h2>

      <form onSubmit={handleUpdateTrainer} className="space-y-4">
         <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block font-medium mb-1">Qualification</label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Expertise */}
        <div>
          <label className="block font-medium mb-1">Expertise</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Intro Message */}
        <div>
          <label className="block font-medium mb-1">Intro Message</label>
          <textarea
            value={introMessage}
            onChange={(e) => setIntroMessage(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            rows="3"
          />
        </div>
           
           {/* Photo Upload */}
<div>
  <label className="block font-medium mb-1">Photo</label>
  <div className="flex items-center gap-4">
    <label className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">
      Upload Photo
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
                  const file = e.target.files[0];
                  setPhotoFile(file);
                  if (file) setPhotoPreview(URL.createObjectURL(file));
                }}
        className="hidden"
      />
    </label>

    {/* Show selected file name */}
    {photoFile && (
      <span className="text-sm text-gray-600 truncate max-w-[200px]">
        {photoFile.name}
      </span>
    )}
  </div>
</div>
 {photoPreview && (
              <img
                src={photoPreview}
                alt="Trainer"
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            )}

{/* Intro Video Upload */}
<div>
  <label className="block font-medium mb-1">Intro Video</label>
  <div className="flex items-center gap-4">
    <label className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
      Upload Video
      <input
        type="file"
        accept="video/*"
        onChange={(e) => { const file = e.target.files[0];
                  setIntroVideoFile(file);
                  if (file) setIntroVideoPreview(URL.createObjectURL(file));
                }}
        className="hidden"
      />
    </label>

    {/* Show selected file name */}
    {introVideoFile && (
      <span className="text-sm text-gray-600 truncate max-w-[200px]">
        {introVideoFile.name}
      </span>
    )}
  </div>
</div>
 {introVideoPreview && (
      <video
        src={introVideoPreview}
        controls
        className="w-40 max-h-32 rounded-lg shadow-md"
      />
    )}


        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Update Trainer
        </button>
      </form>
    </div>
  );
}