import axios from "axios";

const API_URL = "http://20.25.50.191:5144/api";

export const createEvent = async (payload) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/Events`,
    payload,   // ✅ use payload
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateEvent = (eventId, data) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_URL}/Events/${eventId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEvent = (eventId, data) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_URL}/Events/${eventId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const closeEvent = (eventId, data) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_URL}/Events/${eventId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEvents = () => {
  return axios.get(
    `${API_URL}/Events`
  );

  
};

export const getMyEvents = () => {
   const token = localStorage.getItem("token");
  return axios.get(
    `${API_URL}/Events/my-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  
};

export const getMyProfile = () => {
   const token = localStorage.getItem("token");
  return axios.get(
    `${API_URL}/Events/my-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  
};