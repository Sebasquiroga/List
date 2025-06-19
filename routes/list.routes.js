import { Router } from 'express'
import { forzar, insertar } from '../controllers/list.js'

export const listRoutes = Router()

listRoutes.post('/insertar', insertar)
listRoutes.post('/forzar', forzar)
