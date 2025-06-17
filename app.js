const express = require('express');
const { mongoConnection } = require('./config/db-connection');
const router = require('./routes/userRoute');


require("dotenv").config

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoConnection();

app.use(router)

app.get("/", (req , res) => {
    res.status(200).send("This is home route")
    console.log("Home route")
})


app.use("*", (req, res, next) => {
  const error = new Error(`Hy! did you miss a route? The route '${req.originalUrl}' does not exist on this server`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong in the sever",
    path: req.originalUrl,
    method: req.method,
  });
});

module.exports = app;