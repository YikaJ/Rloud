/**
 * Created by YikaJ on 16/5/31.
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: '547179699@qq.com',
    pass: '密码'
  }
});

module.exports = function(errors, email) {
  var mailOptions = {
    from: '"Rloud云监控平台" <547179699@qq.com>', // sender address
    to: email, // list of receivers
    subject: 'Rloud云监控平台异常报警', // Subject line
    html: `
      <div>
        <h1 style="text-align: center">数据异常报警</h1>
        <br/>
        错误: ${errors.join(',')}
      </div>
    ` // html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}
