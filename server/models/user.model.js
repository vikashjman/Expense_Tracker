const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true
    },
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    incomeLevel: Number,
    country: String,
    state: String,
    city: String
}, {
    timestamps: true
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model("user", userSchema);
module.exports = user;
