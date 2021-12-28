import "./Navbar.js";
import Navbar from "./Navbar.js";
import Map from "./Map";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row justify-content-center">
        <Map />
      </div>
    </div>
  );
}

export default App;
