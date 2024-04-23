const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const finnhub = require("finnhub");
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config({ path: "/Users/atharvatatpuje/lingo/.env" });

const app = express();
const PORT = process.env.PORT || 8000;

// Function to execute Python scripts
const executePython = async (script, args) => {
  const arguments = args.map((arg) => arg.toString());
  const py = spawn("python", [script, ...arguments]);
  let output = '';

  const result = await new Promise((resolve, reject) => {
    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error(`[python] Error occurred: ${data}`);
      reject(`Error occurred in ${script}`);
    });

    py.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
      try {
        const parsedOutput = JSON.parse(output);
        resolve(parsedOutput);
      } catch (error) {
        console.error(`[python] JSON parsing error: ${error.message}`);
        reject(`Failed to parse JSON output from ${script}`);
      }
    });
  });

  return result;
};

// Initialize Google Text Service Client
const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.API_KEY),
});

// Middleware
app.use(express.json());
app.use(cors());

// Route for predicting stock prices
app.get("/predict", async (req, res) => {
  const { symbol } = req.query;
  console.log(`stock : ${symbol}`);

  try {
    const result = await executePython("stock_prediction.py", [symbol]);
    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Route for chatbot
app.post("/chatbot", async (req, res) => {
  try {
    const { text } = req.body;

    if (text.toLowerCase().includes("price of")) {
      const stockName = text.split("price of")[1].trim();

      function getSymbolPrice(stockName) {
        return new Promise((resolve, reject) => {
          try {
            const api_key = finnhub.ApiClient.instance.authentications["api_key"];
            api_key.apiKey = process.env.FINNHUB_API_KEY;
            const finnhubClient = new finnhub.DefaultApi();
            finnhubClient.quote(stockName, (err, data, response) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          } catch (error) {
            reject(error);
          }
        });
      }

      getSymbolPrice(stockName)
        .then((data) => {
          const stockPrice = data.c;
          res.json([
            {
              role: "assistant",
              content: `The current price of ${stockName} is ${stockPrice}`,
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "An error occurred while fetching stock price" });
        });
    } else {
      client
        .generateText({
          model: "models/text-bison-001",
          temperature: 0.7,
          candidateCount: 1,
          top_k: 40,
          top_p: 0.95,
          max_output_tokens: 1024,
          stop_sequences: [],
          prompt: {
            text: text,
          },
        })
        .then((result) => {
          const responses = result.map((d1) => {
            if (d1 != null) {
              return d1.candidates.map((d2) => d2.output);
            }
            return null;
          });

          const modifiedResponses = responses
            .filter((response) => response !== null && response !== undefined)
            .map((response) => ({
              role: "assistant",
              content: response[0],
            }));

          console.log("Response data:", modifiedResponses);
          res.json(modifiedResponses);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "An error occurred" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
