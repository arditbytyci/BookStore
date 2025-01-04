import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./Authentication/AuthContext";
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

const links = {
  Customer: [
    { path: "/Home", label: "Home" },
    { path: "/BookView", label: "Books" },
    { path: "/AuthorView", label: "Authors" },
    { path: "/GenreView", label: "Genre" },
  ],
  Admin: [{ path: "/Admin", label: "Admin Dashboard" }],
};

const Navbar: React.FC = () => {
  const { isLoggedIn, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-2">
        {role && // Ensure role is not null
          links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="btn btn-ghost text-xl"
            >
              {link.label}
            </Link>
          ))}
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/Home" element={<HomeView />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/BookView" element={<BookView />} />
          <Route path="/AuthorView" element={<AuthorView />} />
          <Route path="/GenreView" element={<GenreView />} />

          {/* Protected Routes */}
          <Route
            path="/OrderView"
            element={
              <ProtectedRoute requiredRoles={["Admin"]}>
                <OrderView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute requiredRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CustomerView"
            element={
              <ProtectedRoute requiredRoles={["Admin"]}>
                <CustomerView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderDetailView"
            element={
              <ProtectedRoute requiredRoles={["Admin"]}>
                <OrderDetailView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
