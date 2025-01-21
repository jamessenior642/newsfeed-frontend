import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, Row, Col, Card } from "react-bootstrap";
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

  // Split articles into featured and other categories
  const headlineArticle = articles[0]; // First article as the headline
  const featuredArticles = articles.slice(1, 4); // Next three articles
  const otherArticles = articles.slice(4); // Remaining articles

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4" style={{ fontFamily: "Times New Roman", fontWeight: "bold", color: "#333" }}>
        Recent News
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

      {!loading && !error && (
        <>
          {/* Headline Article */}
          {headlineArticle && (
            <div className="headline-article mb-5">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title as="h2" style={{ fontFamily: "Times New Roman, serif", fontWeight: "bold" }}>
                    {headlineArticle.title}
                  </Card.Title>
                  <Card.Subtitle className="text-muted mb-3">
                    By{" "}
                    {headlineArticle.userId ? (
                      <Link to={`/profile/${headlineArticle.userId}`} style={{ textDecoration: "none" }}>
                        {headlineArticle.author}
                      </Link>
                    ) : (
                      "Anonymous"
                    )}{" "}
                    on {new Date(headlineArticle.createdAt).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                    {headlineArticle.content.length > 300
                      ? `${headlineArticle.content.substring(0, 300)}...`
                      : headlineArticle.content}
                  </Card.Text>
                  <Link to={`/summary/${headlineArticle._id}`}>
                    <span style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}>
                      Read More
                    </span>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          )}

          {/* Featured Articles */}
          <Row className="mb-5">
            {featuredArticles.map((article) => (
              <Col md={4} key={article._id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title as="h5" style={{ fontFamily: "Times New Roman, serif", fontWeight: "bold" }}>
                      {article.title}
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      By{" "}
                      {article.userId ? (
                        <Link to={`/profile/${article.userId}`} style={{ textDecoration: "none" }}>
                          {article.author}
                        </Link>
                      ) : (
                        "Anonymous"
                      )}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: "0.95rem", color: "#555" }}>
                      {article.content.length > 200
                        ? `${article.content.substring(0, 200)}...`
                        : article.content}
                    </Card.Text>
                    <Link to={`/summary/${article._id}`}>
                      <span style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}>
                        Read More
                      </span>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Other Articles */}
          <div className="other-articles">
            <h3 className="mb-4" style={{ fontFamily: "Times New Roman", fontWeight: "bold", color: "#333" }}>
              More Articles
            </h3>
            <Row>
              {otherArticles.map((article) => (
                <Col md={6} lg={4} key={article._id} className="mb-4">
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <Card.Title
                        className="text-truncate"
                        style={{ fontFamily: "Times New Roman, serif", fontWeight: "bold" }}
                      >
                        {article.title}
                      </Card.Title>
                      <Card.Subtitle className="text-muted mb-2">
                        By{" "}
                        {article.userId ? (
                          <Link to={`/profile/${article.userId}`} style={{ textDecoration: "none" }}>
                            {article.author}
                          </Link>
                        ) : (
                          "Anonymous"
                        )}
                      </Card.Subtitle>
                      <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
                        {article.content.length > 150
                          ? `${article.content.substring(0, 150)}...`
                          : article.content}
                      </Card.Text>
                      <Link to={`/summary/${article._id}`}>
                        <span style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}>
                          Read More
                        </span>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
