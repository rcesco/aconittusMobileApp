import axios from 'axios';

let baseURL = 'http://77.37.41.21:3337/api/';

const api = axios.create({
  baseURL,
});

export const updateApiBaseURL = port => {
  //baseURL = `http://77.37.41.21:${port}/api/`;
  baseURL = `http://192.168.15.15:3334/api/`;
  api.defaults.baseURL = baseURL;
};

export default api;
