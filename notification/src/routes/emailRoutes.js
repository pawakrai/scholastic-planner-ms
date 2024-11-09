const express = require('express')
const { publishMessage } = require('../producer/messageProducer')

const router = express.Router()

router.post('/send-email', async (req, res) => {
  const { email, subject, body } = req.body

  if (!email || !subject || !body) {
    return res.status(400).send('Email, subject and body are required.')
  }

  const message = {
    data: { email, subject, body },
  }

  try {
    await publishMessage(message)
    res.status(202).send('Email request received.')
  } catch (error) {
    res.status(500).send('Error publishing message.')
  }
})

module.exports = router
