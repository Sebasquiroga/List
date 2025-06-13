/* eslint-disable eqeqeq */
import { userSchema } from '../Schemas/validateInputs.js'
import { connection } from '../Database/mysql.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

/* Middleware's para los users  */

function validateUser (object) {
  return userSchema.safeParse(object)
}

// eslint-disable-next-line no-unused-vars
async function createToken (user) {
  const tokenGen = await jwt.sign({ usename: user.username, Tienda: user.idTienda }, process.env.SECRET_KEY, { expiresIn: '1h' })
  return tokenGen
}

export async function verifyToken (req, res, next) {
  const token = req.cookies.access_token
  if (!token) { res.status(403).send('access not autoriced ') } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) { res.status(401).send('Token invalido') } else {
        res.status(201)
        next()
      }
    })
  }
}

export async function test (req, res) {
}

/* Funciones para users  */

export async function createUser (req, res) {
  const resultado = validateUser(req.body) /* funcion para validar datos recibidos del req.body */
  if (resultado.success == false) { res.send('error en los datos').status(402) } else {
    const password = await bcrypt.hash(req.body.password, 8)
    try {
      await connection.query('INSERT INTO list.users (id, username, password) VALUES ( UUID_TO_BIN( UUID() ), ?,?)', [resultado.data.username, password])
        .then((result) => { res.status(201).json({ messege: 'user create success full' }) })
    } catch (err) { res.status(406).send(err) }
  }
}

export const deleteUser = async function (req, res) {
  const user = req.body.username
  if (!user) { res.status(400).send('username is required') }
  await connection.query(`DELETE FROM list.users WHERE username = '${user}'`)
    .then((data) => {
      console.log(data)
      if (data[0].affectedRows > 0) {
        res.status(202).send('user deleted succesfully')
      } else {
        res.status(404).send('user not found')
      }
    })
    .catch(err => res.status(406).send(err))
}

export const updateUser = async function (req, res) {
  const userData = req.query
  await connection.query(`UPDATE list.users SET IdTienda = '${userData.idTienda}' WHERE username = '${userData.username}'`).then(data => res.send(data)).catch(err => res.send(err))
}

export const findUser = async function (req, res) {
  const string = req.body.username
  await connection.query(`SELECT  username, password ,idTienda FROM list.users WHERE username LIKE '${string}%'`).then(([rows]) => { if (rows.length > 0) { res.status(201).send(rows) } else { res.status(404).send('user not found') } }).catch(err => { res.status(404).send(err) })
}

export const logout = (req, res) => {
  res.clearCookie('access_token').json({ messege: 'logout succesfull' })
}

export async function login (req, res) {
  /* Importante gestionar la verificacion de los datos enviados al servidor con Verificate */
  const username = req.body.username
  const password = req.body.password
  await findUsers(username).then(data => {
    compare(password, data[0].password)
      .then(respuesta => {
        // eslint-disable-next-line brace-style
        if (respuesta) { createToken(data[0]).then(token => {
          res.cookie('access_token', token, { maxAge: 35000 * 60, httpOnly: false, secure: false, sameSite: 'lax' }).status(201).json({ messege: 'password correct' })
        })
        } else { res.status(403).json({ messege: 'password incorrect, try again' }) }
      }).catch(err => {
        console.log(err)
        res.status(500).json({ messege: 'error comparing password' })
      })
  })
}

export function accesstoken (req, res, string) {
  res.status(200).cookie('access_token', string, { maxAge: 35000 * 60, httpOnly: false, secure: true, sameSite: 'None' }).status(201).json({ messege: 'password correct' })
}

export async function findUsers (string) {
  let user = {}
  await connection.query(`SELECT  username, password ,idTienda FROM list.users WHERE username LIKE '${string}'`).then(([rows]) => { user = rows }).catch(err => (err))
  return user
}

async function compare (password, hash) {
  let result = false
  await bcrypt.compare(password, hash).then(data => { result = data }).catch(err => console.log(err))
  return result
}
