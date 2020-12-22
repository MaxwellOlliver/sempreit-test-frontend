import Axios from 'axios';

export const api = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3333',
});
