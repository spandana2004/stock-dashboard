import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Assuming you might have some basic CSS in App.css

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    try {
      // The proxy in package.json will redirect /api/stocks to http://localhost:5000/api/stocks
      const response = await axios.get("/api/stocks");
      setStocks(response.data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError("Failed to fetch stock data. Please try again later.");
      setStocks([]); // Clear any old stock data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(); // Fetch stocks when the component mounts
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>📈 Live Stock Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button
          onClick={fetchStocks}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Stocks"}
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center", fontSize: "1.1em" }}>{error}</p>}
      {loading && stocks.length === 0 && !error && <p style={{ textAlign: "center", fontSize: "1.1em" }}>Loading stocks...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Slightly larger cards
          gap: "25px", // Slightly more gap
          maxWidth: "1200px",
          margin: "0 auto", // Center the grid
        }}
      >
        {stocks.map((stock, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "25px", // More padding
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)", // Softer shadow
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h2 style={{ margin: "0 0 10px 0", color: "#222", fontSize: "1.8em" }}>{stock.symbol}</h2>
            <h3 style={{ margin: "0 0 15px 0", color: "#007bff", fontSize: "2.2em" }}>
              {stock.price !== "N/A" ? `$${parseFloat(stock.price).toFixed(2)}` : "N/A"}
            </h3>
            <p
              style={{
                margin: "0",
                fontSize: "1.1em",
                color: stock.change && parseFloat(stock.change) >= 0 ? "#28a745" : "#dc3545", // Green for positive, red for negative
                fontWeight: "bold"
              }}
            >
              Change: {stock.change !== "N/A" ? parseFloat(stock.change).toFixed(2) : "N/A"}
            </p>
          </div>
        ))}
        {!loading && stocks.length === 0 && !error && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>No stock data available. Please refresh or check the backend.</p>
        )}
      </div>
    </div>
  );
}

export default App;