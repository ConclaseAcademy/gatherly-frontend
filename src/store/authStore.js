import { create } from "zustand";
import { getMe } from "../api/Api";

const useAuthStore = create((set) => ({
  user: null,

  loadUser: async () => {
  try {
    console.log("Loading user...");

    const response = await getMe();

    console.log("Full Response:", response);

    set({
      user: response.data.data,
    });

    console.log("Stored User:", response.data.data);
  } catch (error) {
    console.log("Error:", error);
  }
},
}));

export default useAuthStore;