import { Router } from 'express'
import { createShop, deleteShop, findAllShop, findShop, updateShop } from '../controllers/shops.controllers.js'
export const shopRoutes = Router()

shopRoutes.get('/', findAllShop)
shopRoutes.post('/find', findShop) // Assuming you want to find all shops or a specific one
shopRoutes.post('/create', createShop)
shopRoutes.patch('/update/:shopname', updateShop)
shopRoutes.delete('/delete/:shopname', deleteShop)
