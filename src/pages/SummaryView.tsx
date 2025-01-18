import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert, Card, Button } from "react-bootstrap";
import { ArticlesService } from "../services/ArticlesService";

interface Article {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  createdAt: string;
}

const SummaryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullArticle, setShowFullArticle] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await ArticlesService.fetchArticleById(id!);
        setArticle(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch article. Please try again later.");
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {article && (
        <Card className="my-4">
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              By {article.author || "Anonymous"} on{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </Card.Subtitle>

            <Card.Text>
              <strong>Summary:</strong> <br />
              {article.summary || "No summary available."}
            </Card.Text>

            {showFullArticle && (
              <Card.Text>
                <strong>Full Article:</strong> <br />
                {article.content}
              </Card.Text>
            )}

            <Button
              variant="secondary"
              onClick={() => setShowFullArticle(!showFullArticle)}
            >
              {showFullArticle ? "Hide Full Article" : "Show Full Article"}
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SummaryView;
