const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form-data (which includes text fields)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // if you want to handle JSON data as well
