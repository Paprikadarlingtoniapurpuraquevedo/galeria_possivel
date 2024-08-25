const express = require ('express')
require('dotenv').config()

const mongoose = require('mongoose')

require('./models/db')

const userRouter = require('./routes/user')

const User = require('./models/user')

const app = express()

app.use(express.json())
app.use(userRouter)

const test = async (email, password) => {
    const user = await User.findOne({email: email})
    const result = await user.comparePassword(password)
    console.log(result)
}

test('fada@dentes.com', '123456')

app.get('/test', (req, res) => {
    res.send('Olá')
})

app.get('/', (req, res) => {
    res.send('Olá')
})

app.listen(3000, () => {
    console.log('Porta aberta')
})