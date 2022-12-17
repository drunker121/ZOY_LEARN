require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');
const cors  = require('cors');
const PORT=process.env.PORT||5000
const app = express();
const jwt = require("jsonwebtoken")
const RefreshModel = require("./models/refreshToken")


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

const mongodb=require('./mongodb')
mongodb();

app.listen(PORT, ()=> {
    console.log(`hello from port ${PORT}` );
})

require('./models/userDetails');

const User = mongoose.model('usersinfo');
const Student = mongoose.model('studentinfo');
const Teacher = mongoose.model('teacherinfo');

app.get("/",(req,res)=>{
    res.json({message:`successfully running on port  ${PORT}`});
})

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
                const accessToken = jwt.sign({ name: user.name, email: user.email, _id: user._id, createdAt: Date.now()},JWT_ACCESS_SECRET,{ expiresIn: '1h'})
                const refreshToken = jwt.sign({ name: user.name, email: user.email, _id: user._id, createdAt: Date.now()},JWT_REFRESH_SECRET,{ expiresIn: '1d'})
                RefreshModel.create({ token: refreshToken }).then((result,error) => {
                    if(error)
                        return res.send({status: 'incorrect password'});    
                })
                res.send({status: 'login successful', accessToken, refreshToken });
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

app.post("/refresh",async (req,res) => {
    let refreshToken
    try {
        refreshToken = await RefreshModel.findOne({ token: req.body.refreshToken });
        if (!refreshToken) {
            return res.status(400).json({ status: 'error'})
        }
        const decoded = jwt.verify(req.body.refreshToken,JWT_REFRESH_SECRET)
        const payload = {
            _id: decoded._id,
            name: decoded.name,
            email: decoded.email,
            createdAt: Date.now()
        }
        const accessToken = jwt.sign(payload,JWT_ACCESS_SECRET,{ expiresIn: '1h'})
        refreshToken = jwt.sign(payload,JWT_REFRESH_SECRET,{ expiresIn: '1d'})
        await RefreshModel.create({ token: refreshToken })
        res.status(200).json({ accessToken, refreshToken })
    } catch (err) {
        return res.status(400).json({ status: 'error'})
    }
})

const auth = require('./auth.middleware')

app.post('/add_student', auth, async (req, res) => {
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

app.post('/add_teacher', auth, async (req, res) => {
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

app.get('/teacher/edit/:id', auth, async (req, res) => {
    const {id} = req.params;
    try {
        const dt = await Teacher.findOne({_id: id});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'teacher not found'});
    }
})

app.put('/teacher/edit/:id', auth, async (req, res) => {
    const {id} = req.params;
    try {
        await Teacher.updateOne({_id: id}, req.body);
        res.send({status: 'Teacher updated'});
    } catch (error) {
        console.log('Error while changing teacher', error);
    }
})

app.get('/student/edit/:id', auth, async (req, res) => {
    const {id} = req.params;
    try {
        const dt = await Student.findOne({_id: id});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'student not found'});
    }
})

app.put('/student/edit/:id', auth, async (req, res) => {
    const {id} = req.params;
    try {
        await Student.updateOne({_id: id}, req.body);
        res.send({status: 'Student updated'});
    } catch (error) {
        console.log('Error while changing student', error);
    }
})

app.delete('/teacher/:id', auth, async (req, res) => {
    
    try {
        await Teacher.deleteOne({_id: req.params.id});
        res.send({status: 'teacher deleted'});
    } catch (error) {
        console.log('error while deleting teacher', error);
    }
})

app.delete('/student/:id', auth, async (req, res) => {
    try {
        await Student.deleteOne({_id: req.params.id});
        res.send({status: 'student deleted'});
    } catch (error) {
        console.log('error while deleting student', error);
    }
})


app.get('/students', auth, async (req, res) => {
    try {
        const dt = await Student.find({});
        res.status(200).json(dt);
        console.log(dt);
    } catch (error) {
        console.log('error');
        res.status(404).json({message: 'student not found'});
    }
})

app.get('/teachers', auth, async (req, res) => {
    try {
        const dt = await Teacher.find({});
        res.status(200).json(dt);
    } catch (error) {
        res.status(404).json({message: 'teacher not found'});
    }
})