import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useTokenStore from "./store/useTokenStore";
import Home from "./pages/Home";
import CallBack from "./pages/CallBack";
import DashBoard from "./pages/DashBoard";

function PrivateRoute({ children }) {
  const accessToken = useTokenStore((state) => state.accessToken);
  return accessToken ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/naverlogin/callback" element={<CallBack />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
