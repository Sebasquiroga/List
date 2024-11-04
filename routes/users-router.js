import { Router } from 'express'
import { createList, createUser, deleteUser, findUSer, login, logout, updateUser, verifyToken } from '../controllers/users.controllers.js'
export const userRouter = Router()

userRouter.get('/users', (req, res) => {
  res.json({ messege: '<h1>Hola sebas </h1>' })
})

userRouter.post('/createuser', createUser)
userRouter.delete('/deleteuser/:id', deleteUser)
userRouter.patch('/updateuser/:id', updateUser)
userRouter.post('/finduser', verifyToken, findUSer)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.post('/list', createList)
userRouter.get('/verificado', verifyToken)
