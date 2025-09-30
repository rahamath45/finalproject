import api from "./index";





export const getAllTrainers = () => api.get("/trainers");
export const getTrainer = (id) => api.get(`/trainers/${id}`);
export const createTrainer = (payload) => 
  api.post("/trainers", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const updateTrainer = (id, formData) =>{
   return api.put(`/trainers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export const addReview = (id, payload) => 
  api.post(`/trainers/${id}/review`, payload);
export const replyReview = (id, reviewid, payload) => 
  api.post(`/trainers/${id}/reviews/${reviewid}`, payload); 