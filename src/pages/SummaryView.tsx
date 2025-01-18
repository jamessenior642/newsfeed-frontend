import React from "react";
import { Container, Card } from "react-bootstrap";

interface SummaryViewProps {
  summary: string;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => (
  <Container>
    <h1 className="my-4">Article Summary</h1>
    <Card>
      <Card.Body>
        <Card.Text>{summary || "Summary content will be displayed here."}</Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

export default SummaryView;

