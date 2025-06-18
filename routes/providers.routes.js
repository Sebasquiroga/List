import { Router } from 'express'
import { createProvider, findProviders, updateprovider } from '../controllers/providers.controllers.js'

export const providerRoutes = Router()

providerRoutes.post('/provider', findProviders)
providerRoutes.post('/create', createProvider)
providerRoutes.patch('/update', updateprovider)
providerRoutes.delete('/delete/:id')
