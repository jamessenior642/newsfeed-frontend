import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Summarize: React.FC = () => {
  const [article, setArticle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article submitted:", article);
  };

  return (
    <Container>
      <h1 className="my-4">Summarize an Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="articleInput">
          <Form.Label>Paste your article</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Generate Summary
        </Button>
      </Form>
    </Container>
  );
};

export default Summarize;

