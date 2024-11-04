import { SubjectRepository } from '../database/index.js'
import { FormateData } from '../utils/index.js'

// All Business logic will be here
class SubjectService {
  constructor() {
    this.repository = new SubjectRepository()
  }

  // Get all subjects
  async GetSubjects() {
    const subjects = await this.repository.GetSubjects()
    return FormateData(subjects)
  }

  // Get subject by id
  async GetSubjectById(subjectId) {
    const subject = await this.repository.GetSubjectById(subjectId)
    return FormateData(subject)
  }

  // Create a new subject
  async CreateSubject(subjectInputs) {
    const subjectResult = await this.repository.CreateSubject(subjectInputs)
    return FormateData(subjectResult)
  }

  // Update a subject
  async UpdateSubject(subjectInputs) {
    const subjectResult = await this.repository.UpdateSubject(subjectInputs)
    return FormateData(subjectResult)
  }

  // Delete a subject
  async DeleteSubject(subjectInputs) {
    const subjectResult = await this.repository.DeleteSubject(subjectInputs)
    return FormateData(subjectResult)
  }

  // RPC Response
  async serveRPCRequest(payload) {
    const { type, data } = payload
    // console.log('Payload received:', payload)

    switch (type) {
      case 'VIEW_SUBJECT':
        return this.GetSubjectById(data)
      case 'VIEW_SUBJECTS':
        return this.GetSubjects()
      default:
        break
    }
  }
}

export default SubjectService
