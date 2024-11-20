import { createPool } from 'mysql2/promise'
process.loadEnvFile()
console.log(process.env.PORT)
export const connection = createPool({
  host: process.env.HOST_DB,
  user: process.env.USERDBMYSQL,
  port: process.env.PORTDB,
  database: 'list',
  password: process.env.PASSWORDDB

})

async function test () {
  await connection.query('SELECT 1 + 1').then(result => console.log('conexion a base de datos MYSQL exitosa')).catch(err => console.log(err))
}
test()
