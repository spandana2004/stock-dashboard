import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';

// --- Added for serving static files in production ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------------------

const app = express();

app.use(cors());

const PORT = 5000;

// =========================================================
// IMPORTANT: Replace "MY_api" with your actual Twelve Data API Key!
// =========================================================
const TWELVE_DATA_API_KEY = "8fd1687929d04a8db9640bb7c0ab8900";

// Define the stocks you want to fetch
const stocks = ["IBM", "AAPL", "TSLA", "MSFT"];

// Helper function to introduce a delay (important for API rate limits)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Added for serving static files in production ---
// Serve static files from the React build folder when in production environment
if (process.env.NODE_ENV === 'production') {
    // Resolve the path to the 'build' folder which is sibling to 'server'
    const buildPath = path.join(__dirname, '../build');
    app.use(express.static(buildPath));

    // For any other GET request not caught by the API routes, serve the React app's index.html
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
}
// ----------------------------------------------------

// Define an API endpoint to fetch stock data
app.get("/api/stocks", async (req, res) => {
    try {
        const results = [];
        let requestCount = 0; // To help manage rate limits if needed

        for (const stock of stocks) {
            // Twelve Data free tier usually has 8 req/min.
            // A delay of 1 second (1000ms) between requests for 4 stocks is 4 seconds,
            // which respects the 8 req/min limit (you can make 8 requests in 60s).
            if (requestCount > 0) { // Don't delay before the very first request
                await sleep(1000); // Wait for 1 second between each stock request
            }
            requestCount++;

            // Twelve Data "quote" endpoint for real-time data
            const response = await axios.get(
                `https://api.twelvedata.com/quote?symbol=${stock}&apikey=${TWELVE_DATA_API_KEY}`
            );

            const data = response.data;

            // Check if data is valid and not an error
            if (data && data.symbol && data.status !== 'error') {
                results.push({
                    symbol: data.symbol,
                    price: data.close ? parseFloat(data.close).toFixed(2) : 'N/A', // 'close' is often the current price for quote endpoint
                    change: data.change ? parseFloat(data.change).toFixed(2) : 'N/A',
                    changePercent: data.percent_change ? parseFloat(data.percent_change).toFixed(2) : 'N/A'
                });
            } else {
                // If data is not found, or it's an API error
                console.warn(`Could not fetch data for ${stock} from Twelve Data. Response:`, data);
                results.push({
                    symbol: stock,
                    price: "N/A",
                    change: "N/A",
                    changePercent: "N/A",
                    error: data.message || "Failed to retrieve data from Twelve Data"
                });
            }
        }

        res.json(results);

    } catch (error) {
        // Catch any errors during the API calls (e.g., network issues)
        console.error("Error fetching Twelve Data:", error.message);
        res.status(500).json({
            error: "Failed to fetch stock data from Twelve Data",
            details: error.message
        });
    }
});

// Start the backend server
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});