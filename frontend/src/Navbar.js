function Navbar(props) {
  return (
    <nav className="navbar navbar-expand bg-info">
      <div className="container-fluid">
        <a className="navbar-brand text-dark" href="./">
          EventFin
        </a>
        <div className=" navbar-expand">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-dark" aria-current="page" href="./">
                Linkki1
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="./">
                Linkki2
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
