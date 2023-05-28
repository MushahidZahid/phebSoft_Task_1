// Imports
const express = require("express");
const route = express.Router();

const ProductDescriptionController = require("../controller/ProductDescriptionController");

// Api Routes
route.get("/", (req, res) => {
  res.send("PhebSoft Backend is Up And Running");
});

route.post("/product/description/add", ProductDescriptionController.addProduct);

module.exports = route;
