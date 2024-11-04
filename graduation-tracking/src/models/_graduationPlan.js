import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  department: { type: String },
  credits: { type: Number, required: true },
  grade: {
    type: String,
    enum: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', '', null],
  },
})

const yearStatusSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  subjects: [subjectSchema],
  gpa: { type: Number },
})

const graduationRequirementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  minCredits: { type: Number, required: true },
  minGPA: { type: Number, required: true },
  maxDuration: { type: Number, required: true },
})

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  department: { type: String },
  subjects: [subjectSchema],
  requirements: graduationRequirementSchema,
})

const graduationPlanSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    gpax: { type: Number },
    passed_courses: { type: Boolean },
    course: courseSchema,
    year_status: [yearStatusSchema],
  },
  {
    timestamps: true,
  }
)

const GraduationPlan = mongoose.model('GraduationPlan', graduationPlanSchema)
export default GraduationPlan
