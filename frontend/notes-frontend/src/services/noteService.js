import axios from "axios";

const API = "http://localhost:5000/api/notes";

export const getNotes = () => axios.get(API);

export const createNote = (data) =>
  axios.post(API, data);

export const updateNote = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteNote = (id) =>
  axios.delete(`${API}/${id}`);

export const searchNotes = (q) =>
  axios.get(`${API}/search?q=${q}`);