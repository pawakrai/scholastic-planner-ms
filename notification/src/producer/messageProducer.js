const { connectRabbitMQ } = require('../config/rabbitmq')

async function publishMessage(message) {
  const channel = await connectRabbitMQ()

  const QUEUE_NAME = 'EMAIL_QUEUE'

  await channel.assertQueue(QUEUE_NAME, { durable: true })

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  })

  console.log('Message published:', message)
}

module.exports = { publishMessage }
