import { Router } from 'express'
import { createProvider, findProviders } from '../controllers/providers.controllers.js'
export const providerRoutes = Router()

providerRoutes.post('/provider', findProviders)
providerRoutes.post('/provider/create', createProvider)
providerRoutes.patch('/provider/update/:id')
providerRoutes.delete('/provider/delete/:id')
