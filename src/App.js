import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTokenStore } from "./store/tokenStore";
import axiosInstanceAuth from "./api/axiosInstance";
import Home from "./pages/Home";
import CallBack from "./pages/CallBack";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstanceAuth
      .post("/auth/refresh")
      .then((response) => {
        useTokenStore.getState().setAccessToken(response.data.accessToken);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/naverlogin/callback" element={<CallBack />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
