import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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