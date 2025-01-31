// Profile.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, ListGroup, Alert, Button } from "react-bootstrap";
import { UserService } from "../services/UserService";
import { ArticlesService } from "../services/ArticlesService";  // <-- Import here
import { useAuth } from "../contexts/AuthContext";

interface Article {
  _id: string;
  title: string;
  summary: string;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  _id: string;
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: loggedInUser } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isOwnProfile = loggedInUser?._id === userId;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userProfile, userArticles] = await Promise.all([
          UserService.fetchUserProfile(userId!),
          UserService.fetchUserArticles(userId!),
        ]);

        setProfileUser(userProfile);
        setArticles(userArticles);
      } catch (error: any) {
        console.error(error);
        setError("Failed to load profile. Please try again.");
      }
    };

    if (userId) fetchProfileData();
  }, [userId]);

  // DELETE handler
  const handleDelete = async (articleId: string) => {
    try {
      // Call the service to delete the article
      await ArticlesService.deleteArticle(articleId);

      // Update local state so we remove the deleted article from the array
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch (err: any) {
      console.error("Error deleting article:", err);
      setError("Failed to delete article. Please try again.");
    }
  };

  return (
    <Container>
      <h1 className="my-4">{profileUser?.name || "Profile"}</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{profileUser?.name || "User Profile"}</Card.Title>
          <Card.Text>Email: {profileUser?.email}</Card.Text>
          {isOwnProfile && <Card.Text>This is your account.</Card.Text>}
        </Card.Body>
      </Card>

      {articles.length > 0 ? (
        <ListGroup>
          {articles.map((article) => (
            <ListGroup.Item key={article._id}>
              <h5>{article.title}</h5>
              <p>{article.summary}</p>
              <small>
                Uploaded on: {new Date(article.createdAt).toLocaleDateString()}
              </small>
              {isOwnProfile && (
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">
          {isOwnProfile
            ? "You haven’t uploaded any articles yet."
            : `${profileUser?.name || "This user"} hasn’t uploaded any articles yet.`}
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
