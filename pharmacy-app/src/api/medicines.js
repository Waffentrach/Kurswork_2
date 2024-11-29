import axios from "axios";

const API_URL = "http://localhost:5000/api/medicines";

export const getMedicines = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMedicine = async (medicine) => {
  const response = await axios.post(API_URL, medicine);
  return response.data;
};

export const updateMedicine = async (id, medicine) => {
  const response = await axios.put(`${API_URL}/${id}`, medicine);
  return response.data;
};

export const deleteMedicine = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
