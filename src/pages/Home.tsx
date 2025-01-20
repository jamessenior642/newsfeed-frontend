import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticlesService } from "../services/ArticlesService";

interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  userId: string;
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
    <Container className="py-4">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Times New Roman', fontWeight: "bold", color: "#333" }}>
        News Feed
      </h1>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && articles.length === 0 && (
        <Alert variant="info" className="text-center">
          No articles available. Check back later!
        </Alert>
      )}
      <Row>
        {articles.map((article) => (
          <Col md={6} lg={4} className="mb-4" key={article._id}>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate" style={{ fontWeight: "bold" }}>
                  {article.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By{" "}
                  {article.userId ? 
                  (<Link to={`/profile/${article.userId}`}>
                    {article.author}
                  </Link>) : "Anonymous"
                  }
                  {" "}
                  on {new Date(article.createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1" style={{ color: "#555" }}>
                  {article.content.length > 150
                    ? `${article.content.substring(0, 150)}...`
                    : article.content}
                </Card.Text>
                <Link to={`/summary/${article._id}`} className="mt-auto">
                  <Button variant="primary" className="w-100">
                    Read More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;


