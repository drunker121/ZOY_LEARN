const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const cors  = require('cors');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const mongoURL = 'mongodb://nitish:akshita123@ac-2axztxf-shard-00-00.s3mxonq.mongodb.net:27017,ac-2axztxf-shard-00-01.s3mxonq.mongodb.net:27017,ac-2axztxf-shard-00-02.s3mxonq.mongodb.net:27017/?ssl=true&replicaSet=atlas-3aa27z-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('conncted to db');
})
.catch((err) => {
    console.log(err);
})

app.listen(5000, ()=> {
    console.log('hello from port 5000');
})

require('./userDetails');

const User = mongoose.model('usersinfo');
const Student = mongoose.model('studentinfo');
const Teacher = mongoose.model('teacherinfo');

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    User.findOne({email: email}, async (error, user) => {
        if(user) {
            res.send({status: 'user already exist'});
        }
        else {
            try {
                await User.create({
                    type: "user",
                    name,
                    email,
                    password,
                });
                res.send({status: 'registered successfully'});
            } catch (error) {
                res.send({status: 'something wrong occured'});
            }
        }
    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(user) {
            if(password === user.password) {
                res.send({status: 'login successful', user: user});
            }
            else {
                res.send({status: 'incorrect password'});
            }
        }
        else {
            res.send({status: 'user not found'});
        }
    })
})

app.post('/add_student', async (req, res) => {
    const {name, fname, roll, classs, phnum, addresss} = req.body;
    try {
        await Student.create({
            type: "student",
            name,
            fname,
            roll,
            classs,
            phnum,
            addresss,
        });
        res.send({status: 'student added'});
    } catch (error) {
        res.send({status: 'something wrong occured'});
    }
})

app.post('/add_teacher', async (req, res) => {
    const {name, subject, classs, ph, addresss} = req.body;
    try {
        await Teacher.create({
            type: "teacher",
            name,
            subject,
            classs,
            ph,
            addresss,
        });
        res.send({status: 'teacher added'});
    } catch (error) {
        res.send({status: 'something wrong occured'});
    }
})

app.get('/teacher/edit/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const dt = await Teacher.findOne({_id: id});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'teacher not found'});
    }
})

app.put('/teacher/edit/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Teacher.updateOne({_id: id}, req.body);
        res.send({status: 'Teacher updated'});
    } catch (error) {
        console.log('Error while changing teacher', error);
    }
})

app.get('/student/edit/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const dt = await Student.findOne({_id: id});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'student not found'});
    }
})

app.put('/student/edit/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Student.updateOne({_id: id}, req.body);
        res.send({status: 'Student updated'});
    } catch (error) {
        console.log('Error while changing student', error);
    }
})

app.delete('/teacher/:id', async (req, res) => {
    try {
        await Teacher.deleteOne({_id: req.params.id});
        res.send({status: 'teacher deleted'});
    } catch (error) {
        console.log('error while deleting teacher', error);
    }
})

app.delete('/student/:id', async (req, res) => {
    try {
        await Student.deleteOne({_id: req.params.id});
        res.send({status: 'student deleted'});
    } catch (error) {
        console.log('error while deleting student', error);
    }
})


app.get('/students', async (req, res) => {
    try {
        const dt = await Student.find({});
        res.status(200).json(dt);
        console.log(dt);
    } catch (error) {
        console.log('koi error hai');
        res.status(404).json({message: 'student not found'});
    }
})

app.get('/teachers', async (req, res) => {
    try {
        const dt = await Teacher.find({});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'teacher not found'});
    }
})