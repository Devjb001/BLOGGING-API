const express = require('express');
const { mongoConnection } = require('./config/db-connection');
const router = require('./routes/allRoute');
const { errorHandler, notFoundHandler } = require('./error/errorHandler');


require("dotenv").config

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoConnection();

app.use(router);

app.get("/", (req , res) => {
    res.status(200).send("This is home route, pls select a route to perform an action")
    console.log("Home route")
})

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;