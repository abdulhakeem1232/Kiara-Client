import axios from 'axios';

// export const USER_BASE_URL = 'http://localhost:3001';
// export const CLIENT_BASE_URL = 'http://localhost:3001/client';
// export const ADMIN_BASE_URL = 'http://localhost:3001/admin';

export const USER_BASE_URL = 'https://13.61.84.213';
export const CLIENT_BASE_URL = 'https://13.61.84.213/client';
export const ADMIN_BASE_URL = 'https://13.61.84.213/admin';

export const PAN_BASE_URL = 'https://mvp.verify24x7.in/verifyApi';

const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
};


const getToken = () => {
  return localStorage.getItem('token'); 
};

const addAuthToken = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
};

const userAxios = axios.create({
  baseURL: USER_BASE_URL,
  ...defaultConfig,
});

const clientAxios = axios.create({
  baseURL: CLIENT_BASE_URL,
  ...defaultConfig,
});

const adminAxios = axios.create({
  baseURL: ADMIN_BASE_URL,
  ...defaultConfig,
});

const panAxios = axios.create({
  baseURL: PAN_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

[userAxios, clientAxios, adminAxios].forEach(instance => {
  instance.interceptors.request.use(
    (config) => addAuthToken(config), 
    (error) => Promise.reject(error) 
  );
});

export { userAxios, clientAxios, adminAxios,panAxios };
