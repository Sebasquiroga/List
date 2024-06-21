import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const autenticate = (req, res, next) => {
  const token = req.cookies.access_token
  req.session.user = { user: null }
  if (!token) { res.status(403).send('accesso invalido ') } else {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY)
      req.session.user = data
      console.log(req.session.user)
      next()
    } catch (err) { res.send(err) }
  }
}

export const funTest = (req, res) => {
  console.log('test')
  res.send('Hola desde Fun Test')
}
