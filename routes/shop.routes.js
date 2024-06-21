import { Router } from 'express'
import { config } from 'dotenv'
import { autenticate, funTest } from '../controllers/autentication.js'
export const shopRoutes = Router()
config()

shopRoutes.get('/shop', autenticate, funTest)
