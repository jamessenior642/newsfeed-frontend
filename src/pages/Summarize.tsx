import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { ArticlesService } from "../services/ArticlesService";

const Summarize: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("Anonymous");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await ArticlesService.uploadArticle(title, content, author);
      setSuccessMessage(`Article "${response.title}" uploaded successfully!`);
      setErrorMessage(null);
      setTitle("");
      setContent("");
      setAuthor("Anonymous");
    } catch (error: any) {
      setErrorMessage("Failed to upload the article. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Summarize an Article</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="articleTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of the article"
          />
        </Form.Group>
        <Form.Group controlId="articleAuthor" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the author's name (optional)"
          />
        </Form.Group>
        <Form.Group controlId="articleContent" className="mt-3">
          <Form.Label>Article Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste the article content here..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Upload Article
        </Button>
      </Form>
    </Container>
  );
};

export default Summarize;
