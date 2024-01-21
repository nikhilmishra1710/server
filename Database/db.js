const mongoose=require('mongoose')
require("dotenv").config()

const Connection=async ()=>{
    
    const uri=process.env.MONGO_DB_URI

    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected successfully');
    }catch(error){
        console.log('Database not NOT connected successfully');
    }

}

module.exports= Connection;