const path = require("path");
const express = require("express");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const PORT = process.env.PORT || 3001;

var app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const fs = require("fs");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.send("Hello from frontend!");
});

app.get("/api/reports", (req, res) => {
  var r_json = fs.readFileSync("./client/src/Leaflet/reports.json", "utf8");

  res.json(JSON.parse(r_json, null, 2));
});

app.post("/api/create-report", (req, res) => {
  console.log(req.body);
  let report = req.body.report;
  console.log(report);
  var r_json = fs.readFileSync("./client/src/Leaflet/reports.json", "utf8");
  let jsonObj = JSON.parse(r_json, null, 2);
  jsonObj.push(req.body);
  fs.writeFileSync(
    "./client/src/Leaflet/reports.json",
    JSON.stringify(jsonObj, null, 2)
  );
  res.json(jsonObj);
});

app.get("/api/locations", (req, res) => {
  var l_json = fs.readFileSync("./client/src/Leaflet/locations.json", "utf8");

  res.json(JSON.parse(l_json, null, 2));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
