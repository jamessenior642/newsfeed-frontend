import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const ArticlesService = {
  uploadArticle: async (title: string, content: string, author: string, summary: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/articles`, {
      title,
      content,
      author,
    });
    return response.data;
  },
  fetchArticles: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/articles`);
    return response.data;
  },
  fetchArticleById: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/articles/${id}`);
    return response.data;
  },
  // Send article content to the backend to get a summary
  getSummary: async (articleContent: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/summarize`, {
        article: articleContent,
      });
      return response.data.summary; // return the summary
    } catch (error) {
      throw new Error("Error getting summary");
    }
  },
};
