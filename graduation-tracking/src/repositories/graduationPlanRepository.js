import GraduationPlan from '../models/graduationPlan.js'

class GraduationPlanRepository {
  // Get all graduation plans
  async getAll() {
    return await GraduationPlan.find()
  }

  // Get a graduation plan by student ID
  async getByStudentId(studentId) {
    return await GraduationPlan.findOne({ studentId })
  }

  // Create a new graduation plan
  async create(data) {
    const graduationPlan = new GraduationPlan(data)
    return await graduationPlan.save()
  }

  // Update a graduation plan by ID
  async update(id, data) {
    return await GraduationPlan.findByIdAndUpdate(id, data, { new: true })
  }

  // Delete a graduation plan by student ID
  async delete(id) {
    return await GraduationPlan.findOneAndDelete({ studentId: id })
  }

  // Register a subject for a student
  async registerSubject(subjectRegistration) {
    const { studentId, subjectId, year, semester } = subjectRegistration

    // Assuming you want to update an existing graduation plan to add a subject
    return await GraduationPlan.findOneAndUpdate(
      { studentId },
      {
        $addToSet: { 'academicRecords.$[record].subjects': { id: subjectId } },
      }, // Add subject to specific academic record
      {
        arrayFilters: [{ 'record.year': year, 'record.semester': semester }],
        new: true,
      }
    )
  }

  // Update the status of a registered subject (this could vary based on your requirements)
  async updateSubjectStatus(subjectRegistration) {
    const { studentId, subjectId, year, semester, grade } = subjectRegistration

    // Assuming you want to update the grade for a specific subject in an academic record
    return await GraduationPlan.findOneAndUpdate(
      {
        studentId,
        'academicRecords.year': year,
        'academicRecords.semester': semester,
        'academicRecords.subjects.id': subjectId,
      },
      {
        $set: { 'academicRecords.$[record].subjects.$[subject].grade': grade },
      },
      {
        arrayFilters: [
          { 'record.year': year, 'record.semester': semester },
          { 'subject.id': subjectId },
        ],
        new: true,
      }
    )
  }
}

export default new GraduationPlanRepository()
