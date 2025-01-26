import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginHandler from "./Components/Login/loginHandler";
import RegisterHandler from "./Components/Register/handleRegister";
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
import CartPage from "./Components/Cart/CartPage";
import BookList from "./Components/AdminComponents/BookManaging/BookList";
import AuthorList from "./Components/AdminComponents/AuthorManaging/AuthorList";
import OrderList from "./Components/AdminComponents/OrderList";
import GenreList from "./Components/AdminComponents/GenreManaging/GenreList";
import UserList from "./Components/AdminComponents/UserManaging/UserList";
import CheckOutPage from "./Components/Cart/CheckoutForm";
import Test from "./Components/test";

const App: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  const hidden =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App bg-[#f0eee2] flex flex-col h-screen overflow-auto">
      {hidden ? (
        <>
          <div className="flex justify-center items-center bg-background-color height-[100vh]">
            {/* LOGIN */}
            <Routes>
              <Route path="/Login" element={<LoginHandler />} />

              {/* REGISTER */}
              <Route path="/Register" element={<RegisterHandler />} />
            </Routes>
            {/* <button onClick={() => navigate("/home")}>Go back</button> */}
          </div>
        </>
      ) : (
        <>
          <TopBar />
          <div className="flex">
            {/* Sidebar */}
            <div className="w-28">
              <SideBar links={links} />
            </div>

            {/* Main Content */}

            <div className="flex flex-col py-20 px-16 bg-background-color overflow-y-auto height-[100vh]">
              <Routes>
                <Route path="/Home" element={<HomeView />} />

                <Route path="/Test" element={<Test />} />

                {/*BOOK*/}
                <Route path="/Books" element={<BooksPage />} />
                <Route path="/BookDetails/:id" element={<BookDetails />} />
                {/* AUTHOR */}
                <Route path="/Authors" element={<AuthorPage />} />
                <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />

                <Route path="/Cart" element={<CartPage />} />
                <Route path="/Checkout" element={<CheckOutPage />} />

                <Route element={<ProtectedRoute requiredRoles={["Admin"]} />}>
                  <Route element={<DashboardLayout />}>
                    <Route path="/Admin" element={<AdminDashboard />} />
                    <Route path="/BookList" element={<BookList />} />
                    <Route path="/AuthorList" element={<AuthorList />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/OrderList" element={<OrderList />} />
                    <Route path="/GenreList" element={<GenreList />} />
                    {/* <Route
                      path="/OrderDetailView"
                      element={<OrderDetails />}
                    /> */}
                  </Route>
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
