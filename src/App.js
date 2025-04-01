import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CallBack from "./pages/CallBack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/naverlogin/callback" element={<CallBack />} />
      </Routes>
    </Router>
  );
}

export default App;
