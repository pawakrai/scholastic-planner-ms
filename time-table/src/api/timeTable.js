import timeTable from '../services/timeTable-service.js'
// import { RPCObserver } from '../utils/index.js'
import UserAuth from './middlewares/auth.js'
import express from 'express'
const router = express.Router()

export default () => {
  const service = new timeTable()

  // Get a timeTable by ID
  router.get('/:id/:semester/:year', UserAuth, async (req, res, next) => {
    const studentId = req.params.id
    const semester = req.params.semester
    const year = req.params.year
    try {
      const { data } = await service.GetTimeTableById(studentId, semester, year)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Create a new timeTable
  router.post('/create', UserAuth, async (req, res, next) => {
    const requestData = req.body
    try {
      const { data } = await service.CreateTimeTable(requestData)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Update a timeTable
  router.put(
    '/update/:id/:semester/:year',
    UserAuth,
    async (req, res, next) => {
      const studentId = req.params.id
      const semester = req.params.semester
      const year = req.params.year
      const requestData = req.body
      try {
        const { data } = await service.UpdateTimeTable(
          studentId,
          semester,
          year,
          requestData
        )
        return res.status(200).json(data)
      } catch (error) {
        return res.status(404).json({ error })
      }
    }
  )

  // Delete a timeTable
  router.delete(
    '/delete/:id/:semester/:year',
    UserAuth,
    async (req, res, next) => {
      const studentId = req.params.id
      const semester = req.params.semester
      const year = req.params.year
      try {
        const { data } = await service.DeleteTimeTable(
          studentId,
          semester,
          year
        )
        return res.status(200).json(data)
      } catch (error) {
        return res.status(404).json({ error })
      }
    }
  )

  return router
}
