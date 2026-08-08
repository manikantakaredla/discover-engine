const BASE_URL = 'http://localhost:5000/api/v1';

// Generate or retrieve a persistent session ID for analytics
const getSessionId = () => {
  let sessionId = localStorage.getItem('discover_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('discover_session_id', sessionId);
  }
  return sessionId;
};

// Also store app initialization timestamp to show more data in storage
if (!localStorage.getItem('discover_app_installed_at')) {
  localStorage.setItem('discover_app_installed_at', new Date().toISOString());
}

export const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error(`API GET ${endpoint} Error:`, error);
      return null;
    }
  },
  post: async (endpoint, body) => {
    try {
      // Auto-inject sessionId for analytics tracking
      const enrichedBody = { ...body, sessionId: getSessionId() };
      
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrichedBody),
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`API POST ${endpoint} Error:`, error);
      return null;
    }
  }
};
