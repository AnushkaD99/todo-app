const express = require('express');
require('dotenv').config();
const authRouter = require('./route/authRoute');

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'REST APIs are working',
    });
});

//all routes will be here
app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    })
})

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log("Server up and running", PORT);
});