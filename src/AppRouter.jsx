
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
// import Login from "./pages/Login/Login";
// import Services from "./pages/Services/Services";
// import EmployerSignUp from "./pages/EmployerSignUp/EmployerSignUp";
// import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";
// import Footer from "./components/Footer/Footer";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Sidenav from "./components/Sidenav/Sidenav";

// import './App.css'
// const Layout = () => {

// const location = useLocation();

// const hideNavbarPaths = ["/ServiceProviderSignUp", "/Login", "/Dashboard"];
// const hideFooterPaths = ["/ServiceProviderSignUp", "/Login", "/Dashboard"];
// const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
// const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

//   return (
//     <>
//       {shouldShowNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" index element={<Navigate to="/Home" />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/Services" element={<Services />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/EmployerSignUp" element={<EmployerSignUp />} />
//         <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp />} />
//       </Routes>
//       {shouldShowFooter && <Footer />}
//     </>
//   );
// };

// const DashboardLayout = () => (
//   <div className="dashboardContainer">
//     <Sidenav />
//     <Routes>
//       <Route path="/Dashboard" element={<Dashboard />} />
//     </Routes>
//   </div>
// );

// const AppRouter = () => {
//   return (
//     <Router>
//       <Layout />
//       <DashboardLayout />
//     </Router>
//   );
// };

// export default AppRouter;



import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Services from "./pages/Services/Services";
import EmployerSignUp from "./pages/EmployerSignUp/EmployerSignUp";
import ServiceProviderSignUp from "./pages/ServiceProviderSignUp/ServiceProviderSignUp";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidenav from "./components/Sidenav/Sidenav";

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
  <div className="dashboardContainer">
    <Sidenav />
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  </div>
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
