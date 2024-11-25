const express = require ('express')
require('dotenv').config()

const mongoose = require('mongoose')

require('./models/db')

const bookRouter = require('./routes/book')

const userRouter = require('./routes/user')

const User = require('./models/user')

const app = express()

app.use(express.json())
app.use(bookRouter)
app.use(userRouter)

const test = async (email, password) => {
    const user = await User.findOne({email: email})
    const result = await user.comparePassword(password)
    console.log(result)
}

test('email@teste.com', 'senhadeteste')

app.get('/test', (req, res) => {
    res.send('Olá')
})

app.get('/', (req, res) => {
    res.send('Olá')
})

app.listen(3000, () => {
    console.log('Porta aberta')
})