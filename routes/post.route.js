const express = require('express');
const { Post } = require('../models/post.model');

const ObjectId = require('mongoose');

const postRouter = express.Router();

postRouter.get('/api/posts', async() => {
    try {
        let posts = await Post.find();
         res.status(200).send({ "Message": "All Posts", "Posts":posts})
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});

postRouter.get('/api/posts/:id', async () => {
    let id = new ObjectId(req.params.id);
    try {
        let post= await Post.find(id);
         res.status(200).send({ "Message": "All Posts", " Single Posts":post})
    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});


postRouter.post('/api/posts', async (req, res) => {
    let payload=req.body
    try {
        let post = new Post({ payload });
        await post.save();
         res.status(201).send({ "Message": "Post Added Successfully", "Post":post})

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

postRouter.patch('/api/posts/:id', async (req, res) => {
    let id = new ObjectId(req.params.id);
    let payload = req.body;
    try {
        await Post.findByIdAndUpdate({'_id':id},payload);
       
         res.status(204).send({ "Message": "Post Updated Successfully"})

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

postRouter.delete('/api/posts/:id', async (req, res) => {
    let id = new ObjectId(req.params.id);
    try {
         await Post.findByIdAndDelete({'_id':id});
         res.status(204).send({ "Message": "Post Deleted Successfully"})

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})


// lokes

postRouter.post('/api/posts/:id/like', async (req, res) => {
    let payload = req.body;
    let id = new ObjectId(req.params.id);
    try {
        await Post.findByIdAndUpdate( id,{$push:{likes:payload}} );
         res.status(201).send({ "Message": "Likes Updated to Post"})

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
})

postRouter.post('/api/posts/:id/comment', async (req, res) => {
    let { user, text, createdAt } = req.body;
    let id = new ObjectId(req.params.id);
    try {
        await Post.findByIdAndUpdate(id, { $push: { comments: { user, text, createdAt } } });
        res.status(201).send({ "Message": "Likes Updated to Post" })

    } catch (error) {
        res.status(400).send({ "Error": error.message });
        console.log(error);
    }
});

