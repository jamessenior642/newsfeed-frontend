import React, { useState } from "react";

const Summarize = () => {
  const [article, setArticle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article submitted:", article);
  };

  return (
    <div className="container">
      <h1>Summarize an Article</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows={10}
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Paste your article here..."
        />
        <button className="btn btn-primary mt-3" type="submit">
          Generate Summary
        </button>
      </form>
    </div>
  );
};

export default Summarize;
