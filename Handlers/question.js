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

module.exports=getQuestion;