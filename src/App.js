import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaverLoginBtn from "./routes/NaverLoginBtn";
import CallBack from "./routes/CallBack";

function App() {
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
