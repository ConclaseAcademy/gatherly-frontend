import axios from "axios";

const API_URL = "http://20.25.50.191:5144";

export const getEvents = () => axios.get(API_URL);

export const getEvent = (eventId) =>
  axios.get(`${API_URL}/${eventId}`);

export const createEvent = (data) =>
  axios.post(API_URL, data);

export const updateEvent = (eventId, data) =>
  axios.put(`${API_URL}/${eventId}`, data);

export const deleteEvent = (eventId) =>
  axios.delete(`${API_URL}/${eventId}`);

export const publishEvent = (eventId) =>
  axios.patch(`${API_URL}/${eventId}/publish`);

export const closeEvent = (eventId) =>
  axios.patch(`${API_URL}/${eventId}/close`);

export const getMyEvents = () =>
  axios.get(`${API_URL}/my-events`);