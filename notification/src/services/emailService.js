const nodemailer = require('nodemailer')
require('dotenv').config()

// Configure Nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
})

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: {
      name: 'Notification Service',
      address: process.env.GMAIL_USER,
    },
    to,
    subject,
    text,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// // test send email
// sendEmail('6670293821@student.chula.ac.th', 'Hello', 'Hello World!').catch(
//   console.error
// )

module.exports = { sendEmail }
