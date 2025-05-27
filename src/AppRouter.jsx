
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Services from "./pages/Services/Services";
import EmployerSignUp from "./pages/EmployerSignUp/EmployerSignUp";
import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Messages from "./pages/Messages/Messages";
import Wallet from "./pages/Wallet/Wallet";
import Settings from "./pages/Settings/Settings";
import JobAlerts from "./pages/JobAlerts/JobAlerts";
import Resume from "./pages/Resume/Resume";
import Bookings from "./pages/Bookings/Bookings";
import MyProjects from "./pages/MyProjects/MyProjects";

import './App.css'


const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/ServiceProviderSignUp", "/Login", "/Dashboard"];
  const hideFooterPaths = ["/ServiceProviderSignUp", "/Login", "/Dashboard"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" index element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EmployerSignUp" element={<EmployerSignUp />} />
        <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
};

const DashboardLayout = () => (
  // <div className="dashboardContainer">
  //   <Sidenav />
  //   <Routes>
  //     <Route path="/Dashboard" element={<Dashboard />} />
  //   </Routes>
  // </div>

  <>
    {/* <Sidenav /> */}
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Dashboard/Messages" element={<Messages />} />
      <Route path="/Dashboard/JobAlerts" element={<JobAlerts />} />
      <Route path="/Dashboard/Bookings" element={<Bookings />} />
      <Route path="/Dashboard/Wallet" element={<Wallet />} />
      <Route path="/Dashboard/MyProjects" element={<MyProjects />} />
      <Route path="/Dashboard/Settings" element={<Settings />} />
      <Route path="/Dashboard/Resume" element={<Resume />} />
    </Routes>
  </>
);

const AppRouter = () => {
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/Dashboard");

  return isDashboardRoute ? <DashboardLayout /> : <Layout />;
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
