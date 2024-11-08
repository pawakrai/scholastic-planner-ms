import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
      unique: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    subjectDescription: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    date: {
      type: [String], // Enum-like behavior with an array of strings for days
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      required: true,
    },
    startTime: {
      type: String, // string in HH:mm format
      required: true,
    },
    endTime: {
      type: String, // string in HH:mm format
      required: true,
    },
    sec: {
      type: Number, // Section number
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('subject', SubjectSchema)
