import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { ArticlesService } from "../services/ArticlesService";

const Summarize: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("Anonymous");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setSummary(null);
    setLoading(true);

    try {
      // Get the summary from the AI service
      const generatedSummary = await ArticlesService.getSummary(content);

      // Upload the article along with the generated summary to the Node.js server
      const savedArticle = await ArticlesService.uploadArticle(title, content, author, generatedSummary);

      setSuccessMessage(`Article "${savedArticle.title}" uploaded successfully!`);

      // Set the generated summary in the state to display it
      setSummary(savedArticle.summary);

      // Clear the form fields
      setTitle("");
      setContent("");
      setAuthor("Anonymous");
    } catch (error: any) {
      setErrorMessage("Failed to upload the article or generate the summary. Please try again.");
    } finally {
      setLoading(false);
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
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? "Generating Summary..." : "Submit"}
        </Button>
      </Form>
      {summary && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Generated Summary</Card.Title>
            <Card.Text>{summary}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Summarize;
