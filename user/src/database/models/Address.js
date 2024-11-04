import mongoose from 'mongoose'

const { Schema } = mongoose

const AddressSchema = new Schema({
  street: String,
  postalCode: String,
  city: String,
  country: String,
})

export default mongoose.model('address', AddressSchema)
