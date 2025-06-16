import { Router } from 'express'
import { createProduct, deleteProduct, findProduct, updateProduct } from '../controllers/products.controllers.js'
export const productRoutes = Router()

productRoutes.post('/findproduct', findProduct)
productRoutes.post('/create', createProduct)
productRoutes.delete('/delete', deleteProduct)
productRoutes.patch('/update', updateProduct)
