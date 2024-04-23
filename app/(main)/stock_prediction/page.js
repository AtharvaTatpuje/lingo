"use client"
import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Image from "next/image";

Chart.register(...registerables);

const GraphComponent = () => {
  const [graphData, setGraphData] = useState(null);
  const [symbol, setSymbol] = useState(""); 
  const [predictedPrice, setPredictedPrice] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/predict?symbol=${symbol}`
      );
      setGraphData(response.data);
      if (response.data && response.data.result.prices.length > 0) {
        setPredictedPrice(response.data.result.prices.slice(-1)[0]);
      }
      setSymbol("");
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (symbol) {
      await fetchData();
    }
  };

  return (
    
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
            <div className="w-full flex flex-col items-center">  
    <Image
src="/machinelearning.svg"
alt="machinelearning"
height={90}
width={90}
/>
<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
Stock Price Predictor
</h1>
<p className="text-muted-foreground text-center text-lg mb-6">
It's far better to buy a wonderful company at a fair price, than a fair company at a wonderful price
</p>
</div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex" }}>
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#4ade80", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
          Submit
        </button>
      </form>
      {predictedPrice && (
        <div style={{ marginBottom: "20px" }}>
          <h2> Tomorrow's Predicted Price</h2>
          <p>{predictedPrice}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {graphData && (
        <div style={{ border: "1px solid #ccc", borderRadius: "5px", height: "700px" }}>
          <Line
            data={{
              labels: graphData.result.labels,
              datasets: [
                {
                  label: "Price",
                  data: graphData.result.prices,
                  fill: false,
                  borderColor: "pink",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                  },
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Price",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
