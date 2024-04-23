
import React from "react";

interface NewsCardProps {
  title: string;
  description?: string;
  src?: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, src, url }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px", // Increased width to 600px
        margin: "10px auto", // Center horizontally
      }}
    >
      <img
        src={src ? src : "./Images/news.jpg"}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        alt="News"
      />
      <div style={{ padding: "10px",  }}>
        <h5 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}>
          {title.slice(0, 1000)}
        </h5>
        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "10px" }}>
          {description ? description.slice(0, 200) : "Null"}
        </p>
        <a
          href={url}
          style={{
            display: "inline-block",
            backgroundColor: "#4ade80",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;

