import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home.js";
import EventDetails from "./EventDetails.js";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <div className="row">
          <Navbar />
        </div>
        <div className="row justify-content-center">
          <Routes>
            <Route path="/test" element={<h1>Test</h1>} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>404 page not foung</h1>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
