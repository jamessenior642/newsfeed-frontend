
interface SummaryViewProps {
  summary: string;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => (
  <div className="container">
    <h1>Article Summary</h1>
    <p>{summary || "Summary content will be displayed here."}</p>
  </div>
);

export default SummaryView;
