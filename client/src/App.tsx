import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-2">
        <Link to="/BookView" className="btn btn-ghost text-xl">
          Books
        </Link>
        <Link to="/Home" className="btn btn-ghost text-xl">
          Home
        </Link>
        <Link to="/AuthorView" className="btn btn-ghost text-xl">
          Authors
        </Link>
        <Link to="/GenreView" className="btn btn-ghost text-xl">
          Genre
        </Link>
        <Link to="/OrderView" className="btn btn-ghost text-xl">
          Order
        </Link>
        <Link to="/CustomerView" className="btn btn-ghost text-xl">
          Customer
        </Link>
        <Link to="/OrderDetailView" className="btn btn-ghost text-xl">
          OrderDetail
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={logout} className="btn btn-warning">
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
