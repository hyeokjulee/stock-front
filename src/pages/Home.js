import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../store/tokenStore";
import NaverLoginButton from "../components/NaverLoginButton";
import LogoutButton from "../components/LogoutButton";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!useTokenStore((state) => state.accessToken);

  const handleClick = () => {
    navigate("/dashboard"); // '/dashboard' 경로로 이동
  };

  return (
    <div>
      {isLoggedIn ? <LogoutButton /> : <NaverLoginButton />}
      <button onClick={handleClick}>대시보드 페이지로 이동</button>
    </div>
  );
}

export default Home;
