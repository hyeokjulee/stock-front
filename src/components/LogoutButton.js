import { useNavigate } from "react-router-dom";
import { axiosInstanceAuth } from "../api/axiosInstance";
import { useTokenStore } from "../store/tokenStore";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstanceAuth.post("/auth/logout"); // 서버 refreshToken 삭제
    } catch (error) {
      console.warn("서버 로그아웃 실패, 무시하고 진행");
    } finally {
      useTokenStore.getState().clearAccessToken(); // 클라이언트 refreshToken 삭제
      navigate("/"); // 홈으로 이동
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
