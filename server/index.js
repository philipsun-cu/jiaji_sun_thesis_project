const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/", (req, res) => {
  res.send("Hello from frontend!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Jiaji!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});