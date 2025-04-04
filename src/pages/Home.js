import NaverLoginButton from "../components/NaverLoginButton";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard"); // '/dashboard' 경로로 이동
  };

  return (
    <div>
      <NaverLoginButton />
      <button onClick={handleClick}>대시보드 페이지로 이동</button>
    </div>
  );
}

export default Home;
