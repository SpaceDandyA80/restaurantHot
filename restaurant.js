// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Restaurant Tables (DATA)
// =============================================================
let tables = [];
let waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./view/index.html"));
});

app.get("/makeres", function(req, res) {
  res.sendFile(path.join(__dirname, "./view/makeres.html"));
});

app.get("/viewres", function(req, res) {
  res.sendFile(path.join(__dirname, "./view/viewres.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});



// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newTable = req.body;

  console.log(newTable);

  if (tables.length < 5){
    tables.push(newTable);
  } else {
    waitList.push(newTable);
  }

  console.log(tables);
  console.log(waitList);
  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
