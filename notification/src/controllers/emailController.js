const { sendEmail } = require('../services/emailService')

async function handleEmailMessage(message) {
  const emailData = JSON.parse(message.content.toString())
  const { email, subject, body } = emailData.data
  // console.log('Email:', { email, subject, body })

  try {
    await sendEmail(email, subject, body)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

module.exports = { handleEmailMessage }
