import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const UserService = {
  fetchUserArticles: async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/articles/user/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },
  fetchUserProfile: async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
    return response.data;
  },
};

