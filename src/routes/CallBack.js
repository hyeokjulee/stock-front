function CallBack() {
  const script = document.createElement("script");
  script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  script.onload = () => {
    var naver_id_login = new window.naver_id_login(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CALLBACK_URL
    );
    alert(naver_id_login.oauthParams.access_token); // 접근 토큰 값 출력
  };
  document.body.appendChild(script);
}

export default CallBack;
