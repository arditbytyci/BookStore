import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./Authentication/AuthContext"; // Import your AuthContext
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";
import GenreView from "./Components/GenreView";
import OrderView from "./Components/OrderView";
import CustomerView from "./Components/CustomerView";
import OrderDetailView from "./Components/OrderDetailView";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import HomeView from "./Components/Home";
import ProtectedRoute from "../src/Authentication/ProtectedRoute";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";

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
        <Link to="/Home" className="btn btn-ghost text-xl">
          Home
        </Link>
        <Link to="/BookView" className="btn btn-ghost text-xl">
          Books
        </Link>
        <Link to="/AuthorView" className="btn btn-ghost text-xl">
          Authors
        </Link>
        <Link to="/GenreView" className="btn btn-ghost text-xl">
          Genre
        </Link>

        {role === "Admin" && (
          <>
            <Link to="/OrderView" className="btn btn-ghost text-xl">
              Order
            </Link>
            <Link to="/CustomerView" className="btn btn-ghost text-xl">
              Customer
            </Link>
            <Link to="/OrderDetailView" className="btn btn-ghost text-xl">
              OrderDetail
            </Link>
            <Link to="/Admin" className="btn btn-ghost text-xl">
              Admin Dashboard
            </Link>
          </>
        )}
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
          <Route path="/Home" element={<HomeView />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />

          {/* Public Routes */}
          <Route path="/BookView" element={<BookView />} />
          <Route path="/AuthorView" element={<AuthorView />} />
          <Route path="/GenreView" element={<GenreView />} />

          {/* Protected Routes with Role Check */}
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
