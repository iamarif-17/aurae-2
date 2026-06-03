import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '') + '/api',
});

// Attach Firebase ID token on every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Analyze via file upload */
export const analyzeFile = async (file, jobDescription = '') => {
  const form = new FormData();
  form.append('resume', file);
  form.append('job_description', jobDescription);
  const { data } = await api.post('/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/** Analyze via plain text */
export const analyzeText = async (resumeText, jobDescription = '') => {
  const { data } = await api.post('/analyze/text', {
    resume_text: resumeText,
    job_description: jobDescription,
  });
  return data;
};

export default api;
