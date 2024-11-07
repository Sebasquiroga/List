import { Router } from 'express'
import { createUser, deleteUser, findUser, login, logout, test, updateUser, verifyToken } from '../controllers/users.controllers.js'
export const userRouter = Router()

userRouter.get('/users', (req, res) => {
  res.json({ messege: '<h1>Hola sebas </h1>' })
})

userRouter.post('/create', createUser)
userRouter.delete('/delete/:id', deleteUser)
userRouter.patch('/update', updateUser)
userRouter.post('/finduser', verifyToken, findUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/verificado', verifyToken)
userRouter.get('/test/:username', test)
