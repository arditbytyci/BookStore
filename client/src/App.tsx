import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BookView from "./Components/BookView";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">
                {" "}
                <Link to="/BookView">Books</Link>
              </a>
            </div>
            <div className="flex-none"></div>
          </div>
          <Routes>
            <Route path="/BookView" element={<BookView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
