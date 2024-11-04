import CourseService from '../services/course-service.js'
import { RPCObserver } from '../utils/index.js'
import UserAuth from './middlewares/auth.js'
import express from 'express'
const router = express.Router()

export default (channel) => {
  const service = new CourseService()

  RPCObserver('COURSE_RPC', service)

  // Get all courses
  router.get('/', UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetCourses()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Get course by ID
  router.get('/:id', UserAuth, async (req, res, next) => {
    const id = req.params.id
    try {
      const { data } = await service.GetCourseById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Create a new course
  router.post('/create', UserAuth, async (req, res, next) => {
    const {
      courseName,
      courseDescription,
      departmentId,
      subjects,
      graduationRequirements,
    } = req.body

    try {
      const { data } = await service.CreateCourse({
        courseName,
        courseDescription,
        departmentId,
        subjects,
        graduationRequirements,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Update a course
  router.put('/update/:id', UserAuth, async (req, res, next) => {
    const { id } = req.params
    const {
      courseName,
      courseDescription,
      departmentId,
      subjects,
      graduationRequirements,
    } = req.body
    try {
      const { data } = await service.UpdateCourse({
        id,
        courseName,
        courseDescription,
        departmentId,
        subjects,
        graduationRequirements,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Delete a course
  router.delete('/delete/:id', UserAuth, async (req, res, next) => {
    const { id } = req.params
    try {
      const { data } = await service.DeleteCourse(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  return router
}
