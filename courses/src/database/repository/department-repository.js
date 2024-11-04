import { DepartmentModel } from '../models/index.js'

// Dealing with database operations
class DepartmentRepository {
  // Get all departments
  async GetDepartments() {
    const departments = await DepartmentModel.find()
    return departments
  }

  // Get department by ID
  async GetDepartmentById(id) {
    const department = await DepartmentModel.findById(id)
    return department
  }

  // Create a new department
  async CreateDepartment({ departmentName, departmentDescription }) {
    if (!departmentName || !departmentDescription) {
      throw new Error('Invalid input')
    }

    const department = new DepartmentModel({
      departmentName,
      departmentDescription,
    })

    const departmentResult = await department.save()
    return departmentResult
  }

  // Update a department
  async UpdateDepartment({ id, departmentName, departmentDescription }) {
    const department = await DepartmentModel.findById(id)

    department.departmentName = departmentName || department.departmentName
    department.departmentDescription =
      departmentDescription || department.departmentDescription

    const departmentResult = await department.save()
    return departmentResult
  }

  // Delete a department
  async DeleteDepartment({ id }) {
    return await DepartmentModel.findByIdAndDelete(id)
  }
}

export default DepartmentRepository
