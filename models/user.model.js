
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

let  User=mongoose.model('User',userSchema);

module.exports={User}