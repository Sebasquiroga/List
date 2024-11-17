/* eslint-disable eqeqeq */
import { userSchema } from '../Schemas/validateInputs.js'
import { connection } from '../Database/mysql.js'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

config()

/* Middleware's para los users  */

function validateUser (object) {
  return userSchema.safeParse(object)
}

function createToken (user) {
  console.log(user)
  const tokenGen = jwt.sign({ usename: user.username, Tienda: user.idTienda }, process.env.SECRET_KEY, { expiresIn: '1h' })
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
  const user = req.params.id
  await connection.query(`DELETE FROM list.users WHERE username = '${user}'`).then(data => res.status(202).send(data[0])).catch(err => res.status(406).send(err))
}

export const updateUser = async function (req, res) {
  const userData = req.query
  await connection.query(`UPDATE list.users SET IdTienda = '${userData.idTienda}' WHERE username = '${userData.username}'`).then(data => res.send(data)).catch(err => res.send(err))
}

export const findUser = async function (object) {
  await connection.query('SELECT BIN_TO_UUID(id), username FROM list.users WHERE username = ?', [object.username]).then(data => { return data }).catch(err => { return err })
}

export const login3 = async (req, res) => {
  const isValid = validateUser(req.body).success
  const password = req.body.password
  if (isValid) {
    const user = await connection.query(`SELECT  username, password FROM list.users WHERE username = '${req.body.username}'`)
    if (user[0].length < 1) { res.status(404).json({ messege: 'user not found' }) } else {
      const estado = await bcrypt.compare(password, user[0][0].password).catch((err) => res.json({ error: err }))
      if (estado) {
        const token = createToken(user[0][0])
        res.status(201).cookie('access_token', token, { maxAge: 35000 * 60, httpOnly: false, secure: false, sameSite: 'lax' }).json({ messege: 'password correct' })
      } else {
        res.status(403).json({ messege: 'password incorrect, try again' })
      }
    }
  } else { res.status(502).json({ messege: 'error en formato de texto' }) }
}

export const logout = (req, res) => {
  res.clearCookie('access_token').json({ messege: 'logout succesfull' })
  console.log('logout')
}

export const login = async (req, res) => {
  const isValid = validateUser(req.body).success
  if (isValid) {
    const user = await connection.query(`SELECT  username, password ,idTienda FROM list.users WHERE username = '${req.body.username}'`).then(([rows]) => { return rows[0] }).catch(err => res.send(err))
    if (!user) { res.status(404).json({ messege: 'user not found' }) } else {
      await bcrypt.compare(req.body.password, user.password).then(compare => {
        if (compare == true) {
          const token = createToken(user)
          res.status(201).cookie('access_token', token, { maxAge: 35000 * 60, httpOnly: false, secure: false, sameSite: 'lax' }).json({ messege: 'password correct' })
        } else { res.status(403).json({ messege: 'password incorrect, try again' }) }
      }).catch((err) => res.json({ error: err }))
    }
  } else { res.status(502).json({ messege: 'error en formato de texto' }) }
}
