import { Link } from "react-router-dom";
import { useTokenStore } from "../store/tokenStore";
import LogoutButton from "./LogoutButton";
import NaverLoginButton from "./NaverLoginButton";
import styles from "./Header.module.css";

const Header = () => {
  const isLoggedIn = !!useTokenStore((state) => state.accessToken);

  const loggedInLinks = [
    { to: "/", label: "홈" },
    { to: "/dashboard", label: "마이페이지" },
    { to: "/market-cap", label: "시가총액" },
    { to: "/alert", label: "주가 알림" },
  ];

  const loggedOutLinks = [
    { to: "/", label: "홈" },
    { to: "/market-cap", label: "시가총액" },
  ];

  return (
    <header className={styles.header}>
      <h1>Stock</h1>
      <div className={styles.button_container}>
        {isLoggedIn ? (
          <>
            <LogoutButton />
            {loggedInLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                <button className={styles.button}>{label}</button>
              </Link>
            ))}
          </>
        ) : (
          <>
            <NaverLoginButton />
            {loggedOutLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                <button className={styles.button}>{label}</button>
              </Link>
            ))}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
