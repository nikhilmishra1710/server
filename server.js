const express = require("express")
const path=require("path")
const cors=require("cors")
const bodyParser = require('body-parser');
const Connection = require("./Database/db")
const { signUp, login, validateUserToken } = require("./Handlers/users");
const {getQuestion,addQuestion} = require("./Handlers/question");
const {getQuestionStatus,setQuestionStatus} = require("./Handlers/questionUserStatus");

const app=express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));

Connection();


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

app.post("/login/validateUser",login)
app.post("/login/newUser",signUp)
app.post("/get_question/date",getQuestion)
app.post("/validateUserToken",validateUserToken)
app.post("/question/updateStatus",setQuestionStatus)
app.post("/question/getStatus",getQuestionStatus)
app.post("/question/add",addQuestion)
// For any other routes, serve the React app
// app.get('/', (req, res) => {
//   res.status(200).json("Welcome to webpage")
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});