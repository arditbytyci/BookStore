import "./App.css";
import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import HomeView from "./Components/Home";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import DashboardLayout from "./Components/AdminComponents/DashboardLayout";
import SideBar, { links } from "./Components/SideBar";
import TopBar from "./Components/TopBar";
import BooksPage from "./Components/Books/BooksPage";
import BookDetails from "./Components/Books/BookDetails";
import AuthorPage from "./Components/Authors/AuthorPage";
import AuthorDetails from "./Components/Authors/AuthorDetails";

import BookList from "./Components/AdminComponents/BookManaging/BookList";

import OrderList from "./Components/AdminComponents/OrderList";
import GenreList from "./Components/AdminComponents/GenreManaging/GenreList";
import UserList from "./Components/AdminComponents/UserManaging/UserList";

import Test from "./Components/Hero";
import AuthHandler from "./Authentication/AuthHandler";

import AuthorList from "./Components/AdminComponents/AuthorManaging/AuthorList";
import CartPage from "./Components/Cart/CartPage";
import Checkout from "./Components/Cart/Checkout";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto bg-[#f0eee2]">
      <TopBar />
      <div className="flex">
        <div className="w-28">
          <SideBar links={links} />
        </div>
        <div className="py-24 px-14 overflow-y-auto w-[100%]  relative flex flex-row justify-center items-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/AuthPage");
  const navigate = useNavigate();

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/AuthPage" element={<AuthHandler />} />

        {!isAuthPage && (
          <>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomeView />} />
              <Route path="/Test" element={<Test />} />
              <Route path="/Books" element={<BooksPage />} />
              <Route path="/BookDetails/:id" element={<BookDetails />} />
              <Route path="/Authors" element={<AuthorPage />} />
              <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />
              <Route path="/Cart" element={<CartPage />} />
              <Route path="/Checkout" element={<Checkout />} />

              <Route element={<ProtectedRoute requiredRoles={["Admin"]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/Admin" element={<AdminDashboard />} />
                  {/* Admin-specific routes */}
                  <Route path="/BookList" element={<BookList />} />
                  <Route path="/AuthorList" element={<AuthorList />} />

                  <Route path="/UserList" element={<UserList />} />
                  <Route path="/OrderList" element={<OrderList />} />
                  <Route path="/GenreList" element={<GenreList />} />
                </Route>
              </Route>
            </Route>

            <Route
              path="*"
              element={
                <div className="flex flex-col justify-center items-center w-full gap-10 h-screen border border-black">
                  <h1 className="text-2xl">Page not found</h1>
                  <button
                    className="btn btn-warning text-white"
                    onClick={() => navigate("/")}
                  >
                    Return to Home
                  </button>
                </div>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
