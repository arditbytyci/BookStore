import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import GenreView from "./Components/GenreView";
import OrderView from "./Components/OrderView";
import CustomerView from "./Components/CustomerView";
import OrderDetailView from "./Components/OrderDetailView";
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

const App: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  const hidden =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App bg-background-color">
      {hidden ? (
        <>
          <div className="loginRegister-container">
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

            <div className="main-content overflow-scroll">
              <Routes>
                <Route path="/Home" element={<HomeView />} />

                {/*BOOK*/}
                <Route path="/Books" element={<BooksPage />} />
                <Route path="/BookDetails/:id" element={<BookDetails />} />
                {/* AUTHOR */}
                <Route path="/Authors" element={<AuthorPage />} />
                <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />

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
        </>
      )}
    </div>
  );
};

export default App;
