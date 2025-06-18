import { Router } from 'express'
import { insertar } from '../controllers/list.js'

export const listRoutes = Router()

listRoutes.post('/insertar', insertar)
