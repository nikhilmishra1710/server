const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true
    }
});


const User = mongoose.model('user', userSchema);

module.exports= User ;