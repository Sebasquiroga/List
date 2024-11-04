import { config } from 'dotenv'
import { createPool } from 'mysql2/promise'
config()
console.log(process.env.PASSWORDDB)

export const connection = createPool({
  host: '192.168.0.5',
  user: 'sebasquiroga',
  port: '3306',
  database: 'list',
  password: 'Squiroga16'

})

async function test () {
  try { await connection.query('SELECT 1 + 1').then((datos) => console.log(datos)) } catch (err) { console.log(err) }
}

test()
