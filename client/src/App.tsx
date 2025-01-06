import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";
import GenreView from "./Components/GenreView";
import OrderView from "./Components/OrderView";
import CustomerView from "./Components/CustomerView";
import OrderDetailView from "./Components/OrderDetailView";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import HomeView from "./Components/Home";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import DashboardLayout from "./Components/AdminComponents/DashboardLayout";
import NavBar, { links } from "./Components/NavBar";
const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="App bg-custom-gradient-bg min-h-screen">
      <BrowserRouter>
        <NavBar links={links} />

        <div className="flex">
          {/* Sidebar / Drawer */}
          <div
            className={`fixed top-0 left-0 z-20 h-full bg-custom-gradient transition-transform duration-300 ${
              drawerOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
            }`}
          >
            <ul className="menu p-4 text-base-content min-h-full block text-center mt-20">
              <div className="mt-20 space-y-12 text-custom-text-color text-lg">
                <li>Account</li>
                <li>My Orders</li>
                <li>Favorites</li>
                <li>Settings</li>
              </div>
            </ul>

            {/* Arrow Button */}
            {drawerOpen && (
              <button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-base-100 shadow-md"
                onClick={toggleDrawer}
                aria-label="Close Drawer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              drawerOpen ? "ml-64" : "ml-0"
            }`}
          >
            <div className="p-4">
              {/* Open Drawer Button */}
              {!drawerOpen && (
                <button className="btn btn-primary" onClick={toggleDrawer}>
                  Open Drawer
                </button>
              )}
            </div>
            <Routes>
              {/* Public Routes */}
              <Route path="/Home" element={<HomeView />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/BookView" element={<BookView />} />
              <Route path="/AuthorView" element={<AuthorView />} />
              <Route path="/GenreView" element={<GenreView />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute requiredRoles={["Admin"]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/Admin" element={<AdminDashboard />} />
                  <Route path="/OrderView" element={<OrderView />} />
                  <Route path="/CustomerView" element={<CustomerView />} />
                  <Route
                    path="/OrderDetailView"
                    element={<OrderDetailView />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
