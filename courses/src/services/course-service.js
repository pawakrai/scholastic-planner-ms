import { CourseRepository } from '../database/index.js'
import { FormateData } from '../utils/index.js'

// All Business logic will be here
class CourseService {
  constructor() {
    this.repository = new CourseRepository()
  }

  // Get all courses
  async GetCourses() {
    const courses = await this.repository.GetCourses()
    return FormateData(courses)
  }

  // Get course by id
  async GetCourseById(courseId) {
    const course = await this.repository.GetCourseById(courseId)
    return FormateData(course)
  }

  // Create a new course
  async CreateCourse(courseInputs) {
    console.log(courseInputs)
    const courseResult = await this.repository.CreateCourse(courseInputs)
    return FormateData(courseResult)
  }

  // Update a course
  async UpdateCourse(courseInputs) {
    const courseResult = await this.repository.UpdateCourse(courseInputs)
    return FormateData(courseResult)
  }

  // Delete a course
  async DeleteCourse(courseInputs) {
    const courseResult = await this.repository.DeleteCourse(courseInputs)
    return FormateData(courseResult)
  }

  // RPC Response
  async serveRPCRequest(payload) {
    const { type, data } = payload
    // console.log('Payload received:', payload)

    switch (type) {
      case 'VIEW_COURSE':
        return this.GetCourseById(data)
      case 'VIEW_COURSES':
        return this.GetCourses()
      default:
        break
    }
  }
}

export default CourseService
