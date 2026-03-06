import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const generateSummary = (transcript) => {
  return API.post('/summary', { transcript });
};

export const fetchHistory = () => {
  return API.get('/history');
};

export const deleteHistory = () => {
  return API.delete('/history');
};

export const regenerateSection = (section, transcript) => {
  return API.post('/regenerate', { section, transcript });
};
