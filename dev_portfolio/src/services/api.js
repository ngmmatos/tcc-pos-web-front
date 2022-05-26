import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://rhbarbeariaapi.herokuapp.com/RhBarbearia',
});