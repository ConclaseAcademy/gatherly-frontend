import axios from "axios";

const API_URL = "http://20.25.50.191:5144/api";

// export const createEvent = async (payload) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.post(
//     `${API_URL}/Events`,
//     payload, 
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };



export const createEvent = async (payload) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  const response = await axios.post(
    `${API_URL}/Events`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateEvent = async (eventId, payload) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/Events/${eventId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteEvent = (eventId) => {
  const token = localStorage.getItem("token");
   
   //console.log("Token:", token);

  return axios.delete(`${API_URL}/Events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

// export const getMyProfile = () => {
//    const token = localStorage.getItem("token");
//   return axios.get(
//     `${API_URL}/Events/my-events`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };

export const getMyProfile = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/Auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getMe = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/Auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};