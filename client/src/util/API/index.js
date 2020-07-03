/* Este arquivo auxilia na comunicação da aplicação com a API */
import axios from 'axios';
import { readCookie } from '@pagueveloz/cookies';

const baseURL = process.env.REACT_APP_API_URL;

let instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

instance.defaults.headers.get['Pragma'] = 'no-cache';
instance.defaults.headers.get['Cache-Control'] = 'no-cache, no-store';

instance.interceptors.request.use(function (config) {
    const USER_TOKEN = readCookie('TOKEN');
    config.headers.Authorization = USER_TOKEN ? `Bearer ${USER_TOKEN}` : null;
    return config;
});

export default instance
