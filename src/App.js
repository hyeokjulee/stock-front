import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaverLoginButton from "./routes/NaverLoginButton";
import CallBack from "./routes/CallBack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NaverLoginButton />} />
        <Route path="/naverlogin/callback" element={<CallBack />} />
      </Routes>
    </Router>
  );
}

export default App;
