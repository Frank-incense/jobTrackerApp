import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  function handleClick() {
    sessionStorage.clear();
    navigate("/login");
  }

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">JobTracker</div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/job-listing" className={({ isActive }) => isActive ? "active" : ""}>
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className={({ isActive }) => isActive ? "active" : ""}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications" className={({ isActive }) => isActive ? "active" : ""}>
            Applications
          </NavLink>
        </li>
      </ul>

      <div className="navbar-actions">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
        <button type="button" className="logout-btn" onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;






