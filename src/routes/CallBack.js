import axios from "axios";

function CallBack() {
  const script = document.createElement("script");

  script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  script.onload = () => {
    var naver_id_login = new window.naver_id_login(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CALLBACK_URL
    );

    const naverAccessToken = {
      accessToken: naver_id_login.oauthParams.access_token,
    };

    axios
      .post(process.env.REACT_APP_API_USERINFO_URL, naverAccessToken) // 접근 토큰으로 사용자 정보 요청
      .then((response) => console.log(response.data));
  };

  document.body.appendChild(script);
}

export default CallBack;
