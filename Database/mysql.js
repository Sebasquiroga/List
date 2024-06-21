import { createPool } from 'mysql2/promise'

export const connection = createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  database: 'world',
  password: 'Squirog@16'
})
