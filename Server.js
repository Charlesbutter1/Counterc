const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve static frontend from "public" folder
app.use(express.static(path.join(__dirname, "Public")));

// Simple in-memory counter
let counter = 0;

// API routes
app.get("/api/counter", (req, res) => {
  res.json({ value: counter });
});

app.post("/api/counter/increment", (req, res) => {
  counter++;
  res.json({ value: counter });
});

app.post("/api/counter/decrement", (req, res) => {
  counter--;
  res.json({ value: counter });
});

app.post("/api/counter/clear", (req, res) => {
  counter = 0;
  res.json({ value: counter });
});

// Fallback: serve index.html for unknown routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
