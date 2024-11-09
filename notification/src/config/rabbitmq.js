const amqp = require('amqplib')
require('dotenv').config()

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    console.log('RabbitMQ connected')
    return channel
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error)
    throw error
  }
}

module.exports = { connectRabbitMQ }
