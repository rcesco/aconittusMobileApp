import axios from 'axios';

let baseURL = 'http://77.37.41.21:3337/api/';

const api = axios.create({
  baseURL,
});

export const updateApiBaseURL = port => {
<<<<<<< HEAD
  baseURL = `http://77.37.41.21:${port}/api/`;
=======
  //baseURL = `http://77.37.41.21:${port}/api/`;
  //baseURL = `http://192.168.15.15:3334/api/`;
  baseURL = `http://192.168.0.200:3334/api/`;
>>>>>>> 9764c98 (tire inspection)
  api.defaults.baseURL = baseURL;
};

export default api;
