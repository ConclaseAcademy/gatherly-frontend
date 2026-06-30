import axios from "axios";

const API = axios.create({
  baseURL: "http://20.25.50.191:5144/api",
});




export const registerForEvent = async (
  eventId,
  guestName,
  guestEmail
) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/events/${eventId}/register`,
    {
      ticketType: "General",
      guestName,
      guestEmail,
      paymentToken: "tok_render",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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


export const checkInAttendee = async (eventId, registrationId) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/events/${eventId}/check-in`,
    {
      registrationId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};