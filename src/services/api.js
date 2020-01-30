import axios from 'axios';

const api = axios.create({ baseURL: 'http://www.mocky.io/v2' });

export const getAuthors = () => api.get('/5be5e3ae2f00005b000fc3f6');

export const getPosts = () => api.get('/5be5e3fa2f000082000fc3f8');
