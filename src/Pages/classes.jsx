import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createClass, filterClasses, getAllClasses, recommendClasses } from "../api/classes";
import { useNavigate } from "react-router-dom";

export default function ClassesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all"); // all, create, filter, recommended
  const navigate = useNavigate();

  // --- State for all classes ---
  const [classes, setClasses] = useState([]);

  // --- State for create class ---
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Yoga");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState([""]);

  // --- State for filter ---
  const [filterType, setFilterType] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // --- Recommended classes ---
  const [recommended, setRecommended] = useState([]);

  // --- Fetch all classes ---
  const fetchAllClasses = async () => {
    try {
      const res = await getAllClasses();
      setClasses(res.data.classes);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fetch recommended classes ---
  const fetchRecommended = async () => {
    try {
      const res = await recommendClasses(user._id);
      console.log(res)
      setRecommended(res.data.recommended);
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === "all") fetchAllClasses();
    if (activeTab === "recommended" ) fetchRecommended();
  }, [activeTab]);

  // --- Create Class Handlers ---
  const handleScheduleChange = (index, value) => {
    const newSchedule = [...schedule];
    newSchedule[index] = value;
    setSchedule(newSchedule);
  };

 
  const handleGoToBooking = (classId, classTitle, date) => {
  navigate("/create-booking", {
    state: { classId, classTitle, date },
  });
};


  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        type,
        duration,
        description,
        schedule: schedule.map(d => ({ date: d }))
      };
      const res = await createClass(payload);
      alert(res.data.message);
      // reset form
      setTitle(""); setType("Yoga"); setDuration(""); setDescription(""); setSchedule([""]);
      setActiveTab("all"); // go back to all classes after create
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // --- Filter Classes ---
  const handleFilter = async () => {
    try {
      const params = {};
      if (filterType) params.type = filterType;
      if (filterDuration) params.duration = filterDuration;
      if (filterDate) params.date = filterDate;

      const res = await filterClasses(params);
      setClasses(res.data.classes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[url(./assets/main-bg.jpg)]  h-200">
     
          {/* Tabs */}
      <div className="grid gap-4 mb-8  md:flex lg:flex ">
        {["all", "create", "filter", "recommended"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab === "all" && "All Classes"}
            {tab === "create" && "Create Class"}
            {tab === "filter" && "Filter Classes"}
            {tab === "recommended" && "Recommended"}
          </button>
        ))}
      </div>


      {/* --- All Classes --- */}
      {activeTab === "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800">{cls.title}</h3>
              <p className="text-gray-500 mt-1">{cls.type} • {cls.duration} min</p>
              <p className="mt-3 text-gray-700">{cls.description}</p>
              <div className="mt-4 flex flex-col gap-4">
                <h4 className="font-semibold text-gray-600">Schedule:</h4>
                   <ul className="flex flex-col ">
                 {cls.schedule.map((s, i) => (
                    <li key={i} className="flex   flex-col gap-3">
                             {new Date(s.date).toLocaleDateString()}
               <button
        onClick={() => handleGoToBooking(cls._id, cls.title, s.date)}
        className="ml-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm" >
        Booking </button>
                  </li>
             ))}
               </ul>
              </div>
            </div>
          ))}
        </div> 
      )}

      {/* --- Create Class --- */}
      {activeTab === "create" &&  (
        user?.role === "trainer" ? (
              <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Create Class</h2>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
            
            <select value={type} onChange={e => setType(e.target.value)} className="w-full border p-2 rounded">
              <option>Yoga</option>
              <option>Strength</option>
              <option>Cardio</option>
            </select>

            <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} className="w-full border p-2 rounded" required />

            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" />

            <div>
              <label className="font-semibold">Schedule Dates</label>
              {schedule.map((date, index) => (
                <input key={index} type="date" value={date} onChange={e => handleScheduleChange(index, e.target.value)} className="w-full border p-2 rounded my-1" required />
              ))}
              
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Class</button>
          </form>
        </div>

        ) : (
            <p>Trainer only can create a classes</p>
        )
      )}

      {/* --- Filter Classes --- */}
      {activeTab === "filter" && (
        <div className="max-w-xl mx-auto mt-6">
          <h2 className="font-bold text-xl mb-4">Filter Classes</h2>
          <div className=" grid  gap-2 md:flex gap-2 mb-4 lg:flex gap-2 mb-4">
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border p-2 rounded">
              <option value="">All Types</option>
              <option>Yoga</option>
              <option>Strength</option>
              <option>Cardio</option>
            </select>
            <input type="number" placeholder="Duration" value={filterDuration} onChange={e => setFilterDuration(e.target.value)} className="border p-2 rounded" />
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="border p-2 rounded" />
            <button onClick={handleFilter} className="bg-blue-500 text-white px-3 py-2 rounded">Filter</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map(cls => (
              <div key={cls._id} className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col gap-1">
                <h3 className="font-bold">{cls.title}</h3>
                <p> <b>Type: </b>{cls.type}</p>
                <p> <b>Duration: </b>{cls.duration} mins</p>
                <p><b>Trainer: </b>{cls.trainer.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Recommended Classes --- */}
         {activeTab === "recommended" && (
  user.role === "user" ? (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Recommended Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommended.map((cls) => (
          <div key={cls._id} className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="font-bold">{cls.title}</h3>
            <p>Type: {cls.type}</p>
            <p>Trainer: {cls.trainer.name}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 mt-6">User only can see recommended classes</p>
  )
)}

    </div>
  );
}

