import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // URL de tu backend
  withCredentials: true,
});

export default instance;
