const jwt=require("jsonwebtoken")
const userQuestion = require("../Schema/solvedQuestionSchema");

const setQuestionStatus=async (req,res)=>{
    const token=req.headers.token
    const qid=req.body.qid
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const decode=jwt.decode(token)

    const stat={
        "username":decode.username,
        "qid":qid,
        "solved_on":formattedDate
    }
    try{
        const status=new userQuestion(stat)
        await status.save()
        console.log("Stat: "+stat)
        return res.status(200).json({"isSuccess":true,"msg":"Update successful","date":formattedDate})
    }catch(error){
        return res.status(400).json({"isSuccess":false,"msg":"Error in updating status"})
    }
}

const getQuestionStatus=async (req,res)=>{
    const token=req.headers.token
    const user=jwt.decode(token)
    const username=user.username
    const qid=req.body.qid

    try{
        const data=await userQuestion.findOne({"username":username,"qid":qid})
        console.log("getStatus: "+data)
        if(data){
            return res.status(200).json({"isSuccess":true,"date":data.solved_on})
        }else{
            return res.status(200).json({"isSuccess":false,"msg":"No record found!"})
        }
    }catch(error){
        return res.status(400).json({"isSuccess":false,"msg":"Unable to connect to database"})
    }
}

module.exports={getQuestionStatus,setQuestionStatus}