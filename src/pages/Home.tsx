import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticlesService } from "../services/ArticlesService";

interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ArticlesService.fetchArticles();
        setArticles(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch articles. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">News Feed</h1>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {articles.map((article) => (
        <Card key={article._id} className="mb-3">
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              By {article.author || "Anonymous"} on{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>
              {article.content.length > 200
                ? `${article.content.substring(0, 200)}...`
                : article.content}
            </Card.Text>
            <Link to={`/summary/${article._id}`}>
              <Button variant="primary">Read More</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Home;

