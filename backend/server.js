const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./model/Datamodel')
const userdata = require('./model/userModel')
const { generateToken } = require('./generateToken')
const jwt = require('jsonwebtoken')
// import {Users} from './model/Datamodel'
app.use(cors())
app.use(express.json());
console.log(User)
mongoose.connect('mongodb://localhost:27017/self-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("Disconnected", e))
// console.log(Users)

//USERDATA APIs
// let user1
app.post('/registeruser', async (req, res) => {
    console.log(req.body)
    try {
        if (await userdata.findOne({ email: req.body.email })) {
            res.send({ status: 'FAIL', message: "user already exists" })
            return
        }
        const user1 = new userdata(req.body)
        user1.save()

        // console.log("user1", user1)
        res.send({
            status: 'OK',
            message: "user registered successfully",
            name: user1.name,
            email: user1.email,
            ID: user1._id,
            token: generateToken(user1._id),
        })
    } catch (error) {
        res.send({ status: 'FAIL', error: 'eror' })
        console.log("error occured in registering data entry")
    }
})

app.post('/loginuser', async (req, res) => {
    const user = await userdata.findOne({ email: req.body.email })
    if (!user) {
        res.send({ status: 'FAIL', message: "create user first" })
        return
    }
    if (await user.matchpassword(req.body.password)) {
        res.send({
            status: 'OK',
            message: "login successful",
            name: user.name,
            email: user.email,
            ID: user._id,
            token: generateToken(user._id),
            
        })
        return
    }
    else {
        res.send({ status: 'FAIL', message: "password incorrect" })
        return
    }
})

app.get('/getuserdata', async (req, res) => {
    try {
        const data = await userdata.find().sort({ createdAt: -1 })
        res.send(data)

    } catch (error) {
        console.error(error)
    }
})





//TODO APIs

const authorizeUser = async (req, res, next) => {
    const auth = req.headers.authorization
    console.log(auth)
    const token = auth && auth.split(' ')[1]
    console.log("TOKEN", token)
    jwt.verify(token, 'TOPSECRETDONTSHARE', (err, user) => {
        if (err) res.status(403).send('token not verified')
        console.log("heyy", user)
        req.user = user
        next()
    })
}

app.get('/', authorizeUser, async (req, res) => {
    try {
        const auth = req.user.id
        console.log("AUTH", auth)
        const data = await User.find({ author: auth }).sort({ createdAt: -1 })
        res.send(data)

    } catch (error) {
        console.error(error)
    }
})
app.put('/update/:id', async (req, res) => {
    try {
        const todo = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        todo.save()
        res.send(todo)
    } catch (error) {
        console.log("error occured in updating data entry")
    }
})
app.post('/newtodo', async (req, res) => {
    try {
        // const info = JSON.parse(localStorage.getItem('userinfo'))
        console.log(req.body)
        const todo = new User(
            {
                text: req.body.text,
                description: req.body.description,
                author: req.body.author,
            }
        )
        await todo.save()
        res.send(todo)
    } catch (error) {
        console.log("error occured in creating data entry")
    }
})
app.get('/toggle/:id', async (req, res) => {
    const todo = await User.findById(req.params.id)
    todo.iscomplete = !todo.iscomplete
    todo.save()
    res.send(todo)

})
app.get('/description/:id', async (req, res) => {
    try {
        const todo = await User.findById(req.params.id);
        res.send(todo);
    } catch (error) {
        // Handle the error appropriately (e.g., send an error response)
        res.status(500).send('An error occurred while fetching the todo');
    }
});

app.delete('/todo/del/:id', async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id)
        res.send(deleted)
    } catch (error) {
        console.log("error occured in deleting data entry")
    }
})








app.listen(4000, () => {
    console.log("listening at port 4000")
})

