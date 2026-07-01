import { create } from "zustand";
import { getMe } from "../api/Api";

const getStoredToken = () => localStorage.getItem("token") || null;

const useAuthStore = create((set) => ({
  user: null,
  token: getStoredToken(),
  isAuthenticated: Boolean(getStoredToken()),

  setAuth: (user, token = null) => {
    const authToken = token || getStoredToken();

    if (authToken) {
      localStorage.setItem("token", authToken);
    }

    set({
      user,
      token: authToken,
      isAuthenticated: Boolean(authToken),
    });
  },

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
    const token = getStoredToken();

    if (!token) {
      set({ user: null, token: null, isAuthenticated: false });
      return;
    }

    set({ token, isAuthenticated: true });

    try {
      const response = await getMe();
      const userData = response?.data?.data?.user || response?.data?.data || response?.data?.user || response?.data;

      set({
        user: userData || null,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;