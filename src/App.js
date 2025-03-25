import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaverLogin from "./routes/NaverLogin";
import CallBack from "./routes/CallBack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NaverLogin />} />
        <Route path="/callback" element={<CallBack />} />
      </Routes>
    </Router>
  );
}

export default App;
