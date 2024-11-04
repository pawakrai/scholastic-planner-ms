import { CourseModel } from '../models/index.js'

// Dealing with database operations
class CourseRepository {
  // Get all courses
  async GetCourses() {
    const courses = await CourseModel.find()
    return courses
  }

  // Get course by ID
  async GetCourseById(id) {
    const course = await CourseModel.findById(id)
    return course
  }

  // Create a new course
  async CreateCourse({
    courseName,
    courseDescription,
    departmentId,
    subjects,
    graduationRequirements,
  }) {
    if (!courseName || !courseDescription || !departmentId) {
      throw new Error('Invalid input')
    }

    const course = new CourseModel({
      courseName,
      courseDescription,
      departmentId,
      subjects,
      graduationRequirements,
    })

    const courseResult = await course.save()
    return courseResult
  }

  // Update a course
  async UpdateCourse({
    id,
    courseName,
    courseDescription,
    departmentId,
    subjects,
    graduationRequirements,
  }) {
    const course = await CourseModel.findById(id)

    course.courseName = courseName || course.courseName
    course.courseDescription = courseDescription || course.courseDescription
    course.departmentId = departmentId || course.departmentId
    course.subjects = subjects || course.subjects
    course.graduationRequirements =
      graduationRequirements || course.graduationRequirements

    const courseResult = await course.save()
    return courseResult
  }

  // Delete a course
  async DeleteCourse(id) {
    return await CourseModel.findByIdAndDelete(id)
  }
}

export default CourseRepository
