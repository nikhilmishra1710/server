const Question=require("../Schema/questionSchema")

const getQuestion=async (req,res)=>{
    try{
        const date=req.body.date

        const data=await Question.find({"live_on":date})

        console.log(data)
        if(data.length!==0){
            res.status(200).json({"isSuccess":true,"msg":"Successful fetch","data":data})
        }else{
            res.status(400).json({"isSuccess":true,"msg":"Successful fetch","data":"No Question for such date"})
        }
    }catch(error){
        res.status(400).json({"isSuccess":false,"msg":error.message})
    }
}

const addQuestion=async (req,res)=>{
    try{
        const ques={"name":req.body.name,"qid":req.body.qid,"tags":req.body.tags,"link":req.body.link,"difficulty":req.body.difficulty,"live_on":req.body.date,"uploaded_on":req.body.today}
        console.log(ques)
        const newQues=new Question(ques)
        await newQues.save()
        console.log(ques)
        res.status(200).json({"isSuccess":true,"msg":"Question added"})
    }catch(error){
        res.status(400).json({"isSuccess":false,"msg":error.message})
    }
}

module.exports={getQuestion,addQuestion};