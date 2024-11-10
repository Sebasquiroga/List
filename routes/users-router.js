import { Router } from 'express'
import { createUser, deleteUser, findUser, login, logout, test, updateUser, verifyToken } from '../controllers/users.controllers.js'
export const userRouter = Router()

userRouter.post('/create', createUser)
userRouter.delete('/delete/:id', verifyToken, deleteUser)
userRouter.patch('/update', verifyToken, updateUser)
userRouter.post('/finduser', verifyToken, findUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/test/:username', test)
