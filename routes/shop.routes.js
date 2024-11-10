import { Router } from 'express'
import { createShop, deleteShop, findAllShop, updateShop } from '../controllers/shops.controllers.js'
export const shopRoutes = Router()

shopRoutes.get('/', findAllShop)
shopRoutes.post('/create', createShop)
shopRoutes.patch('/update/:shopname', updateShop)
shopRoutes.delete('/delete/:shopname', deleteShop)
