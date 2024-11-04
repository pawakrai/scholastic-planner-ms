import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  grade: { type: Number, default: 0 },
})

const semesterSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  semester: { type: String, required: true }, // 'first', 'second' or 'summer'
  gpa: { type: Number },
  subjects: [subjectSchema],
})

const graduationPlanSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true }, // Reference to the Course registered
    studentId: { type: String, required: true }, // Reference to the Student
    gpax: { type: Number, default: 0 },
    currentCredits: { type: Number, default: 0 },
    hasPassedCourses: { type: Boolean, default: false },
    academicRecords: { type: [semesterSchema], default: [] },
  },
  {
    timestamps: true,
  }
)

const GraduationPlan = mongoose.model('GraduationPlan', graduationPlanSchema)
export default GraduationPlan
