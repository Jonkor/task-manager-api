const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
  sgMail.send({
    to: email,
    from: 'juan.kucho@hotmail.com',
    subject: 'Thanks for joining in',
    text: 'Welcome to the app, ${name}.Let me know how are you doing'
  })
}

const sendCancelationEmail = (email,name) =>{
  sgMain.send({
    to:email,
    from:'juan.kucho@hotmail.com',
    subject: 'Sorry to see you go',
    text: 'Goodbye ${name}'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}
