const express = require('express')
const bodyParser = require('body-parser')
const { startConsumer } = require('./consumers/emailConsumer')
const emailRoutes = require('./routes/emailRoutes')

// Initialize Express app
const app = express()
app.use(bodyParser.json())

app.use('/api', emailRoutes)

// Start RabbitMQ Consumer
startConsumer()

// Start Express Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
