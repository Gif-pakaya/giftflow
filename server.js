const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({
    app: "GiftFlow",
    status: "online",
    message: "GiftFlow server is running!"
  });
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>GiftFlow</title>
        <style>
          body {
            background: #101014;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 30px 15px;
          }
          .card {
            background: #202027;
            border-radius: 16px;
            padding: 25px;
            max-width: 450px;
            margin: 30px auto;
          }
          button {
            background: #a855f7;
            color: white;
            border: 0;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>🎁 GiftFlow</h1>
        <p>TikTok LIVE Interaction Dashboard</p>
        <div class="card">
          <h2>Server Status</h2>
          <p>✅ GiftFlow server is running!</p>
          <button onclick="checkStatus()">Check Server</button>
          <p id="result"></p>
        </div>
        <script>
          async function checkStatus() {
            const result = document.getElementById("result");
            try {
              const response = await fetch("/api/status");
              const data = await response.json();
              result.textContent = data.status + " — " + data.message;
            } catch (error) {
              result.textContent = "Could not connect to server.";
            }
          }
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("GiftFlow running on port " + PORT);
});
