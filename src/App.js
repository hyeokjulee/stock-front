import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NaverLoginBtn from "./routes/NaverLoginBtn";
import CallBack from "./routes/CallBack";
import axios from "axios";

function App() {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NaverLoginBtn />} />
        <Route path="/naverlogin/callback" element={<CallBack />} />
      </Routes>
    </Router>
  );
}

export default App;
