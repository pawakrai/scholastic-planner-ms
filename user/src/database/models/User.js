import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    studentId: String,
    yearRegistered: Number,
    salt: String,
    phone: String,
    address: [{ type: Schema.Types.ObjectId, ref: 'address', required: true }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.salt
        delete ret.__v
      },
    },
    timestamps: true,
  }
)

export default mongoose.model('user', UserSchema)
