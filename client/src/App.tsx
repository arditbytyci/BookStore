import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";
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

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

            <div className="main-content">
              <Routes>
                <Route path="/Home" element={<HomeView />} />

                {/*BOOK*/}
                <Route path="/Books" element={<BookView />} />

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
        </>
      )}
    </div>
  );
};

export default App;

// {/* <TopBar />

// {/* Main Content Wrapper */}
// <div className="flex">
//   {/* Sidebar */}
//   <div className="w-28">
//     <SideBar links={links} />
//   </div>

//   {/* Main Content */}

//   <div className="main-content">
//     <Routes>
//       <Route path="/Home" element={<HomeView />} />

//       {/* LOGIN */}
//       <Route path="/Login" element={<LoginHandler />} />

//       {/* REGISTER */}
//       <Route path="/Register" element={<RegisterHandler />} />

//       {/*BOOK*/}
//       <Route path="/Books" element={<BookView />} />

//       <Route path="/AuthorView" element={<AuthorView />} />
//       <Route path="/GenreView" element={<GenreView />} />
//       <Route element={<ProtectedRoute requiredRoles={["Admin"]} />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="/Admin" element={<AdminDashboard />} />
//           <Route path="/OrderView" element={<OrderView />} />
//           <Route path="/CustomerView" element={<CustomerView />} />
//           <Route
//             path="/OrderDetailView"
//             element={<OrderDetailView />}
//           />
//         </Route>
//       </Route>
//     </Routes>
//   </div>
// </div> */}
