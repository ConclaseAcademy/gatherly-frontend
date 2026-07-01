import { create } from "zustand";
import { getMe } from "../api/Api";

const useAuthStore = create((set) => ({
  user: null,

  logout: () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  set({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  },

  loadUser: async () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const response = await getMe();

    set({
      user: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
},
}));

export default useAuthStore;