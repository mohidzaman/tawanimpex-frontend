// src/services/inquiryService.js
import api from './api';

export const inquiryService = {
  submit: (formData) => api.post('/inquiries', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAll: (params = {}) => api.get('/inquiries', { params }),
  getById: (id) => api.get(`/inquiries/${id}`),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/inquiries/${id}`),
};
