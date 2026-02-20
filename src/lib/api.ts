import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const kc = (window as any).__keycloak;
    if (kc?.authenticated) {
      try {
        await kc.updateToken(30);
        localStorage.setItem('access_token', kc.token);
      } catch (e) {
        kc.login();
      }
      config.headers.Authorization = 'Bearer ' + kc.token;
    }
  }
  return config;
});
