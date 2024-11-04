import graduationPlanRepository from '../repositories/graduationPlanRepository.js'
import { RPCRequest } from '../utils/index.js'

class GraduationPlanService {
  // Get a graduation plan by student ID
  async getProfile(data) {
    const profile = await graduationPlanRepository.getByStudentId(data.id)

    const courseResponse = await RPCRequest('COURSE_RPC', {
      type: 'VIEW_COURSE',
      data: profile.courseId,
    })

    const { courseName, courseDescription } = courseResponse.data
    const { minimumCredits, minimumGPA, maximumDuration } =
      courseResponse.data.graduationRequirements

    return {
      courseId: profile.courseId,
      courseName: courseName,
      courseDescription,
      studentId: profile.studentId,
      gpax: profile.gpax,
      currentCredits: profile.currentCredits,
      hasPassedCourses: profile.hasPassedCourses,
      requirements: {
        minCredits: minimumCredits,
        minGPA: minimumGPA,
        maxDuration: maximumDuration,
      },
    }
  }

  // Create a new graduation plan
  async createProfile(data) {
    // const { courseId, studentId } = data
    console.log('data', data)
    return await graduationPlanRepository.create(data)
  }

  // Register a subject for a student
  async registerSubject(subjectRegistration) {
    return await graduationPlanRepository.registerSubject(subjectRegistration)
  }

  // Update the status of a registered subject
  async updateSubjectStatus(subjectRegistration) {
    return await graduationPlanRepository.updateSubjectStatus(
      subjectRegistration
    )
  }

  // Delete a graduation plan by ID
  async deleteProfile(id) {
    return await graduationPlanRepository.delete(id)
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload)
    const { event, data } = payload
    const { studentId } = data

    switch (event) {
      case 'DELETE_PROFILE':
        this.deleteProfile(studentId)
        break
      default:
        break
    }
  }
}

export default new GraduationPlanService()
