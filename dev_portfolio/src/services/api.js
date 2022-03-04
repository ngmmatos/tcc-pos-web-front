import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://rhbarbeariaapi.herokuapp.com/RhBarbearia',
});