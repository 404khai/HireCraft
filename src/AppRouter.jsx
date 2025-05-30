
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import FAQS from "./pages/FAQS/FAQS";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Services from "./pages/Services/Services";
import EmployerSignUp from "./pages/EmployerSignUp/EmployerSignUp";
import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";
import Footer from "./components/Footer/Footer";
import ProviderDashboard from "./pages/ProviderDashboard/ProviderDashboard";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import Messages from "./pages/Messages/Messages";
import Wallet from "./pages/Wallet/Wallet";
import Settings from "./pages/Settings/Settings";
// import JobAlerts from "./pages/JobAlerts/JobAlerts";
import Resume from "./pages/Resume/Resume";
import Bookings from "./pages/Bookings/Bookings";
import MyProjects from "./pages/MyProjects/MyProjects";
import Reviews from './pages/Reviews/Reviews'
import './App.css'
import ContactUs from "./pages/ContactUs/ContactUs";
import ProviderProfile from "./pages/ProviderProfile/ProviderProfile";


const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/ServiceProviderSignUp", "/Login", "/ProviderDashboard", "/EmployerDashboard"];
  const hideFooterPaths = ["/ServiceProviderSignUp", "/Login", "/ProviderDashboard", "/EmployerDashboard"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" index element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/FAQS" element={<FAQS />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EmployerSignUp" element={<EmployerSignUp />} />
        <Route path="/ProviderProfile" element={<ProviderProfile />} />
        <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
};

const ProviderDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/ProviderDashboard" element={<ProviderDashboard />} />
      <Route path="/ProviderDashboard/Messages" element={<Messages />} />
      {/* <Route path="/Dashboard/JobAlerts" element={<JobAlerts />} /> */}
      <Route path="/ProviderDashboard/Bookings" element={<Bookings />} />
      <Route path="/ProviderDashboard/Wallet" element={<Wallet />} />
      <Route path="/ProviderDashboard/MyProjects" element={<MyProjects />} />
      <Route path="/ProviderDashboard/Settings" element={<Settings />} />
      <Route path="/ProviderDashboard/Reviews" element={<Reviews/>}  />
      <Route path="/ProviderDashboard/Resume" element={<Resume />} />
    </Routes>
  </>
);


const EmployerDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
    </Routes>
  </>
);

const AppRouter = () => {
  const location = useLocation();

  const isProviderDashboardRoute = location.pathname.startsWith("/ProviderDashboard");
  const isEmployerDashboardRoute = location.pathname.startsWith("/EmployerDashboard");

  if (isProviderDashboardRoute) {
    return <ProviderDashboardLayout />;
  } else if (isEmployerDashboardRoute) {
    return <EmployerDashboardLayout />;
  } else {
    return <Layout />;
  }
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
