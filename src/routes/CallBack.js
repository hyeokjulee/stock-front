import axios from "axios";
import { useNavigate } from "react-router-dom";

function CallBack() {
  const navigate = useNavigate();

  const script = document.createElement("script");

  script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";

  script.onload = () => {
    const naver_id_login = new window.naver_id_login(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CALLBACK_URL
    );

    // 상태 토큰 일치 여부 확인
    const localState = localStorage.getItem("naver_state");
    const naverState = naver_id_login.oauthParams.state;
    if (localState !== naverState) {
      console.error("상태 토큰 불일치"); // CSRF로 간주
      return;
    }
    localStorage.removeItem("naver_state");

    const naverAccessToken = {
      accessToken: naver_id_login.oauthParams.access_token,
    };

    axios
      .post(process.env.REACT_APP_API_USERINFO_URL, naverAccessToken) // 접근 토큰으로 JWT 요청
      .then((response) => {
        // jwt 저장 후 메인 페이지로 이동
        localStorage.setItem("token", response.data.token);
        navigate("/");
      });
  };

  document.body.appendChild(script);
}

export default CallBack;
