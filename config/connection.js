
const mongoose = require ('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const Db=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB in cluster ',process.env.MONGO_URI);
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}
module.exports=Db
