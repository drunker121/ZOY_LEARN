const mongoose=require('mongoose')
const mongoURL = 'mongodb://nitish:akshita123@ac-2axztxf-shard-00-00.s3mxonq.mongodb.net:27017,ac-2axztxf-shard-00-01.s3mxonq.mongodb.net:27017,ac-2axztxf-shard-00-02.s3mxonq.mongodb.net:27017/?ssl=true&replicaSet=atlas-3aa27z-shard-0&authSource=admin&retryWrites=true&w=majority'

const db=()=>{

    mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('conncted to db');
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports=db;