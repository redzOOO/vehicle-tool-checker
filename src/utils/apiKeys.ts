// Utility functions for managing API keys securely
const API_KEY_STORAGE_KEY = 'dvla_api_key';

export const getDvlaApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const setDvlaApiKey = (apiKey: string) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};