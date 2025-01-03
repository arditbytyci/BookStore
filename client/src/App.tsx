import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";
import GenreView from "./Components/GenreView";
import OrderView from "./Components/OrderView";
import CustomerView from "./Components/CustomerView";
import OrderDetailView from "./Components/OrderDetailView";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import HomeView from "./Components/Home";
import { useAuth } from "./Authentication/AuthContext";

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

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/BookView"
            element={
              <ProtectedRoute>
                <BookView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AuthorView"
            element={
              <ProtectedRoute>
                <AuthorView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/GenreView"
            element={
              <ProtectedRoute>
                <GenreView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderView"
            element={
              <ProtectedRoute>
                <OrderView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CustomerView"
            element={
              <ProtectedRoute>
                <CustomerView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderDetailView"
            element={
              <ProtectedRoute>
                <OrderDetailView />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Home" element={<HomeView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
