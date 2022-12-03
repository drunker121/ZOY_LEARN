const mongoose= require('mongoose');

const userdetails = new mongoose.Schema({
    // ident: Number,
    type: String,
    name:String,
    email:String,
    password:String,
},
{
    collection: 'usersinfo',
}
)

const studentdetails = new mongoose.Schema({
    // ident: String,
    type: String,
    name:String,
    fname:String,
    roll: String,
    phnum: String,
    classs: String,
    addresss: String,
},
{
    collection: 'studentinfo',
}
)

const teacherdetails = new mongoose.Schema({
    // ident: Number,
    type: String,
    name:String,
    subject: String,
    classs: String,
    ph: String,
    addresss: String,
},
{
    collection: 'teacherinfo',
}
)

mongoose.model('usersinfo', userdetails);
mongoose.model('studentinfo', studentdetails);
mongoose.model('teacherinfo', teacherdetails);