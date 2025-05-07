const mongoose = require('mongoose');
async function ConnectDB(){
    try{
        const conn = await mongoose.connect("mongodb+srv://pavanjadhav1010:pavanjadhav1010@onestop.qpeq90a.mongodb.net/")
        console.log(`MongoDB Connected ${conn.connection.host}`)
    }catch(err){
        console.log(`Error : ${err.message}`,err)
    }
    
}

module.exports = ConnectDB;