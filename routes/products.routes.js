import { Router } from 'express'
import { createProduct, deleteProduct, findProduct } from '../controllers/products.controllers.js'
export const productRoutes = Router()

productRoutes.get('/', findProduct)
productRoutes.post('/create', createProduct)
productRoutes.delete('/delete/:product', deleteProduct)
