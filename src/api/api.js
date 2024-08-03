
import axios from 'axios';

const API_URL = 'https://event-management-1-jgt2.onrender.com/api';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

export const getEvents = async (token) => {
  const response = await axios.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getEventById = async (id, token) => {
  const response = await axios.get(`${API_URL}/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// export const deleteEvent = async (token, eventId) => {
//   const response = await axios.delete(`${API_URL}/events/${eventId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

export const deleteEvent = async (token, eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateEvent = async (token, eventId, eventData) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
