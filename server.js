const express = require('express');
const { mongoConnection } = require('./config/db-connection');
const router = require('./routes/userRoute');


require("dotenv").config

const app = express()
const PORT = process.env.PORT;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoConnection();

app.use(router)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", (req , res) => {
    res.status(200).send("This is home route")
    console.log("Home route")
})

app.listen(PORT , () => {
    console.log(`Sever is listening on http://localhost:${PORT}`)
})

module.exports = app;