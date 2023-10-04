require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const {PORT, MONGO} = process.env;

mongoose.connect(`${process.env.MONGO}/ChatServer`)

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to: ${MONGO}`));

const user = require('./controllers/user.controller')
//const room = require('./controllers/')

app.use(express.json());
app.use('/user', user);
app.use('/room', room);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))