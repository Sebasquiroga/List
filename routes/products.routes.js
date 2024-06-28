import { Router } from 'express'
export const productRoutes = Router()

productRoutes.get('/products')
productRoutes.post('/products/create')
