import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { APP_SECRET } from '../config/index.js'

// Utility functions
export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
}

export const ValidateSignature = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    try {
      // Extract the token from the Authorization header
      const token = signature.split(' ')[1]

      // Verify the token using jwt.verify
      const payload = await jwt.verify(token, APP_SECRET)

      // Attach the payload to the request object
      req.user = payload
      return true // Token is valid
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Handle token expiration
        return { error: 'Token has expired' }
      } else if (error instanceof jwt.JsonWebTokenError) {
        // Handle invalid token
        return { error: 'Invalid token' }
      } else {
        // Handle other errors
        return { error: 'Token verification failed' }
      }
    }
  }

  return { error: 'No authorization header provided' }
}

export const FormateData = (data) => {
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}
