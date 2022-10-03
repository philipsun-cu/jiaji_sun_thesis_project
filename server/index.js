const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from frontend!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from api!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});