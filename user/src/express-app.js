import express from 'express'
import cors from 'cors'
import { user } from './api/index.js'
import { CreateChannel } from './utils/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async (app) => {
  app.use(express.json())
  app.use(cors())
  app.use(express.static(path.join(__dirname, 'public')))

  const channel = await CreateChannel()

  user(app, channel)
  // error handling
}
