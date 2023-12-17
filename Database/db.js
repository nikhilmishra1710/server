
const Connection=async ()=>{
    const mongoose=require('mongoose')

    const uri="mongodb+srv://nikhilmishra1710:8Zu21EFFj9i7H-4@cluster0.l1azsq8.mongodb.net/Woc_db?retryWrites=true&w=majority"

    try{
        await mongoose.connect(uri, { useNewUrlParser: true })
        console.log('Database connected successfully');
    }catch(error){
        console.log('Database not NOT connected successfully');
    }

}

module.exports= Connection;