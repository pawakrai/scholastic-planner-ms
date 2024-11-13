import express from 'express'
import bodyParser from 'body-parser'
import client from '../grpc/client.js'
import UserAuth from './middlewares/auth.js'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

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
app.get('/graduation/profile', UserAuth, (req, res) => {
  const { studentId } = req.user
  // console.log('req.user', req.user, studentId, email)
  client.getProfile({ studentId }, (error, response) => {
    if (error) {
      console.error('Error fetching graduation plan:', error)
      return res.status(500).send('Error fetching graduation plan')
    }
    res.json(response)
  })
})

// Endpoint to create a new graduation plan
app.post('/graduation/profile', UserAuth, (req, res) => {
  const { studentId, email } = req.user
  const { courseId } = req.body
  const profileData = { studentId, courseId, email }
  client.createProfile(profileData, (error, response) => {
    if (error) {
      console.log('error', error)
      console.error('Error creating graduation plan:', error)
      return res
        .status(500)
        .send(`Error creating graduation plan': ${error.message}`)
    }
    res.status(201).json(response)
  })
})

app.post('/graduation/registerSubject', UserAuth, (req, res) => {
  const { studentId } = req.user
  const { subjectId, semester, year } = req.body
  const registerData = { studentId, subjectId, semester, year }
  // console.log('registerData', registerData)
  client.registerSubject(registerData, (error, response) => {
    if (error) {
      console.error('Error registering subject:', error)
      return res.status(500).send('Error registering subject')
    }
    res.json(response)
  })
})

// Endpoint to update subject grade
app.post('/graduation/updateSubject', UserAuth, (req, res) => {
  const { studentId } = req.user
  const { subjectId, semester, year, grade } = req.body
  const updateData = { studentId, subjectId, semester, year, grade }
  client.updateSubjectStatus(updateData, (error, response) => {
    if (error) {
      console.error('Error updating subject:', error)
      return res.status(500).send('Error updating subject')
    }
    res.json(response)
  })
})

// Endpoint to delete a graduation plan by ID
app.delete('/graduation/delete', UserAuth, (req, res) => {
  const { studentId } = req.user
  console.log('studentIdxx', studentId)
  client.deleteProfile({ studentId }, (error, response) => {
    if (error) {
      console.error('Error deleting graduation plan:', error)
      return res.status(500).send('Error deleting graduation plan')
    }
    res.json(response)
  })
})

// Export the REST API app for use in the main application file
export default app
