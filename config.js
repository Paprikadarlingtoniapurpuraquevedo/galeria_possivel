const process = require("process");

require('dotenv').config()

var configValues = {
    "uname": "asaf",
    "pwd": "asaf"
};
var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    expireTime: 60 * 60 * 1000,
    getDbConnectionString: function(){
        return '';
    },
    secrets: {
        jwt: process.env.JWT || "mysecret"
    },

    smtp: {
        host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass'
    }
};
module.exports = config;