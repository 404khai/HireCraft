
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import FAQS from "./pages/FAQS/FAQS";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import BrowseFreelancers from "./pages/BrowseFreelancers/BrowseFreelancers";
import ClientSignUp from "./pages/ClientSignUp/ClientSignUp";
import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";
import Footer from "./components/Footer/Footer";
import ProviderDashboard from "./pages/ProviderDashboard/ProviderDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
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
import Profile from "./pages/Profile/Profile";
import ClientBookings from "./pages/ClientBookings/ClientBookings";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Kanban from "./pages/Kanban/Kanban";
import Notifications from "./pages/Notifications/Notifications";
import PasswordResetModal from "./pages/PasswordResetModal/PasswordResetModal";
import PaymentFlow from "./pages/PaymentPage/PaymentPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/ServiceProviderSignUp", "/ClientSignUp", "/Login", "/ProviderDashboard", "/ClientDashboard", "/AdminDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/PaymentPage"];
  const hideFooterPaths = ["/Home", "/ServiceProviderSignUp", "/ClientSignUp", "/Login", "/ProviderDashboard", "/ClientDashboard", "/AdminDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/PaymentPage"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" index element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/BrowseFreelancers" element={<BrowseFreelancers />} />
        <Route path="/FAQS" element={<FAQS />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ClientSignUp" element={<ClientSignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp />} />
        <Route path="/ProviderProfile/:id" element={<ProviderProfile />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/PasswordResetModal" element={<PasswordResetModal />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
};

const ProviderDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/ProviderDashboard" element={<ProviderDashboard />} />
      <Route path="/ProviderDashboard/Bookings" element={<Bookings />} />
      <Route path="/ProviderDashboard/Wallet" element={<Wallet />} />
      <Route path="/ProviderDashboard/Kanban" element={<Kanban />} />
      <Route path="/ProviderDashboard/MyProjects" element={<MyProjects />} />
      <Route path="/ProviderDashboard/Resume" element={<Resume />} />
    </Routes>
  </>
);


const ClientDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/ClientDashboard" element={<ClientDashboard />} />
      {/* <Route path="/ClientDashboard/PaymentPage" element={<PaymentPage />} /> */}
      <Route path="/ClientDashboard/Bookings" element={<ClientBookings />} />
    </Routes>
  </>
);


const SharedDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/Dashboard/Messages" element={<Messages />} />
      <Route path="/Dashboard/Settings" element={<Settings />} />
      <Route path="/Dashboard/Reviews" element={<Reviews />} />
    </Routes>
  </>
);


const AppRouter = () => {
  const location = useLocation();

  const isProviderDashboardRoute = location.pathname.startsWith("/ProviderDashboard");
  const isClientDashboardRoute = location.pathname.startsWith("/ClientDashboard");
  const isSharedRoute = location.pathname.startsWith("/Dashboard");

  if (isProviderDashboardRoute) {
    return <ProviderDashboardLayout />;
  } else if (isClientDashboardRoute) {
    return <ClientDashboardLayout />;
  } else if (isSharedRoute) {
    return <SharedDashboardLayout />;
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
