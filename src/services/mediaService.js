// src/services/mediaService.js
import api from './api';

export const mediaService = {
  getAll: (params = {}) => api.get('/media', { params }),
  upload: (file) => {
    const formData = new FormData();
    formData.append('mediaFile', file);
    return api.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/media/${id}`),
};
