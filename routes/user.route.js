
const express = require('express');
const { User } = require('../models/user.model');

const ObjectId = require('mongoose')
const bcrypt = require('bcrypt');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const userRouter = express.Router();


userRouter.get('/api/users', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).send({ "Message": "All Users", "Users": users });

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});

userRouter.post('/api/register', async(req,res) =>{
    const { name, email, password, dob, bio } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(400).send({ "Error": err.message });
                console.log(err);
            } else {
                let user =  new User({ name, email, password:hash, dob, bio });
                await user.save();
                res.send(user)
            }
});
    } catch (error) {
                res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})


userRouter.post("/api/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ 'email': email });
    let hashPassword = user.password;
    try {
        bcrypt.compare(password, hashPassword, function (err, result) {
            if (result) {
                var token = jwt.sign({ userId: user._id }, process.env.key);
                 res.status(201).send({ "Message": "User LOgin Successfully", "token": token })
            } else {
                res.status(400).send({ "Error": err.message });
                console.log(err);
            }
        });
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
}
)

userRouter.get('/api/users/:id/friends', async (req, res) => {
    let id = new ObjectId(req.params.id);
    try {
        let user = await User.find({id});
        let friends=(user.friends);
        res.status(200).send({"Message":"All Users","friends":friends});

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})
userRouter.post('/api/users/:id/friends', async (req, res) => {
    let payload = req.body;
    let id = new ObjectId(req.params.id);
    try {
        let user = await User.findByIdAndUpdate(id, { $push: { friendRequests: payload } });
        res.status(204).send({ "Message": "Friend Request Sent" });

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});

userRouter.patch('/api/users/:id/friends:friendId', async (req, res) => {
    let payload = req.body;
    let friendId = new ObjectId(req.params.friendId);
    try {
         await User.findByIdAndUpdate(friendId,{$push:{friends:payload}});
        res.status(204).send({"Message":"friends Updated"});

    } catch (error) {
         res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})




module.exports={userRouter}