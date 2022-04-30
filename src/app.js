const express = require('express');
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(require(path.join(__dirname,'controllers/authController')))

module.exports = app;