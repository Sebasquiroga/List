import { Router } from 'express'
import { createProvider, findProviders } from '../controllers/providers.controllers.js'
export const providerRoutes = Router()

providerRoutes.post('/provider', findProviders)
providerRoutes.post('/create', createProvider)
providerRoutes.patch('/update')
providerRoutes.delete('/delete/:id')
