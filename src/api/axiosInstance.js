import axios from "axios";
import { useTokenStore } from "../store/tokenStore";

let isRefreshing = false;
let requestQueue = [];

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  timeout: 5000,
});

const axiosInstanceAuth = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const { accessToken } = useTokenStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true; // 무한 루프 방지

      // 현재 리프레시 중이면 요청 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          requestQueue.push((token) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalConfig));
          });
        });
      }

      isRefreshing = true; // 리프레시 중

      try {
        const response = await axiosInstanceAuth.post("/auth/refresh");
        const newAccessToken = response.data.accessToken;

        useTokenStore.getState().setAccessToken(newAccessToken);

        // 큐 복사 후 큐를 최대한 빠르게 비워서, 요청이 큐에 담기자 마자 큐가 비워져서 누락될 확률을 최소화
        const copiedRequestQueue = [...requestQueue];
        requestQueue = [];

        isRefreshing = false; // 요청이 처리되지 못한 채로 큐에 남을 확률을 최소화하기 위해, 최대한 빠르게 처리
        // 하지만 큐에 쌓여 있던 요청과 새로 인터셉터로 들어온 요청의 리프레시 요청이 함께 진행되면서
        // 큐에 쌓여 있던 요청은 토큰 검증에 실패하는 일이 생길 수 있음.
        // 그래서 isRefreshing = false; 이건 무조건 빠르게 한다고 좋은건 아님.
        // 결론: 빠르게 하면 처리되지 못하고 큐에 남는 요청을 줄일 수 있고, 뒤에서 하면 큐에 쌓여 있던 요청의 실패 확률을 줄일 수 있다.

        copiedRequestQueue.forEach((callback) => callback(newAccessToken)); // 큐에 대기 중이던 요청 처리
        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalConfig); // 기존 요청 재시도
      } catch (err) {
        // 리프레시 실패 시 토큰 제거
        useTokenStore.getState().clearAccessToken();

        requestQueue = [];
        isRefreshing = false;

        return Promise.reject(err);
      }
    }

    // 코드가 401이 아니거나 기존 API 요청 재시도 실패 시
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceAuth };
