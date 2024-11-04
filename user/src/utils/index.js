import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import amqplib from 'amqplib'

import {
  APP_SECRET,
  EXCHANGE_NAME,
  USER_SERVICE,
  MSG_QUEUE_URL,
} from '../config/index.js'

// Utility functions
export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
}

export const ValidateSignature = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    try {
      // Extract the token from the Authorization header
      const token = signature.split(' ')[1]

      // Verify the token using jwt.verify
      const payload = await jwt.verify(token, APP_SECRET)

      // Attach the payload to the request object
      req.user = payload
      return true // Token is valid
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Handle token expiration
        return { error: 'Token has expired' }
      } else if (error instanceof jwt.JsonWebTokenError) {
        // Handle invalid token
        return { error: 'Invalid token' }
      } else {
        // Handle other errors
        return { error: 'Token verification failed' }
      }
    }
  }

  return { error: 'No authorization header provided' }
}

export const FormateData = (data) => {
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}

// Message Broker
export const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(EXCHANGE_NAME, { durable: true })
    return channel
  } catch (err) {
    throw err
  }
}

export const PublishMessage = (channel, service, msg) => {
  channel.publish(EXCHANGE_NAME, service, Buffer.from(msg))
  console.log('Sent: ', msg)
}

export const SubscribeMessage = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, { durable: true })

  const q = await channel.assertQueue('', { exclusive: true })

  console.log(`Waiting for messages in queue: ${q.queue}`)

  channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE)

  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log('The message is:', msg.content.toString())
        service.SubscribeEvents(msg.content.toString())
      }
      console.log('[X] received')
    },
    { noAck: true }
  )
}
