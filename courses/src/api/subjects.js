import SubjectService from '../services/subject-service.js'
import { RPCObserver } from '../utils/index.js'
import express from 'express'
const router = express.Router()

export default (channel) => {
  const service = new SubjectService()

  RPCObserver('SUBJECT_RPC', service)

  // Get all subjects
  router.get('/', async (req, res, next) => {
    try {
      const { data } = await service.GetSubjects()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Get subject by ID
  router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
      const { data } = await service.GetSubjectById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Create a new subject
  router.post('/create', async (req, res, next) => {
    const { subjectId, subjectName, subjectDescription, credits } = req.body
    try {
      const { data } = await service.CreateSubject({
        subjectId,
        subjectName,
        subjectDescription,
        credits,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Update a subject
  router.put('/update/:id', async (req, res, next) => {
    const { id } = req.params
    const { subjectName, subjectDescription, credits } = req.body
    try {
      const { data } = await service.UpdateSubject({
        id,
        subjectName,
        subjectDescription,
        credits,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Delete a subject
  router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      const { data } = await service.DeleteSubject(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  return router
}
