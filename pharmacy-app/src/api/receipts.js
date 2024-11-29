import axios from "axios";

const API_URL = "http://localhost:5000/api/receipts";

export const createReceipt = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating receipt:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
