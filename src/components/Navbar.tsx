import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar: React.FC = () => (
  <Navbar bg="light">
    <Container>
      <Navbar.Brand as={Link} to="/">NewsSummarizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/summarize">Summarize</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;