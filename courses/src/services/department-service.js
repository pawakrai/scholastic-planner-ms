import { DepartmentRepository } from '../database/index.js'
import { FormateData } from '../utils/index.js'

// All Business logic will be here
class DepartmentService {
  constructor() {
    this.repository = new DepartmentRepository()
  }

  async GetDepartments() {
    const courses = await this.repository.GetDepartments()
    return FormateData(courses)
  }

  async GetDepartmentById(departmentId) {
    const course = await this.repository.GetDepartmentById(departmentId)
    return FormateData(course)
  }

  async CreateDepartment(courseInputs) {
    const courseResult = await this.repository.CreateDepartment(courseInputs)
    return FormateData(courseResult)
  }

  async UpdateDepartment(courseInputs) {
    const courseResult = await this.repository.UpdateDepartment(courseInputs)
    return FormateData(courseResult)
  }

  async DeleteDepartment(departmentInputs) {
    const courseResult = await this.repository.DeleteDepartment(
      departmentInputs
    )
    return FormateData(courseResult)
  }

  // RPC Response
  async serveRPCRequest(payload) {
    const { type, data } = payload
    // console.log('Payload received:', payload)

    switch (type) {
      case 'VIEW_DEPARTMENT':
        return this.repository.GetDepartmentById(data)
      case 'VIEW_DEPARTMENTS':
        return this.repository.GetDepartments(data)
      default:
        break
    }
  }
}

export default DepartmentService
