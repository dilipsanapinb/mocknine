const express = require('express');
const { connection } = require('mongoose');
const { userRouter } = require('./routes/user.route');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/',  (req, res)=> {
    res.send('Welcome to Social Media Application')
});

app.use('/user', userRouter);
app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log('Connected to Database');
    } catch (error) {
        console.log({ 'Error': error.message });
    }
    console.log(`server listening on ${process.env.port}`);
})