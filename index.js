import express from 'express'
import session from 'express-session'
import { userRouter } from './routes/users-router.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { shopRoutes } from './routes/shop.routes.js'
import { providerRoutes } from './routes/providers.routes.js'
config()
const PORT = process.env.PORT ?? 3000
const app = express()

// Middelware's
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'alena',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// Routes from api uses
app.use('/api', userRouter)
app.use('/api', shopRoutes)
app.use('/api', providerRoutes)
app.get('/', (req, res) => {
  const titiru = req.session
  res.send(titiru)
  const test = req.cookies.access_token
  console.log('hola' + test)
})
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`)
})
