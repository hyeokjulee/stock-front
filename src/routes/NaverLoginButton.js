function NaverLoginButton() {
  const script = document.createElement("script");

  script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  script.onload = () => {
    var naver_id_login = new window.naver_id_login(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CALLBACK_URL
    );
    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain(process.env.REACT_APP_SERVICE_URL);
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
  };

  document.body.appendChild(script);

  return <div id="naver_id_login"></div>;
}

export default NaverLoginButton;
