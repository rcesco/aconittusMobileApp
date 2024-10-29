import axios from 'axios';

const api = axios.create({
  baseURL: 'http://77.37.41.21:3337/api/',
});

export default api;
