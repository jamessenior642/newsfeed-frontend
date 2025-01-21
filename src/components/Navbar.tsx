import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const AppNavbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Navbar className="border-bottom shadow-sm" variant="light" bg="white" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" style={{ fontFamily: 'Times New Roman', fontWeight: "bold", fontSize: "1.5rem" }}>NewsSummarizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href={`/profile/${user?._id}`}>Profile</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link href="/summarize">
                  <Button size="sm">Summarize</Button>
                </Nav.Link>
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