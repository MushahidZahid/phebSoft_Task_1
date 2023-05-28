//Import
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import MongoDb Connection file
const connectDB = require("./server/database/connection");

// initialization App
const app = express();

//CORS Policy
app.use(cors())

// Setting Port Number
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// Mongo DB Connection
connectDB();

// Json Parsing
app.use(bodyParser.json());

//Log Requests
app.use(morgan("tiny"));

// Load Routes
app.use("/api/", require("./server/routes/routes"));

app.listen(PORT, () => {
  console.log("************************************");
  console.log(" ********************************** ");
  console.log("  ********************************  ");
  console.log("   ******************************   ");
  console.log(`Server Started on http://localhost:${PORT}`);
  console.log("   ******************************   ");
  console.log("  ********************************  ");
  console.log(" ********************************** ");
  console.log("************************************");
});
