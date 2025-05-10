import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ? Exemplo de interceptor de erros
apiClient.interceptors.response.use(
  resp => resp,
  err => {
    // ? tratamento global de erros
    return Promise.reject(err);
  }
);