const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // References the User model

    },
    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    read_count: {
        type: Number,
        default: 0,
        min: 0
    },
    reading_time: {
        type: Number, 
        default: 0,
        min: 0
    },

    tags: [{
        type: String,
        trim: true
    }],

    body: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("blogs" , blogSchema)