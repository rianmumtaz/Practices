import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Welcome</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about1">About1</Link>
        </li>
        <li>
          <Link to="/about2">About2</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
