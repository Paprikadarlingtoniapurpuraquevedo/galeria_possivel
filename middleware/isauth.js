const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuth = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(decode.userId)
            if(!user) {
            return res.json({sucess: false, message: 'Acesso negado!'})
            }
            req.user = user
            next()

        } catch (error) {
            if(error.name === 'JsonWebTokenError') {
                return res.json({sucess: false, message: 'Acesso negado!'})    
            }
            
            if(error.name === 'TokenExpiredError') {
                return res.json({sucess: false, message: 'A sessão expirou, reaplicar email e senha.'}) 
            }
            res.json({sucess: false, message: 'Erro do servidor!'})
        }
    }else{
        res.json({sucess: false, message: 'Acesso negado!'})
    }
}