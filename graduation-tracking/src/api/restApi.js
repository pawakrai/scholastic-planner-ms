import express from 'express'
import bodyParser from 'body-parser'
import client from '../grpc/client.js'
import UserAuth from './middlewares/auth.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Endpoint to get all graduation plans
// app.get('/', UserAuth, (req, res) => {
//   client.getAllGraduationPlans({}, (error, response) => {
//     if (error) {
//       console.error('Error fetching graduation plans:', error)
//       return res.status(500).send('Error fetching graduation plans')
//     }
//     res.json(response)
//   })
// })

// Endpoint to get a specific graduation plan by user ID
app.get('/', UserAuth, (req, res) => {
  const { studentId } = req.user
  console.log('req.user', req.user, studentId)
  client.getProfile({ id: studentId }, (error, response) => {
    if (error) {
      console.error('Error fetching graduation plan:', error)
      return res.status(500).send('Error fetching graduation plan')
    }
    res.json(response)
  })
})

// Endpoint to create a new graduation plan
app.post('/', UserAuth, (req, res) => {
  client.createProfile(req.body, (error, response) => {
    if (error) {
      console.error('Error creating graduation plan:', error)
      return res.status(500).send('Error creating graduation plan')
    }
    res.status(201).json(response)
  })
})

// Endpoint to update an existing graduation plan by ID
app.put('/:id', UserAuth, (req, res) => {
  const updatedPlan = { ...req.body, id: req.params.id }
  client.updateGraduationPlan(updatedPlan, (error, response) => {
    if (error) {
      console.error('Error updating graduation plan:', error)
      return res.status(500).send('Error updating graduation plan')
    }
    res.json(response)
  })
})

// Endpoint to delete a graduation plan by ID
app.delete('/:id', UserAuth, (req, res) => {
  client.deleteGraduationPlan({ id: req.params.id }, (error, response) => {
    if (error) {
      console.error('Error deleting graduation plan:', error)
      return res.status(500).send('Error deleting graduation plan')
    }
    res.json(response)
  })
})

// Export the REST API app for use in the main application file
export default app
