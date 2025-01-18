import { Container, Card } from "react-bootstrap";

const Home: React.FC = () => (
  <Container>
    <h1 className="my-4">News Feed</h1>
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Example Summary Title</Card.Title>
        <Card.Text>
          This is an example of a summary that might appear on the news feed.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

export default Home;

