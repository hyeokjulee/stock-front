import axios from "axios";

function CallBack() {
  const script = document.createElement("script");

  script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  script.onload = () => {
    var naver_id_login = new window.naver_id_login(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CALLBACK_URL
    );

    // 상태 토큰 일치 여부 확인 (CSRF 공격 방지)
    const localState = localStorage.getItem("naver_state");
    const naverState = naver_id_login.oauthParams.state;
    if (localState !== naverState) {
      console.error("상태 토큰 불일치"); // CSRF 공격으로 간주
      return;
    }
    localStorage.removeItem("naver_state"); // 사용이 끝난 state를 로컬 스토리지에서 삭제

    const naverAccessToken = {
      accessToken: naver_id_login.oauthParams.access_token,
    };

    axios
      .post(process.env.REACT_APP_API_USERINFO_URL, naverAccessToken) // 접근 토큰으로 사용자 정보 요청
      .then((response) => console.log(response.data));

    // jwt 저장 후 메인 페이지로 리다이렉트
  };

  document.body.appendChild(script);
}

export default CallBack;
