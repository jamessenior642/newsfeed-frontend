import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AppNavbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  
  // Function to handle login redirect
  // const handleLoginRedirect = () => {
  //   const currentUrl = encodeURIComponent(`http://localhost:3000${window.location.pathname}`); // URL encode the current URL
  //   window.location.href = `http://localhost:3001/auth/google?returnTo=${currentUrl}`; // Redirect with encoded returnTo param
  // };  

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">News Summarizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/profile">{user?.name || "Profile"}</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link href="/summarize">Summarize</Nav.Link>
              </>
            ) : (
              <Nav.Link href="http://localhost:3001/auth/google">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;