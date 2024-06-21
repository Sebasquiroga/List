import { Router } from 'express'
import { createUser, deleteUser, findUSer, login, updateUser } from '../controllers/users.controllers.js'
export const userRouter = Router()

userRouter.get('/users', (req, res) => {
  res.json({ messege: '<h1>Hola sebas </h1>' })
})

userRouter.post('/createuser', createUser)
userRouter.delete('/deleteuser/:id', deleteUser)
userRouter.patch('/updateuser/:id', updateUser)
userRouter.post('/finduser', findUSer)
userRouter.post('/login', login)
