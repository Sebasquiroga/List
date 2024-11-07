import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { userRouter } from './routes/users-router.js'
import { shopRoutes } from './routes/shop.routes.js'
import { providerRoutes } from './routes/providers.routes.js'
process.loadEnvFile('.env')

const PORT = process.env.PORT ?? 3000
const app = express()

// eslint-disable-next-line no-unused-vars
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

// Middelware's
app.use(cookieParser())
app.use(express.json())
app.use(cors())

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

app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`)
})
