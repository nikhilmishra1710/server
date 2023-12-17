const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qid: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    difficulty: {
        type:String,
        required: true,
    },
    live_on: {
        type: String,
        required: true,
    },
    uploaded_on: {
        type: String,
        required: true
    }
});


const Question = mongoose.model('questions', questionSchema);

module.exports= Question ;