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
  async CreateSubject({
    subjectId,
    subjectName,
    subjectDescription,
    credits,
    semester,
    year,
    isOpen,
    date,
    startTime,
    endTime,
    sec,
  }) {
    // Validate required fields
    if (
      !subjectId ||
      !subjectName ||
      !subjectDescription ||
      !credits ||
      !semester ||
      !year ||
      !date ||
      !startTime ||
      !endTime ||
      !sec
    ) {
      throw new Error('Invalid input')
    }

    // Create a new subject instance with all fields
    const subject = new SubjectModel({
      subjectId,
      subjectName,
      subjectDescription,
      credits,
      semester,
      year,
      isOpen: isOpen ?? true, // Default to true if not provided
      date,
      startTime,
      endTime,
      sec,
    })

    const subjectResult = await subject.save()
    return subjectResult
  }

  // Update a subject
  async UpdateSubject({
    id,
    subjectName,
    subjectDescription,
    credits,
    semester,
    year,
    isOpen,
    date,
    startTime,
    endTime,
    sec,
  }) {
    const subject = await SubjectModel.findById(id)

    if (!subject) {
      throw new Error('Subject not found')
    }

    // Update only provided fields, leave others unchanged
    subject.subjectName = subjectName || subject.subjectName
    subject.subjectDescription =
      subjectDescription || subject.subjectDescription
    subject.credits = credits || subject.credits
    subject.semester = semester || subject.semester
    subject.year = year || subject.year
    subject.isOpen = typeof isOpen === 'boolean' ? isOpen : subject.isOpen // Ensure boolean check for isOpen
    subject.date = date || subject.date
    subject.startTime = startTime || subject.startTime
    subject.endTime = endTime || subject.endTime
    subject.sec = sec || subject.sec

    const updatedSubject = await subject.save()
    return updatedSubject
  }

  // Delete a subject
  async DeleteSubject(id) {
    return await SubjectModel.findByIdAndDelete(id)
  }
}

export default SubjectRepository
