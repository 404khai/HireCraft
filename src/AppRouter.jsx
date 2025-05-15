
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Services from "./pages/Services/Services";
import EmployerSignUp from "./pages/EmployerSignUp/EmployerSignUp";
import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";

const Layout = () => {
//   const location = useLocation();
//   const showSidebar = location.pathname.startsWith("/DashBoard"); 

const location = useLocation();

// Hide Navbar only on this route
const hideNavbarPaths = ["/ServiceProviderSignUp", "/Login"];
const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* {showSidebar && <Sidebar />} */}
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" index element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EmployerSignUp" element={<EmployerSignUp />} />
        <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp />} />
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Layout /> {/* Ensure Layout is inside Router */}
    </Router>
  );
};

export default AppRouter;
