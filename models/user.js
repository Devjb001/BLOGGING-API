const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    
    first_name : {
        type : String,
        required: true
    },

    last_name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    }
})

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    try {
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified('password')) {
            return next();
        }
        
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = mongoose.model("users" , userSchema)