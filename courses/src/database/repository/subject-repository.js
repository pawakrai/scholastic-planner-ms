import { SubjectModel } from '../models/index.js'

// Dealing with database operations
class SubjectRepository {
  // Get all subjects
  async GetSubjects() {
    const subjects = await SubjectModel.find()
    return subjects
  }
  // Get subject by ID
  async GetSubjectById(id) {
    const subject = await SubjectModel.findById(id)
    return subject
  }
  // Create a new subject
  async CreateSubject({ subjectId, subjectName, subjectDescription, credits }) {
    if (!subjectId || !subjectName || !subjectDescription || !credits) {
      throw new Error('Invalid input')
    }

    const subject = new SubjectModel({
      subjectId,
      subjectName,
      subjectDescription,
      credits,
    })

    const subjectResult = await subject.save()
    return subjectResult
  }

  // Update a subject
  async UpdateSubject({ id, subjectName, subjectDescription, credits }) {
    const subject = await SubjectModel.findById(id)

    subject.subjectName = subjectName || subject.subjectName
    subject.subjectDescription =
      subjectDescription || subject.subjectDescription
    subject.credits = credits || subject.credits

    const subjectResult = await subject.save()
    return subjectResult
  }

  // Delete a subject
  async DeleteSubject(id) {
    return await SubjectModel.findByIdAndDelete(id)
  }
}

export default SubjectRepository
