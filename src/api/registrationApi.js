import axios from "axios";

const API = axios.create({
  baseURL: "http://20.25.50.191:5144",
});

const token = localStorage.getItem("token")

export const registerForEvent = async (eventId) => {
  const response = await API.post(`/events/${eventId}/register`,
   
  );
  return response.data;
};


export const cancelRegistration = async (registrationId) => {
  const response = await API.post(
    `/registrations/${registrationId}/cancel`
  );
  return response.data;
};


export const getEventRegistrations = async (eventId) => {
  const response = await API.get(
    `/events/${eventId}/registrations`
  );
  return response.data;
};


export const getMyRegistrations = async () => {
  const response = await API.get("/my-registrations");
  return response.data;
};


export const checkInAttendee = async (eventId) => {
  const response = await API.post(
    `/events/${eventId}/check-in`
  );
  return response.data;
};