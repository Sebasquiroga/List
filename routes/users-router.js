import { Router } from 'express'
import { createUser, deleteUser, findUser, login, logout, updateUser, verifyToken } from '../controllers/users.controllers.js'
export const userRouter = Router()

userRouter.post('/create', createUser)
userRouter.delete('/delete', deleteUser)
userRouter.post('/uniqueuser', findUser)
userRouter.patch('/update', verifyToken, updateUser)
userRouter.post('/finduser', findUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
