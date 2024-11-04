import UserService from '../services/user-service.js'
import UserAuth from './middlewares/auth.js'
import { PublishMessage } from '../utils/index.js'
import { SHOPPING_SERVICE } from '../config/index.js'

export default (app, channel) => {
  const service = new UserService()

  app.post('/signup', async (req, res) => {
    const { email, password, phone, studentId, yearRegistered } = req.body
    const { data } = await service.SignUp({
      email,
      password,
      phone,
      studentId,
      yearRegistered,
    })
    return res.json(data)
  })

  app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { data } = await service.SignIn({ email, password })
    return res.json(data)
  })

  app.post('/address', UserAuth, async (req, res) => {
    const { _id } = req.user
    const { street, postalCode, city, country } = req.body
    const { data } = await service.AddNewAddress(_id, {
      street,
      postalCode,
      city,
      country,
    })
    return res.json(data)
  })

  app.get('/profile', UserAuth, async (req, res) => {
    const { _id } = req.user
    const { data } = await service.GetProfile({ _id })
    return res.json(data)
  })

  app.delete('/profile', UserAuth, async (req, res) => {
    const { _id } = req.user
    const { data, payload } = await service.DeleteProfile(_id)

    // Send message to Shopping Service for removing cart & wishlist
    PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(payload))

    return res.json(data)
  })

  app.get('/whoami', (req, res) => {
    return res.status(200).json({ msg: '/customer : I am Customer Service' })
  })
}
