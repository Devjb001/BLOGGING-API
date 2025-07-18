const mongoose = require("mongoose")
require("dotenv").config()



function mongoConnection() {

    if (process.env.NODE_ENV === "test") return;
    
    mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)

    mongoose.connection.on("connected" , () => {
        console.log('Connected to Mongodb Success!')
    })

      mongoose.connection.on("error" , () => {
        console.log('Failed to Connect to Mongodb ')
    })
}

module.exports = {
    mongoConnection
}