import { useState } from "react";
import { createTrainer } from "../api/trainers";

export default function CreateTrainer () {
    const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [expertise, setExpertise] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [introMessage, setIntroMessage] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [introVideoFile, setIntroVideoFile] = useState(null);

  const handleCreateTrainer = async (e) => {
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
      const res = await createTrainer(formData);
      console.log("Trainer created:", res.data);
      alert("Trainer created successfully!");

      // reset form
      setName("");
      setQualification("");
      setExpertise("");
      setSpecialization("");
      setIntroMessage("");
      setPhotoFile(null);
      setIntroVideoFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create trainer");
    }
  };

    return(
         <div className="max-w-2xl mx-auto bg-pink-100 shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Trainer
      </h2>

      <form onSubmit={handleCreateTrainer} className="space-y-4">
        {/* Name */}
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
        onChange={(e) => setPhotoFile(e.target.files[0])}
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

{/* Intro Video Upload */}
<div>
  <label className="block font-medium mb-1">Intro Video</label>
  <div className="flex items-center gap-4">
    <label className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
      Upload Video
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setIntroVideoFile(e.target.files[0])}
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


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Create Trainer
        </button>
      </form>
    </div>
    )
}