import express from 'express'
import { PORT } from './config/index.js'
import { databaseConnection } from './database/index.js'
import expressApp from './express-app.js'
import { CreateChannel } from './utils/index.js'

const StartServer = async () => {
  console.log('Starting server...')
  const app = express()

  await databaseConnection()

  const channel = await CreateChannel()

  await expressApp(app, channel)

  app
    .listen(PORT, () => {
      console.log(`Listening to port ${PORT}`)
    })
    .on('error', (err) => {
      console.log(err)
      process.exit()
    })
    .on('close', () => {
      channel.close()
    })
}

StartServer()
