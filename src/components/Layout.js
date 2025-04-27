import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <Header />
    <main style={{ padding: "20px" }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;
