import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
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
    <Container className="py-5 d-flex flex-column align-items-center">
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
      {article && (
        <div
          className="article-view text-center"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <header className="mb-4">
            <h1
              className="article-title"
              style={{
                fontFamily: "Times New Roman, serif",
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "10px",
              }}
            >
              {article.title}
            </h1>
            <p
              className="article-meta text-muted"
              style={{
                fontSize: "1rem",
                fontStyle: "italic",
              }}
            >
              By <strong>{article.author || "Anonymous"}</strong> |{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </header>
          <section className="article-summary mb-4">
            <h4
              className="mb-3"
              style={{
                fontFamily: "Times New Roman, serif",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              Summary
            </h4>
            <p style={{ fontSize: "1.1rem", textAlign: "justify" }}>
              {article.summary || "No summary available for this article."}
            </p>
          </section>
          {showFullArticle && (
            <section className="article-content mt-5">
              <h4
                className="mb-3"
                style={{
                  fontFamily: "Times New Roman, serif",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Full Article
              </h4>
              <p style={{ fontSize: "1.1rem", textAlign: "justify" }}>
                {article.content}
              </p>
            </section>
          )}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={() => setShowFullArticle(!showFullArticle)}
              className="toggle-full-article-btn"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              {showFullArticle ? "Hide Full Article" : "Read Full Article"}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SummaryView;
