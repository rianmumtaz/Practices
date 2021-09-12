import { Link } from "react-router-dom";

const NavBarHome = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Eucalc
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/database">
                Database
              </Link>
            </li>
          </ul>
          <Link className="nav-link btn btn-dark active" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;
