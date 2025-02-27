import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const ArticlesService = {
  uploadArticle: async (title: string, content: string, author: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/articles`,
      { title, content, author },
      { withCredentials: true } // Ensure credentials (cookies) are sent
    );
    return response.data; // The backend will return the saved article with the generated summary
  },
  fetchArticles: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/articles`);
    return response.data;
  },
  fetchArticleById: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/articles/${id}`);
    return response.data;
  },
  deleteArticle: async (articleId: string) => {
    // Make sure we include credentials if your backend session is cookie-based
    return axios.delete(`${API_BASE_URL}/api/articles/${articleId}`, { withCredentials: true });
  },
};
