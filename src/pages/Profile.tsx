import React from "react";
import { Container, Card } from "react-bootstrap";

const Profile: React.FC = () => (
  <Container>
    <h1 className="my-4">Profile</h1>
    <Card>
      <Card.Body>
        <Card.Title>Your Account</Card.Title>
        <Card.Text>
          This is where your account information and uploaded articles will appear.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

export default Profile;

