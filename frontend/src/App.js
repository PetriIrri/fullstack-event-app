import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Navbar.js";
import Navbar from "./Navbar.js";
import Map from "./Map";

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <div className="row">
          <Navbar />
        </div>
        <div className="row justify-content-center">
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/test" element={<h1>Test</h1>} />
            <Route path="*" element={<h1>404 page not foung</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
