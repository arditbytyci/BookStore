import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BookView from "./Components/BookView";
import AuthorView from "./Components/AuthorView";

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
            </div>
          </div>
          <Routes>
            <Route path="/BookView" element={<BookView />} />
            <Route path="/AuthorView" element={<AuthorView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
