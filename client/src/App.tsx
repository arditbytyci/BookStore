import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";
import GenreView from "./Components/GenreView";
import OrderView from "./Components/OrderView";
import CustomerView from "./Components/CustomerView";
import OrderDetailView from "./Components/OrderDetailView";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="navbar bg-base-100">
            <div className="flex-2">
              {" "}
              <Link to="/BookView" className="btn btn-ghost text-xl">
                Books
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
          </div>
          <Routes>
            <Route path="/BookView" element={<BookView />} />
            <Route path="/AuthorView" element={<AuthorView />} />
            <Route path="/GenreView" element={<GenreView />} />
            <Route path="/OrderView" element={<OrderView />} />
            <Route path="/CustomerView" element={<CustomerView />} />
            <Route path="/OrderDetailView" element={<OrderDetailView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
