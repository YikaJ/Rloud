/**
 * Created by YikaJ on 16/5/31.
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'jimklose@qq.com',
    pass: 'your smtp password'
  }
});
var mailOptions = {
  from: '"Rloud云监控平台" <547179699@qq.com>', // sender address
  to: 'jimklose@icloud.com, gdouiot@163.com', // list of receivers
  subject: 'Rloud云监控平台异常报警', // Subject line
  text: '异常报警啊啊啊啊不要拒绝我啊丢', // plaintext body
  html: '<b>室内温度超过最大值</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});