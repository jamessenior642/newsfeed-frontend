import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

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
};
