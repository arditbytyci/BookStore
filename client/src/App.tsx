import "./App.css";
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

import SideBar, { links } from "./Components/SideBar";
import TopBar from "./Components/TopBar";

const App: React.FC = () => {
  return (
    <div className="App bg-background-color">
      <BrowserRouter>
        {/* Top Navbar */}
        <TopBar />

        {/* Main Content Wrapper */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-28">
            <SideBar links={links} />
          </div>

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/Home" element={<HomeView />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/BookView" element={<BookView />} />
              <Route path="/AuthorView" element={<AuthorView />} />
              <Route path="/GenreView" element={<GenreView />} />
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
