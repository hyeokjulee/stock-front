import axios from "axios";
import useTokenStore from "../store/useTokenStore";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  timeout: 5000,
});

const axiosInstanceRefresh = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useTokenStore.getState().accessToken;
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

      try {
        const response = await axiosInstanceRefresh.post("/auth/refresh");

        const newAccessToken = response.data.accessToken;
        useTokenStore.getState().setAccessToken(newAccessToken);

        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalConfig); // 기존 API 요청 재시도
      } catch (err) {
        // 리프레시 실패 시 로그아웃
        useTokenStore.getState().clearAccessToken();
        axiosInstanceRefresh.post("/auth/logout");

        return Promise.reject(err);
      }
    }

    // 코드가 401이 아니거나 기존 API 요청 재시도 실패 시
    return Promise.reject(error);
  }
);

export default axiosInstance;
