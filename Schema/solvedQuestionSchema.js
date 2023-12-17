const mongoose = require("mongoose")

const userQuestionSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    qid: {
        type: String,
        required: true
    },
    solved_on: {
        type: String,
        required: true
    }
});


const userQuestion = mongoose.model('userQuestions', userQuestionSchema);

module.exports= userQuestion ;