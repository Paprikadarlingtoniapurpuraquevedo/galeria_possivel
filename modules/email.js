const nodemailer = require('nodemailer')
const config = require('../config')

var sendEmail = async function(options){
    const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        auth:{
            user: config.smtp.user,
            pass: config.smtp.pass
        }
    })
    console.log({
        host: config.smtp.host,
        port: config.smtp.port,
        auth:{
            user: config.smtp.user,
            pass: config.smtp.pass
        }
    })
    const mailOptions = {
        from: '<testmail>no-reply',
        to: options.to,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports = {sendEmail}