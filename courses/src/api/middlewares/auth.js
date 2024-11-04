import { ValidateSignature } from '../../utils/index.js' // Ensure the correct path and file extension

export default async (req, res, next) => {
  const validationResponse = await ValidateSignature(req)

  if (validationResponse === true) {
    return next()
  }

  // If validation failed, respond with an appropriate status code and message
  if (validationResponse.error) {
    if (validationResponse.error === 'Token has expired') {
      return res.status(401).json({ message: validationResponse.error })
    }
    return res.status(403).json({ message: validationResponse.error })
  }
}
