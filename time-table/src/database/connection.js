import pkg from 'pg'
const { Client } = pkg
import { HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config/index.js'

// Create a new client instance
const client = new Client({
  host: HOST, // Default host for PostgreSQL
  user: DB_USER, // Your PostgreSQL username
  password: DB_PASSWORD, // Your PostgreSQL password
  database: DB_NAME, // The database name you created in pgAdmin
  port: 5433, // Default PostgreSQL port
})

// Connect to the database
const databaseConnection = async () => {
  try {
    await client.connect()
    console.log('Connected to PostgreSQL database!')
  } catch (error) {
    console.error('Error ============ ON DB Connection')
    console.log(error)
  }
}

// Export the client and connection function
export { client, databaseConnection }
