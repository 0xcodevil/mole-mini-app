import axios, { AxiosRequestHeaders } from "axios";

const API = axios.create({ baseURL: '/api/v1' });

API.interceptors.request.use(config => {
    config.headers = <AxiosRequestHeaders>{
        Authorization: localStorage.getItem('token') || ''
    };
    return config;
});

export default API;