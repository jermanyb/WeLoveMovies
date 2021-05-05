if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express(); 
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;



// General tasks

// You will also need to make sure the following tasks are complete.

// Your app.js file and server.js file are correctly configured, 
// with your app.js file exporting the application created from Express.
// You make use of the cors package so that requests from the front
//  end can correctly reach the back end.
// If a request is made to a route that does not exist, the server 
// returns a 404 error.
// If a request is made to a route that exists, but the HTTP method is 
// wrong, a 405 error is returned.
// All of your routes should respond with the appropriate status code
//  and should use a data key in the response.
// Database Tables

// You will create five tables for this project. View the docs/tables/ folder 
// in this project to get more detailed information on each table.

// You will need to create migrations for each of these tables and run those 
// migrations.

// Seed data is included in this project in the ./src/db/seeds folder. The 
// seeds will run correctly if and only if the tables are setup as described 
// in the previous documents.

// Routes

// You will create five routes for this project. View the docs/routes/ folder 
// in this project to get more detailed information on each table.

// Note that some routes return data dependent on query parameters.