 const nodemailer = require('nodemailer');
async function sendMail({ from, to, subject, text, html }) {
  
     let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
              user: process.env.MAIL_ID,
              pass: process.env.MAIL_MASTER_PASS
          }
     });


     let info = await transporter.sendMail({
        from: ` DocSend <${from}>`,
        to,
        subject,
        text,
        html
     });

     // console.log(info);
}

module.exports = sendMail; 