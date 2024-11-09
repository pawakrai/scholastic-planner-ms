import graduationPlanRepository from '../repositories/graduationPlanRepository.js'
import { RPCRequest } from '../utils/index.js'
// import { status } from '@grpc/grpc-js'

class GraduationPlanService {
  // Get a graduation plan by student ID
  async getProfile(data) {
    const profile = await graduationPlanRepository.getByStudentId(
      data.studentId
    )

    if (!profile) {
      return {
        error: 'Graduation plan not found',
      }
    }

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
      academicRecords: profile.academicRecords,
      requirements: {
        minCredits: minimumCredits,
        minGPA: minimumGPA,
        maxDuration: maximumDuration,
      },
    }
  }

  // Create a new graduation plan
  async createProfile(data) {
    const { courseId, studentId, email } = data

    // console.log('data', data)

    // check if the course exists by student ID
    const profile = await graduationPlanRepository.getByStudentId(studentId)

    console.log('profile', profile)
    if (profile) {
      throw new Error('Profile already exists')
    }

    // check if the course exists by course ID
    const courseResponse = await RPCRequest('COURSE_RPC', {
      type: 'VIEW_COURSE',
      data: courseId,
    })

    // console.log('courseResponse', courseResponse)

    if (!courseResponse.data) {
      throw new Error('Course Not found')
    }

    // create a new graduation plan
    const newProfile = await graduationPlanRepository.create({
      courseId,
      studentId,
    })

    // send a notification to the notification service
    RPCRequest('EMAIL_QUEUE', {
      event: 'SEND_EMAIL',
      data: {
        email: email,
        subject: 'Graduation Plan Created',
        body: `Your graduation plan for ${courseResponse.data.courseName} has been created successfully`,
      },
    })

    return newProfile
  }

  // Register a subject for a student
  async registerSubject(subjectRegistration) {
    const { studentId, subjectId, semester, year } = subjectRegistration

    // Check if the student has a graduation plan
    let profile = await graduationPlanRepository.getByStudentId(studentId)
    if (!profile) {
      throw new Error('Graduation plan not found')
    }

    // console.log('subjectRegistration', subjectRegistration)

    // Find or create the academic record for the given year and semester
    let academicRecord = profile.academicRecords.find(
      (record) =>
        String(record.year) === String(year) &&
        String(record.semester) === String(semester)
    )

    if (!academicRecord) {
      academicRecord = {
        year,
        semester,
        subjects: [], // Initialize the subjects array
        gpa: 0,
      }
      profile.academicRecords.push(academicRecord)
    }

    // TODO: Change this to an RPC call to the Timetable service
    // Check if the subject exists
    const subjectResponse = await RPCRequest('SUBJECT_RPC', {
      type: 'VIEW_SUBJECT',
      data: subjectId,
    })

    if (!subjectResponse.data) {
      throw new Error('Subject not found')
    }

    // Check if the subject is already registered
    const isRegistered = academicRecord.subjects?.some(
      (subject) => subject.id === subjectId
    )

    if (isRegistered) {
      throw new Error('Subject already registered')
    }

    const { subjectName, credits } = subjectResponse.data

    console.log('academicRecord', academicRecord)

    // find index of the academic record
    const academicRecordIndex = profile.academicRecords.findIndex(
      (record) =>
        String(record.year) === String(year) &&
        String(record.semester) === String(semester)
    )

    // Register the subject by adding it to the academic record
    profile.academicRecords[academicRecordIndex].subjects.push({
      id: subjectId,
      name: subjectName,
      credits,
    })

    profile = this.updateCurrentCredits(profile)

    // Update the graduation plan
    const updatedProfile = await graduationPlanRepository.update(
      profile._id,
      profile
    )

    return updatedProfile
  }

  // Update the status of a registered subject
  async updateSubjectStatus(subjectRegistration) {
    const { studentId, subjectId, semester, year, grade } = subjectRegistration

    // Check if the student has a graduation plan
    let profile = await graduationPlanRepository.getByStudentId(studentId)
    if (!profile) {
      throw new Error('Graduation plan not found')
    }

    // Find the academic record index
    const academicRecordIndex = profile.academicRecords.findIndex(
      (record) =>
        String(record.year) === String(year) &&
        String(record.semester) === String(semester)
    )

    if (academicRecordIndex === -1) {
      throw new Error('Academic record not found')
    }

    // Update the subject grade
    profile = await graduationPlanRepository.updateSubjectStatus({
      studentId,
      subjectId,
      year,
      semester,
      grade,
    })

    // Update GPA, GPAX, and currentCredits
    profile = this.updateGPA(profile, academicRecordIndex)
    profile = this.updateGPAX(profile)
    profile = this.updateCurrentCredits(profile)

    // Update the graduation plan
    const updatedProfile = await graduationPlanRepository.update(
      profile._id,
      profile
    )

    return updatedProfile
  }

  updateGPA(profile, academicRecordIndex) {
    const academicRecord = profile.academicRecords[academicRecordIndex]
    const { totalCredits, totalGradePoints } = academicRecord.subjects.reduce(
      (acc, subject) => {
        if (subject.grade !== -1 && subject.grade !== null) {
          acc.totalCredits += subject.credits
          acc.totalGradePoints += subject.credits * subject.grade
        }
        return acc
      },
      { totalCredits: 0, totalGradePoints: 0 }
    )

    academicRecord.gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0
    return profile
  }

  updateGPAX(profile) {
    const { totalCreditsAll, totalGradePointsAll } =
      profile.academicRecords.reduce(
        (acc, record) => {
          record.subjects.forEach((subject) => {
            if (subject.grade !== -1 && subject.grade !== null) {
              acc.totalCreditsAll += subject.credits
              acc.totalGradePointsAll += subject.credits * subject.grade
            }
          })
          return acc
        },
        { totalCreditsAll: 0, totalGradePointsAll: 0 }
      )

    profile.gpax =
      totalCreditsAll > 0 ? totalGradePointsAll / totalCreditsAll : 0
    return profile
  }

  updateCurrentCredits(profile) {
    profile.currentCredits = profile.academicRecords.reduce(
      (total, record) =>
        total +
        record.subjects.reduce((sum, subject) => sum + subject.credits, 0),
      0
    )
    return profile
  }

  // Delete a graduation plan by ID
  async deleteProfile(id) {
    const deleteProfile = await graduationPlanRepository.delete(id)
    if (!deleteProfile) {
      throw new Error('Graduation plan not found')
    }

    return {
      message: 'Graduation plan deleted successfully',
      plans: deleteProfile,
    }
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
