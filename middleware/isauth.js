const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const emailModule = require('../modules/email')
const { text } = require('stream/consumers')

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

exports.isAdmin = (req, res, next)=>{
    if(req.user.role === "user"){
        res.status(401).json({sucess: false, message: 'Acesso negado!'})
    }

    next();
}

exports.forgotPassword = async (req, res, next)=>{
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000;

    await user.save({validateBeforeSave : false});
    const resetUrl = `http://${req.headers.host}/user/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        text: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>`,
    };
    try {
        await emailModule.sendEmail(mailOptions);
        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error('Failed to send password reset email:', err);
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
}

exports.resetPassword = async (req, res, next)=>{
    const token = req.query.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    _id: decodedToken.id,
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired password reset token' });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Confirmation',
    html: `
      <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
    `,
  };

  try {
    await emailModule.sendEmail(mailOptions);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Failed to send password reset confirmation email:', err);
    res.status(500).json({ error: 'Failed to send password reset confirmation email' });
  }
}