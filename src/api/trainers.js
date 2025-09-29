import  api from "./index";





export const getAllTrainers = () => api.get("/trainers");
export const getTrainer = (id) => api.get(`/trainers/${id}`);
export const createTrainer = (payload) => 
  api.post("/trainers", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const updateTrainer = (id, payload) => 
  api.put(`/trainers/${id}`, payload);
export const addReview = (id, payload) => 
  api.post(`/trainers/${id}/review`, payload);
export const replyReview = (id, reviewid, payload) => 
  api.post(`/trainers/${id}/reviews/${reviewid}`, payload); 