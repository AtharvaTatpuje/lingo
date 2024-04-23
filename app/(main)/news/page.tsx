// components/News.tsx
"use client";
import React, { useState, useEffect } from "react";
import NewsCard from "@/app/(main)/news/NewsCard";
import Image from "next/image";

interface Article {
  title: string;
  description?: string;
  urlToImage?: string;
  url: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const NEWS_API_KEY: string = "e522c74a61004e8f84c05b0c1bbd7c15";
      const pageSize: number = 10;
      const keywords: string[] = ["finance", "economy", "stocks"];
      const keywordQuery: string = keywords.join("+");
      const url: string = `https://newsapi.org/v2/everything?q=${keywordQuery}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5", // Set background color
        padding: "20px", // Add padding
        borderRadius: "10px", // Add border radius
 
      }}
      
      className="container mt-5"
    >
        
        
      <div className="w-full flex flex-col items-center"
      >
         <Image
            src="/news.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Latest News
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
          Discover the World Through Us
          </p>

      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {articles.map((news, index) => (
            <div key={index} className="col">
              <NewsCard
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
