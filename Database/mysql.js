import { config } from 'dotenv'
import { createPool } from 'mysql2/promise'
config()
console.log(process.env.PASSWORDDB)

export const connection = createPool({
  host: process.env.HOST_DB,
  user: 'root',
  port: process.env.PORTDB,
  database: 'world',
  password: process.env.PASSWORDDB
})
