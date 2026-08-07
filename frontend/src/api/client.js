const BASE_URL = 'http://localhost:5000/api/v1';

export const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      return data.data; // Assuming backend sends { success, data, message }
    } catch (error) {
      console.error(`API GET ${endpoint} Error:`, error);
      return null;
    }
  },
  post: async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`API POST ${endpoint} Error:`, error);
      return null;
    }
  }
};
