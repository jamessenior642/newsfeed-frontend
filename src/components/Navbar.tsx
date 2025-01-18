import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">NewsSummarizer</Link>
    <div className="navbar-nav">
      <Link className="nav-item nav-link" to="/">Home</Link>
      <Link className="nav-item nav-link" to="/summarize">Summarize</Link>
      <Link className="nav-item nav-link" to="/profile">Profile</Link>
    </div>
  </nav>
);

export default Navbar;