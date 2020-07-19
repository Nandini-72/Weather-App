// require("dotenv").config();
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
// Initialize the main project folder
app.use(express.static('website'));

// get method
app.get("/api/v1/entry", (req, res) => {
  // console.log(projectData);
  res.send(JSON.stringify(projectData))
});
// post method
app.post("/api/v1/entry", (req, res) => {
  projectData.temperature = req.body.temperature
  projectData.date = req.body.date
  projectData.userResponse = req.body.feeling
  projectData.imgIcon = req.body.imgIcon
  // console.log(projectData);
  res.end()
});

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is on..... ${port}`);
  });
