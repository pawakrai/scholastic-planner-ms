import { UserRepository } from '../database/index.js'
import {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from '../utils/index.js'

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository()
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs

    const existingUser = await this.repository.FindUser({ email })

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      )
      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          _id: existingUser._id,
          studentId: existingUser.studentId,
        })
        return FormateData({ id: existingUser._id, token })
      }
    }

    return FormateData(null)
  }

  async SignUp(userInputs) {
    const { email, password, phone, studentId, yearRegistered } = userInputs

    // create salt
    let salt = await GenerateSalt()

    let userPassword = await GeneratePassword(password, salt)

    const existingUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      phone,
      salt,
      studentId,
      yearRegistered,
    })

    const token = await GenerateSignature({
      email: email,
      _id: existingUser._id,
      studentId: existingUser.studentId,
    })
    return FormateData({ id: existingUser._id, token })
  }

  async AddNewAddress(_id, userInputs) {
    const { street, postalCode, city, country } = userInputs

    const addressResult = await this.repository.CreateAddress({
      _id,
      street,
      postalCode,
      city,
      country,
    })

    return FormateData(addressResult)
  }

  async GetProfile(id) {
    const existingUser = await this.repository.FindUserById({ id })
    return FormateData(existingUser)
  }

  async DeleteProfile(userId) {
    const data = await this.repository.DeleteUserById(userId)
    const payload = {
      event: 'DELETE_PROFILE',
      data: { userId },
    }
    return { data, payload }
  }
}

export default UserService
