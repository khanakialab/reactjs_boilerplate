var path = require('path');

const appConfig = {
    appSecret: 'fa5673a321604657873b6dfe98415ebf',
    db: {
        mongoUri: 'mongodb://127.0.0.1:27017',
        dbName: 'uxmdb'
    }
}
const mailConfig = {
    smtp: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'wadbwamzqt2gemzw@ethereal.email',
            pass: '4XMy5cy2PduhbsSFdf',
        },
        tls: {
            rejectUnauthorized: false
        }
    },

    from: 'The Uxm <noreply@theuxm.com>', // sender address
}
const authConfig = {
    dirView: path.join(__dirname, './view'),
    appSecret: appConfig.appSecret,
    mail: mailConfig,
    companyName : 'Knesk',
    resetPasswordUrl : '', // Will send with Forgot Password Email
}

const plugins = {
    plugins: [
        {
            'name' : 'Core/Util',
            'config' : {},
            'path' : '@knesk/util'
        },
         {
            'name' : 'Core/Www',
            'config' : {
                port: 9001
            },
            'path' : '@knesk/www'
        },
    
        {
            'name' : 'Core/Auth',
            'config' : authConfig,
            // 'path' : path.join(__dirname, '../plugins/core/auth'), 
            'path' : '@knesk/auth', 
        },
    
    ]
}

const config = {...appConfig, ...mailConfig, ...authConfig, ...plugins}

// console.log(config);
module.exports = config