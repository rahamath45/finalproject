import api from "./index";





export const getAllClasses = (params) => api.get("/classes", { params });
export const createClass = (payload) => api.post("/classes", payload);
export const filterClasses = (params) => api.get("/classes/filter", { params });
export const recommendClasses = (userId) => api.get(`/classes/recommend/${userId}`);
