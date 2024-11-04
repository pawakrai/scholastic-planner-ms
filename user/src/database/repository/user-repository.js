import { UserModel, AddressModel } from '../models/index.js'

// Dealing with database operations
class UserRepository {
  async CreateUser({
    email,
    password,
    phone,
    salt,
    studentId,
    yearRegistered,
  }) {
    const user = new UserModel({
      email,
      password,
      salt,
      phone,
      address: [],
      studentId,
      yearRegistered,
    })

    const userResult = await user.save()
    return userResult
  }

  async CreateAddress({ _id, street, postalCode, city, country }) {
    const profile = await UserModel.findById(_id)

    if (profile) {
      const newAddress = new AddressModel({
        street,
        postalCode,
        city,
        country,
      })

      await newAddress.save()

      profile.address.push(newAddress)
    }

    return await profile.save()
  }

  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email })
    return existingUser
  }

  async FindUserById({ id }) {
    const existingUser = await UserModel.findById(id).populate('address')
    return existingUser
  }

  async DeleteUserById(id) {
    return UserModel.findByIdAndDelete(id)
  }
}

export default UserRepository
