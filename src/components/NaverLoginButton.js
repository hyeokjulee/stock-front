import { useEffect } from "react";

function NaverLoginButton() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";

    script.onload = () => {
      const naver_id_login = new window.naver_id_login(
        process.env.REACT_APP_CLIENT_ID,
        process.env.REACT_APP_CALLBACK_URL
      );

      const state = naver_id_login.getUniqState();
      naver_id_login.setButton("white", 2, 40);
      naver_id_login.setDomain(process.env.REACT_APP_SERVICE_URL);
      naver_id_login.setState(state);
      naver_id_login.init_naver_id_login();

      localStorage.setItem("naver_state", state); // CSRF 방지
    };

    document.body.appendChild(script); // body에 스크립트 추가

    return () => {
      // 컴포넌트 언마운트 시 script 정리
      document.body.removeChild(script);
    };
  }, []);

  return <div id="naver_id_login"></div>;
}

export default NaverLoginButton;
