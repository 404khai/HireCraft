
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
//   const location = useLocation();
//   const showSidebar = location.pathname.startsWith("/DashBoard"); 

  return (
    <>
      {/* {showSidebar && <Sidebar />} */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />

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
