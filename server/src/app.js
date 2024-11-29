const express = require("express");
const bodyParser = require("body-parser");
const clientRoute = require("./routes/consultantRoute");
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Serve API routes
app.use("/api/consultant", clientRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
