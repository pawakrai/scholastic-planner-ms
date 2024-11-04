import DepartmentService from '../services/department-service.js'
import { RPCObserver } from '../utils/index.js'
import express from 'express'
const router = express.Router()

export default (channel) => {
  const service = new DepartmentService()

  RPCObserver('DEPARTMENT_RPC', service)

  // Get all departments
  router.get('/', async (req, res, next) => {
    try {
      const { data } = await service.GetDepartments()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Get department by ID
  router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
      const { data } = await service.GetDepartmentById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Create a new department
  router.post('/create', async (req, res, next) => {
    const { departmentName, departmentDescription } = req.body
    try {
      const { data } = await service.CreateDepartment({
        departmentName,
        departmentDescription,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Update a department
  router.put('/update/:id', async (req, res, next) => {
    const { id } = req.params
    const { departmentName, departmentDescription } = req.body
    try {
      const { data } = await service.UpdateDepartment({
        id,
        departmentName,
        departmentDescription,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  // Delete a department
  router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      const { data } = await service.DeleteDepartment({ id })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error })
    }
  })

  return router
}
