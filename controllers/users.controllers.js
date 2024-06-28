/* eslint-disable eqeqeq */
import { userSchema } from '../Schemas/validateInputs.js'
import { connection } from '../Database/mysql.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { findProduct } from './products.controllers.js'
config()

export function validateUser (object) {
  return userSchema.safeParse(object)
}

export const createUser = async function (req, res) {
  const resultado = validateUser(req.body) /* funcion para validar datos recibidos del req.body */
  if (resultado.error) { res.status(402).json({ error: resultado.error.message }) } else {
    const newUser = resultado.data
    await connection.query('INSERT INTO `list`.`users` (`username`, `password`) VALUES (?,?)', [newUser.username, bcrypt.hashSync(newUser.password, 8)]).then((datos) => { res.send(datos) }).catch((err) => { res.send(err.message) })
  }
}

export const deleteUser = async function (data) {

}

export const updateUser = async function (data) {

}

export const findUSer = async function (req, res) {
  const validacion = validateUser(req.body)
  if (validacion.success == false) {
    console.log('es falso')
  }
  await connection.query('SELECT BIN_TO_UUID(idusers), username FROM list.users WHERE username = ?', [req.body.username]).then((datos) => {
    res.send(datos[0])
  }).catch((err) => { res.send(err) })
}

export const login = async function (req, res) {
  const usernameReq = req.body.username
  const validacion = validateUser(req.body)
  if (validacion.success == false) {
    res.send('validar el formato de entrada, no es posible validarlo')
  }
  try {
    await connection.query('SELECT username, password, rol FROM list.users WHERE username = ?', [usernameReq]).then((datos) => {
      const isValidPassword = bcrypt.compareSync(req.body.password, datos[0][0].password)
      const rolUser = datos[0][0].rol
      if (!isValidPassword) { res.send('password invalid') } else {
        const token = jwt.sign({ usename: usernameReq, rol: rolUser }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.cookie('access_token', token, { httpOnly: true, secure: false }).send('login exitoso')
      }
    })
  } catch { res.send('user not found') }
}

export async function createList (req, res) {
  const data = req.body
  const dataProducto = await findProduct(data)
  console.log(dataProducto)
  res.send(dataProducto)
}
