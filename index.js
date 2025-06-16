import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { userRouter } from './routes/users-router.js'
import { shopRoutes } from './routes/shop.routes.js'
import { providerRoutes } from './routes/providers.routes.js'
import { productRoutes } from './routes/products.routes.js'
process.loadEnvFile()

const PORT = process.env.PORT ?? 3000
const app = express()

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

// Middelware's
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))

app.use(session({
  secret: 'alena',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Routes from api uses
app.use('/api', userRouter)
app.use('/api/shop', shopRoutes)
app.use('/api/providers', providerRoutes)
app.use('/api/product', productRoutes)

app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`)
})
