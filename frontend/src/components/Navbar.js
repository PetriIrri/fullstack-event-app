import { Link } from "react-router-dom";

/**
 * Component for showing navbar at the top of the page.
 * @author Petri Irri
 * @requires react-router-dom
 * @component
 * @example
 * <Navbar />
 */
function Navbar(props) {
  return (
    <nav className="navbar navbar-expand bg-info">
      <div className="container-fluid">
        <a className="navbar-brand text-dark" href="/">
          EventFin
        </a>
        <div className=" navbar-expand">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark">
                Etusivu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
