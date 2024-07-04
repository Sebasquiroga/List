/* eslint-disable eqeqeq */
import { userSchema } from '../Schemas/validateInputs.js'
import { connection } from '../Database/mysql.js'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { findProduct } from './products.controllers.js'
import bcrypt from 'bcrypt'

config()

export function validateUser (object) {
  return userSchema.safeParse(object)
}

function createToken (user) {
  const tokenGen = jwt.sign({ usename: user.username, rol: user.rol }, process.env.SECRET_KEY, { expiresIn: '1h' })
  return tokenGen
}

export const createUser = async function (req, res) {
  const resultado = validateUser(req.body) /* funcion para validar datos recibidos del req.body */
  if (resultado.success == false) { res.send('error en los datos').status(402) } else {
    const password = await bcrypt.hash(req.body.password, 8)
    try {
      await connection.query('INSERT INTO `list`.`users` (`username`, `password`) VALUES (?,?)', [resultado.data.username, password])
        .then((result) => { res.json({ messege: 'user create success full' }) })
    } catch (err) { res.send(err) }
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

export const login = async (req, res) => {
  const isValid = validateUser(req.body)
  let user = []
  if (isValid.success === false) { res.send('error en formato de texto').status(502) } else {
  // eslint-disable-next-line quotes
    try { await connection.query(`SELECT   username, password, Tienda, Rol FROM list.users WHERE username = '${req.body.username}'`).then((data) => { user = data[0][0] }) } catch (err) { res.send(err).status(402) }
  }
  const passwordCrypted = user.password
  const validate = await bcrypt.compare(isValid.data.password, passwordCrypted)
  if (validate == true) {
    const token = createToken(user)
    res.cookie('access_token', token, { httpOnly: true, secure: false }).send('login exitoso')
 nvi } else { res.send('password incorrect, please try again') }
}

export async function createList (req, res) {
  const data = req.body
  const dataProducto = await findProduct(data)
  console.log(dataProducto)
  res.send(dataProducto)
}
