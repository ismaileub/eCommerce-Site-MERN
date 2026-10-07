import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/Home/Components/NavBar";
import Footer from "../Pages/Home/Components/Footer";

const Main = () => {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/dashboard");

  return (
    <div className="bg-slate-50">
      {!hideLayout && <NavBar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Main;
