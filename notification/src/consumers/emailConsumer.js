const { connectRabbitMQ } = require('../config/rabbitmq')
const { handleEmailMessage } = require('../controllers/emailController')

async function startConsumer() {
  const channel = await connectRabbitMQ()

  const QUEUE_NAME = 'EMAIL_QUEUE'

  await channel.assertQueue(QUEUE_NAME, { durable: true })

  console.log(`Waiting for messages in queue: ${QUEUE_NAME}`)

  channel.consume(QUEUE_NAME, async (message) => {
    if (message !== null) {
      console.log('Received message:', message.content.toString())
      await handleEmailMessage(message)
      channel.ack(message) // Acknowledge that the message has been processed successfully.
    }
  })
}

module.exports = { startConsumer }
