import mongoose from 'mongoose'
import { DB_URL } from '../config/index.js'

mongoose.set('strictQuery', true)

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('Connected to Database')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

export default connectDB
