import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Loader from "./components/Loader";
import GlobalToast from "./components/GlobalToast";
import RouteChangeLoader from "./components/RouteChangeLoader";
import { PageTransitionProvider } from "./context/PageTransitionContext";

import Home from "./pages/Guest/Home";
import Shop from "./pages/Guest/Shop";
// import ProductDetails from "./pages/ProductDetails";
import UserCart from "./pages/User/UserCart";
import About from "./pages/Guest/About";
import Contact from "./pages/Guest/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/User/UserDashboard";
import UserShop from "./pages/User/UserShop";
import UserProductDetails from "./pages/User/UserProductDetails";
import UserCheckout from "./pages/User/UserCheckout";
import Notifications from "./pages/User/UserNotifications";
import UserProfile from "./pages/User/UserProfile";
import UserSettings from "./pages/User/UserSettings";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import FullReportPage from "./pages/admin/Report";
import AnalyticsPage from "./pages/admin/Analytics";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/AdminLogin";


import GuestLayout from "./layouts/GuestLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
//  import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  const [stage, setStage] = useState<"preload" | "flash" | "site">("preload");
  const [siteReady, setSiteReady] = useState(false);
  const isLoggedIn = localStorage.getItem("user") !== null;

  return (
    <>
      {stage === "preload" && <Preloader onFinish={() => setStage("flash")} />}
      {stage === "flash" && (
        <Loader
          onFinish={() => {
            setStage("site");
            setSiteReady(true);
          }}
        />
      )}

      {stage === "site" && (
        <PageTransitionProvider>
          <GlobalToast />
          <RouteChangeLoader siteReady={siteReady} />

          <Routes>
            {/* === GUEST AREA === */}
            <Route element={<GuestLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* === USER AREA === */}
            {isLoggedIn && (
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usershop" element={<UserShop />} />
                <Route path="/product/:id" element={<UserProductDetails />} />
                <Route path="/user-cart" element={<UserCart />} />
                <Route path="/user-checkout" element={<UserCheckout />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/settings" element={<UserSettings />} />

                {/* Add other user pages here */}
              </Route>
            )}

            {/* === ADMIN AREA === */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/report" element={<FullReportPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>
          </Routes>
        </PageTransitionProvider>
      )}
    </>
  );
}

export default App;
