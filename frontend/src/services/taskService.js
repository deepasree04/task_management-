import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // GET /api/tasks/
  getAllTasks: async () => {
    const response = await apiClient.get('/tasks/');
    return response.data;
  },

  // GET /api/tasks/{id}/
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}/`);
    return response.data;
  },

  // POST /api/tasks/
  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks/', taskData);
    return response.data;
  },

  // PUT /api/tasks/{id}/
  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}/`, taskData);
    return response.data;
  },

  // PATCH /api/tasks/{id}/ (e.g., status update)
  patchTask: async (id, partialData) => {
    const response = await apiClient.patch(`/tasks/${id}/`, partialData);
    return response.data;
  },

  // DELETE /api/tasks/{id}/
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}/`);
    return response.data;
  },
};

export default taskService;
